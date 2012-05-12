<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class IO extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}
	
	function create_post()
	{
		$data = $this->input->post();
		$data['user_id'] = $this->user->get_current(); 
		$data['author_id'] = $this->user->get_current(); 
		$data['author'] = $this->user->get_username($this->user->get_current()); 
		$response = $this->dba->create_post($data);
		echo json_encode($response);
	}
	
	function create_comment()
	{
		$data = $this->input->post();
		$data['user_id'] = $this->user->get_current(); 
		$data['author_id'] = $this->user->get_current(); 
		$data['author'] = $this->user->get_username($this->user->get_current()); 
		$response = $this->dba->create_comment($data);
		echo json_encode($response);
	}
	
	function update_post()
	{
		$data = $this->input->post();
		$r = $this->dba->update_post($data);
		$data = $r['data'];
		if($data['like'])
		{
			echo json_encode($this->dba->like_post($data['_id'],$this->user->get_current()));
		}
		else if($data['dislike'])
		{
			echo json_encode($this->dba->dislike_post($data['_id'],$this->user->get_current()));
		}
		else
		{
			echo json_encode($this->dba->undo_like($data['_id'],$this->user->get_current()));
		}
	}
	
	function update_user()
	{
		
		$data = $this->input->post();
		unset($data['username']);
		unset($data['email']);
		
		if(isset($data['profile_pic']) && empty($data['profile_pic'])) { unset($data['profile_pic']); }
		else if($data['profile_pic']=="undefined") { $data['profile_pic']=''; }
		
		
		$user = $this->user->get_user();
		if(!empty($user['profile_pic'] ) && !empty($data['profile_pic']) && $data['profile_pic']!==$user['profile_pic']){
			
		}
		foreach($data as $k=>$v)
		{
			if(!in_array($k,array("password","_rev")))
			{
				$user[$k] = $v; 
			}
			else if($k=="password" && !empty($v)) 
			{
				$user[$k] = $v; 
			}
			
		}
		
		echo json_encode($this->dba->update_user($user));
	}
	
	function get_user()
	{
		$id = $this->input->post('_id');
		if(!empty($id))
		{
			echo json_encode($this->user->get_user($id));
		}
		else
		{
			echo json_encode($this->user->get_user());
		}
		
	}
	
	
	function update()
	{
		$this->load->helper("file");
		
		$doc = $this->chill->get("_design/posts");
		$doc["validate_doc_update"] = read_file("./application/views/json/validate_doc_update.js");
		$doc["views"] = array(
			"wallposts" => array("map"=>read_file("./application/views/json/wallposts_map.js")),
			"comments" => array("map"=>read_file("./application/views/json/comments_map.js")),
			"likes"=>array("map"=>read_file("./application/views/json/likes_map.js")),
			"dislikes"=>array("map"=>read_file("./application/views/json/dislikes_map.js")),
			"myposts"=>array("map"=>read_file("./application/views/json/myposts_map.js")),
			"users_by_username"=>array("map"=>read_file("./application/views/json/users_by_username_map.js")),
			"users_by_email"=>array("map"=>read_file("./application/views/json/users_by_email.js")),
			"users_by_userid"=>array("map"=>read_file("./application/views/json/users_by_id.js")), 
			"users_by_username_or_email"=>array("map"=>read_file("./application/views/json/users_by_username_or_email.js")),
			"get_schema"=>array("map"=>read_file("./application/views/json/get_schema.js")),
			"get_by_type"=>array("map"=>read_file("./application/views/json/get_by_type.js")),
			"get_connections"=>array("map"=>read_file("./application/views/json/get_connections.js")),
			"tags"=>array("map"=>read_file("./application/views/json/tags_map.js"),"reduce"=>read_file("./application/views/json/tags_reduce.js")),
			"get_available_roles"=>array("map"=>read_file("./application/views/json/get_available_roles_map.js"),"reduce"=>read_file("./application/views/json/get_available_roles_reduce.js")),
			"all_sectors"=>array("map"=>read_file("./application/views/json/all_sector.js")),
			"user_groups"=>array("map"=>read_file("./application/views/json/user_groups.js")),
			"users_by_otp"=>array("map"=>read_file("./application/views/json/user_by_otp.js")),
			"get_notifications"=>array("map"=>read_file("./application/views/json/get_all_notifications.js")),
			"top_tags"=>array("map"=>read_file("./application/views/json/top_tags_map.js"),"reduce"=>read_file("./application/views/json/top_tags_reduce.js")),
			"user_by_createdat"=>array("map"=>read_file("./application/views/json/users_by_createdat_map.js"),"reduce"=>read_file("./application/views/json/users_by_createdat_reduce.js")),
			"get_all_questions"=>array("map"=>read_file("./application/views/json/get_all_questions.js")),
			"get_all_quizes"=>array("map"=>read_file("./application/views/json/all_quizes.js")),
			"get_users_by_role"=>array("map"=>read_file("./application/views/json/get_users_by_roles.js"))  
		);
		$doc["lists"] = array(
			"top_tags"=>read_file("./application/views/json/top_tags_list.js")
		);
		$this->chill->post($doc);
		
		$doc = $this->chill->get("_design/lucene");
		$doc["fulltext"] = array(
			"by_text" => array("index"=>read_file("./application/views/json/by_text.js")),
			"by_tag" => array("index"=>read_file("./application/views/json/by_tag.js")),
			"by_user" => array("index"=>read_file("./application/views/json/by_user.js")),
			"user_by_term" => array("index"=>read_file("./application/views/json/lucene_user_by_term.js")),
			"users_by_roles" => array("index"=>read_file("./application/views/json/lucene_emails_by_role.js")),
			
		);
		
		$this->chill->post($doc);
		
		
		echo "updated";
		
	}
	
	function generate_model($type)
	{
		$doc = $this->dba->get_by_type($type);
		foreach($doc as $k=>$v)
		{
			echo "<br>$k:{value:''},";
		}
	}
	
	function image_upload()
	{
		header("Content-Type: text/plain");
		$config['upload_path'] = './static/uploads/temp/';
		$config['allowed_types'] = 'gif|jpg|png|jpeg';
		$config['max_size']	= '5000';
		$config['max_width']  = '1024';
		$config['max_height']  = '768';

		$this->load->library('upload', $config);
		if ( ! $this->upload->do_upload("fileInput"))
		{
			
			$response = array(
				"success"=>false,
				"error"=> $this->upload->display_errors()
			);
			echo json_encode($response);
		}
		else
		{
			$data = $this->upload->data();
			$img = $this->session->userdata("user_id")."".rand(0,getrandmax()).".".$data["image_type"]; 
			rename($data["full_path"],$config['upload_path'].$img); 
			$response = array(
				"success"=>true,
				"image_url"=> $config['upload_path'].$img,
				
			);
			
			echo json_encode($response);
		}
	}
	
	function update_connection()
	{
		$connection = $this->input->post();
		$connection['source_user'] = $this->user->get_current();
		$connection['type'] = 'connection';
		$this->dba->create_connection($connection);
		
		
	}
	
	function get_connection()
	{
		$connection = $this->input->post();
		$connection['source_user'] = $this->user->get_current();
		$connection['type'] = 'connection';
		$this->dba->get_connection($connection);
	}
	
	function update_relationship()
	{
		$resource_id = $this->input->post('resource_id');
		$user_id = $this->input->post('owner_id');
		$relationship = $this->input->post('relationship');
		$resource = $this->chill->get($resource_id);
		if(isset($resource) && is_array($resource))
		{
			if(!isset($resource['relations']))
			{
				$resource['relations'] = array();
			}
			
			
			$resource['relations'][$user_id] = $relationship;
			
			$this->chill->put($resource_id,$resource);
			echo json_encode(array(
				"success"=>true,
				"data"=>array(
					"_id"=>$user_id.$resource_id,
					"owner_id" =>$user_id,
					"relationship"=>$relationship,
					"resource_id"=>$resource_id
				)
			));
		}
	}
	
	function get_relationship()
	{
		$resource_id = $this->input->post('resource_id');
		$user_id = $this->input->post('owner_id');
		$resource = $this->chill->get($resource_id);
		if(isset($resource) && is_array($resource))
		{
			if(!isset($resource['relations']))
			{
				$relationship = '';
			}
			else
			{
				if(isset($resource['relations'][$user_id]))
				{
					$relationship = $resource['relations'][$user_id];
				}
				else
				{
					$relationship='';
				}
			}	
			
		}
		else
		{
			$relationship='';
		}
		
		echo json_encode(array(
				"success"=>true,
				"data"=>array(
					"_id"=>$user_id.$resource_id,
					"owner_id" =>$user_id,
					"relationship"=>$relationship,
					"resource_id"=>$resource_id
				)
		));
	}
	
	function create_group()
	{
		$data = $this->input->post();
		
		unset($data['_id']);
		unset($data['id']);
		$data['author_id'] = $this->user->get_current();
		$data['created_at'] = time();
		$data['type'] = 'group';
		echo json_encode($this->dba->create_group($data));	
	}
	
	function scaffold()
	{
		$this->load->helper('file');
		$json = read_file("./application/views/scaffold/def1.json");
		echo $json;
	}
	
	function get_model()
	{
		$response = $this->dba->get($this->input->post('_id'));
		foreach($response as $k=>$v)
		{
			if(is_object($v))
			{
				$response[$k]=json_encode($v);
			}
		}
		echo json_encode($response);
	}
	
	function delete_model()
	{
		echo json_encode($this->dba->delete($this->input->post('_id')));
	}

	function create_model()
	{
		$data = $this->input->post(); 
		$data['author_id'] = $this->user->get_current();
		$data['created_at'] = time();
		echo json_encode($this->dba->create($data));
	}
	
	function update_model()
	{
		$data = $this->input->post();
		if($data['type']!='post')
		{
			$data['author_id'] = $this->user->get_current();
		}
		
		$data['updated_at'] = time();
		echo json_encode($this->dba->update($data));
	}

	function create_notification()
	{
		$post = $this->input->post();
		$response = $this->dba->create_notification($post);
		echo json_encode($response);
	}
	
	function get_notification()
	{
		$id = $this->input->post('_id');
		echo json_encode($this->dba->get($id));
	}
	
	function notifications()
	{
		$response = $this->chill->getView("posts","get_notifications",NULL,array(
			"key"=>$this->user->get_current(),
			"descending"=>true,
			"limit"=>10,
		));
		
		$output = array();
		foreach($response['rows'] as $row)
		{
			$output[]= $row['value'];
		}
		echo json_encode($output);
	}
	
	function save_question()
	{
		$data = $this->input->post('form');
		$question = array(
			"type"=>'question',
			"data"=>json_decode($data),
			"author_id"=>$this->user->get_current(),
			"created_at"=>time()
		);
		$response = $this->dba->create($question);
		echo json_encode($response);
	}

	function delete_question(){
		$this->dba->delete($this->input->post('id'));
		echo "{success:true}";
	}
	
	function send_quiz()
	{
		$data = $this->input->post();
		$roles = $data['roles'];
		$id = $data['id'];
		$rows = array();
		if($roles=="*")
		{
			$response = $this->dba->getview('get_users_by_role',array(
																	'key'=>'*'
															));
			foreach($response as $row)
			{
				$rows[]=$row;
			}
		}
		else
		{
			$roles = explode("|",$roles);
			foreach($roles as $role)
			{
				$response = $this->dba->getview('get_users_by_role',array('key'=>$role));
				
				foreach($response as $row)
				{
					$rows[]=$row;
				}
			}
		}
		$rows = array_unique($rows);
		$this->load->library('email');
		foreach($rows as $row)
		{
			
			$this->dba->create_notification(array(
				'type'=>'notification',
				'notification_action'=>'quiz',
				'source_user'=>$this->user->get_current(),
				'target_user'=>$row[1],
				'target_resource'=>'/quiz/'+$id
			));
			
			
			$url = base_url().'quiz/'.$id;
			$this->email->from($this->config->item('from_email'),$this->config->item('from_name'));
			$this->email->to($row[0]);
			$this->email->subject($this->lang->line('quiz_subject'));
			$this->email->message($this->load->view('email/quiz_request',array(
				'url'=>$url
			),TRUE));
				
			echo $this->email->send();
			echo $row[0];
			
			
		}
		
	}

	function start_quiz()
	{
		$id = $this->input->post('id');
		$user = $this->user->get_current();
		$doc = $this->dba->get("response_{$id}_{$user}");
		if(!empty($doc))
		{
			echo json_encode($doc); 
			return;
		}
		$doc = array();
		$doc['_id'] = "response_{$id}_{$user}";
		$doc['created_at'] = time();
		$doc['author_id'] = $user;
		$doc['type'] = 'quiz_responses';
		echo json_encode($this->dba->create($doc));
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */