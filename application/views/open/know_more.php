<?php
$this->load->view("common/header"); 
?>
<body>
    <div class="topbar coloredborder">
      <div class="fill">
        <div class="container-fluid">
        
          <a class="brand" href="<?php echo base_url();?>"><?php echo img(array("src"=>'static/images/logo.png'))?></a>
          <hr/>
          <div class="row-fluid">
  			<div class="span2">&nbsp;</div>
  			<div class="span8">
  				<div class="subnav span8" id="">
				    <ul class="nav nav-pills" id="yui_3_5_1_1_1337206827715_1499">
				     
				      <li id="yui_3_5_1_1_1337206827715_1498"><a href="#about" id="yui_3_5_1_1_1337206827715_1497">About</a></li>
				       <li id="yui_3_5_1_1_1337206827715_1498"><a href="#terms" id="yui_3_5_1_1_1337206827715_1497">Terms and Conditions</a></li>
				       
				     
	    			</ul>
   		 		</div>
  			</div>
  			<div class="span2">&nbsp;</div>
  		</div>
          
        </div>
      </div>
    </div>

    <div class="container-fluid">

      <div class="content">
  		
  		<div class="row-fluid">
  			<div class="span2">&nbsp;</div>
  			<div class="span8">
  				<hr/>
  				<h3><?php echo $this->lang->line('about_title'); ?></h3><a name="about"></a>
  				
  				<?php echo $this->lang->line('about_text'); ?>
  			
  				<h3><?php echo $this->lang->line('tos_title'); ?></h3><a name="terms"></a>
		
				<div class="well"><?php echo $this->lang->line('tos_text'); ?></div>
	


  		
  			</div>
  			<div class="span2">&nbsp;</div>
  		</div>
      </div>
	
     

    </div> <!-- /container -->
    <?php $this->load->view('common/footer');?>
  <script src="<?php echo base_url();?>static/js/framework.js"> </script>
 	<script>
 		$('.subnav').scrollspy();
 	</script>
  </body>
</html>

    
