<?php namespace Panneau\Tags;

use Illuminate\Support\Fluent;
use Illuminate\Support\Str;

use Panneau\Support\EloquentResource;
use DB;

class TagsResource extends EloquentResource
{
    protected $modelName = \Panneau\Tags\Models\Tag::class;
    
    protected function buildQuery($query, $params)
    {
        
    }
    
    protected function scopeSearch($query, $search)
    {
        $query->where('slug', 'LIKE', '%'.Str::slug($search).'%');
    }
}
