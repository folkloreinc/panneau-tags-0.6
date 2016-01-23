<?php namespace Panneau\Tags;

use Illuminate\Support\Fluent;

use Panneau\Support\EloquentResource;
use DB;

class TagsResource extends EloquentResource
{
    protected $modelName = \Panneau\Tags\Models\Tag::class;
    
    protected function buildQuery($query, $params)
    {
        
    }
}
