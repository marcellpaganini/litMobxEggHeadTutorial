const esbuild = require('esbuild');
const buildOptions = require('./buildOptions');

esbuild.build({
    ...buildOptions,
    watch: true
})
    .catch(() => process.exit(1));