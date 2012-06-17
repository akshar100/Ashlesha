<?php $this->load->view("mixins/page");?>
<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
YUI().use('youtube-panel','page-box',function(Y){
	var chart = new Y.YouTubeView({
  			url:"<?php echo $this->config->item('main_video');?>"
  		}); 
  	Y.one('.chart-area').setHTML("<div class='row-fluid'><div class='span7 video'></div><div id='twt' class='span3'></div></div>");
	Y.one('.chart-area').one('.video').setHTML(chart.render().get('container'));
	Y.one('.chart-area').one('#twt').setHTML(new Y.PageBoxView().render().get('container'));
	Y.one('.chart-area').one('#twt').setStyle("text-align","left");
	/*(function(){

    new TWTR.Widget({
    version: 2,
    type: 'profile',
    id : 'twt',
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
    


  })();*/
	
	
});
</script>
