
<script type="text/x-template" id="signupform-template">
	<div id="signupform">
		
		<form id="signupform">
	        <fieldset>
	          <legend><h3>SignUp</h3></legend>
	          <div><h4 class="green"><?php echo $this->lang->line('sign_up_pitch');?></h4></div>
	          <hr/>
	          <div class="control-group">
	            <label class="control-label"  for="username">Username</label>
	            <div class="controls">
	              <input type="text"  name="username" id="username" >
	              <span class="help-inline"></span>
	            </div>
	          </div><!-- /control-group -->
	          <div class="control-group">
	            <label class="control-label"  for="password" >Password</label>
	            <div class="controls">
	              <input type="password"  name="password" id="password" >
	              <span class="help-inline"></span>
	            </div>
	          </div><!-- /control-group -->
	          <div class="control-group">
	            <label class="control-label"  for="email">Email</label>
	            <div class="controls">
	              <input type="text" name="email" id="email" >
	              <span class="help-inline"></span>
	            </div>
	          </div><!-- /control-group -->
	          <div class="control-group">
	            <label class="control-label"  for="fullname">Full Name</label>
	            <div class="controls">
	              <input type="text" name="fullname" id="fullname">
	              <span class="help-inline"></span>
	            </div>
	          </div><!-- /control-group -->
	          <div class="control-group">
	            <label class="control-label"  id="gender">Gender</label>
	            <div class="controls">
	              
	                  <label class="radio" >
	                    <input type="radio" value="male" name="gender" checked="">
	                    <span>Male</span>
	                  </label>
	                
	                  <label class="radio" >
	                    <input type="radio" value="female" name="gender">
	                    <span>Female</span>
	                  </label>
	               
	            </div>
	          </div>
	          <div class="control-group hide">
	          	<div class="controls">
		          	<div id="profile-image" class="">
		          		
		          	</div>
	          	</div>
	          </div>
	          <div class="form-actions span5">
	            <button id="signup-form" type="submit" value="Sign Up" class="btn btn-primary">Sign Up</button>
	          </div>
	        </fieldset>
	    </form>
	</div>
</script>
<script type="text/x-template" id="signupform-header">
	<h1>Join Brand a Brand</h1>
</script>
<script type="text/x-template" id="signupform-leftbar">
	<h3>Thanks!</h3>
	<p>By signing up you gain the previledge of participating in discussion on our site. You get to have a say in the process of branding a brand.</p>
</script>

<script type="text/x-template" id="forgot-password">
	<div id="forgotpassword">
		<div class="alert alert-block alert-error fade in hide">
            <h4 class="alert-heading"></h4>
            <p class="error-content"></p>
         </div>
		<form id="forgotpassword-form" class="form-horizontal" style="padding-left:0px;">
	        <fieldset>
	          <legend><h3>Recover Password</h3></legend>
	          <hr/>
	          <div class="control-group">
	            <label class="control-label"  for="email" >Email Address</label>
	            <div class="controls">
	              <input type="text"  name="email" id="email" >
	              <span class="help-inline"></span>
	            </div>
	          </div><!-- /control-group -->
	          
	          <div class="form-actions">
	            <button id="forgot-password-btn" type="submit" value="Recover" class="btn btn-primary">Recover</button> <button class="btn cancel-btn" type="button">Back</button>
	          </div>
	        </fieldset>
	    </form>
	</div>
</script>