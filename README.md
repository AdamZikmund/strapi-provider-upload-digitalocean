# Strapi Upload Provider for Digital Ocean Spaces
- This provider is a fork of [AdamZikmund's](https://github.com/AdamZikmund) [strapi upload provider](https://github.com/AdamZikmund/strapi-provider-upload-digitalocean) for Digital Ocean spaces.

This provider will upload to the space using the AWS S3 API.

## Parameters
- **key** : [Space access key](https://cloud.digitalocean.com/account/api/tokens)
- **secret** : [Space access secret](https://cloud.digitalocean.com/account/api/tokens)
- **endpoint** : Base URL of the space (e.g. `fra.digitaloceanspaces.com`)
- **space** : Name of the space in the Digital Ocean panel.
- **directory** : Name of the sub-directory you want to store your files in. (Optionnal - e.g. `/example`)
- **cdn** : CDN Endpoint - URL of the cdn of the space (Optionnal - e.g. `cdn.example.com`)

## How to use

1. Install this package

```bash
npm i strapi-provider-upload-do
```
```bash
yarn add strapi-provider-upload-do
```
```bash
pnpm add strapi-provider-upload-do
```

2. Create or update config in `./config/plugins.js` with content

```js
module.exports = ({env}) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-do", 
      providerOptions: {
        key: env('DO_SPACE_ACCESS_KEY'),
        secret: env('DO_SPACE_SECRET_KEY'),
        endpoint: env('DO_SPACE_ENDPOINT'),
        space: env('DO_SPACE_BUCKET'),
        directory: env('DO_SPACE_DIRECTORY'),
        cdn: env('DO_SPACE_CDN'),
      }
    },
  }, 
  // ...
})

```

3. Create `.env` and add provide Digital Ocean config.

```bash
DO_SPACE_ACCESS_KEY=
DO_SPACE_SECRET_KEY=
DO_SPACE_ENDPOINT=
DO_SPACE_BUCKET=
DO_SPACE_DIRECTORY=
DO_SPACE_CDN=
```

with values obtained from tutorial:

> https://www.digitalocean.com/community/tutorials/how-to-create-a-digitalocean-space-and-api-key

Parameter `DO_SPACE_DIRECTORY` and `DO_SPACE_CDN` is optional and you can ommit them both in `.env` and `settings`.

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Strapi docs about upload](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#configuration)

## Contributors
<a href="https://github.com/AdamZikmund"><img src="https://avatars.githubusercontent.com/u/4062779?v=3" title="AdamZikmund" width="80" height="80"></a>
<a href="https://github.com/gustawdaniel"><img src="https://avatars.githubusercontent.com/u/16663028?v=3" title="gustawdaniel" width="80" height="80"></a>
<a href="https://github.com/latenssi"><img src="https://avatars.githubusercontent.com/u/1526792?v=4" title="latenssi" width="80" height="80"></a>
<a href="https://github.com/malithmcr"><img src="https://avatars.githubusercontent.com/u/4549859?v=4" title="malithmcr" width="80" height="80"></a>
<a href="https://github.com/tommasongr"><img src="https://avatars.githubusercontent.com/u/25225746?v=4" title="tommasongr" width="80" height="80"></a>
<a href="https://github.com/maxep"><img src="https://avatars.githubusercontent.com/u/6815992?v=4" title="maxep" width="80" height="80"></a>
<a href="https://github.com/anwarpro"><img src="https://avatars.githubusercontent.com/u/47409922?v=4" title="maxep" width="80" height="80"></a>
