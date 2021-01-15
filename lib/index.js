"use strict";
const AWS = require('aws-sdk');
const crypto = require('crypto')

class FileLocationConverter {
  static getKey(config, file) {
    return `${config.directory ? `${config.directory}/` : ''}${file.hash}${file.ext}`
  }

  static getUrl(config, data) {
    if (config.cdn)
      return data.Location.replace(`${config.space}.${config.endpoint}`, config.cdn);
    else
      return data.Location
  }
}

module.exports = {
  provider: "do",
  name: "Digital Ocean Spaces",
  auth: {
    key: {
      label: "Key",
      type: "text"
    },
    secret: {
      label: "Secret",
      type: "text"
    },
    endpoint: {
      label: "Endpoint (e.g. 'fra1.digitaloceanspaces.com')",
      type: "text",
    },
    cdn: {
      label: "CDN Endpoint (Optional - e.g. 'https://cdn.space.com')",
      type: "text",
    },
    space: {
      label: "Space (e.g. myspace)",
      type: "text",
    },
    directory: {
      label: 'Directory (Optional - e.g. directory - place when you want to save files)',
      type: 'text'
    }
  },
  init: config => {
    const spacesEndpoint = new AWS.Endpoint(config.endpoint);

    const S3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: config.key,
      secretAccessKey: config.secret,
      params: {
        ACL: 'public-read',
        Bucket: config.space,
        CacheControl: 'public, max-age=31536000, immutable'
      },
    });

    return {
      upload: file => new Promise((resolve, reject) => {
        //--- Compute the file key.
        file.hash = crypto.createHash('md5').update(file.hash).digest("hex");

        //--- Upload the file into the space (technically the S3 Bucket)
        S3.upload({
            Key: FileLocationConverter.getKey(config, file),
            Body: Buffer.from(file.buffer, "binary"),
            ContentType: file.mime
          },

          //--- Callback handler
          (err, data) => {
            if (err) return reject(err);
            file.url = FileLocationConverter.getUrl(config, data);

            resolve();
          });

      }),

      delete: file => new Promise((resolve, reject) => {

          //--- Delete the file from the space
          S3.deleteObject({
              Bucket: config.bucket,
              Key: FileLocationConverter.getKey(config, file),
            },

            //--- Callback handler
            (err, data) => {
              if (err) return reject(err);
              else resolve();
            })
        }
      )

    }
  }
}
