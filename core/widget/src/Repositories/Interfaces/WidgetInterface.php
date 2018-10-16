<?php

namespace Botble\Widget\Repositories\Interfaces;

use Botble\Support\Repositories\Interfaces\RepositoryInterface;

interface WidgetInterface extends RepositoryInterface
{
    /**
     * Get all theme widgets
     * @param string $theme
     * @return mixed
     * @author Dung Thinh
     */
    public function getByTheme($theme);
}
