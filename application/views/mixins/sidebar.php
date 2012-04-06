<script type="text/x-template" id="sidebar-unauthenticated">
	<div class="row-fluid">
		<div class="span1"
		<a href="#">
            <img alt="" src="http://placehold.it/40x40}" class="thumbnail">
         </a>
        </div>
        <div class="span3">
        	<h5>Guest User</h5>
        </div>
	</div>

</script>
<script type="text/x-template" id="sidebar-authenticated">
	<div class="row-fluid">
		<div class="span1">
		<a href="<?php echo base_url();?>">
            <img alt="" src="{IMG}" class="thumbnail span1">
         </a>
        </div>
       </div>
       <div class="row-fluid">
        <div class="span9 hidden-tablet hidden-phone">
        	<h5 class="hidden-tablet hidden-phone">{FULLNAME}</h5>
        </div>
	</div>

</script>
<script type="text/x-template" id="menu-section">
	<div class="row-fluid menuSection" >
		<div class="span12">
			<div class="row-fluid">
				<div class="span10"><ul class="nav nav-list"><li class="nav-header">{LABEL}</li></ul></div><div class="span2"><a class="more hide" href="#">More</a></div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<ul class="nav nav-list">
						
					</ul>
				</div>
			</div>
		</div>
	</div>
</script>