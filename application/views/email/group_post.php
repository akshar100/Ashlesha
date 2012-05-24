Hi <?php echo $target_user; ?>!

<?php echo $source_user; ?> has posted following in "<?php echo $resource['title']; ?>"; 

-------------
<?php echo $secondary['text']; ?>

-------------

You can view the details by visiting: <?php echo base_url()."/group/".md5($resource['title'])."/".$resource['title'];?> 

Thanks 

<?php echo base_url(); ?>
