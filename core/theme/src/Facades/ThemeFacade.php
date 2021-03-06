<?php

namespace Botble\Theme\Facades;

use Botble\Theme\Theme;
use Illuminate\Support\Facades\Facade;

class ThemeFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     * @author Dung Thinh
     */
    protected static function getFacadeAccessor()
    {
        return Theme::class;
    }
}
