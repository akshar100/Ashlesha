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
	
	function groupposts()
	{
		$count = $this->input->post("count");
		$user_id = $this->input->post("user_id");
		if(empty($user_id))
		{
			$user_id = $this->user->get_current();
		}
		$group_id = $this->input->post('group_id');
		
		$group = $this->dba->get($group_id);
		if(empty($count)){ $count = 8; }
		echo json_encode($this->dba->groupposts($group_id,$user_id,1,$count));
		
	}
	
	function pending_members()
	{
		$group_id = $this->input->post('group_id');
		$group = $this->dba->get($group_id);
		$output = array();
		if(isset($group['relations']))
		{
			foreach($group['relations'] as $k=>$v)
			{
				if($v!='requested'){
					continue;
				}
				$user = $this->dba->get($k);
				$output[]=array(
					'user_id'=>$k,
					'user_name'=>$user['fullname']
				);
			}
		}
		echo json_encode($output);
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
	
	function user_groups()
	{
		$user_groups = $this->dba->get_user_groups($this->user->get_current());
		foreach($user_groups as &$row)
		{
			$row['label'] = $row['title'];
			$row['view'] = "/group/".$row['title']."/".$row['_id']; 
		}
		echo json_encode($user_groups);
	}
	
	function menu()
	{
		
		$menu_sections  =  array(
			array("id"=>1,"label"=>"Create","name"=>"post"),
			array("id"=>2,"label"=>"Participate","name"=>"participate"),
			array("id"=>3,"label"=>"Profile","name"=>"profile"),
			array("id"=>4,"label"=>$this->lang->line('group'),"name"=>"group")
		);
		$menu_items = array(
			array("id"=>1,"parent_id"=>1,"name"=>$this->lang->line("post"),"label"=>$this->lang->line("post"),"view"=>"/post/new" ),
			array("id"=>2,"parent_id"=>1,"name"=>"survey","label"=>"Survey","view"=>"/survey/new" ),
			array("id"=>3,"parent_id"=>1,"name"=>"Question","label"=>"Question","view"=>"/question/new" ),
			array("id"=>4,"parent_id"=>1,"name"=>"Event","label"=>"Event","view"=>"/event/new" ),
			array("id"=>8,"parent_id"=>1,"name"=>'group',"label"=>$this->lang->line("group"),"view"=>"/group/new" ),
			array("id"=>5,"parent_id"=>2,"name"=>'all',"label"=>"My Stream","view"=>"/stream" ),
			array("id"=>6,"parent_id"=>2,"name"=>'myposts',"label"=>"My Activity","view"=>"/my" ),
			array("id"=>7,"parent_id"=>3,"name"=>'profile',"label"=>"Profile","view"=>"/me" )
		);
		$option = $this->input->post('option');
		switch($option)
		{
			case "menuitemlist":
				$section_id = $this->input->post("section");
				$response = array();
				foreach($menu_items as $v)
				{
					if("".$v['parent_id'] =="".$section_id)
					{
						$response[]= $v;
					}
				}
				echo json_encode($response);
				return;
			
			case "menusectionlist":
				
				echo json_encode($menu_sections);
				
				return;
			
		}
	}
	
	
	function user()
	{
		$userdata = $this->input->post();
		$userdata["created_at"] = time();
		$response = $this->dba->add_user($userdata);
		if($response["success"]){
			$this->user->run_signup_errands($response["data"]["id"]);
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
				//Generate and OTP for the user
				$otp = $this->user->generate_otp($user['_id']);
				
				$url = base_url().'welcome/otp/'.$otp;
				
				$this->load->library('email');
				
			
				$this->email->from($this->config->item('from_email'),$this->config->item('from_name'));
				$this->email->to($user['email']);
				$this->email->subject('Forgot password link');
				$this->email->message($this->load->view('email/forgot_password',array(
					'url'=>$url
				),TRUE));
				
				$this->email->send();
				
				
				
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
       		$user = @$this->user->get_by_email($user_profile['email']);
			if(!empty($user) && !empty($user['_id']) && isset($user_profile['email'])) //Make sure the FB profile has email in it.
			{
				if(isset($user['disabled']) && $user['disabled']!==false)
				{
					$this->session->set_userdata("form_error","This user has been disabled.");
					redirect("");
					return;
				}
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
	
	function all_sectors()
	{
		echo json_encode($this->dba->all_sector_list());
	}
	
	function get_top_tags()
	{
		$response = $this->chill->getList("posts","top_tags","top_tags",NULL,array(
			//"limit"=>5
		));
		$response['rows'] = array_splice($response['rows'],0,5);
		echo json_encode($response);
	}
	
	function search_posts()
	{
		$term = $this->input->post('search');
		$response = $this->chill->getLuceneView("lucene","by_text",urlencode($term));
		$response = json_decode($response);
		if(!isset($response->total_rows) || $response->total_rows==0)
		{
			echo json_encode(array()); return;
		}
		$count = $response->total_rows;
		$rows = $response->rows;
		$user=$this->user->get_current();
		$output = array();
		foreach($rows as $row)
		{
			$output[]= $this->dba->get_post($row->id,$user); 
		}
		echo json_encode($output);
	}
	
	function search_users()
	{
		$term = $this->input->post('search');
		$response = $this->chill->getLuceneView("lucene","user_by_term",urlencode($term));
		$response = json_decode($response);if(!isset($response->total_rows) || $response->total_rows==0)
		{
			echo json_encode(array()); return;
		}
		$count = $response->total_rows;
		$rows = $response->rows;
		$user=$this->user->get_current();
		$output = array();
		foreach($rows as $row)
		{
			
			$u = $this->dba->get($row->id);
			unset($u['password']);
			if(!$this->user->has_role('administrator'))
			{
				unset($u['email']);
				unset($u['mobile']);  
			}
			
			unset($u['connections']);
			unset($u['relationships']);
			  
			$output[]= $u;
		}
		echo json_encode($output);
	}
	
	function all_users()
	{
		$term = $this->input->post('search');
		$response = $this->chill->getview("posts","users_by_username");
		
		
		$user=$this->user->get_current();
		$output = array();
		foreach($response['rows'] as $row)
		{
			
			$u = $row['value'];
			unset($u['password']);
			if(!$this->user->has_role('administrator'))
			{
				unset($u['email']);
				unset($u['mobile']);  
			}
			
			unset($u['connections']);
			unset($u['relationships']);
			  
			$output[]= $u;
		}
		echo json_encode($output);
	}
	
	
	
	
	function site_stats()
	{
		$users = $this->dba->get_user_stats();
		
		
		echo json_encode(array(
			"users"=>$users
			
		));
	}
	
	function get_questions()
	{
		$response = array();
		$questions = $this->dba->get_all_questions();
		echo json_encode($questions);
		
	}
	
	function quizlist()
	{
		echo json_encode($this->dba->getview('get_all_quizes'));
	}
	
	function available_roles()
	{
		echo json_encode($this->dba->get_all_roles('get_available_roles'));
	}
	
	function quiz_response()
	{
		$id = $this->input->post('quiz_id');
		$user_id = $this->user->get_current();
		$doc = $this->dba->get("response_{$id}_{$user_id}");
		if(empty($doc) || empty($doc['finished']))
		{
			echo json_encode(array(
				'answered'=>false
			));
		}
		else
		{
			echo json_encode(array(
				'answered'=>true
			));
		}
	}
	
	function get_list()
	{
		$action = $this->input->post('action');
		switch($action)
		{
			case "quiz_questions":
				$id = $this->input->post('id');
				$quiz = $this->dba->get($id);
				$questions = explode(",",$quiz['questions']);
				$rows = array();
				foreach($questions as $q)
				{
					$q1 = $this->dba->get($q);
					$q1['id'] = $q1['_id'];
					$rows[]= $q1; 
				}
			echo json_encode($rows);
			break;
		}
	}
	
	function remaining_time()
	{
		$quiz_id = $this->input->post('quiz_id');
		$user = $this->user->get_current();
		$quiz = $this->dba->get($quiz_id);
		$doc = $this->dba->get("response_{$quiz_id}_{$user}");
		$remaining = $doc['created_at']+$quiz['time']*60 - time();
		if($remaining<=0)
		{
			echo 0;
		}
		else
		{
			echo $remaining;
		} 
	}
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
