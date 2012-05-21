<script type="text/x-template" id="notification-row-friend">
	<div class="row-fluid">
		<div class="span12">
			<div class="alert alert-info">
		       <button data-dismiss="alert" class="close">×</button>
		        <div class="row-fluid">
		        	<img src="<?php echo base_url();?>in/profile_pic/{SOURCE_ID}" class="span1" style="max-width:40px;"/> 
		        	<div class="span10">{SOURCE_USER} has accepted your friend request. <button type='button' class='btn btn-primary visit'>Visit Profile</button> </div></div>
		      </div>
		</div>
		
	</div>
</script>
<script type="text/x-template" id="notification-row-follow">
	<div class="row-fluid">
		<div class="span12">
			<div class="alert alert-info">
		       <button data-dismiss="alert" class="close">×</button>
		        <div class="row-fluid">
		        	<img src="<?php echo base_url();?>in/profile_pic/{SOURCE_ID}" class="span1" style="max-width:40px;"/> 
		        	<div class="span10">{SOURCE_USER} is now following you. <button type='button' class='btn btn-primary visit'>Visit Profile</button> </div></div>
		      </div>
		</div>
		
	</div>
</script>
<script type="text/x-template" id="notification-row-friend_request">
	<div class="row-fluid">
		<div class="span12">
			<div class="alert alert-info">
		       <button data-dismiss="alert" class="close">×</button>
		        <div class="row-fluid">
		        	<img src="<?php echo base_url();?>in/profile_pic/{SOURCE_ID}" class="span1" style="max-width:40px;"/> 
		        	<div class="span10">{SOURCE_USER} has sent you a friends request. <button type='button' class='btn btn-primary visit'>Visit Profile</button> </div></div>
		      </div>
		</div>
		
	</div>
</script>
<script type="text/x-template" id="notification-row-group_add">
	<div class="row-fluid">
		<div class="span12">
			<div class="alert alert-info">
		       <button data-dismiss="alert" class="close">×</button>
		        <div class="row-fluid">
		        	<img src="<?php echo base_url();?>in/profile_pic/{SOURCE_ID}" class="span1" style="max-width:40px;"/> 
		        	<div class="span10">{SOURCE_USER} has added you to the group {GROUP_NAME}. <button type='button' class='btn btn-primary visit'>Visit group</button> </div></div>
		      </div>
		</div>
		
	</div>
</script>
<script type="text/x-template" id="clear-all-btn">
	<div class='row-fluid'><div class='span5 well'><button type='button' class='btn btn-primary clear'>Clear All</button></div></div>
</script>