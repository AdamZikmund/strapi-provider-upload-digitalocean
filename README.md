# strapi-provider-upload-digitalocean

## Configurations

To upload to Digital Ocean block storage, create a file `./config/plugins.js` with the example code snippet. Add the necessary env variables.

See the [using a provider](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/v3.x/concepts/configurations.html#environment-variables) for setting and using environment variables in your configs.


**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: "digitalocean",
    providerOptions: {
      accessKeyId: env('DIGITAL_OCEAN_ACCESS_KEY_ID'),
      secretAccessKey: env('DIGITAL_OCEAN_ACCESS_SECRET'),
      sslEnabled: true,
      region: env('DIGITAL_OCEAN_REGION'),
      params: {
        Bucket: env('DIGITAL_OCEAN_VOLUME')
      }
    }
  },
  // ...
});
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
