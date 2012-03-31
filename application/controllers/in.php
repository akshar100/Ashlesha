<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class In extends CI_Controller {
	


	function post(){
		
	}
	
	function tag()
	{
		$q = $_GET['q'];
		$tags = $this->dba->tags($q);
		$taglist = array();
		if(isset($tags) && isset($tags["rows"]))
		{
			foreach($tags["rows"] as $row)
			{
				$taglist[]=array("name"=>$row['key']);
			}
			
		}
		header("Content-Type: text/javascript;charset=utf-8");
		$callback = $_GET['callback']; 
		echo $callback."(".json_encode(array("query"=>array(
			"results"=>array(
				"tags"=>$taglist
			)
		))).")";
	}
	
	function wallposts()
	{
		$count = $this->input->post("count");
		$user_id = $this->input->post("user_id");
		if(empty($user_id))
		{
			$user_id = $this->user->get_current();
		}
		if(empty($count)){ $count = 8; }
		echo json_encode($this->dba->wallposts($user_id,1,$count));
		
	}
	
	function userposts()
	{
		$count = $this->input->post("count");
		$user_id = $this->input->post("user_id");
		if(empty($user_id))
		{
			$user_id = $this->user->get_current();
		}
		if(empty($count)){ $count = 8; }
		echo json_encode($this->dba->userposts($user_id,1,$count));
		
	}
	
	function comments()
	{
		echo json_encode($this->dba->get_comments($this->input->post("post_id")));
		
	}
	
	function menu()
	{
		$option = $this->input->post('option');
		switch($option)
		{
			case "menuitemlist":
				$section_id = $this->input->post("section");
				echo $this->jsonfeed->get_menuitems($section_id); 
				return;
			
			case "menusectionlist":
				
				echo $this->jsonfeed->get_menusections(); 
				
				return;
			
		}
	}
	
	
	function user()
	{
		$userdata = $this->input->post();
		$userdata["created_at"] = time();
		$response = $this->dba->add_user($userdata);
		if($response["success"]){
			$this->user->force_sign_in($response["data"]["id"]);
		}
		echo json_encode($response);
	}
	
	function forgot_password()
	{
		$this->load->helper(array('form', 'url'));
		$this->load->library('form_validation');
		
		$email = $this->input->post("email");
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
		if($this->form_validation->run()==FALSE)
		{
			echo json_encode(array(
				"success"=>false,
				"message"=>"Please enter a valid email address."
			));
			return;
		}
		else
		{
			$user = $this->user->get_by_email($email);
			if(empty($user))
			{
				echo json_encode(array(
					"success"=>false,
					"message"=>"No user is registered with that email address."
				));
				return;
			}
			else
			{
				echo json_encode(array(
					"success"=>TRUE,
					"message"=>"An email is sent to you. Please check your inbox for instructions."
				));
				return;
			}
		}
		
	}

	function facebook_login()
	{
		$this->load->library("facebook");
		$user = $this->facebook->getUser();
		if(empty($user))
		{
			header("Location: ".$this->facebook->getLoginUrl());
		}
		else
		{
			
			$user_profile = $this->facebook->api('/me','GET');
       		$user = $this->user->get_by_email($user_profile['email']);
			if(!empty($user) && !empty($user['_id']))
			{
				$this->user->force_sign_in($user['_id']);
				redirect("");
			}
			else
			{
				$data['email'] = isset($user_profile['email'])?$user_profile['email']:'';
				$data['fullname'] = isset($user_profile['name'])?$user_profile['name']:'';
				$data['gender'] = isset($user_profile['gender'])?$user_profile['gender']:'';
				$data['username'] = isset($user_profile['username'])?$user_profile['username']:'';
				$data['picture'] = "https://graph.facebook.com/".$user_profile['id']."/picture"; 
				$this->load->view("open/signup",array('data'=>$data,"helptext"=>'We have successfully fetched your data from Facebook. Now select a <strong>username</strong> and signup.'));
			}
		}
		return;
	}
	
	function logout()
	{
		
		$this->user->force_logout();
		session_destroy();
		redirect("./");
	}
	
	function url_encode()
	{
		$this->load->helper("textp");
		$text = $this->input->post('text');
		echo auto_link_text($text);
	}
	
	function facebook_image()
	{
	
		if($this->user->is_facebooked())
		{
			$this->load->library("facebook");
			$this->load->helper("file");
			$user=  $this->facebook->api("/me?fields=picture","GET");
			$image = file_get_contents($user['picture']);
			$image_path = "static/uploads/temp/".$this->user->get_current()."_".md5(time()).".jpg";
			 write_file("./".$image_path,$image);
			//echo "./".$image_path; 
			echo json_encode(array(
				"success"=>true,
				"image_url"=>base_url().$image_path
			));
			
		}
	}
	
	function profile_pic($id)
	{
		redirect($this->dba->get_profile_pic($id));
	}
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
