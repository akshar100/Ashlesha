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
	
	function is_authenticated()
	{
		$user = $this->get_current();
		if(!empty($user))
		{
			return true;
		}
		return false;
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
		
		$user = $this->ci->dba->get($user_id);
		if(!empty($user['roles']))
		{
			$this->ci->session->set_userdata('user_roles',$user['roles']);
		}
		else
		{
			$this->ci->session->set_userdata('user_roles','user');
		}
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
	
	function has_role($role)
	{
		$roles = $this->ci->session->userdata('user_roles');
		if(!empty($roles))
		{
			$roles = explode("|",$this->ci->session->userdata('user_roles'));
			if(in_array($role,$roles))
			{
				return true;
			}
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
	
	function generate_otp($user_id)
	{
		$user = $this->get_user($user_id);
		$user['otp'] = sha1(crypt(md5(rand().$user_id)));
		$this->ci->dba->update($user);
		return $user['otp'];
	}
	
	
	function get_by_otp($otp)
	{
		return $this->ci->dba->get_user_by_otp($otp); 
	}
	
	function destroy_otp($user)
	{
		$user= $this->get_user($user);
		$user['otp']='';
		$this->ci->dba->update($user);
	}
	
	function invite_user($email,$message='')
	{
		
		$text  = $this->ci->load->view('email/site_invitation',array(
			"url"=>base_url(),
			"message"=>$message
		),true);
		$this->ci->dba->create(array(
			"type"=>"invitation",
			"email"=>$email,
			"message"=>$message
		));
		$this->send_email($email,'Invitation' , $text);
	}
	
	function invite_to_group($email,$group,$source_id=null,$existing_user=false)
	{
		
		$source = $this->ci->dba->get($source_id);
		$text  = $this->ci->load->view('email/group_invitation',array(
			"url"=>base_url()."group/".md5($group['title'])."/".$group['_id'],
			"user"=>$source['fullname'],
			"title"=>$group['title'],
			"existing"=>$existing_user
		),true);
		
		$this->send_email($email,$source['fullname']." has invited you to join ".$group['title'], $text);
	}
	
	function send_email($to,$subject,$text)
	{
		$this->ci->load->library('email');
		$this->ci->email->from($this->ci->config->item('from_email'),$this->ci->config->item('from_name'));
		$this->ci->email->to($to);
		$this->ci->email->subject($subject);
		$this->ci->email->message($text);		
		$this->ci->email->send();
		
		//echo $this->ci->email->print_debugger();
	}
	
	/***
	 * This is one of the worst code i have ever written I myself dont understand.
	 * This needs to be cleaned up.
	 */
	function notify($post)
	{
		$source_user = $this->ci->dba->get($post['source_user']);
		$target_user = $this->ci->dba->get($post['target_user']);
		
		
		if(!empty($post['linked_resource']))
		{
			$group = $this->ci->dba->get($post['linked_resource']);
			if(isset($post['secondary_resource']))
			{
				$secondary = $this->ci->dba->get($post['secondary_resource']);
			}
			else
			{
				$secondary = "";
			}
			$text  = $this->ci->load->view('email/'.$post['notification_action'],array(
				"source_user"=>$source_user['fullname'],
				"target_user"=>$target_user['fullname'],
				"resource"=>$group,
				"secondary"=>$secondary
			),true);
			if(!empty($text))
			{
				if($post['notification_action']=="comment_thread")
				{
					$this->send_email($target_user['email'], "Notification: ".$source_user['fullname']." has commented on your thread", $text);
					
				}
				else
				{
					$this->send_email($target_user['email'], "Notification: ".$source_user['fullname']." has posted in ".$group['title'], $text);
				}
				
			}
		}
		else
		{
			$text  = $this->ci->load->view('email/'.$post['notification_action'],array(
				"user"=>$source_user['fullname'],
				"target_user"=>$target_user['fullname'],
				"url"=>base_url()
			),true);
			if(!empty($text))
			{
				$this->send_email($target_user['email'], "Notification: ".$source_user['fullname'],$text);
				
			}
		}
		
	}
	
	function run_signup_errands($id)
	{
		$user = $this->ci->dba->get($id);
		$groups = $this->ci->dba->getview('get_groups_by_allowed_emails',array(
					"key"=>$user['email']
		));
		if(is_array($groups))
		{
			foreach($groups as $row)
			{
				$row['relations'][$id] = 'member';
				$this->ci->dba->update($row);
			}
		}
	}
}
