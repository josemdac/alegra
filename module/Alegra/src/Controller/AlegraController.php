<?php

namespace Alegra\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Alegra\Model\Alegra;

class AlegraController extends AbstractActionController
{
	public 	$model;
	
	public function __construct()
	  {
		$this->model = new Alegra();
	  }
   
    
    public function indexAction()
    {
	
	$this->model->listAll();
	return new ViewModel(['data_list' => $this->model->listItemsData ]);
    }

    public function editAction()
    {
	$this->model->contact_id = $_GET['id'];
	$this->model->getContactData();
    return new ViewModel(['data' => $this->model->contactData]);
    }

    public function addAction()
    {
	
    return new ViewModel();	
		
    }
    public function storeAction()
    {
			$this->model->contact_id = $_GET['id'];
			if(isset($_GET['id']))
			{
				$this->model->method = 'PUT';
				
			}else{
				$this->model->method = 'POST';
				}
				
			$this->model->set('data', base64_decode($_GET['data']));
			$result = $this->model->store();
					
			return new ViewModel(['result' => $result]);
    }
    public function deleteAction()
    {
			$this->model->contact_id = $_GET['id'];
				
			$this->model->data = base64_decode($_GET['data']);
			$return = $this->model->delete();

			return new ViewModel(['return' => $return]);
    }
}
