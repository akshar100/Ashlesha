YUI().use('test-console','babe', function (Y) {
    
    Y.namespace("btest.ui");
    Y.btest.ui.HomePage = new Y.Test.Case({
	    name : "Homepage Test",
	    setUp : function () {
	    },
	    tearDown : function () {
	      
	    },
	    testLogoLoaded : function (){
	        var Assert = Y.Assert;
	        this.wait(function(){
	            Assert.isObject(Y.one(".brand"),"Logo failed load");
	        }, 5000);
	
	    }
	
	});
	Y.Test.Runner.add(Y.btest.ui.AsyncTestCase);
    new Y.Test.Console().render('#log');
    Y.Test.Runner.run();
});