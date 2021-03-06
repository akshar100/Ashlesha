<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $this->lang->line('site_title');?></title>
    <meta name="description" content="">
    <meta name="author" content="Akshar">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="<?php echo base_url();?>/static/bootstrap2/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="<?php echo base_url();?>/static/css/override.css">
    <link rel="stylesheet" href="<?php echo base_url();?>/static/css/editor.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" ></script>
	<script src="<?php echo base_url();?>/static/js/parserRules.js" ></script>
	<script src="<?php echo base_url();?>/static/bootstrap2/bootstrap/js/bootstrap.js" ></script>
	
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
    <script src="http://yui.yahooapis.com/3.5.1/build/yui/yui-min.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script>google.load('visualization', '1.0', {'packages':['corechart']});</script>

    <?php 
    $key = $this->config->item('googlemaps_api'); 
	if(!empty($key)) {
		?><script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=<?php echo $this->config->item('googlemaps_api'); ?>&sensor=false">
     <?php
	}?>
   	 </script>

  </head>

<body>