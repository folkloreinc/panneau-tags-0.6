<?php namespace Panneau\Tags\Lists;

use Panneau\Support\ItemsTable;

class TagsList extends ItemsTable
{
    protected $attributes = [
        'type' => 'tags',
        'name' => 'tags'
    ];
    
    public function columns()
    {
        $buttons = $this->getButtons();
        
        return array(
            array(
                'name' => 'id',
                'label' => 'ID',
                'width' => 50,
                'value' => 'id'
            ),
            array(
                'name' => 'title',
                'label' => 'Titre',
                'value' => 'snippet.title'
            ),
            array(
                'name' => 'buttons',
                'width' => 200,
                'className' => 'btn-group btn-group-sm',
                'buttons' => $buttons
            )
        );
    }
    
    protected function getButtons()
    {
        return [
            [
                'type' => 'link',
                'href' => ':snippet.link',
                'label' => 'Voir'
            ],
            [
                'type' => 'link',
                'href' => route('panneau.tags.edit', array(':id')),
                'label' => 'Modifier'
            ],
            [
                'type' => 'link',
                'href' => route('panneau.tags.destroy', array(':id')),
                'label' => 'Supprimer'
            ]
        ];
    }
    
    /**
     * Get the current list items
     *
     * @return Model
     */
    public function getItems()
    {
        $items = $this->items->toArray();
        $newItems = [];
        foreach($items as $item)
        {
            $newItem = $item;
            array_set($newItem, 'fields', null);
            $newItems[] = $newItem;
        }
        return $newItems;
    }
}
