'use strict';

module.exports = function(gulp, config)
{
    return function()
    {
        return gulp.src(config.copySrcPath, {
                        base: config.copyBasePath
                    })
                    .pipe(gulp.dest(config.copyBuildPath));
    };
};
