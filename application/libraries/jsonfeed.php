<?php
class Jsonfeed
{
	function __construct()
	{
		$this->ci = &get_instance();
		
		$this->db = $this->ci->db;
	}
	
	function get_menusections()
	{
		 $this->db->select("id,label"); 
		 $sections = $this->db->get("sections")->result();
		 return json_encode($sections);
	}
	
	function get_menuitems($id)
	{
		 $this->db->where("parent_id",$id);
		 $this->db->select("id,label,view"); 
		 $sections = $this->db->get("menus")->result();
		 return json_encode($sections);
	}

}
?>
