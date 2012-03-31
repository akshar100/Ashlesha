<?php
$this->load->view("common/header"); 
?>
<body>
    <div class="topbar coloredborder">
      <div class="fill">
        <div class="container-fluid">
        
          <a class="brand" href="<?php echo base_url();?>"><?php echo img(array("src"=>'static/images/logo.png'))?></a>
        </div>
      </div>
    </div>

    <div class="container-fluid">

      <div class="content">
  		<div class="row-fluid">
  			<div class="span12">
  				<?php if(isset($helptext)){?>
	  		  <div class="alert alert-info fade in">
	            <a href="#" data-dismiss="alert" class="close">×</a>
	            <strong>Heads Up!</strong> <?php echo $helptext; ?>
	          </div>
  			<script>
  				$(".alert").alert();
  			</script>
  			<?php } ?>
  			</div>
  		</div>
        <div class="row-fluid">
          <div class="span7">
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
  <script src="<?php echo base_url();?>static/js/framework.js"> </script>
  <script>
  	var baseURL = "<?php echo base_url();?>";
  	var data = <?php echo json_encode($data); ?>; 
  	
  	YUI().use('babe',function(Y){
  		
  		Y.BABE.loadTemplate("singupform",function(){ 
  			var signup = new Y.BABE.SignUpView();
 
  			Y.one("#signup").setContent(signup.render().container);
  			signup.setData(data);
  		});
  	});
  </script>
  </body>
</html>

    
