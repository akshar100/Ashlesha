
<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
(function(){

    new TWTR.Widget({
    version: 2,
    type: 'profile',
    id : 'homepage-widget',
    rpp: 4,
    interval: 30000,
    width: 'auto',
    height: 'auto',
    theme: {
    shell: {
        background: 'transparent', //this is important
        color: '#333'
    },
    tweets: {
      background: 'transparent', //this is important
          color: '#666',
      links: '#d14836'
    }
    },
    features: {
    scrollbar: false,
    loop: false,
    live: false,
    behavior: 'all'
    }
    }).render().setUser('<?php echo $this->config->item('twitter_handle');?>').start();


    })();
</script>

