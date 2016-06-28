'use strict';

var GulpConfig = (function () {

    function GulpConfig() {

        var historyApiFallback = require('connect-history-api-fallback');
        var proxyMiddleware = require('http-proxy-middleware');
        var proxyURL = 'http://localhost:3002';

        this.build = {
            path: './target/',
            assetPath: './target/assets/fonts',
            fonts: './target/fonts',
            styles: './target/styles/',
            vendor: './target/lib/',
            assets: {
                lib: {
                    js: 'lib.js',
                    css: 'lib.css'
                }
            }
        };

        this.bootstrapSass = {
            in: './node_modules/bootstrap-sass'
        };

        this.fonts = {
            in: ['src/assets/fonts/*.*', this.bootstrapSass.in + 'assets/fonts/**/*'],
            out: this.build.fonts
        };

        this.sass = {
            in: 'src/styles/main.scss',
            out: this.build.styles,
            watch: 'src/styles/**/*',
            sassOpts: {
                outputStyle: 'compressed',
                precision: 3,
                errLogToConsole: true,
                includePaths: [this.bootstrapSass.in + '/assets/stylesheets/']
            }
        };

        this.browserSync = {
            dev: {
                injectChanges: true,
                port: 3000,
                open: false,
                reloadOnRestart: true,
                server: {
                    baseDir: this.build.path
                },
                middleware: [
                    proxyMiddleware('/api', {target: proxyURL}),
                    historyApiFallback()
                ]
            }
        };

        this.systemJs = {
            builder: {
                normalize: true,
                minify: true,
                mangle: true,
                globalDefs: {DEBUG: false}
            }
        };

    }

    return GulpConfig;

})();

module.exports = GulpConfig;
