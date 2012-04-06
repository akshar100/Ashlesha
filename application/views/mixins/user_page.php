<?php $this->load->view("mixins/wall");?>
<script type="text/x-template" id="user_page">
	<div class="row-fluid" id="user_details">
		<div class="span1"><div class="row-fluid"><img class="thumbnail span10" src='<?php echo base_url();?>in/profile_pic/{USERID}'/></div></div>
		<div class="span3">
			<h4>{FULLNAME}</h4>
		</div>
		<div class="span8">
			<button id="follow_user" class="btn btn-success" rel="popover" ><i class="icon-eye-open icon-white"></i> Follow</button>
			<button id="connect_user" class="btn btn-success" rel="popover" ><i class="icon-plus icon-white"></i> Connect</button>
		</div>
		
	</div>
	<div class="row-fluid"><div class="span12"><hr/></div></div>
	<div class="row-fluid" id="user_wall">
		
	</div>
</script>
