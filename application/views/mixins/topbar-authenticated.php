<script type="text/x-template" id="topbar-authenticated">
<div class="topbar-inner">
	
      
	<div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="<?php echo base_url(); ?>"><?php echo img(array("src"=>'static/images/logo.png','style'=>"height:40px;"))?></a>
          <div class="nav-collapse">
          	  <?php $user = $this->user->get_current();?>
          	  <?php if(!empty($user)) {?>
	          <div class="pull-right">
		            
	          		<div class="btn-group">
			          <a class="btn btn-primary" href="#"><i class="icon-user icon-white"></i> <?php echo $this->user->get_username(); ?></a>
			          <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>
			          <ul class="dropdown-menu">
			            <li><a id="edit-profile" href="/me"><i class="icon-pencil"></i> Edit</a></li>
			            <li class="divider"></li>
			            <li><a class='logout' href="<?php echo base_url();?>welcome/logout"><i class="i"></i> Sign out</a></li>
			          </ul>
			  		</div>
	          </div>
	          <?php }?>
	          <div class="pull-right right-pad30">
		          <div class="btn-group navbtns">
		          			<a rel="tooltip" title="Home" class="btn btn-info" href="/"><i class="icon-home icon-white"></i> <span></span></a>
		          			<a rel="tooltip" title="Groups" class="btn btn-info grouppage" href="/grouppage"><i class="icon-comment icon-white"></i> <span></span></a>
			          		<a rel="tooltip" title="Notifications" id="notification-btn" class="btn btn-info" href="#" ><i class="icon-envelope icon-white"></i> <span></span></a>
			          		<a id="admin-btn" class="btn btn-info hide" href="/admin" rel="popover">Console</a>
			      </div>
			      
		      </div>
		      <div class="pull-right topbar-buttons right-pad30">
		      	
		      </div>
          </div>
        </div>
      </div>
    </div>














</script>