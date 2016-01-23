<?php namespace Panneau\Tags;

use Panneau\Http\Controllers\ResourceController;

class TagsController extends ResourceController
{
    protected $resource = 'pages';
    protected $forms = array(
        'create' => 'page',
        'edit' => 'page'
    );
    protected $itemsLists = array(
        'index' => 'pages'
    );
    
    protected function getItem($id)
    {
        try
        {
            $item = $this->resource->find($id);
            $item->load('parent');
            return $item;
        }
        catch(ResourceNotFoundException $e)
        {
            throw new NotFoundHttpException('Resource not found.');
        }
    }
}
