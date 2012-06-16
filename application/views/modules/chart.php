<script>
YUI().use('babe',function(Y){
	var chart = new Y.BABE.BarChartView({
  			parentNode:Y.one('.chart-area')
  		}); 
	chart.render();
});
</script>