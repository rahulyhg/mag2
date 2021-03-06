<?php

namespace Botble\Theme\Providers;

use Botble\Theme\Commands\ThemeInstallSampleDataCommand;
use Botble\Base\Events\SessionStarted;
use Botble\Base\Supports\Helper;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Theme\Commands\ThemeActivateCommand;
use Botble\Theme\Commands\ThemeCreateCommand;
use Botble\Theme\Commands\ThemeRemoveCommand;
use Botble\Theme\Contracts\Theme as ThemeContract;
use Botble\Theme\Facades\ManagerFacade;
use Botble\Theme\Facades\ThemeFacade;
use Botble\Theme\Facades\ThemeOptionFacade;
use Botble\Theme\Theme;
use Event;
use File;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Schema;

class ThemeServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;

    /**
     * @author Dung Thinh
     */
    public function register()
    {
        AliasLoader::getInstance()->alias('Theme', ThemeFacade::class);
        AliasLoader::getInstance()->alias('ThemeOption', ThemeOptionFacade::class);
        AliasLoader::getInstance()->alias('ThemeManager', ManagerFacade::class);

        $this->app->bind(ThemeContract::class, Theme::class);

        if ($this->app->runningInConsole()) {
            $this->commands([
                ThemeCreateCommand::class,
            ]);
        }

        $this->commands([
            ThemeActivateCommand::class,
            ThemeRemoveCommand::class,
            ThemeInstallSampleDataCommand::class,
        ]);

        Helper::autoload(__DIR__ . '/../../helpers');
    }

    /**
     * @author Dung Thinh
     */
    public function boot()
    {
        $this->setIsInConsole($this->app->runningInConsole())
            ->setNamespace('core/theme')
            ->loadAndPublishConfigurations(['general', 'permissions'])
            ->loadRoutes()
            ->loadAndPublishViews()
            ->loadAndPublishTranslations()
            ->publishAssetsFolder()
            ->publishPublicFolder();

        $this->app->register(HookServiceProvider::class);

        Event::listen(SessionStarted::class, function () {
            dashboard_menu()
                ->registerItem([
                    'id' => 'cms-core-theme',
                    'priority' => 1,
                    'parent_id' => 'cms-core-appearance',
                    'name' => trans('core.base::layouts.theme'),
                    'icon' => null,
                    'url' => route('theme.list'),
                    'permissions' => ['theme.list'],
                ])
                ->registerItem([
                    'id' => 'cms-core-theme-option',
                    'priority' => 4,
                    'parent_id' => 'cms-core-appearance',
                    'name' => trans('core.theme::theme.theme_options'),
                    'icon' => null,
                    'url' => route('theme.options'),
                    'permissions' => ['theme.options'],
                ])
                ->registerItem([
                    'id' => 'cms-core-appearance-custom-css',
                    'priority' => 5,
                    'parent_id' => 'cms-core-appearance',
                    'name' => trans('core.theme::theme.custom_css'),
                    'icon' => null,
                    'url' => route('theme.custom-css'),
                    'permissions' => ['theme.custom-css'],
                ]);

            admin_bar()->registerLink('Theme', route('theme.list'), 'appearance');
        });

        $this->app->booted(function () {
            $file = public_path('themes/' . setting('theme') . '/assets/css/style.integration.css');
            if (File::exists($file)) {
                ThemeFacade::getFacadeRoot()
                    ->asset()
                    ->container('after_header')
                    ->add('theme-style-integration-css', 'themes/' . setting('theme') . '/assets/css/style.integration.css');
            }

            if (check_database_connection() && Schema::hasTable('settings')) {
                $theme = setting('theme');
                if (!$theme) {
                    setting()->set('theme', array_first(scan_folder(public_path('themes'))));
                }
            }
        });

        $this->app->register(ThemeManagementServiceProvider::class);
    }
}
