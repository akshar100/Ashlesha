<?php
class DBA
{
	function __construct()
	{
		$this->ci = &get_instance();
		
		$this->ci->load->library('chill');
		$this->chill = $this->ci->chill; 
	}
	
	function wallposts($user,$page=1, $size=10)
	{
		$response = $this->chill->getView("posts","wallposts",NULL,array(
			"descending"=>true,
			"limit"=>$size,
		));
		
		$output = array();
		foreach($response['rows'] as $row)
		{
			$output[]= $this->get_post($row["value"]["_id"],$user); 
		}
		return $output;
	}
	
	function userposts($user,$page=1, $size=10)
	{
		$response = $this->chill->getView("posts","myposts",NULL,array(
			"descending"=>true,
			"limit"=>$size,
			"startkey"=>$user.time()
		));
		
		$output = array();
		if(!isset($response['rows']))
		{
			print_r(array(
				"descending"=>true,
				"limit"=>$size,
				"key"=>$user
			));
		}
		foreach($response['rows'] as $row)
		{
			
			$output[]= $this->get_post($row["value"]["_id"],$user); 
		}
		
		
		return $output;
	}
	
	function create_post($data)
	{
		unset($data['id']);
		$data['created_at'] = time();
		$response = $this->chill->post($data);
		$data = $this->chill->get($response['_id']);
		$data['id'] = $data['_id'];
		$response['data'] = $data;
		return $response;
	}
	
	function create_comment($data)
	{
		unset($data['id']);
		$data['created_at'] = time();
		$data['type'] = "comments";
		$response = $this->chill->post($data);
		
		$data = $this->chill->get($response['_id']);
		$data['id'] = $data['_id'];
		$response['data'] = $data;
		return $response;
	}
	
	function get_comments($post)
	{
		$this->ci->load->helper("textp");
		$response = $this->chill->getView("posts","comments",NULL,array(
			"key"=>$post
		));
		
		$output = array();
		foreach($response['rows'] as $row)
		{
			$row["value"]["comment"] = auto_link_text($row["value"]["comment"]);
			$output[]= $row["value"];
		}
		return $output;
	}
	
	
	
	function get_post($post,$user)
	{
		$post = $this->chill->get($post);
		$post['likes'] = count($this->get_likes($post["_id"]));
		$post['dislikes'] = count($this->get_dislikes($post["_id"]));
		$post['like'] = $this->is_liked($post["_id"],$user);
		$post['dislike'] = $this->is_disliked($post["_id"],$user);
		return $post;
	}
	
	 function get_profile_pic($user)
	 {
	 	if(empty($user))
		{
			return base_url()."static/images/male_profile.png";
		}
	 	$user = $this->get_user_by_id($user) ;
		if(empty($user['profile_pic']) || $user['profile_pic']=="false" || $user['profile_pic']=="undefined")
		{
			if($user['gender']=="male")
			{
				return base_url()."static/images/male_profile.png";
			}
			else
			{
				return base_url()."static/images/female_profile.png";
			}

		} 
		else
		{
			return $user['profile_pic'];
		}
	 }
	
	function get_likes($post)
	{
		$response = $this->chill->getView("posts","likes",NULL,array(
			"key"=>$post
		));
		if(empty($response["rows"]))
		{
			$response["rows"] = array();
		}
		return $response["rows"];
	}
	
	function get_dislikes($post)
	{
		$response = $this->chill->getView("posts","dislikes",NULL,array(
			"key"=>$post
		));
		if(empty($response["rows"]))
		{
			$response["rows"] = array();
		}
		return $response["rows"];
	}
	
	function is_liked($post,$user)
	{
		$response = $this->chill->get("bablikes0".$user."0".$post);
		
		if(!empty($response["_id"]))
		{
			return true;
		}
		return false;
	}
	function is_disliked($post,$user)
	{
		
		$response = $this->chill->get("babdislikes0".$user."0".$post);
		if(!empty($response["_id"]))
		{
			return true;
		}
		return false;
	}
	function update_post($data)
	{
		if(!empty($data['_id']))
		{
			$current_data = $this->chill->get($data['_id']); 
			$current_data['tags'] = $data['tags'];
			$current_data['text'] = $data['text'];
			$this->chill->put($data['_id'],$current_data);
			$response =array();
			$response['data'] = $data;
			return $response;
		}
	}
	
