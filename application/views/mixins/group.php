<script type="text/x-template" id="create-group">
<div class="span12">
	<div class="row-fluid">
		<div class="span9">
			<div class="alert alert-info">
		        <a data-dismiss="alert" class="close">×</a>
		        <strong>Heads up!</strong> You are creating a Project Group. Please make sure your project group is set as open. We will later assign you a more memorable unique code.
		     </div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span9">
			<form class="form-vertical">
			<div id="event-form" class="form">
							<fieldset>
								<legend>Create a <?php echo $this->lang->line('group');?></legend>
								<div class="control-group">
									<div class="row-fluid">
										<input type="text" placeholder="Add a title" name="title"  class="span12">
										<p class="help-block"></p>
									</div>
								</div>
								<div class="control-group">
									<div class="row-fluid">
										<input type="text" placeholder="<?php echo $this->lang->line("tags");?>" name="tags"  class="span12 autocomplete">
										<p class="help-block"></p>
									</div>
								</div>
								<div class="control-group">
									<div class="row-fluid">
										<label class="radio">
							                <input type="radio" checked="" value="open"  name="visibility">
							               		Open
							            </label>
							            
							            <label class="radio">
							                <input type="radio" value="closed"  name="visibility">
							                	Closed
							            </label>
							            <label class="radio">
							                <input type="radio" value="hidden"  name="visibility">
							                	Hidden
							            </label>
										<p class="help-block">If you set your <?php echo $this->lang->line('group');?> as closed you will have to confirm each subscription, for hidden you will have to add users manually.</p>
									</div>
								</div>
			
								<div class="control-group">
									<div class="row-fluid">
										<textarea rows="3" name="description"  class="span12" placeholder="Description......"></textarea>
										<p class="help-block">
								            Mention the purpose of the board, who can join, what activity is expected and so on.
								        </p>
							        </div>
							    </div>
							    <div class="contol-group">
							    	<div class="pull-right">
							    			
							    			<button type="button" class="btn btn-small btn-primary">Create</button>  
							    	</div>
							    </div>
							</fieldset>
			</div><!--end form -->
			</form>
		</div>
	</div>
	
</div>	
</script>
<?php $this->load->view("mixins/question");?>

<script type="text/x-template" id="group-page-sidebar">
	<div class="row-fluid">
		
		<img src="{GROUP_IMAGE}" class='thumbnail span6'>
		
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<button type="button" id='invite' class="btn btn-success"><i class='icon-magnet icon-white'></i> Invite</button>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<H5>Group Type: {VISIBILITY}</H5>
			<p>
			<button type="button" class="btn btn-info members">Members</button>
			<button type="button" class="btn btn-info hide home">Back</button>
			</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 membership-request">
			<hr/>
		</div>
	</div>
</script>
<script type="text/x-template" id="group-page-main">
	<div class="row-fluid">
		<div class="span9">
			<h2>{GROUP_TITLE}</h2>
			<h3><small>{GROUP_DESCRIPTION}</small></h3>
		</div>
		<div class="span3">
			<div class="group-join">
				<button type="button" class="btn btn-primary join-btn"><i class="icon-plus icon-white"></i> Join</button>
				<button type="button" class="btn btn-warning leave-btn"><i class="icon-minus icon-white"></i> Requested</button>
				<button type="button" class="btn btn-danger unjoin-btn hide"><i class="icon-minus icon-white"></i> Leave</button>
				<button type="button" class="btn btn-danger delete-btn hide"><i class="icon-minus icon-white"></i> Delete</button>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 status-block">
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 wall">
			
		</div>
	</div>
</script>
<script type="text/x-template" id="invite-group-members">
	    <div class="modal" id="invite-box">
		    <div class="modal-header">
		    <button class="close" data-dismiss="modal">×</button>
		    <h3>Invite Users</h3>
		    </div>
		    <div class="modal-body">
		    </div>
		    <div class="modal-footer">
		    <a href="#" class="btn btn-primary send-invites">Send Invite</a>
		    </div>
    	</div>
</script>
<script type="text/x-template" id="invite-users-box">
	
	<ul class="nav nav-tabs" id="">
		<li class="active"><a href="#" rel="email">By Email</a></li>
		<!-- <li><a href="#" rel="connections"><?php echo $this->lang->line('site_name');?></a></li>-->
		<li><a href="#" rel="fb">Via Facebook</a></li>
	</ul>
	 
	<div class="tab-content">
		<div class="tab-pane active" id="email">
			<textarea id="email_invites" cols="50" rows="10" placeholder="enter one email address per line..."></textarea>
		</div>
		<div class="tab-pane" id="connections">
			<form><input class="input x-large" id="search-box"/> <button></button> </form> 
		</div>
		<div class="tab-pane" id="fb">We have not managed to fetch your facebook friends.</div>
	</div>
 
</script>
<script type="text/x-template" id="user-request-accept">
	<div class="row-fluid">
		<img src="<?php echo base_url();?>in/profile_pic/{USER_ID}" class="span2"/>
		<div class="span10"><a href="/user/{USER_ID}">{USER_NAME}</a>
			<div class="row-fluid">
				<div class="span12">
			<button type="button" class="btn btn-primary accept-btn btn-mini">Accept</button>
			<button type="button" class="btn btn-danger reject-btn btn-mini">Reject</button>
		</div>
			</div>
			
		</div>
		
	</div>
</script>
<script type="text/x-template" id="group-member-list">
	<div class="row-fluid">
		<div class="span6 member-list">
			
		</div>
	</div>
</script>