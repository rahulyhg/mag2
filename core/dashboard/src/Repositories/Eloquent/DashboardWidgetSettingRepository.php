<?php

namespace Botble\Dashboard\Repositories\Eloquent;

use Auth;
use Botble\Dashboard\Repositories\Interfaces\DashboardWidgetSettingInterface;
use Botble\Support\Repositories\Eloquent\RepositoriesAbstract;

class DashboardWidgetSettingRepository extends RepositoriesAbstract implements DashboardWidgetSettingInterface
{
    /**
     * @return mixed
     * @author Dung Thinh
     * @since 2.1
     */
    public function getListWidget()
    {
        $data = $this->model
            ->select([
                'id',
                'order',
                'settings',
                'widget_id',
            ])
            ->with('widget')
            ->orderBy('order')
            ->where('user_id', '=', Auth::user()->getKey())
            ->get();
        $this->resetModel();
        return $data;
    }
}
