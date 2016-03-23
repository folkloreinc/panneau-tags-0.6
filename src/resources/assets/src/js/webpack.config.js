'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(config)
{

    var contextPath = path.resolve(config.jsSrcPath);
    var outputPath = path.resolve(config.jsTmpPath);
    var publicPath = config.httpJsPath;

    return {

            context: contextPath,

            entry: {
                'tags': [
                    './index'
                ],
                'vendors': [
                    'typeahead.js',
                    'bootstrap-tokenfield'
                ]
            },

            output: {
                path: outputPath,
                publicPath: publicPath,
                filename: '[name].js',
                chunkFilename: '[name].chunk.js',
                jsonpFunction: 'paTaWpckJsonp_'+(new Date()).getTime()
            },

            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendors',
                    filename: 'vendors.js'
                })
            ],

            module: {
                noParse: [
                    
                ],
                preLoaders: [
                    
                ],
                loaders: [
                    {
                        test: /\.(jsx|js)$/,
                        exclude: /(node_modules|bower_components|\.tmp)/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                    
                ],
                postLoaders: [
                    
                ]
            },
            
            externals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
                'immutable': 'Immutable',
                'jquery': 'jQuery',
                'gsap': 'TweenMax',
                'lodash': '_',
                'bootstrap-sass': 'jQuery.fn.bootstrap',
                'panneau': 'Panneau',
                'superagent': 'Superagent',
                'promise': 'Promise',
                'superagent-promise': 'SuperagentPromise'
            },

            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                    underscore: 'lodash',
                    'superagent': 'Superagent'
                },
                modulesDirectories: [
                    './node_modules',
                    './web_modules',
                    './bower_components',
                    contextPath+'/vendors'
                ]
            },

            stats: {
                colors: true,
                modules: true,
                reasons: true
            },

            storeStatsTo: 'webpack',

            progress: true,

            failOnError: false,

            cache: true,
            watch: false,
            keepAlive: false
    };
};
