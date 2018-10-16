<?php

namespace Botble\Menu\Models;

use DB;
use Eloquent;
use Route;
use stdClass;

class MenuNode extends Eloquent
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'menu_nodes';

    /**
     * @return mixed
     * @author Dung Thinh
     */
    public function parent()
    {
        return $this->belongsTo(MenuNode::class, 'parent_id');
    }

    /**
     * @return mixed
     * @author Dung Thinh
     */
    public function child()
    {
        return $this->hasMany(MenuNode::class, 'parent_id');
    }

    /**
     * @return mixed
     * @author Dung Thinh
     */
    public function getRelated()
    {
        $item = new stdClass;
        $item->name = $this->title;
        $item->url = $this->url ? url($this->url) : route('public.index');

        if ($this->type != 'custom-link') {
            if ($this->key != null) {
                $item->url = route('public.single', $this->key);
            } elseif (array_has(\Menu::getRelatedRouteNames(), $this->type)) {
                $related = array_get(\Menu::getRelatedRouteNames(), $this->type);
                if (Route::has($related['route'])) {
                    $related_item = DB::table($related['table'])->find($this->related_id);
                    if ($related_item && property_exists($related_item, 'slug')) {
                        $item->url = route($related['route'], $related_item->slug);
                    }
                }
            }
        }

        return $item;
    }

    /**
     * @return bool
     * @author Dung Thinh
     */
    public function hasChild()
    {
        return $this->has_child == 1;
    }
}
