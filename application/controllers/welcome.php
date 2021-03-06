<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	function __construct()
	{
		parent::__construct();
		
	}
	
	public function index()
	{
		$this->load->library("facebook");
		$user = $this->user->get_current();
		
		$config = array(
				'group_enabled'=> $this->config->item('group_enabled'),
				'question_enabled'=> $this->config->item('question_enabled'),
				'event_enabled' => $this->config->item('event_enabled'),
				'survey_enabled'=> $this->config->item('survey_enabled'),
				'post_enabled' => $this->config->item('post_enabled'),
				'post_sector_enabled' =>$this->config->item('post_sector_enabled'), 
				'notifications_enabled' =>$this->config->item('notifications_enabled'),
				'push_notifications_enabled'=>$this->config->item('push_notifications_enabled'),
				'supported_roles'=>$this->config->item('supported_roles'),
				'sign_up_enabled'=>$this->config->item('sign_up_enabled'),
				'force_profile_details'=>$this->config->item('force_profile_details'),
				'pages_enabled'=>$this->config->item('pages_enabled'),
				'additional_post_categories'=>$this->config->item('additional_post_categories')
			);
		if(empty($user) && !in_array($this->uri->segment(1),array("page")))
		{
			
			$this->load->helper('cookie');
			$this->load->view('homepage',array(
				'config'=>$config,
				'redirect_url'=>$this->uri->uri_string
			));
		}
		else
		{
			if(empty($user))
			{
				
			}
			else
			{
				$this->user->force_sign_in($this->user->get_current());
				
			}
			
			$this->load->view('welcome_message',array(
				'config'=>$config
			));
	
		}
		
		
	}
	
	public function login()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$this->session->set_userdata("form_error",false);
		if(empty($username) || empty($password))
		{
			$this->session->set_userdata("form_error","Please enter both username as well as password.");
			redirect("");
			
		}
		else
		{
			
			$user = $this->user->get_by_username_or_email(trim($username));			
			if(empty($user))
			{
				$this->session->set_userdata("form_error","Wrong username password.");
			}
			else if(!isset($user['password']) || $user['password'] !== do_hash($password))
			{
				$this->session->set_userdata("form_error","Wrong username password.");
			}
			else if(isset($user['disabled']) && $user['disabled']!==false)
			{
				$this->session->set_userdata("form_error","This user has been disabled.");
			}
			else
			{
				$this->user->force_sign_in($user['_id']);
				redirect(""); 
			}
			redirect("");
		}	
		
	}
	
	
	public function otp($otp)
	{
		$user = $this->user->get_by_otp($otp);
		if(empty($user))
		{
			$this->session->set_userdata("form_error","It appears that you tried to reset your password. We request you to try again as the link you used has expired.");
			redirect("");
		}
		$this->user->destroy_otp($user['_id']);
		$this->user->force_sign_in($user['_id']);
		redirect(base_url()."me");
	}
	
	public function logout()
	{
		$this->user->force_logout();
		redirect("");
	}
	
	public function template()
	{
		$template = $this->input->post('template'); 
		$this->load->view("mixins/$template");
	}
	
	public function know_more()
	{
		$this->load->view('open/know_more');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */