<?php namespace Panneau\Tags;

use Panneau\Panneau;
use Panneau\Support\ServiceProvider;

class TagsServiceProvider extends ServiceProvider
{
    protected $resources = array(
        'tags' => \Panneau\Tags\TagsResource::class
    );
    
    protected $fields = array(
        'tags' => \Panneau\Tags\Fields\Tags::class
    );
    
    protected $itemsLists = array(
        'tags' => \Panneau\Tags\Lists\TagsList::class
    );
    
    protected $assets = array(
        'tags_vendors_js' => 'vendor/panneau-tags/js/vendors.js',
        'tags_js' => [
            'src' => 'vendor/panneau-tags/js/tags.js',
            'dependencies' => ['tags_vendors_js']
        ],
        'tags_css' => 'vendor/panneau-tags/css/tags.css'
    );
    
    protected $resourcesControllers = array(
        'tags' => '\Panneau\Tags\TagsController'
    );
    
    public function boot()
    {
        parent::boot();
        
        $migrationsPath = __DIR__.'/../../migrations/';
        $translationsPath = __DIR__.'/../../resources/lang/';
        $assetsPath = __DIR__.'/../../resources/assets/build/';
        $configPath = __DIR__.'/../../config';
        
        $this->loadTranslationsFrom($translationsPath, 'panneau-tags');
        
        $this->mergeConfigFrom($configPath.'/tags.php', 'panneau.tags');
        
        $this->publishes([
            $assetsPath => public_path('vendor/panneau-tags')
        ], 'assets');
        
        $this->publishes([
            $configPath.'/tags.php' => config_path('panneau/tags.php'),
            $configPath.'/tagging.php' => config_path('tagging.php'),
        ], 'config');
    }
    
    public function register()
    {
        parent::register();
        
        $this->registerMacro();
    }
    
    protected function registerMacro()
    {
        $app = $this->app;
        $panneau = $app['panneau'];
        Panneau::macro('tags', function($query, $tag = null, $resultsPerTag = 15) use ($app)
        {
            $resource = $this->resource('tags');
            
            return $resource->get($query, $tag, $resultsPerTag);
        });
    }
}
