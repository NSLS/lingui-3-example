# Lingui v3 test integration

To run the project:

`npm i`
`npm run dev`

Current issues:

1. fs-extra has to be installed manually. Without it - extract script fails
2. I18nProvider does not render any content on mount. To force the content to show you have to trigger a hot reload.
3. Providing an ID to `t` macro such as `t('id')'message'` leads to an error
4. No localization seems to be applied to the macro
