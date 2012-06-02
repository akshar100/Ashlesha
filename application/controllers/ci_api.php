<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CI_Api extends CI_Controller {
	
	function __construct(){
		
		parent::__construct();
		$rc = new ReflectionClass(get_class($this));
		$module = strtolower($this->uri->segment(2));
		$method = strtolower($this->uri->segment(3));
		if(!$rc->hasMethod($method))
		{
			
			echo json_encode($this->_error_message_no_call($module,$method));
			exit;
		}
		else
		{
			$rights = array("api.index","oauth.request_token");
			$overrides = array();
			$permission = FALSE;
			if(!in_array($module.".".$method,$rights) && !in_array($module.".*",$rights) && !in_array("*.*",$rights))
			{
				foreach($overrides as $override){
					$m = "__".$override."_override";
					$request = array(
						"module"=>$module,
						"method"=>$method,
						"data"=>$this->input->post()
					);
					if($rc->hasMethod($m) and $this->$m($module,$method,$this->input->post())){
						$permission = TRUE;
						break;
					}
				}
			}
			else
			{
				$permission = TRUE;
			}
		}
		
		if(!$permission)
		{
			echo json_encode($this->error_message_no_permission($module,$method));
			exit;
		}
	}
	
	
	
	/*** Private Methods ***/
	
	/**
	 * Error function for invalid api calls
	 */
	function _error_message_no_call($module="",$method="")
	{
		return $this->__gen_error(0,$module,$method,"Invalid API call.");
	}
	
	function _error_message_no_permission($module="",$method="")
	{
		return $this->__gen_error(0,$module,$method,"User doesnt have permission to access this resource.");
	}
	
	function __gen_error($code,$module,$method,$message)
	{
		return array(
			"success"=>false,
			"value"=>false,
			"error"=>array(
				"code"=>$code,
				"message"=>$message,
				"module"=>$module,
				"method"=>$method
			)
		);
	}
	
	
	
	
	
	/** Overrides **/
	function __owner_override($request)
	{
		
	}
	
	function __member_override($request)
	{
		
	}
	
}