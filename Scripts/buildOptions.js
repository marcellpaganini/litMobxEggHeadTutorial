module.exports = {
    entryPoints: [
        './src/WishListView.ts',
        './src/WishListItemView.ts',
    ],
    bundle: true,
    sourcemap: true,
    outdir: '../js',
    outbase: 'src',
    logLevel: 'debug'
};