	function like_post($post,$user)
	{
		$this->undo_like($post, $user);
		$this->chill->post(array(
			"_id"=>"bablikes0".$user."0".$post,
			"user"=>$user,
			"post"=>$post,
			"type"=>"likes"
		));
		$data = $this->get_post($post,$user);
		$data['dislike'] = false;
		$data['like'] = true;
		$response =array();
		$response['data'] = $data;
		return $response;
	}
	
	function dislike_post($post,$user)
	{
		$this->undo_like($post, $user);
		$this->chill->post(array(
			"_id"=>"babdislikes0".$user."0".$post,
			"user"=>$user,
			"post"=>$post,
			"type"=>"dislikes"
		));
		$data = $this->get_post($post,$user);
		$data['dislike'] = true;
		$data['like'] = false;
		$response =array();
		$response['data'] = $data;
		return $response;
	}
	
	function undo_like($post,$user)
	{
		$response = $this->chill->get("bablikes0".$user."0".$post);
		
		if(!empty($response["_id"]))
		{
			$this->chill->delete("bablikes0".$user."0".$post,$response["_rev"]);
		}
		
		$response = $this->chill->get("babdislikes0".$user."0".$post);
		if(!empty($response["_id"]))
		{
			$this->chill->delete("babdislikes0".$user."0".$post,$response["_rev"]);
		}
		
		$data = $this->get_post($post,$user);
		$data['dislike'] = false;
		$data['like'] = false;
		$response = array();
		$response['data'] = $data;
		return $response;
	}
	
	
	function add_user($data)
	{
		unset($data['id']);
		$data['type'] = "user";
		$data['created_at'] = time();
		$data = array_map("trim", $data);
		$output = array(
			"success"=>false
		); 
		
		//validating begins
		foreach($data as $k=>$v)
		{
			if(empty($v))
			{
				$output[$k] = "$k can not be empty";
			}
			else
			{
				if($k=="username")
				{
					
					if(strlen($v)<3)
					{
						$output[$k] = "$k is not a valid. It should have at least 3 characters.";
					}
					else if(!preg_match("/^[a-zA-z+][a-zA-Z0-9_\.*]/i",$v))
					{
						$output[$k] = "$k is not a valid. It should start with alphabet and can have digits, _ and .";
					}
					else if(is_array($this->get_user_by_username($v)))
					{
						$output[$k] = "$k is already taken.";
					}
				}
				if($k=="password")
				{
					
					if(strlen($v)<6)
					{
						$output[$k] = "$k is not a valid. It should have at least 6 characters.";
					}
				}
				if($k=="email")
				{
					
					if(!filter_var($v, FILTER_VALIDATE_EMAIL))
					{
						$output[$k] = "$k is not a valid email address.";
					}
					else if(is_array($this->get_user_by_email($v)))
					{
						$output[$k] = "$k is already in use.";
					}
				}
				if($k=="fullname")
				{
					
					if(!preg_match("/[a-zA-z\s+]/i",$v))
					{
						$output[$k] = "$k is not a valid full name. It can contan only alphabets and whitespace.";
					}
				}
			}
		}
		
		if(count($output)>1)
		{
			return ($output);
			
		}
		
		$response = $this->chill->post($data);
		$data = $this->chill->get($response['_id']);
		$data['id'] = $data['_id'];
		$response['data'] = $data;
		$response["success"] = true; 
		return $response;
		
	}
	
