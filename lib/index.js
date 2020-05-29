"use strict";
const AWS = require('aws-sdk');
const crypto = require('crypto')

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
			label: "Endpoint (e.g. 'https://space.nyc3.cdn.digitaloceanspaces.com')",
			type: "text",
		},
		cdn: {
			label: "CDN Endpoint (Optionnal - e.g. 'https://cdn.space.com')",
			type: "text",
		},
		space: {
			label: "Space",
			type: "text",
		},
	},
	init: config => {
		const S3 = new AWS.S3({
			apiVersion: '2006-03-01',
			sslEnabled: true,
			accessKeyId: config.key,
			secretAccessKey: config.secret,
			endpoint: config.endpoint,
			params: {Bucket: config.space},
		});

		return {
			upload: file => new Promise((resolve, reject) => {

				//--- Compute the file key.
				file.hash = crypto.createHash('md5').update(file.hash).digest("hex");

				//--- Upload the file into the space (technically the S3 Bucket)
				S3.upload({
					Key: `${file.hash}${file.ext}`,
					Body: new Buffer(file.buffer, "binary"),
					ACL: "public-read",
					ContentType: file.mime
				},

				//--- Callback handler
				(err, data) => {
					if (err) return reject(err);
					if (config.cdn)
						file.url = data.Location.replace(`${config.space}.${config.endpoint}`, config.cdn);
					resolve();
				});
				
			}),

			delete: file => new Promise((resolve, reject) => 

				//--- Delete the file from the space
				S3.deleteObject({
					Bucket: config.bucket,
					Key: `${file.hash}${file.ext}`
				},

				//--- Callback handler
				(err, data) => {
					if(err) return reject(err); 
					else resolve();
				}))
		}
	}
}
