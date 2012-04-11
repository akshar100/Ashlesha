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
		//print_r($user);
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
			"all_sectors"=>array("map"=>read_file("./application/views/json/all_sector.js")),
			"user_groups"=>array("map"=>read_file("./application/views/json/user_groups.js")),
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
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */