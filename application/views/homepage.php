<?php
$this->load->view("common/header"); 
?>
<body>
    <div class="topbar coloredborder">
      <div class="fill">
        <div class="container-fluid">
          <a class="brand" href="#"><?php echo img(array("src"=>'static/images/logo.png'))?></a>
        </div>
      </div>
    </div>

    <div class="container-fluid">

      <div class="content">
        
        <div class="row-fluid">
          <div class="span7">
            <p class="desc">
            	<?php echo $this->lang->line('site_description');?>
            	
            </p>

          </div>
          <div class="span4 well">
          	
          	<div class="row-fluid">
          		<div class="span12"><h3>Sign In</h3> <hr/></div>
          	</div>
          	<div class="row-fluid">
          		<div class="span8">    
          			
    					<?php
          				$error = $this->session->userdata("form_error");
						if(!empty($error))
						{
							?>
							<div class="alert alert-error"><?php echo $error; ?></div>
							<?
						}
						$this->session->set_userdata("form_error",false);
          			?>
   					
          			
          			
          		</div>
          	</div>
          	<div class="row-fluid">
          		
          		<form class="form-login" method="POST" action="<?php echo base_url(); ?>welcome/login">
          		<div class="row-fluid">
          			<input type="text"  id="username" name="username"   class="span12" placeholder="username">
          		</div>
          		<div class="row-fluid">
          			<input type="password"  id="password" name="password" class="span12"  placeholder="password">
          			
          		</div>
          		<div class="row-fluid">
          			<div class="span7"><button class="btn btn-primary" type="submit">SignIn</button>
          				&nbsp; <?php echo anchor('in/facebook_login',img(array("src"=>'static/images/facebook16.png')),array());?> &nbsp;<?php echo anchor('in/google_login',img(array("src"=>'static/images/google16.png')),array());?>&nbsp;<?php echo anchor('in/yahoo_login',img(array("src"=>'static/images/yahoo16.png')),array());?> 
          				</div><div class="span4"> <a id="forgot-password-link" href="#">Forgot Password?</a></div>
          		</div>
          		
          		
          		</form>
          	</div>
          	
          </div>
        </div>
        <div class="row-fluid">
          <div class="span7 hidden-phone hidden-tablet">
            <?php echo img(array("src"=>'static/images/tagcloud.png',"width"=>500)); ?>
          </div>
          <div id="signup" class="span4 well">
            
          </div>
        </div>
      </div>
	
     

    </div> <!-- /container -->
    <hr/>
	 <footer>
        <p>&copy; BrandABrand.com 2012</p>

     </footer>
  <script src="./static/js/framework.js"> </script>
  <script>
  	var baseURL = "<?php echo base_url();?>";
  	YUI().use('babe',function(Y){
  		
  		Y.BABE.loadTemplate("singupform",function(){ 
  			var signup = new Y.BABE.SignUpView();
  			var forgotpassword = new Y.BABE.ForgotPasswordView();
  			Y.one("#signup").setContent(signup.render().get('container'));
  			Y.one("#forgot-password-link").on('click',function(){
  				Y.one("#signup").setContent(forgotpassword.render().get('container'));
  				forgotpassword.render().get('container').one(".cancel-btn").on("click",function(e){
  					Y.one("#signup").setContent(signup.render().get('container'));
  				});
  			});
  			
  		});
  	});
  </script>
  </body>
</html>

    
