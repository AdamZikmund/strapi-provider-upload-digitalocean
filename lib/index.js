'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const AWS = require('aws-sdk');

module.exports = {
  provider: 'digitalocean',
  name: 'Digitalocean Spaces service',
  auth: {
    key: {
      label: 'Key',
      type: 'text'
    },
    secret: {
      label: 'Secret',
      type: 'text'
    },
    // Endpoint URL configurable, example: "https://mydomain.fra1.digitaloceanspaces.com"
    endpoint: {
      label: 'Endpoint',
      type: 'text'
    },
    // Spaces, example: "mydomain.com"
    space: {
      label: 'Space (folder within spaces/DNS-style bucket name)',
      type: 'text'
    },
    // Subfolder within space, example: "strapiimages/"
    folder: {
      label: 'Folder (subfolder within spaces, can be empty)',
      type: 'text'
    },
    cdn: {
      label: 'CDN',
      type: 'enum',
      values: ['False', 'True']
    }
  },
  init: config => {
    const S3 = new AWS.S3({
      accessKeyId: config.key,
      secretAccessKey: config.secret,
      sslEnabled: true,
      endpoint: config.endpoint,
      params: {
        Bucket: config.space
      }
    });

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/${config.folder || ''}/` : `${config.folder || ''}/`;
          const objectKey = `${path}${file.hash}${file.ext}`;

          S3.upload(
            {
              Key: objectKey,
              Body: new Buffer(file.buffer, 'binary'),
              ACL: 'public-read',
              ContentType: file.mime
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }
              if (config.cdn === 'True') {
                data.Location = data.Location.replace('.digitaloceanspaces.com', '.cdn.digitaloceanspaces.com');
              }

              file.url = `${data.Location}`;

              resolve();
            }
          );
        });
      },
      delete: file => {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/${config.folder || ''}/` : `${config.folder || ''}/`;
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve();
            }
          );
        });
      }
    };
  }
};
