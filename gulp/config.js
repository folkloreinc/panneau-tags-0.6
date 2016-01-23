'use strict';

module.exports = function(gulp, plugins)
{
    
    var assetsSrcFolder = './src/resources/assets/src';
    var assetsTmpPath = './.tmp/vendor/panneau-tags';
    var assetsBuildFolder = './src/resources/assets/build';
    var bowerPath = './bower_components';
    var publicPath = './public';
    
    var httpAssetsPath = '/';
    var httpJsPath = '/vendor/panneau-tags/js/';
    var httpBowerPath = '/bower_components';
    
    var copySrcPath = [
        
    ];
    var copyBasePath = assetsSrcFolder;
    var copyBuildPath = assetsBuildFolder;

    // Configurable paths
    return {
        
        //Javascript (Webpack)
        jsSrcPath: assetsSrcFolder+'/js',
        jsTmpPath: assetsTmpPath+'/js',
        jsBuildPath: assetsBuildFolder+'/js',
        
        //Sass
        sassSrcPath: assetsSrcFolder+'/scss',
        sassTmpPath: assetsTmpPath+'/css',
        sassBuildPath: assetsBuildFolder+'/css',
        
        //Images
        imgSrcPath: assetsSrcFolder+'/img',
        imgBuildPath: assetsBuildFolder+'/img',
        
        //Copy
        copySrcPath: copySrcPath,
        copyBasePath: copyBasePath,
        copyBuildPath: copyBuildPath,
        
        //Fonts
        fontsPath: assetsBuildFolder+'/fonts',
        
        //Bower
        bowerPath: bowerPath,
        
        //Http
        httpAssetsPath: httpAssetsPath,
        httpJsPath: httpJsPath,
        httpBowerPath: httpBowerPath,
        
        //Assets path
        assetsTmpPath: assetsTmpPath,
        assetsSrcPath: assetsSrcFolder,
        assetsBuildPath: assetsBuildFolder
    };
    
};
