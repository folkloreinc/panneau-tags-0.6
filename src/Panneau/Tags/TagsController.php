<?php namespace Panneau\Tags;

use Panneau\Http\Controllers\ResourceController;

class TagsController extends ResourceController
{
    protected $resource = 'tags';
    protected $forms = array(
        'create' => 'tag',
        'edit' => 'tag'
    );
    protected $itemsLists = array(
        'index' => 'tags'
    );
    
    protected function getItem($id)
    {
        try
        {
            $item = $this->resource->find($id);
            return $item;
        }
        catch(ResourceNotFoundException $e)
        {
            throw new NotFoundHttpException('Resource not found.');
        }
    }
}
