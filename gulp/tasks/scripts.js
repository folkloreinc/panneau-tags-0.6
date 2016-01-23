'use strict';

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

module.exports = function(gulp, config)
{
    return function() {
        return gulp.src(config.jsTmpPath+'/**/*.js')
                .pipe(uglify({
                    
                }))
                .pipe(gulp.dest(config.jsBuildPath));
    };
};
