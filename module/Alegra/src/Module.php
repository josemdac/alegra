<?php

namespace Alegra;

use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
    
    public function getServiceConfig()
    {
        return [
            'factories' => [
               /* Model\AlbumTable::class => function($container) {
                    $tableGateway = $container->get(Model\AlbumTableGateway::class);
                    return new Model\AlbumTable($tableGateway);
                }/*,
                Model\Album::class => function ($container) 
                    $model = $container->get(Model\Album::class);
                    return new Model\Album();
                },*/
            ],
        ];
    }
    
 public function getControllerConfig()
    {
        return [
            'factories' => [
                Controller\AlegraController::class => function($container) {
                    return new Controller\AlegraController($container->get(Model\Alegra::class));
                },
            ],
        ];
    }

}
