<?php namespace Panneau\Tags\Fields;

use Panneau\Support\Field;

class Tags extends Field
{
    protected $attributes = array(
        'type' => 'tags'
    );
    
    protected $relation = 'tags';
    
    protected function getValueFromModel($model)
    {
        $tags = [];
        foreach($model->tags as $tag)
        {
            $tags[] = $tag->name;
        }
        return $tags;
    }
    
    protected function saveValueToModel($model, $data, $pivotData = array())
    {
        if(!$data)
        {
            $model->untag();
        }
        else
        {
            $model->retag($data);
        }
        
    }
}
