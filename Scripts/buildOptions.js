module.exports = {
    entryPoints: [
        './src/*',
    ],
    bundle: true,
    sourcemap: true,
    outdir: '../wwwroot/js',
    outbase: 'src',
    logLevel: 'debug'
};