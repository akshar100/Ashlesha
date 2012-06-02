<?php

class CouchOn
{
	function __construct()
	{
		$this->ci = &get_instance();
		$this->ci->load->library('chill');
		$this->chill = $this->ci->chill; 
	}
	
	
	function update($data)
	{
		return $this->chill->put($data['_id'],$data);
	}
	
	function create($data)
	{
		return $this->chill->post($data);
	}
	
	function get($id)
	{
		return $this->chill->get($id);
	}
	
	function delete($id)
	{
		$item = $this->get($id);
		return $this->chill->delete($id,$item['_rev']);
	}
	

}