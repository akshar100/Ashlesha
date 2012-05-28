Hi,

<?php echo $user;?> has invited you to join <?php echo $title;?>. <?php echo $existing; ?>

<?php if(!$existing){?>
It appears that you are not member of <?php echo base_url();?>. So you will have to signup first (which is superfast) and you will automatically find the group in the groups section.
<?php } ?>


Please visit the following link to see the group:

<?php echo $url; ?> 


Thanks and Regards

<?php echo base_url();?>
