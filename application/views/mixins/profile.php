
<script type="text/x-template" id="profileview-template">
	<div id="profileview">
		<div class="row-fluid">
			<div class="span6">
				<form id="profileviewform" class="form-horizontal" style="padding-left:0px;">
			        <fieldset>
			          <legend><h3>Profile</h3></legend>
			             <div class="alert alert-info">
			             	<p><strong>Heads Up!</strong> Tell us more about you.
		   				 </div>
			          <hr/>
			          <div class="control-group">
			            <label class="control-label"  for="username">Username</label>
			            <div class="controls">
			              <input type="text"  name="username" id="username" disabled="" class="xlarge disabled" data-content="Username can not be changed." rel="popover" data-original-title="Tip" value="<?php echo $this->user->get_username();?>">
			              <span class="help-inline"></span>
			            </div>
			          </div><!-- /control-group -->
			          <div class="control-group">
			            <label class="control-label"  for="password">Change Password</label>
			            <div class="controls">
			              <input type="password"  name="password" id="password" class="xlarge" data-content="Entering a new password is same as changing your existing password." rel="popover" data-original-title="Tip">
			              <span class="help-inline"></span>
			            </div>
			          </div><!-- /control-group -->
			          <div class="control-group">
			            <label class="control-label"  for="email">Email</label>
			            <div class="controls">
			              <input type="text"  name="email" id="email" disabled="" class="xlarge" data-content="Email address can not be changed." rel="popover" data-original-title="Tip" value="<?php echo $this->user->get_email();?>">
			              <span class="help-inline"></span>
			            </div>
			          </div><!-- /control-group -->
			          <div class="control-group">
			            <label class="control-label"  for="fullname">Full Name</label>
			            <div class="controls">
			              <input type="text"  name="fullname" id="fullname" class="xlarge">
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
			          <div class="control-group">
			            <label class="control-label"  for="state">State</label>
			            <div class="controls">
			              <input type="text"  name="state" id="state" class="xlarge">
			              <span class="help-inline"></span>
			            </div>
			          </div><!-- /control-group -->
			          <div class="control-group">
			            <label class="control-label"  for="country">Country</label>
			            <div class="controls">
			              <input type="text" name="country" id="country" class="xlarge">
			              <span class="help-inline"></span>
			            </div>
			          </div><!-- /control-group -->
			          <div class="form-actions">
			            <button id="profile-submit-form" type="submit" value="Sign Up" class="btn btn-primary">Save</button>
			          </div>
			        </fieldset>
			    </form>
			</div>
			<div class="span4">
				<fieldset>
			          <legend><h3>Your avatar</h3></legend>
			    </fieldset>
				<div class="alert alert-info">
			             	<p><strong>Heads Up!</strong> It will be great if it is a square image. But dont worry we will accept and adjust whatever you have got. 
		   		</div>
				<hr/>
				<div class="row-fluid">
					<div class="span12">
						<div class="image_preview">
	   	 					
	   	 				</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span12">
						<div class="">
							<p><button class="btn btn-small btn-primary img-upload"><i class="icon-picture icon-white"></i> Upload Profile Photo</button>
							<?php 
								
								$user = $this->user->is_facebooked();
								if(!empty($user))
								{
									?>
									<button class="btn btn-small btn-primary img-upload-facebook"><i class="icon-picture icon-white"></i> Get from Facebook</button>
									<?php
								}
							?>
							</p>
						</div>
						
					</div> <!--SPAN-->
				</div>
				</div>
				
			</div>
		</div>
		
	</div>
	
		
	
</script>
