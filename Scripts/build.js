const esbuild = require('esbuild');
const buildOptions = require('./buildOptions');

esbuild.build(buildOptions)
    .catch(() => process.exit(1));