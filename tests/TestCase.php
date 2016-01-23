<?php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Orchestra\Testbench\TestCase as BaseTestCase;

class TestCase extends BaseTestCase {

    public function setUp()
    {
        parent::setUp();
        
        
    }

    protected function getPackageProviders($app)
    {
        return array('Panneau\Bubbles\BubblesServiceProvider');
    }

    protected function getPackageAliases($app)
    {
        return array(
            
        );
    }
}
