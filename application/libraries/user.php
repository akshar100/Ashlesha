<?php
class User
{
	private $ci; 
	function __construct()
	{
		$this->ci = &get_instance();
		$this->ci->load->library("dba");
	}
	
	function get_current()
	{
		return $this->ci->session->userdata("user_id");
	}
	
	function get_user($id=null,$password=false)
	{
		if(empty($id)){ $id = $this->get_current(); }
		$user = $this->ci->chill->get($id);
		if(!$password)
		{
			unset($user['password']);
		}
		
		return $user;
	}
	
	function get_username($id=null)
	{
		if(empty($id)){ $id = $this->get_current(); }
		$user = $this->get_user($id);
		return $user['username']; 
	}
	
	function get_email($id=null)
	{
		
		if(empty($id)){ $id = $this->get_current(); }		
		$user = $this->ci->chill->get($id);
		return $user['email'];
	}
	
	function get_by_username($username)
	{
		$user = $this->ci->dba->get_user_by_username($username);
		if(empty($user))
		{
			return false;
		}
		return $user;
	}
	
	function get_by_username_or_email($username)
	{
		$user = $this->ci->dba->get_user_by_username_or_email($username);
		if(empty($user))
		{
			return false;
		}
		return $user;
	}
	
	function get_by_email($email)
	{
		$user = $this->ci->dba->get_user_by_email($email);
		if(empty($user))
		{
			return false;
		}
		return $user;
	}
	
	function force_sign_in($user_id)
	{
		
		$this->ci->session->set_userdata("user_id",$user_id);
		
		
	}
	
	function is_facebooked()
	{
		$this->ci->load->library('facebook');
		$user = $this->ci->facebook->getUser();
		if(!empty($user))
		{
			return true;
		}
		return false;
	}
	
	
	
	function force_logout()
	{
		$this->ci->session->set_userdata("user_id","");
		$this->ci->session->sess_destroy();
				// unset cookies
		if (isset($_SERVER['HTTP_COOKIE'])) {
		    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
		    foreach($cookies as $cookie) {
		        $parts = explode('=', $cookie);
		        $name = trim($parts[0]);
		        setcookie($name, '', time()-1000);
		        setcookie($name, '', time()-1000, '/');
		    }
		}
				
		$this->ci->load->library('facebook');
		$user = $this->ci->facebook->getUser();
		if(!empty($user))
		{
			$params = array( 'next' => base_url() );
			$url = $this->ci->facebook->getLogoutUrl($params); // $params is optional. 
			
			header("Location: ".$url."&rand=".rand(0,1000));
			exit;
		}
		
		
	}

}
