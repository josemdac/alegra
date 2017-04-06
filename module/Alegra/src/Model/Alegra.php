<?php
namespace Alegra\Model;
use Zend\Http\Client;
use Zend\Http\Request;
use Zend\Http\Headers;

class Alegra
{
  public $id;
  public $artist;
  public $title;
  public $userid;
  public $access_token;
  public $listItemsData;
  public $contact_id;
  public $contactData;
  public $data;
  public $result;
  public $method;
  public $start;
  public $limit;
  

  public function __construct()
  {
  	$this->userid = "jmdearmasc@gmail.com";
  	$this->access_token = "3a600d8df9f3e3b53694";
  }

  public function getContactData()
  {
	$user= 'Basic '.base64_encode($this->userid.":".$this->access_token);
 
  	$request = new Request();
	$request->setUri('https://app.alegra.com/api/v1/contacts/'.$this->contact_id);
	$request->getHeaders()->addHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate" ));	
	$client = new Client();
	//$client->setHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate" ));
  	
  	
  	$client->setRequest($request);
	$response = $client->send();
	
	//echo $data;
	$this->contactData = $response->getBody();
		
  }
  public function listAll()
   {	
		$total = $this->_length();
		$count = 0;
		$data = array();
		while($total>0){
			$user= 'Basic '.base64_encode($this->userid.":".$this->access_token);
		 
			$request = new Request();
			$request->setUri('https://app.alegra.com/api/v1/contacts/?start='.$count);
			$request->getHeaders()->addHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate" ));	
			$client = new Client();
			//$client->setHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate" ));
			
			
			$client->setRequest($request);
			$response = $client->send();
			
			//echo $data;
			$data = array_merge($data, json_decode($response->getBody(), true));
			$this->listItemsData = json_encode($data);
			$total = $total - 30;
			$count = $count +  30;
			}
			//var_dump($data);
		return;
		}

   private function _length()
   {
	   $user= 'Basic '.base64_encode($this->userid.":".$this->access_token);
	   $api_request_url = 'https://app.alegra.com/api/v1/contacts/?metadata=true';
	   $ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->method);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: '.$user, 'accept-encoding: gzip, deflate' ));
		curl_setopt($ch, CURLOPT_URL, $api_request_url);
		curl_setopt($ch, CURLOPT_HEADER, TRUE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$api_response = curl_exec($ch);
		$api_response_info = curl_getinfo($ch);
		curl_close($ch);
		$api_response_header = trim(substr($api_response, 0, $api_response_info['header_size']));
		$api_response_body = substr($api_response, $api_response_info['header_size']);
		$data = json_decode($api_response_body, true);
		return (int)$data["metadata"]["total"];
	   
	   }
   public function store()
   {
	   if($this->contact_id){
		   $method = 'PUT';
		   }else{
		   $method = 'POST';
			   }
	   $user= 'Basic '.base64_encode($this->userid.":".$this->access_token);
 
		$request = new Request();
		$request->setUri('https://app.alegra.com/api/v1/contacts/'.$this->contact_id);
		$request->getHeaders()->addHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate"));	
		$api_request_url = 'https://app.alegra.com/api/v1/contacts/'.$this->contact_id;
		$params = json_decode($this->data); 
	
		//echo json_encode($params);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->method);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: '.$user, 'accept-encoding: gzip, deflate' ));
		curl_setopt($ch, CURLOPT_URL, $api_request_url);
		curl_setopt($ch, CURLOPT_HEADER, TRUE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$api_response = curl_exec($ch);
		$api_response_info = curl_getinfo($ch);
		curl_close($ch);
		$api_response_header = trim(substr($api_response, 0, $api_response_info['header_size']));
		$api_response_body = substr($api_response, $api_response_info['header_size']);
		
		return json_decode($api_response_body, true);
	   }
   public function set($var_,$value)
   {
	   $this->$var_ = $value;
	   return;
	   
	   }   
   public function delete()
   {
		$this->contact_id = $_GET['id'];
		$user= 'Basic '.base64_encode($this->userid.":".$this->access_token);
 
		$request = new Request();
		$request->setUri('https://app.alegra.com/api/v1/contacts/'.$this->contact_id);
		$request->getHeaders()->addHeaders(array( "Accept"=> "*/*", "Authorization"=> $user, 'accept_encoding'=>"gzip, deflate"));	
		$api_request_url = 'https://app.alegra.com/api/v1/contacts/'.$this->contact_id;
		//$params = array();
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
		curl_setopt($ch, CURLOPT_POSTFIELDS, '{}');
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: '.$user, 'accept-encoding: gzip, deflate', 'content-length: 2' ));
		curl_setopt($ch, CURLOPT_URL, $api_request_url);
		curl_setopt($ch, CURLOPT_HEADER, TRUE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$api_response = curl_exec($ch);
		$api_response_info = curl_getinfo($ch);
		curl_close($ch);
		$api_response_header = trim(substr($api_response, 0, $api_response_info['header_size']));
		$api_response_body = substr($api_response, $api_response_info['header_size']);
		return json_decode($api_response_body);
	   
	   }
}
