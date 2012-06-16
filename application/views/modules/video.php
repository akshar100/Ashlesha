<script>
YUI().use('youtube-panel',function(Y){
	var chart = new Y.YouTubeView({
  			url:"http://www.youtube.com/embed/NuqvEJNq9Jc"
  		}); 
	Y.one('.chart-area').setHTML(chart.render().get('container'));
});
</script>
