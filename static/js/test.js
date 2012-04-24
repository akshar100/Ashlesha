YUI().use('test-console','babe','event','node-event-simulate', function (Y) { 
    
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
	
	    },
	    
	
	});
	 Y.btest.ui.LandingPage = new Y.Test.Case({
	    name : "Landing Page Test",
	    setUp : function () {
	    },
	    tearDown : function () {
	      
	    },
	    testLogoLoaded : function (){
	        var Assert = Y.Assert;
	        this.wait(function(){
	            Assert.isObject(Y.one(".brand"),"Logo failed load");
	        }, 1000);
	
	    },
	    testLoginBox : function (){
	        var Assert = Y.Assert;
	        this.wait(function(){
	            Assert.isObject(Y.one("#username"),"Username Textbox not present");
	            Assert.isObject(Y.one("#password"),"Password box not present");
	            Assert.isObject(Y.one("button[type=submit]"),"Sign in Button not Present");
	            Assert.isObject(Y.one("#forgot-password-link"),"Forgotpassword link not Present");
	            //Check for open_id
	            if(facebook_login){ Assert.isNotNull(Y.one('a.facebook_login'),"Facebook Login should  be present");}
	            else{Assert.isNull(Y.one('a.facebook_login'), 'Facebook login need not be present '); }
	           
	            if(yahoo_login){ Assert.isNotNull(Y.one('a.yahoo_login'),"Yahoo Login should  be present");}
	            else{Assert.isNull(Y.one('a.yahoo_login'), 'Yahoo login need not be present '); }
	           
	            if(google_login){ Assert.isNotNull(Y.one('a.google_login'),"Google Login should  be present");}
	            else{ Assert.isNull(Y.one('a.google_login'), 'Google login need not be present '); }
	            
	            
	        }, 1000);
	
	    },
	    testSignupBox:function (){
	        var Assert = Y.Assert;
	        this.wait(function(){
	        	var c = Y.one("#signupform");
	            Assert.isObject(c.one("#username"),"Username Textbox not present");
	            Assert.isObject(c.one("#password"),"Password box not present");
	            Assert.isObject(c.one("#email"),"Email box not present");
	            Assert.isObject(c.one("#fullname"),"Fullname box not present");
	            Assert.isObject(c.one("button[type=submit]"),"Sign Up Button not Present");
	        	
	            c.one("button[type=submit]").simulate('click');
	            this.wait(function(){
	            	
	            	Assert.isTrue(c.one("#username").ancestor("div.control-group").hasClass('error'),"Username is empty but no error thrown");
	            	Assert.isTrue(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown");
	            	Assert.isTrue(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
	            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
	            	c.one('#username').set("value","akshar"+Math.random());
	            	c.one("button[type=submit]").simulate('click');
	            	this.wait(function(){
		            	Assert.isFalse(c.one("#username").ancestor("div.control-group").hasClass('error'),"Username is empty but no error thrown");
		            	Assert.isTrue(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown");
		            	Assert.isTrue(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
		            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
	           		 	c.one('#password').set("value","akshar"+Math.random());
			            c.one("button[type=submit]").simulate('click');
			            this.wait(function(){
			            	Assert.isFalse(c.one("#username").ancestor("div.control-group").hasClass('error'),"Username is empty but no error thrown");
			            	Assert.isFalse(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown");
			            	Assert.isTrue(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
			            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
			            	c.one('#email').set("value","akshar"+Math.random()+"@akshar.co.in");
				            c.one("button[type=submit]").simulate('click');
				            this.wait(function(){
				            	Assert.isFalse(c.one("#username").ancestor("div.control-group").hasClass('error'),"Username is empty but no error thrown");
				            	Assert.isFalse(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown");
				            	Assert.isFalse(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
				            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
				            },2000);
			            	
			            	
			            },2000);
	           		 
	           		 },2000);
	            
	            },2000);
	           
	            
	            
	            
	            
	        }, 3000);
	
	    }
	    
	
	});
	if(window.current_user)
	{
		Y.Test.Runner.add(Y.btest.ui.HomePage);
	}
	else
	{
		Y.Test.Runner.add(Y.btest.ui.LandingPage);
	}
	
    new Y.Test.Console({ newestOnTop : true,
        filters: {
            pass: true,
            fail: true
        }}).render('#log');
    Y.Test.Runner.run();
});