	function get_user_by_id($userid)
	{
		
		if(empty($userid))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","users_by_userid", $userid,array(
				"key"=>$userid
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
		}
	}
	
	function get_user_by_username($username)
	{
		
		if(empty($username))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","users_by_username", $username,array(
				"key"=>$username
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
		}
	}
	
	
	function get_user_by_email($email)
	{
		
		if(empty($email))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","users_by_email", $email,array(
				"key"=>$email
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
				
			
		}
	}
	
	function get_user_by_username_or_email($email)
	{
		
		if(empty($email))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","users_by_username_or_email", $email,array(
				"key"=>$email
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
				
			
		}
	}
	
	function get_schema($schema)
	{
		if(empty($schema))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","get_schema", $schema,array(
				"key"=>$schema
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
				
			
		}
	}
	
	function get_by_type($schema,$count=1)
	{
		if(empty($schema))
		{
			return null;
		}
		else
		{
			$response = $this->chill->getView("posts","get_by_type", $schema,array(
				"key"=>$schema,
				"limit"=>$count
			));
			
			if(!empty($response["rows"]) AND isset($response["rows"][0]))
			{
				return $response["rows"][0]["value"];
			}
			else
			{
				return null;
			}
				
			
		}
	}
	
	
	function update_user($data)
	{
		//$data = array_map("trim", $data);
		foreach($data as $k=>$v)
		{
			if(is_string($v))
			{
				$data[$k]= trim($v);
			}
		}
		$output = array(
			"success"=>false
		); 
		//validating begins
		foreach($data as $k=>$v)
		{
			if(empty($v) && in_array($k,array("fullname")))
			{
				$output[$k] = "$k can not be empty";
			}
			else
			{
				
				if($k=="password" && !empty($v))
				{
					
					if(strlen($v)<6)
					{
						$output[$k] = "$k is not a valid. It should have at least 6 characters.";
					}
				}
				
				if($k=="fullname")
				{
					
					if(!preg_match("/[a-zA-z\s+]/i",$v))
					{
						$output[$k] = "$k is not a valid full name. It can contan only alphabets and whitespace.";
					}
				}
			}
		}
		
		if(count($output)>1)
		{
			return ($output);
			
		}
		$id = $data['_id'];
		$response = $this->chill->put($id,$data);
		$data = $this->chill->get($response['_id']);
		$data['id'] = $data['_id'];
		$response['data'] = $data;
		$response["success"] = true; 
		return $response;
		
		
	}
	
	function tags($text=null)
	{
		if(!empty($text))
		{
			$result = $this->chill->getView("posts","tags",null,array(
				"group"=>true,
				"startkey"=>$text,
				"limit"=>5
			));
		}
		else
		{
			$result = $this->chill->getView("posts","tags",null,array(
				"group"=>true,
				"limit"=>5
			));
		}
		
		return $result;
	}
	
	
	function create_connection($data)
	{
		$this->ci->load->library('user');
		$source_user = $this->ci->user->get_user($data['source_user']);
		$target_user = $this->ci->user->get_user($data['target_user']);
		
		if(!isset($source_user['connections'])) { $source_user['connections'] = array(); }
		if(!isset($target_user['connections'])) { $target_user['connections'] = array(); }
		
		$source_user['connections'][$target_user['_id']]=array(
			'follows'=>$data['source_follows_target'],
			'connects'=>$data['source_connects_target'],
			'connect_confirm'=>((isset($target_user['connections'][$source_user['_id']]) && $data['source_connects_target'])?$target_user['connections'][$source_user['_id']]['connects']:false)
		);
		
		$target_user['connections'][$source_user['_id']]=array(
			'follows'=>$data['target_follows_source'],
			'connects'=>$data['target_connects_source'],
			'connect_confirm'=>((isset($source_user['connections'][$target_user['_id']]) && $data['target_connects_source'])?$source_user['connections'][$target_user['_id']]['connects']:false)
		);
		
		$this->ci->dba->update_user($source_user);
		$this->ci->dba->update_user($target_user);
		echo json_encode($data);
	}
	
	
	function get_connection($data)
	{
		
		$source_user = $this->ci->user->get_user($data['source_user']);
		$target_user = $this->ci->user->get_user($data['target_user']);
		
		if(!isset($source_user['connections'])) { $source_user['connections'] = array(); }
		if(!isset($target_user['connections'])) { $target_user['connections'] = array(); }
		
		if(!isset($source_user['connections'][$target_user['_id']]))
		{
			echo json_encode($data);
		}
		else
		{
			echo json_encode(array(
				'source_follows_target'=>$source_user['connections'][$target_user['_id']]['follows'],
				'source_connects_target'=>$source_user['connections'][$target_user['_id']]['connects'],
				'target_connects_source'=>$source_user['connections'][$target_user['_id']]['connect_confirm'],
				'target_follows_source'=>((isset($target_user['connections'][$source_user['_id']]))?$target_user['connections'][$source_user['_id']]['follows']:false)
			));
		}
	
	}
	
	function create_group($data)
	{
		
		$response = $this->chill->post($data);
		
		return (array(
			"success"=>true,
			"data"=>$this->chill->get($response["_id"])
		));
	}
	
	function all_sector_list()
	{
		$result = $this->chill->getView("posts","all_sectors",null);
		$response =array();
		foreach($result['rows'] as $v)
		{
			$response[]=$v['key'];
		} 

		return $response;
	}
}
