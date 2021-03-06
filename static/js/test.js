YUI().use('test-console','babe','event','node-event-simulate', function (Y) { 
    
    Y.namespace("btest.ui");
    var Assert = Y.Assert;
    Y.btest.ui.HomePage = new Y.Test.Case({
	    name : "Homepage Test",
	    setUp : function () {
	    },
	    tearDown : function () {
	      
	    },
	    testLogoLoaded : function (){
	        
	        this.wait(function(){
	            Assert.isObject(Y.one(".brand"),"Logo failed load");
	        }, 1000);
	
	    },
	    testTopbar:function(){
	    	 this.wait(function(){
	            Assert.isObject(Y.one("a#edit-profile").ancestor("div.btn-group").one("a.dropdown-toggle"),"Edit Profile Dropdown Present");
	            Y.one("a#edit-profile").ancestor("div.btn-group").one("a.dropdown-toggle").simulate('click');
	            Assert.isObject(Y.one("a#edit-profile"),"Edit profile link present");
	            //Y.one("a#edit-profile").simulate('click');
	            Assert.isObject(Y.one("a#notification-btn"),"Edit profile link present");
	        }, 2000);
	        
	    },
	    testNotifications:function(){
	    	var target_user = 'testuser',notification_action='friend';
	    	var notify = new Y.BABE.NotificationModel({
	    		source_user:window.current_user,
	    		target_user:target_user,
	    		notification_action:notification_action
	    	});
	    	notify.save();
	    	this.wait(function(){  
	    		
	    		Assert.isNotNull(notify.get('_id'),"Notification may not have saved");
	    		var id = notify.get('_id');
	    		var notify2 = new Y.BABE.NotificationModel({
	    			'_id':id
	    		});
	    		notify2.get('_id');
	    		notify2.load();
	    		this.wait(function(e){
	    			Assert.areEqual(target_user,notify2.get('target_user'),"Notification not retrived ");
	    			Assert.areEqual(notification_action,notify2.get('notification_action'),"Notification not retrived");
	    			Assert.isNotNull(notify2.get('_id'),"REtrived item id was null");
	    			notify2.set('mark_read','true');
	    			notify2.save();
	    			this.wait(function(){
	    				var notify3 = new Y.BABE.NotificationModel({
			    			'_id':id
			    		});
			    		notify3.get('_id');
			    		notify3.load();
			    		this.wait(function(){
			    			Assert.areEqual(notify2.get('mark_read'),'true',"Mark_REad not saved");
			    		},1000);
	    			},1000);
	    		
	    		},2000);
	    		
	    		
	    	},2000);
	    	
	    	
	    },
	    testNotificationList:function(){
	    	var n = new Y.BABE.NotificationList(); 
	    	n.load({
	    		name:'notificationlist'
	    	}); 
	    	this.wait(function(){
	    		n.each(function (item, index) {
	    			Assert.areEqual(window.current_user,item.get('target_user'),"Wrong notifications");
	    			Assert.areSame(item.get('mark_read'),'',"Stale notifications");
	    			Assert.isNotNull(item.get('_id'),"Retrived item id was null");
	    		});
	    	},2000);
	    },
	    testStatusBlock:function(){
	    	AppUI.navigate("/");
	    	this.wait(function(){
	    		Assert.isObject(Y.one('#statusblock'),"Statusblock not present");
	    		if(APPCONFIG.question_enabled)
	    		{
	    			Assert.isFalse(Y.one('#statusblock').one("a.question").hasClass('hide'),"Question link not present");
	    			Y.one('#statusblock').one("a.question").simulate('click');
	    			this.wait(function(){
	    				Assert.isObject(Y.one('#question-form'),"Form did not open");
	    				Y.one('#question-form').one("input[name=title]").set('value',Math.random());
	    				
	    				Y.one('#question-form').one("textarea").set('value','Test Question');
	    				Y.one('#question-form').one('button.btn-primary').simulate('click');
	    				this.wait(function(){
	    					Assert.isNull(Y.one('#question-form'),"Form did not get submitted");
	    					this.wait(function(){
	    							Assert.isObject(Y.one("#modal-from-dom"),"The message box did not appear or the for did not get submitted");
	    							Assert.areSame(Y.one("#modal-from-dom").getStyle('display'),"block","The message box did not appear or the for did not get submitted");
	    							Y.one(".close-dialog").simulate("click");
	    						
	    					},2000); 
	    				
	    				},1000);
	    			},500);
	    		}
	    		else
	    		{
	    			Assert.isTrue(Y.one('#statusblock').one("a.question").hasClass('hide'),"Question link present");
	    		}
	    		if(APPCONFIG.event_enabled)
	    		{
	    			Assert.isFalse(Y.one('#statusblock').one("a.event").hasClass('hide'),"Event link not present");
	    		}
	    		else
	    		{
	    			Assert.isTrue(Y.one('#statusblock').one("a.event").hasClass('hide'),"Event link present");
	    		}
	    		if(APPCONFIG.survey_enabled)
	    		{
	    			Assert.isFalse(Y.one('#statusblock').one("a.survey").hasClass('hide'),"Survey link not present");
	    		}
	    		else
	    		{
	    			Assert.isTrue(Y.one('#statusblock').one("a.survey").hasClass('hide'),"Survey link present");
	    		}
	    		if(APPCONFIG.post_enabled)
	    		{
	    			Assert.isFalse(Y.one('#statusblock').one("a.post").hasClass('hide'),"Post link not present");
	    			Y.one('#statusblock').one("a.post").simulate('click');
	    			this.wait(function(){
	    				Assert.isObject(Y.one('#painpoint-form'),"Form did not open");
	    				Y.one('#painpoint-form').one("input[name=tags]").set('value',Math.random());
	    				if(APPCONFIG.post_sector_enabled)
	    				{
	    					Assert.isFalse(Y.one('#painpoint-form').one("input[name=sector]").hasClass('hide'),"Sector field is hidden");
	    					Y.one('#painpoint-form').one("input[name=sector]").set('value','banks');
	    				}
	    				Y.one('#painpoint-form').one("textarea[name=post]").set('value','Test Painpoint');
	    				Y.one('#painpoint-form').one('button.btn-primary').simulate('click');
	    				this.wait(function(){
	    					Assert.isNull(Y.one('#painpoint-form'),"Form did not get submitted");
	    					this.wait(function(){
	    							Assert.isObject(Y.one("#modal-from-dom"),"The message box did not appear or the for did not get submitted");
	    							Assert.areSame(Y.one("#modal-from-dom").getStyle('display'),"block","The message box did not appear or the for did not get submitted");
	    							Y.one(".close-dialog").simulate("click");
	    						
	    					},2000); 
	    				
	    				},1000);
	    			},500);
	    		}
	    		else
	    		{
	    			Assert.isTrue(Y.one('#statusblock').one("a.post").hasClass('hide'),"Post link present");
	    		}
	    	},2000);
	    }
	    
	
	});
	Y.btest.ui.LandingPage = new Y.Test.Case({
	    name : "Landing Page Test",
	    setUp : function () {
	    },
	    tearDown : function () {
	      
	    },
	    testLogoLoaded : function (){
	        
	        this.wait(function(){
	            Assert.isObject(Y.one(".brand"),"Logo failed load");
	        }, 1000);
	
	    },
	    testLoginBox : function (){
	        
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
			            	Assert.isFalse(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown.");
			            	Assert.isTrue(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
			            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
			            	c.one('#email').set("value","akshar"+Math.random()+"@akshar.co.in");
				            c.one("button[type=submit]").simulate('click');
				            this.wait(function(){
				            	Assert.isFalse(c.one("#username").ancestor("div.control-group").hasClass('error'),"Username is empty but no error thrown");
				            	Assert.isFalse(c.one("#password").ancestor("div.control-group").hasClass('error'),"Password is empty but no error thrown");
				            	Assert.isFalse(c.one("#email").ancestor("div.control-group").hasClass('error'),"Email is empty but no error thrown");
				            	Assert.isTrue(c.one("#fullname").ancestor("div.control-group").hasClass('error'),"Fullname is empty but no error thrown");
				            },2500);
			            	
			            	
			            },2500);
	           		 
	           		 },2500);
	            
	            },2500);
	           
	            
	            
	            
	            
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
	
	setTimeout(function(){
		new Y.Test.Console({ newestOnTop : true,
        filters: {
            pass: true,
            fail: true
     }}).render('#log');
    Y.Test.Runner.run();
		
	},3000);
    
});