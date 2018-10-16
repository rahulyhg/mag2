<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2c86e893581d7e59c002b162f8a1ec8f
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Theme\\Dungthinh\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Theme\\Dungthinh\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2c86e893581d7e59c002b162f8a1ec8f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2c86e893581d7e59c002b162f8a1ec8f::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}