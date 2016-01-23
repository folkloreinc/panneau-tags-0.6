'use strict';

var path = require('path');
var webpack = require('webpack-stream');

module.exports = function(gulp, config)
{
    var configPath = path.resolve(path.join(config.jsSrcPath, 'webpack.config'));
    var defaultConfig = require(configPath)(config);
    if(process.env.NODE_ENV !== 'production')
    {
        defaultConfig.devtool = 'source-map';
        defaultConfig.debug = true;
    }
    
    return function()
    {
        return gulp.src(config.jsSrcPath+'/main.js')
                    .pipe(webpack(defaultConfig))
                    .pipe(gulp.dest(config.jsTmpPath));
    };
};
