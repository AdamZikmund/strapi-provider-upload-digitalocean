# Strapi Upload Provider for Digital Ocean Spaces
- This provider is a fork of [AdamZikmund's](https://github.com/AdamZikmund) [strapi upload provider](https://github.com/AdamZikmund/strapi-provider-upload-digitalocean) for Digital Ocean spaces.

This provider will upload to the space using the AWS S3 API.

## Parameters
- key: [Space access key](https://cloud.digitalocean.com/account/api/tokens)
- secret: [Space access secret](https://cloud.digitalocean.com/account/api/tokens)
- endpoint: URL of the space (e.g. 'fra.digitaloceanspaces.com')
- cds: CDN Endpoint - URL of the cdn of the space (Optionnal - e.g. 'https://cdn.example.com')
- space: Name of the space in the Digital Ocean panel
- directory: Optional name of directory when you want to store your files

## How to use

1. Install this package

```
npm i strapi-provider-upload-do
```

2. Create config in `./extensions/upload/config/settings.js` with content

```
module.exports = {
  provider: "do",
  providerOptions: {
    key: process.env.SPACE_ACCESS_KEY,
    secret: process.env.SPACE_SECRET_KEY,
    endpoint: process.env.SPACE_ENDPOINT,
    space: process.env.SPACE_BUCKET,
    directory: process.env.SPACE_DIRECTORY
  }
}
```

3. Create `.env` and add to them 

```
SPACE_ACCESS_KEY
SPACE_SECRET_KEY
SPACE_ENDPOINT
SPACE_BUCKET
SPACE_DIRECTORY
```

with values obtained from tutorial:

> https://www.digitalocean.com/community/tutorials/how-to-create-a-digitalocean-space-and-api-key

Parameter `SPACE_DIRECTORY` is optional and you can ommit them both in `.env` and `settings`.

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Strapi docs about upload](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#configuration)

## Contributors
<a href="https://github.com/gustawdaniel"><img src="https://avatars.githubusercontent.com/u/16663028?v=3" title="gustawdaniel" width="80" height="80"></a>
