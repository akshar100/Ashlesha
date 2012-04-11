YUI.add('babe', function (Y) {
	window.Y = Y;
   var cache = new Y.CacheOffline({max:200});
   cache.flush();
   function listSync(action,options,callback){
			
			if(options.name=="commentlist" && action=="read")
			{
					Y.io(baseURL+'in/comments',{
						method:'POST',
						data:{post_id:options.post_id},
						on:{
							success:function(i,o,a){
								var data = Y.JSON.parse(o.responseText);
								callback(null,data);
							}
						}
					});
					
					return;
					
			}
			if(options.name=="menusectionlist" && action=="read")
			{
					
					
					Y.requestList({
						data:"option="+options.name,
						callback:callback
					});
					return;
					
			}
			
			if(options.name=="menuitemlist" && action=="read")
			{
				
					var data = [new Y.MenuItemModel({ id:1,label:'signup',view:'signup'}),new Y.MenuItemModel({id:2,label:'item1'}),new Y.MenuItemModel({id:3,label:'item1'})];
					
					Y.requestList({
						data:"option="+options.name+"&section="+options.section,
						callback:callback
					});
					
					return;
					
			}
			if(options.name=="wallposts" && action=="read")
			{
					if(!options.count)
					{
						options.count=8;
					}
					
					Y.io(baseURL+'in/wallposts',{
						method:'POST',
						data:{count:options.count},
						on:{
							success:function(i,o,a){
								var data = Y.JSON.parse(o.responseText)
								if(Y.Lang.isFunction(options.callback)) { options.callback(); }
								callback(null,data);
							}
						}
					});
					
					return;	
			}
			if(options.name=="myposts" && action=="read")
			{
					if(!options.count)
					{
						options.count=8;
					}
					if(!options.user_id)
					{
						options.user_id=window.current_user;
					}
					
					Y.io(baseURL+'in/userposts',{
						method:'POST',
						data:{count:options.count,user_id:options.user_id},
						on:{
							success:function(i,o,a){
								var data = Y.JSON.parse(o.responseText)
								callback(null,data);
							}
						}
					});
					return;	
			}
			
			if(options.name=="groupList" && action=="read")
			{
				
				
				Y.io(baseURL+'in/user_groups',{
						method:'POST',
						on:{
							success:function(i,o,a){
								var data = Y.JSON.parse(o.responseText)
								callback(null,data);
							}
						}
					});
			}
			
			
		} 
   
    function modelSync(action,options,callback){
    		
			var data = this.toJSON();
			if(data._id==0){ 
				action = "create";
				
			}
			if(this.name=="postModel" || this.name=="eventModel" || this.name=="questionModel")
			{
				if(action=="create")
				{
					var model = this ; 
					data = this.toJSON();
					
					data.id  = Y.Lang.now();
					Y.io(baseURL+'io/create_post',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(!response.error && response.data)
								{
									model.setAttrs(response.data);
								}
								callback(null,data);
							}
						}
					});
					 
					return;
				}
				if(action=="update")
				{
					var model = this ; 
					var data = this.toJSON();
					data.id  = Y.Lang.now();
					Y.io(baseURL+'io/update_post',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(!response.error && response.data)
								{
									model.setAttrs(response.data);
								}
								callback(null,data);
							}
						}
					});
					 
					return;
				}
			}
			if(this.name=="groupModel")
			{
				if(action=="create")
				{
					var model = this ; 
					data = this.toJSON();
					
					data.id  = Y.Lang.now();
					Y.io(baseURL+'io/create_group',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(!response.error && response.data)
								{
									model.setAttrs(response.data);
								}
								callback(null,data);
							}
						}
					});
					 
					return;
				}
			}
		
			if(this.name=="commentModel")
			{
				if(action=="create")
				{
					var model = this ; 
					var data = this.toJSON();
					data.id  = Y.Lang.now();
					Y.io(baseURL+'io/create_comment',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(!response.error && response.data)
								{
									model.setAttrs(response.data);
								}
								
								callback(null,response.data);
							}
						}
					});
					 //THIS NEEDS TO BE INSIDE AN AJAX CALL
					return;
				}
				
			}
		
			if(this.name=="userModel")
			{
				var model = this ;
				if(action=="update")
				{
					 
					var data = this.toJSON();
					
					Y.io(baseURL+'io/update_user',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(response.success && response.data)
								{
									model.setAttrs(response.data);
									callback(null,data);
								}
								else
								{
									callback(response.error);
								}
							}
						}
					});
					 
					return;
				}
				if(action=="read")
				{
					var data = this.toJSON()
					Y.io(baseURL+'io/get_user/',{
						method:'POST',
						data:{'_id':data['_id']},
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(response)
								{
									model.setAttrs(response);
								}
								
								callback(null,model.toJSON());
								
							}
						}
					});
				}
			}
			
			if(this.name=="ConnectionModel")
			{
				var model = this ;
				if(action=="update" || action=="create")
				{
					 
					var data = this.toJSON();
					
					Y.io(baseURL+'io/update_connection',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(response.success && response.data)
								{
									model.setAttrs(response.data);
									callback(null,data);
								}
								else
								{
									callback(response.error);
								}
							}
						}
					});
					 
					return;
				}
				if(action=="read")
				{
					var data = this.toJSON()
					Y.io(baseURL+'io/get_connection/',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								for(var k in response)
								{
									if(response[k] == "false"){ response[k] = false; }
									if(response[k] == "true"){ response[k] = true; }
								}
								if(response)
								{
									model.setAttrs(response);
								}
								
								callback(null,model.toJSON());
								
							}
						}
					});
				}
			}
		
			if(this.name=='relationshipModel')
			{
				var model = this ;
				if(action=="update" || action=="create")
				{
					 
					var data = this.toJSON();
					
					Y.io(baseURL+'io/update_relationship',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								if(response.success && response.data)
								{
									model.setAttrs(response.data);
									callback(null,data);
								}
								else
								{
									callback(response.error);
								}
							}
						}
					});
					 
					return;
				}
				if(action=="read")
				{
					var data = this.toJSON()
					Y.io(baseURL+'io/get_relationship/',{
						method:'POST',
						data:data,
						on:{
							success:function(i,o,a){
								var response = Y.JSON.parse(o.responseText);
								for(var k in response.data)
								{
									if(response[k] == "false"){ response[k] = false; }
									if(response[k] == "true"){ response[k] = true; }
								}
								if(response)
								{
									model.setAttrs(response.data);
								}
								
								callback(null,model.toJSON());
								
							}
						}
					});
				}
			}
		}
    var sanitizeUI = function()
    {
    	Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
		Y.loadTemplate("topbar",function(){ Y.App.views.topbar = new Y.TopBarView(); });
		Y.loadTemplate("sidebar",function(){ Y.App.views.sidebar = new Y.SideBarView(); });
    };
    var autoExpand = function(r){
    	
    	r.on("change|keyup",function(){
					c = Y.Node.create("<div/>");
					c.addClass("textarea");
					c.setStyle("width",r.getComputedStyle("width"));
					c.setStyle("display","block");
					c.setContent("<pre>"+r.get("value")+"</pre>");
					c.setStyle("position","absolute");
					c.setStyle("z-index","-20");
					Y.one("body").append(c);
					var targetHeight = c.getComputedStyle('height');
					r.setStyle("height",targetHeight);
					c.setStyle("display","none");
					c.remove();
					
				});
    };
    var ConnectionModel = Y.Base.create('ConnectionModel',Y.Model,[],{
    	sync:modelSync
    	,idAttribute:'_id'
    	,isFriend:function(){
    		if(this.get('target_connects_source') && this.get('source_connects_target')){
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    	,requestedFriend:function(){
    		if(this.get('target_connects_source') && !this.get('source_connects_target')){
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    	,isFollowing:function(){
    		if(this.get('source_follows_target'))
    		{
    			return true;
    		}
    		return false;
    	}
    	},{
    		ATTRS:{
	    		
	    		'source_user': { value:'' }
	    		,'target_user':{ value:'' }
	    		,'source_follows_target':{ value:false }
	    		,'target_follows_source':{ value:false }
	    		,'target_connects_source':{ value:false }
	    		,'source_connects_target':{ value:false }
	    		,'type':{ value:'connection' }
    		}

	});
    var WallView = Y.Base.create('wall',Y.View,[],{
			containerTemplate:'<div/>',
			user_id:window.current_user,
			events:{
				'#loadMore':{
					click: 'loadNext'
				}
			}
			,loadWall:function(command){
				if(command=='my'){
					command='myposts';
				}
				if(command=='stream'){
					command=null;
				}
				this.get('wall').load({
					name:command || this.get('loadCommand'),
					user_id:this.get('user_id') || window.current_user
				});
			}
			,loadNext:function(){
				this.get('wall').next(this.get('loadCommand'),(this.get('user_id') || window.current_user));
			}
			,initializer:function()
			{
				this.get('container').setHTML(Y.one('#wall').getHTML());
				var wall = new Y.BABE.PostList();
				
				wall.after('add',this.prepend,this);
				wall.after('load',this.render, this);
				wall.load({
					name:this.get('loadCommand'),
					user_id:this.get('user_id') || window.current_user
				});
				
				this.set('wall',wall);
				
			},
			prepend:function(e){
				
				var view;
				if(e.model.get('category')=='event')
				{
					view = new Y.EventView({model:e.model});
				}
				else
				{
					view = new Y.PostView({model:e.model});
				}
				var post = view.render().get('container'); 
				if(!this.get('container').one("#"+e.model.get("_id")))
				{
					if(this.get('container').one(".left").all(".postrow").size() > this.get('container').one(".right").all(".postrow").size())
					{
						this.get('container').one(".right").append(post);
					}
					else
					{
						this.get('container').one(".left").append(post);
					}
				}

			},
			render:function()
			{
				
				
				this.get('wall').each(function(item,index){
					this.prepend({
						model:item
					});
				},this);
				
				return this;
			}
			
		});
    var UserView = Y.Base.create('UserView',Y.View,[],{
    	containerTemplate:'<div/>',
    	updateContainer:function(){
    		
    		this.get('container').setContent(
    			Y.Lang.sub(Y.one('#user_page').getHTML(),{
    				USERID:this.get('model').get('_id'),
    				FULLNAME:this.get('model').get('fullname'),
    		}));
    		if(this.get('wall'))
    		{
    			this.get('container').one('#user_wall').setHTML(this.get('wall').render().get('container'));
    		}
    		
    		if(this.connection.get('source_follows_target'))
    		{
    			this.get('container').one("#follow_user").set("innerHTML",'<i class="icon-white icon-eye-close"></i> Unfollow');
    			this.get('container').one("#follow_user").set("data-content","You will stop seeing activity of this user on your homepage.");
    			this.get('container').one("#follow_user").set("data-original-title","Unfollow");
    			this.get('container').one("#follow_user").removeClass("btn-success").addClass("btn-warning");
    			$(this.get('container').all('button[rel=popover]').getDOMNodes()).popover({
	    			placement:'bottom'
	    		});
    		}
    		else if(this.connection.get('target_follows_source'))
    		{
    			this.get('container').one("#follow_user").set("innerHTML",'<i class="icon-white icon-eye-open"></i> Follow Back');
    			this.get('container').one("#follow_user").set("data-content","This user is already following you. You might want to return the gesture.");
    			this.get('container').one("#follow_user").set("data-original-title","Follow Back");
    			this.get('container').one("#follow_user").removeClass("btn-warning").addClass("btn-success");
    			$(this.get('container').all('button[rel=popover]').getDOMNodes()).popover({
	    			placement:'bottom'
	    		});
    		}
    		
    		if(this.connection.isFriend())
    		{
    			this.get('container').one("#connect_user").set("innerHTML",'<i class="icon-white icon-minus"></i> Disconnect');
    			this.get('container').one("#connect_user").set("data-content","You will not be able to share private stuff anymore.");
    			this.get('container').one("#connect_user").set("data-original-title","Disconnect");
    			this.get('container').one("#connect_user").removeClass("btn-success").addClass("btn-warning");
    			$(this.get('container').all('button[rel=popover]').getDOMNodes()).popover({
	    			placement:'bottom'
	    		});
    		}
    		else if(this.connection.requestedFriend())
    		{
    			this.get('container').one("#connect_user").set("innerHTML",'<i class="icon-white icon-plus"></i> Accept Connection Request');
    			this.get('container').one("#connect_user").set("data-content","This user has sent you a connection request. You want to accept it ?");
    			this.get('container').one("#connect_user").set("data-original-title","Accept Connection");
    			this.get('container').one("#connect_user").removeClass("btn-warning").addClass("btn-success");
    			$(this.get('container').all('button[rel=popover]').getDOMNodes()).popover({
	    			placement:'bottom'
	    		});
    		}
    		
    		this.get('container').one("#connect_user").on('click',function(){
    			this.connection.set('source_connects_target',!this.connection.get('source_connects_target'));
    			this.connection.save();
    		},this);
    		
    		this.get('container').one("#follow_user").on('click',function(){
    			this.connection.set('source_follows_target',!this.connection.get('source_follows_target'));
    			this.connection.save();
    		},this);
    		
    		
    	},
    	initializer:function(config){
    		   		
    		var that = this;
    		if(config && config.user_id)
    		{
    			this.set('model', new Y.BABE.UserModel({
    				'_id':config.user_id
    			}));
    			this.connection = new ConnectionModel({
    				source_user:window.current_user
    				,target_user:config.user_id
    			});
    			this.get('model').after('change',this.updateContainer,this);
    			this.connection.after('change',function(){ 
    				this.updateContainer();
    			} ,this);
    			this.connection.load({},function(){ 
    				that.updateContainer.call(that); //change the context of the function
    			});
    			this.get('model').load({},function(){
    				that.updateContainer.call(that); //change the context of the function
    			});
    			var wall = new WallView({loadCommand:'myposts',user_id:config.user_id});
    			this.set('wall',wall);
    			
    		}
    	},
    	render:function(){
    		
    		return this;
    	}
    });
    
    
		
    var ImageUploadView = Y.Base.create('ImageUploadView',Y.View,[],{
    	containerTemplate:'<div/>',
    	display:'',
    	getUploadedImage:function(){
    		if(this.image){ return this.image;} return false;
    	},
    	initializer:function(config)
    	{
    		this.display = config && config.display;
    		this.uploadedCallback  = config && config.uploadedCallback;
    		var viewObj = this; 
    		if(!Y.one("#imageUploaderModal"))
    		{
    			this.get('container').setContent(Y.one("#image_uploader").getContent());
    			Y.one("body").append(this.get('container'));
    			
			    Y.one("#upload-img-btn").on("click",function(){
			    	 var cfg = {
					        method: 'POST',
					        form: {
					            id: Y.one("#imageuploader"),
					            upload: true
					        },
					        on:{
					        	start:function(){
					        		Y.one("#image-loading").setContent("<img src='"+baseURL+"static/loader.gif'/>");
					        	},
					        	end:function(i,o,a){
					        		//$("#imageUploaderModal").modal('hide');
					  
					        	},
					        	complete:function(i,o,a){
					        		var r = Y.JSON.parse(o.responseText);
					        		if(r.success)
					        		{
					        			
					        			Y.one("#image-loading").setContent("Success!");
					        			viewObj.image = r.image_url;
					        			$("#imageUploaderModal").modal('hide');
					        			if(viewObj.uploadedCallback && Y.Lang.isFunction(viewObj.uploadedCallback)){
					        				viewObj.uploadedCallback(r.image_url);
					        			}
					        			Y.one(viewObj.display).setContent("<img src='"+baseURL+viewObj.image+"' class='span11 thumbnail'/><p class='pull-right'><a href='#' class='remove'>Remove</a></p>");
					        			Y.one(viewObj.display).one(".remove").on("click",function(e){
					        				e.preventDefault();
					        				Y.one(viewObj.display).setContent("");
					        			});
					        		}
					        		else
					        		{
					        			
					        			Y.one("#image-loading").setContent(Y.Lang.sub(
					        				Y.one("#error-alert").getContent(),
					        				{
					        					ERROR:r.error
					        				}
					        			));
					        			$("#"+Y.one("#image-loading").one(".alert").generateID()).alert();
					        			
					        		}
					  
					        	}
					        }
					    };
    				 var request = Y.io(baseURL+'io/image_upload', cfg);
			    }); 
			    
    		}
    		
    		$("#imageUploaderModal").modal({
				    keyboard: false
			});
			
    	},
    	render:function()
    	{
    		    $("#imageUploaderModal").modal('show');
    	}
    });
    var UserModel = Y.Base.create('userModel',Y.Model,[],{
		 	sync:modelSync,
		 	idAttribute:'_id',
		 	validate:function(attr){
		 		
		 		if(!attr.fullname){
		 			return {
		 				field:'fullname',
		 				message:'Full name can not be empty!'
		 			}
		 		}
		 		else if(attr.fullname.length > 100)
		 		{
		 			return {
		 				field:'fullname',
		 				message:'Thats a very long name. Will you mind making it a bit short ?'
		 			}
		 		}
		 		
		 	}
		 	},{
		 	
		 	ATTRS:{
		 		'_id':{value:''},
		 		'_rev':{value:''},
				username:{value:''},
				password:{value:''},
				email:{value:''},
				fullname:{value:''},
				gender:{value:''},
				city:{value:''},
				country:{value:''},
				mobile:{value:''},
				profile_pic:{value:baseURL+'static/images/male_profile.png'},
				dob:{value:''},
				type:{value:'user'}
		 	}
	});
    
    var ProfileView = Y.Base.create('profileView', Y.View, [], {
						containerTemplate:'<div/>',
						template_id:'#profileview-template',
						initializer:function(){
							
						},
						updateVals:function(){
							var container = this.get('container');
							if(this.get('model'))
							{
								
								container.all("input").each(function(node){
									
									if(node.get("type")=="text" && this.get('model').get(node.get("name"))!=undefined)
									{
										node.set("value",this.get('model').get(node.get("name")));
									}
									else if(node.get('type')=='radio' && this.get('model').get(node.get("name"))!=undefined)
									{
										if(node.get("value")==this.get('model').get(node.get("name")))
										{
											container.all("[name="+node.get("name")+"]").removeAttribute("checked");
											node.set("checked","true");
										}
									}
								},this);
								
								if(this.get('model').get("profile_pic") && this.get('model').get("profile_pic")!="false" && this.get('model').get("profile_pic")!="undefined")
								{
									
									this.get('container').one(".image_preview").setContent("<img src="+this.get('model').get("profile_pic")+" class='thumbnail'/>");
								}
								else if(this.get('model').get("gender")=="male")
								{
									this.get('container').one(".image_preview").setContent("<img src="+Y.BABE.male_image+" class='thumbnail'/>");
								}
								else
								{
									this.get('container').one(".image_preview").setContent("<img src="+Y.BABE.female_image+" class='thumbnail'/>");
								}
							}
						},
						render:function(){
							var viewObj = this;
							this.template = Y.one('#profileview-template').getContent();
							this.get('container').setContent(this.template);
							var container = this.get('container'); 
							container.all("[rel=popover]").each(function(node){
								$(node.getDOMNode()).popover();
							});
							this.updateVals();
							if(this.get('model')){
								this.get('model').on('change',function(){
									this.updateVals();
								},this);
								
							}
							container.one(".img-upload").on("click",function(){
								viewObj.img = new Y.BABE.ImageUploadView({
									display:".image_preview",
									uploadedCallback:function(url){
										viewObj.get('model').set("profile_pic",url);
										viewObj.get('model').save();
									}
								});
								
							});
							if( container.one(".img-upload-facebook")) 
							 {
							 	container.one(".img-upload-facebook").on("click",function(){
									Y.io(baseURL+'in/facebook_image',{
											method:'POST',
											on:{
												success:function(i,o,a){
													var r = Y.JSON.parse(o.responseText);
													if(r.success)
													{
														viewObj.get('model').set("profile_pic",r.image_url);
														viewObj.get('model').save(); 
													}
													
												}
											}
										
									});
							
								
								});
							}
							container.one("#profile-submit-form").on("click",function(e){
								
								e.preventDefault();
								if(this.get('model'))
								{
									this.get('model').on('error',function(){
										
									});
									container.all("input").each(function(node){
										
										if(node.get("type")=="text")
										{
											this.get('model').set(node.get("name"),node.get("value"));
										}
										else if(node.get('type')=='radio')
										{
											if(node.get("checked"))
											{
												this.get('model').set(node.get("name"),node.get("value"));
											}
										}
									},this);
									container.one("#profile-submit-form").removeClass("btn-primary");
									container.one("#profile-submit-form").addClass("btn-warning");
									container.one("#profile-submit-form").set("value","Saving.....");
									container.one("#profile-submit-form").set("innerHTML","Saving.....");
									this.get('model').save(function(err){
										
										Y.all(".error .help-inline").set("innerHTML","");
										Y.all(".error").removeClass("error");
										if(err){
											if(err.field)
											{
												Y.one("#"+err.field).focus();
												Y.one("#"+err.field).ancestor(".control-group").addClass("error");
												Y.one("#"+err.field).next(".help-inline").set("innerHTML",err.message);
											}
										}
										
										container.one("#profile-submit-form").addClass("btn-success");
										container.one("#profile-submit-form").removeClass("btn-warning");
										container.one("#profile-submit-form").set("value","Saved");
										container.one("#profile-submit-form").set("innerHTML","Saved");
										setTimeout(function(){
											container.one("#profile-submit-form").addClass("btn-primary");
											container.one("#profile-submit-form").removeClass("btn-success");
											container.one("#profile-submit-form").set("value","Save");
											container.one("#profile-submit-form").set("innerHTML","Save");
										},1500);
									});
									
								}
							},this);
							return this;
						}
				});
    var CommentModel = Y.Base.create('commentModel',Y.Model,[],{
		 	sync:modelSync,
		 	idAttribute:'_id',
		 	
		 	},{
		 	
		 	ATTRS:{
		 		
		 		comment:{value:'Some Comment'},
		 		post_id:{value:0},
		 		author:{value:'comment_author'},
		 		author_id:{value:0},
		 		type:{value:"comments"}
		 	}
		 });
    
    var PostModel = Y.Base.create('postModel', Y.Model, [], {
		 	sync:modelSync,
		 	idAttribute:'_id',
		 	profilePic:function(){
		 		
		 		return baseURL+'in/profile_pic/'+this.get('author_id');
		 	},
		 	initializer:function(config){
		 		
		 		
		 	},
		 	validate:function(attributes){
		 		
		 		attributes.text = attributes.text.trim();
		 		attributes.tags = attributes.tags.trim();
		 		if(!attributes.text || !attributes.text.trim() || !Y.Lang.isString(attributes.text))
		 		{
		 			return "Text cannot be empty"; 
		 		}
		 		if(!attributes.tags || !attributes.tags.trim() || !Y.Lang.isString(attributes.tags))
		 		{
		 			return "Please provide brand,product,service names separated by comma"; 
		 		}
		 		var tags =  attributes.tags.split(",");
		 		if(tags.length>4)
		 		{
		 			return "Provide only 4 brand,product,service names";
		 		}
		 		if(!attributes.sector)
		 		{
		 			return "You need to enter a valid sector.";
		 		}
		 		else
		 		{
		 			if(cache.retrieve("all_sectors"))
		 			{
		 				if(!Array.indexOf(cache.retrieve("all_sectors"),attributes.sector))
		 				{
		 					return "Please select a valid sector. The one you have provided is incorrect.";
		 				}
		 			}
		 		}
		 	}
		 },{
		 	ATTRS:{
		 		id:{
		 			value:null
		 		},
		 		images:{
		 			value:{}
		 		},
		 		type:{
		 			value:'post'
		 		},
		 		visible:{
		 				value:true
		 		},
		 		tags:{
		 			value:'forbash,sample'
		 		},
		 		text:{
		 			value:'Default text'
		 		},
		 		category:{
		 			value:'painpoint'
		 		},
		 		author_id:{
		 			value:1
		 		},
		 		author:{
		 			value:'unknown'
		 		},
		 		like:{
		 			value:false
		 		},
		 		dislike:{
		 			value:false //DOES THE CURRENT USER LIKE THIS POST ? 
		 		},
		 		likes:{
		 			value:0 //TOTAL LIKES FOR THIS POST 
		 		},
		 		dislikes:
		 		{
		 			value:0
		 		},
		 		comments:
		 		{
		 			value:0
		 		},
		 		_id:
		 		{
		 			value:0
		 		},
		 		sector:{
		 			value:''
		 		}
		 		
		 	}
		 });
	var PostView = Y.Base.create('postView',Y.View,[],{
			expandComments:false,
			containerTemplate:"<div class='row-fluid postrow'/>",
			close:function(){
				this.get('container').destroy();
			},
			initializer:function(config){
				this.expandComments = (config && config.expandComments) || false; 
				this.template = Y.Lang.sub(Y.one('#post-row').getContent(),
					{
						IMG:baseURL+'in/profile_pic/'+this.get('model').get('author_id')
						
					}
				);

				this.get('model').after("change",this.render,this);
			},
			processURLs:function(text){
				
				var that= this;
				var m = this.get('model');
				if(text.match(/https?:\/\//))
				{
					Y.io(baseURL+"in/url_encode",{
						method:'POST',
						data:{text:text},
						on:{
							success:function(i,o,a){
								
								that.render({
									text:o.responseText
								});
							}
						}
						
					});
				}
				
			},
			addImages:function(){
				var c = this.get('container');
				var images = this.get('model').get("images");
				if(images)
				{
					
					try{
						images = Y.JSON.parse(images);
						if(typeof images == "object")
						{
							var width;
							var height;
							for(var i in images)
							{
								var img = new Image();
								img.onload = function() {
								  width = this.width;
								  height = this.height;
								  var node = Y.Node.create(Y.Lang.sub(
											Y.one("#embedded-image").getContent(),
											{
												IMG:baseURL+images[i]
											}
											
								  ));
								  
								  c.one(".postBody").append(node);
								//  Y.log(node.one("img").get("clientWidth")+":"+width);
								  if(node.one("img").get("clientWidth") && node.one("img").get("clientWidth")>width)
								  {
								  	node.one("img").removeClass("span6");
								  	node.one("img").setStyle("width",width+"px");
								  	
								  }
								 
								}
								img.src = baseURL+images[i];
	
							}
							
						}
					}catch(ex){
						
					}
					
				}
			},
			events:{
				
			},
			adminView:function(){ //Overrride this method for other views
				this.get("container").setContent(Y.Lang.sub(Y.one("#post-row-admin").getContent(),{
					TEXT:this.get('model').get('text'),
					TAGS:this.get('model').get('tags'),
					IMG:this.get('model').profilePic()
				}));
				Y.BABE.autoExpand(this.get("container").one("textarea"));
				this.get('container').all(".autocomplete").plug(Y.Plugin.AutoComplete, Y.BABE.TagBoxConfig);
				this.get('container').one(".delete-btn").on("click",function(){
					this.get('container').setHTML("<div class='alert alert-success'>This post was deleted</div>");
				},this);
				
				this.get('container').one(".save-btn").on("click",function(){
					this.get('model').set('tags',this.get('container').one('[name=tags]').get('value'));
					this.get('model').set('text',this.get('container').one('textarea').get('value'));
					var viewObj = this;
					this.get('model').save(function(err,response){
									
								if(err)
								{
									Y.showAlert("Ooops!",err.error);
								}
								else
								{
									Y.showAlert("Done!","Your changes are saved successfully!");
									viewObj.render();
								}
								
					});
					},this);
			}
			,updateToolbar:function(){
				
				var cmodel = this.get('model');
				if(cmodel.get('author_id')==window.current_user)
				{
					this.get('container').one('.wall-post-admin').setHTML(Y.one('#wall-post-admin-btn').getHTML());
					this.get('container').one('.wall-post-admin').one("button").on('click',function(){
						this.adminView();
					},this);
					this.get('container').one('.wall-post-admin').setStyle("visibility","hidden");
					this.get('container').on('hover',function(){		
						this.get('container').one('.wall-post-admin').setStyle("visibility","visible");
					},function(){
						this.get('container').one('.wall-post-admin').setStyle("visibility","hidden");
					},this);
					this.one
				}
				var c = this.get('container').one(".toolbar"); 
				c.setContent("");
				if(this.get('model').get("like"))
				{
					
					if(parseInt(this.get('model').get("likes"))<=1)
					{
						c.append(Y.Lang.sub("<span>You like this post. {DISLIKES} people dislike this post! <a class='undo' href='#'>Undo</a> </span>",{
							DISLIKES:parseInt(this.get('model').get("dislikes"))
						}));
					}
					else
					{
						c.append(Y.Lang.sub("<span>You and {LIKES} like this post. {DISLIKES} people dislike this post! <a class='undo' href='#'>Undo</a> </span>",{
							LIKES:parseInt(this.get('model').get("likes"))-1,
							DISLIKES:parseInt(this.get('model').get("dislikes"))
						}));
					}
					
					
				}
				else if(this.get('model').get("dislike"))
				{
					if(parseInt(this.get('model').get("dislikes"))<=1)
					{
						c.append(Y.Lang.sub("<span>You dislike this post. {LIKES} people like this post! <a class='undo' href='#'>Undo</a> </span>",{
							LIKES:parseInt(this.get('model').get("likes")),
							DISLIKES:parseInt(this.get('model').get("dislikes"))
						}));
					}
					else
					{
						c.append(Y.Lang.sub("<span>You and {DISLIKES} dislike this post. {LIKES} people like this post! <a class='undo' href='#'>Undo</a> </span>",{
							LIKES:parseInt(this.get('model').get("likes")),
							DISLIKES:parseInt(this.get('model').get("dislikes"))-1
						}));
					}
				}
				else
				{
					
					c.append(Y.Lang.sub("<span><a class='like' href='#'>Like {LIKES} </a> <a class='dislike' href='#'>Dislike {DISLIKES} </a> </span>",{
						LIKES:this.get('model').get("likes"),
						DISLIKES:this.get('model').get("dislikes")
						
					}));
					c.one('.like').on("click",function(e){
						this.get('model').set("like",true);
						this.get('model').save(function(err,response){
							cmodel.setAttrs(response.data);
						});
						e.halt();
						
					},this);
					c.one('.dislike').on("click",function(e){
						this.get('model').set("dislike",true);
						this.get('model').save(function(err,response){
							cmodel.setAttrs(response.data);
						});
						e.halt();
					},this);
				}
				if(c.one("a.undo"))
				{
					c.one("a.undo").on("click",function(e){
						this.get('model').set("like",0);
						this.get('model').set("dislike",0);
						this.get('model').save(function(err,response){
							if(err){
								Y.showAlert("Ooops! Something went wrong.","Could not save your response. Try doing it again.");
							}
							else
							{
								
								cmodel.setAttrs(response.data);
						
							}
						});
						e.halt();
					},this);
				}
				c.append("<span><a class='comments' href='#'>Comments</a></span>");
				c.append("<span> <a href='#' class='share'>Share</a></span>")
				c.setStyle("opacity",0);
				c.transition({
				    easing: 'ease-out',
				    duration: 0.5, 
				    opacity:1.0
				});
				
				c.one('.comments').on("click",function(e){
					this.showComments();
					e.halt();
				},this);
				c.one('.share').on("click",function(e){
					
					Y.App.showPost(this.get('model'));
					e.halt();
				},this);
			},
			showComments:function(){
				var comments = new Y.CommentView({model:this.get('model')});
				this.get('container').one(".post-zone").append(comments.render().get('container'));
				if(this.get('container').one(".commentsView"))
				{
					
					this.get('container').one(".commentsView").removeClass('hide');
					this.get('container').one(".commentsView").setStyle("opacity",0);
					this.get('container').one(".commentsView").transition({ opacity:1, duration:0.8});
					this.get('container').one(".commentsView").one(".commentText").focus();
					var temp = this.get('container').one(".commentsView");
					
					
				}
			},
			sanitize:function(config){
				var m= this.get('model');
				var c = this.get('container');
				var t = this.template;
				
				if(c.one(".profile-image"))
				{
					c.one(".profile-image").on("click",function(e){
						Y.AppUI.navigate('/user/'+m.get("author_id"));
						e.halt();
					});
				}
				
				
				this.get('container').set('id',m.get('_id'));
				var tags = m.get("tags").split(",");
				for(var i in tags)
				{
					if(tags[i].trim())
					{
						c.one(".tagzone").append(Y.Lang.sub('<span class="label notice">{TAG}</span>&nbsp;',{TAG:tags[i]}));
						
					}
					
				}
				if(!config || !config.text)
				{
					this.processURLs( m.get("text"));
					
				}
				this.updateToolbar();
				this.addImages();
				if(this.expandComments)
				{
					this.showComments();
				}
				
			}
			,render:function(config){
				
				
				
				if(this.get('model').get("type")=="post"){
					
					
					
						this.get('container').setContent(Y.Lang.sub(this.template,{
							TEXT: (config && config.text )|| this.get('model').get("text"),
							AUTHOR:this.get('model').get("author"),
							IMG:"http://placehold.it/40x40",
							ID:this.get('model').get("author_id")
						}));
				}

				this.sanitize(config);
				return this;
			}
			
		}); 
	var EventModel = Y.Base.create('eventModel',PostModel,[],{
		sync:modelSync,
		idAttribute:'_id',
		validate:function(attributes){
				attributes.text = attributes.text.trim();
		 		attributes.tags = attributes.tags.trim();
		 		if(!attributes.text || !attributes.text.trim() || !Y.Lang.isString(attributes.text))
		 		{
		 			return {
		 				'field':'text',
		 				'error':'Text cannot be empty!'
		 			};
		 		}
		 		
		 		if(!attributes.title || !attributes.title.trim() || !Y.Lang.isString(attributes.title))
		 		{
		 			return {
		 				'field':'text',
		 				'error':'Title cannot be empty!'
		 			};
		 		}
		 		if(!attributes.tags || !attributes.tags.trim() || !Y.Lang.isString(attributes.tags))
		 		{
		 			
		 			return {
		 				'field':'tags',
		 				'error':"Please provide brand,product,service names separated by comma"
		 			};
		 		}
		 		var tags =  attributes.tags.split(",");
		 		if(tags.length>4)
		 		{
		 			return {
		 				'field':'tags',
		 				'error':"Provide only 4 brand,product,service names"
		 			};
		 		}
		 		var checkdate = function(d){
		 			 
		 			if(d.split("/").length!==3)
		 			{
		 				return false;
		 			}
		 			else
		 			{
		 				var dt = d.split("/"); 
		 				if(Y.DataType.Date.parse(dt[2]+"-"+dt[1]+"-"+dt[0])) 
		 				{
		 					
		 					return 	Y.DataType.Date.parse(dt[2]+"-"+dt[1]+"-"+dt[0]);
		 				}
		 				else
		 				{
		 					return false;
		 				}
		 			}
		 		};
		 		if(!checkdate(attributes.start_date.trim())){
		 			return {
		 				'field':'end_date',
		 				'error':'We could not understand the start date you entered. Please enter it in dd/mm/yyyy format.'
		 			};
		 		}
		 		//end date can be empty
		 		if(attributes.end_date.trim() && !checkdate(attributes.end_date.trim())){
		 			return {
		 				'field':'start_date',
		 				'error':'We could not understand the end date you entered. Please enter it in dd/mm/yyyy format.'
		 			};
		 		}
		 		//If the end date is empty then make sure that end time is later than the start time
		 		if(!attributes.end_date.trim() || attributes.end_date.trim() == attributes.start_date.trim())
		 		{
		 			if((parseInt(attributes.start_time_hours,10)*60+parseInt(attributes.start_time_mins,10)) >(parseInt(attributes.end_time_hours,10)*60+parseInt(attributes.end_time_mins,10)))
		 			{
		 				return {
			 				'field':'end_time_hours',
			 				'error':'Your ending time is sooner than the start time.' 
		 				};
		 			}
		 		}
		 		
		 		if(attributes.end_date.trim() && attributes.start_date.trim())
		 		{
		 			if(checkdate(attributes.start_date)>checkdate(attributes.end_date))
		 			{
		 				return {
		 					'field':'start_date',
		 					'error':'Ending date is sooner than Start Date.' 
		 				};
		 			}
		 		}
		 		
		}
	},{
		ATTRS:{
			
			 start_date:{ value:'' }
			,end_date:{ value:'' }
			,start_time_hours:{ value:'' }
			,start_time_mins:{ value:'' }
			,end_time_hours:{ value:'' }
			,end_time_mins:{ value:'' }
			,title:{ value:'' }
		}
	});
	
	/** This model will be used where a user attaches himself to a resource. Such as user attending and event. **/
	var RelationshipModel = Y.Base.create('relationshipModel',Y.Model,[],{
		sync:modelSync,
	},{
		ATTRS:{
			owner_id:{value:window.current_user},
			resource_id:{value:''},
			relationship:{value:''}
		}
	});
	
	
	var ForgotPassword = Y.Base.create('forgotPassword',Y.View,[],{
		containerTemplate:'<div/>',
		template_id:'#forgot-password',
		initializer:function()
		{
			this.render();
		},
		render:function(){
			this.template = Y.one(this.template_id).getContent();
			this.get('container').setContent(this.template);
			var container = this.get('container');
			var email = this.get('container').one("#email");
			this.get('container').one('#forgot-password-btn').on('click',function(e){
				e.preventDefault();
				Y.io(baseURL+'in/forgot_password',{
						method:'POST',
						data:{email:email.get("value")},
						on:{
							success:function(i,o,a){
								var data = Y.JSON.parse(o.responseText);
								if(!data.success)
								{
								 	container.one('.error-content').setContent(data.message);
								 	container.one('.alert-heading').setContent('Ooops!');
								 	container.one(".alert").removeClass('alert-success');
								 	container.one(".alert").addClass('alert-error show');
								 	$(".alert").alert();
								}
								else
								{
									container.one('.alert-heading').setContent('Success!');
									container.one(".alert").removeClass('alert-error');
								 	container.one(".alert").addClass('alert-success show');
									container.one('.error-content').setContent(data.message);
								 	$(".alert").alert();
								}
								
							}
						}
					});
			});
			return this;
		}
		
	}); 
	
	var SignUpView = Y.Base.create('signupview', Y.View, [], {
			containerTemplate:'<div/>',
			template_id:'#signupform-template',
			setData:function(data){
				if(this.get('container'))
				{
					this.get('container').one("#username").set("value",data.username);
					this.get('container').one("#email").set("value",data.email);
					this.get('container').one("#fullname").set("value",data.fullname);
					if(data.gender && data.gender=="male")
					{
						this.get('container').one("[value=male]").set("checked","true");
						this.get('container').one("[value=female]").removeAttribute("checked");
					}
					else if(data.gender && data.gender=="female")
					{
						this.get('container').one("[value=female]").set("checked","true");
						this.get('container').one("[value=male]").removeAttribute("checked");
					}
					if(data.picture)
					{
						this.get('container').one("#profile-image").append('<img src="'+data.picture+'" />'); 
						this.get('container').one("#profile-image").ancestor(".control-group").removeClass("hide");  
					}

				}
			},
			initializer:function()
			{
				
				this.render();
			},
			render:function()
			{
				this.template = Y.one('#signupform-template').getContent();
				this.get('container').setContent(this.template);
				var container = this.get('container'); 
				this.get('container').one("form").on("submit",function(e){
					e.halt();
					
					var request = Y.io(baseURL+'in/user', {
						method:'POST',
						data:{
							username:container.one("#username").get("value")
							,password:container.one("#password").get("value")
							,email:container.one("#email").get("value")
							,fullname:container.one("#fullname").get("value")
							,gender:container.one("[name=gender]:checked").get("value")
						},
				        on:{
				       		success:function(i,o,a){
				       			
				       			
				       			var response = Y.JSON.parse(o.responseText);
				       			
				       			if(!response.success)
				       			{
				       				var inputs = container.all(".controls");
				       				inputs.each(function(taskNode){
				       					var inputItem = taskNode.one("input");
				       					
				       					if(inputItem && response[inputItem.get("id")] && taskNode.one("span.help-inline"))
				       					{
				       						taskNode.one("span.help-inline").setContent(response[inputItem.get("id")]);
				       						taskNode.ancestor().addClass("error");
				       					
				       					}
				       					else
				       					{
				       						if(taskNode.one("span.help-inline")){
				       							taskNode.one("span.help-inline").setContent("");
				       						}
				       						
				       						taskNode.ancestor().removeClass("error");
				       					}
				       				});
				       				return;
				       			}
				       			
				       			window.location = baseURL+"/?home"
				       		}
				       }
					},this);
					
				});
				this.get('container').one("#signup-form").on("click",function(e){
					
				});
				return this;
			}
		});
	
	var TagBoxConfig = {
						activateFirstItem: true, 
					    allowTrailingDelimiter: true,
					    alwaysShowList: false,
					    enableCache: true,
					    minQueryLength: 3,
					    queryDelay: 100,
					    queryDelimiter: ',',
					    maxResults: 5,
					    resultHighlighter: 'startsWith',
					    resultTextLocator: 'name',
					    source: new Y.DataSource.Get({
							    source: baseURL+'in/tag?'
								}),
					    requestTemplate: '&q={query}',
					    resultListLocator: function (response) {
					      var results = response[0].query.results &&
					            response[0].query.results.tags;
					
					      if (results && !Y.Lang.isArray(results)) {
					        results = [results];
					      }
					
					      return results || [];
					    },
					    resultFilters: ['startsWith', function (query, results) {
					     
					      var selected = this.get('value').split(/\s*,\s*/);
					
					     
					      selected.pop();
					
					      // Convert the array into a hash for faster lookups.
					      selected = Y.Array.hash(selected);
					
					      
					      return Y.Array.filter(results, function (result) {
					        return !selected.hasOwnProperty(result.name);
					      });
					    }]
					    
					 }; 
	var TagBoxForcedConfig = {
						activateFirstItem: true, 
					    allowTrailingDelimiter: true,
					    alwaysShowList: false,
					    enableCache: true,
					    minQueryLength: 3,
					    queryDelay: 0,
					    queryDelimiter: ',',
					    maxResults: 5,
					    resultHighlighter: 'startsWith',
					    resultTextLocator: 'name',
					    source: new Y.DataSource.Get({
							    source: baseURL+'in/tag?'
								}),
					    requestTemplate: '&q={query}',
					    resultListLocator: function (response) {
					      var results = response[0].query.results &&
					            response[0].query.results.tags;
					
					      if (results && !Y.Lang.isArray(results)) {
					        results = [results];
					      }
					
					      return results || [];
					    },
					    resultFilters: ['startsWith', function (query, results) {
					     
					      var selected = this.get('value').split(/\s*,\s*/);
					
					     
					      selected.pop();
					
					      // Convert the array into a hash for faster lookups.
					      selected = Y.Array.hash(selected);
					
					      
					      return Y.Array.filter(results, function (result) {
					        return !selected.hasOwnProperty(result.name);
					      });
					    }]
					    
					 }; 
	var AutoLoadTagsPlugin = Y.Plugin.AutoComplete;
	
	var GroupModel = Y.Base.create('groupModel',PostModel,[],{
		sync:modelSync
		,idAttribute:'_id'
		,validate:function(attributes){
			if(!attributes.title || !attributes.title.trim())
			{
				return {
					"field":'title',
					"error":"You must give your group a title"
				}
			}
			if(!attributes.description || !attributes.description.trim())
			{
				return {
					"field":'title',
					"error":"A Group must have a title"
				}
			}
			if(!attributes.tags || !attributes.tags.trim())
			{
				return {
					"field":'title',
					"error":"A Group must have some tags"
				}
			}
		}
		},{
		ATTRS:{
			type:{value:'group'}
			,'_id':{value:''}
			,visibility:{value:'open'} //other value is closed
			,prerequisits:{value:false}
			,author_id:{value:''}
			,title:{value:''}
			,description:{value:''}
			,tags:{value:''}
			
		}
	});
	
	var GroupList = Y.Base.create('groupList',Y.ModelList,[],{
		model:GroupModel,
		sync:listSync
	});
	
	
	var CreateGroupView = Y.Base.create('createGroupView',Y.View,[],{
		containerTemplate:'<div class="row-fluid"/>' 
		,initializer:function(){
			this.get('container').setHTML(Y.one('#create-group').getHTML());
			this.get('container').one("button.btn-primary").on('click',function(){
			 
				var g = new GroupModel({
					visibility:this.get('container').one('input[name=visibility]:checked').get('value')
					,author_id:window.current_user
					,title:this.get('container').one('[name=title]').get('value')
					,description:this.get('container').one('[name=description]').get('value')
					,tags:this.get('container').one('[name=tags]').get('value')
				});
				var c = this.get('container');
				g.save(function(err,response){
								
								if(err)
								{
									Y.showAlert("Ooops!",err.error);
								}
								else
								{
									Y.showAlert("Done!","Your group is created!");
								
								}
							
							});
			},this);
		}
		,render:function(){
			return this;
		}
	});
	
	
	var QuestionModel = Y.Base.create('questionModel',PostModel,[],{
		sync:modelSync
		,idAttribute:'_id'
		,validate:function(attributes){
			if(!attributes.question_text || !attributes.question_text.trim())
			{
				return {
					"field":'question',
					"error":"Question field was empty!"
				}
			}
		}
		},{
		ATTRS:{
			type:{value:'question'}
			,'_id':{value:''}
			,author_id:{value:''}
			,question_text:{value:''}
			,description:{value:''}
			,answer_count:{value:0}
			
		}
	});
	
	
	var CreateQuestionView = Y.Base.create('createQuestionView',Y.View,[],{
		containerTemplate:'<div class="row-fluid"/>'
		,initializer:function(){
			this.get('container').setHTML(Y.one('#create-question').getHTML());
			Y.BABE.autoExpand(this.get('container').one('textarea'));
			this.get('container').one('button.btn-primary').on('click',function(){
				var q = new QuestionModel(
					{
						tags:'question',
						author_id:window.current_user,
						question_text:this.get('container').one('[name=question]').get('value'),
						description:this.get('container').one('[name=description]').get('value')
					}
				);
				var c = this.get('container');
				q.save(function(err,response){
								
								if(err)
								{
									Y.showAlert("Ooops!",err.error);
								}
								else
								{
									Y.showAlert("Done!","Your post has been published successfully.");
									
									c.setContent('');
								}
							
							});
			},this);
		}
		,render:function(){
			return this;
		}
	});
	
	var CreatePostView = Y.Base.create('creatPost',Y.View,[],{
		containerTemplate:'<div class="row-fluid"/>'
		,initializer:function(){
			this.get('container').setContent(Y.one('#create-post').getHTML());
			Y.BABE.autoExpand(this.get('container').one("textarea"));

			this.get('container').one("button.img-upload").on("click",function(){
				this.set('img',new Y.BABE.ImageUploadView({
								display:"#"+this.get('container').one('.image_preview').generateID()
							}));
			},this);
			var lastValue;
			this.get('container').all(".autocomplete").plug(Y.BABE.AutoLoadTagsPlugin,TagBoxConfig);
			
			var inputNode = this.get('container').one(".ac-sector");
			inputNode.on('blur',function(){
				if(inputNode.get('value').trim().length<4)
				{
					inputNode.set("value",'');
				}
			})
			if(!cache.retrieve("all_sectors"))
			{
				Y.io(baseURL+'in/all_sectors',{
					method:'POST',
					on:{
						 success:function(i,o,a){
						 	var tags = Y.JSON.parse(o.responseText);
						 	cache.add('all_sectors',tags);
						 	inputNode.plug(Y.Plugin.AutoComplete,
							{		activateFirstItem: true,
							        minQueryLength: 3,
							        queryDelay: 0,
							        source: tags,
							        maxResults: 10,
							        resultHighlighter: 'subWordMatch',
							        resultFilters: ['subWordMatch']
							});
							inputNode.removeAttribute("disabled");
							inputNode.on('focus', function () {
						        inputNode.ac.sendRequest('');
						    });
						     inputNode.ac.on('results', function (e) {
						        if (e.results.length) {
						            lastValue = inputNode.ac.get('value');
						        } else {
						            inputNode.set('value', lastValue);
						        }
						    });
						    inputNode.ac.after('select', function (e) {
						        lastValue = e.result.text;
						    });
						 }
					}
				});
			}
			else
			{
				inputNode.plug(Y.Plugin.AutoComplete,
							{		activateFirstItem: true,
							        minQueryLength: 3,
							        queryDelay: 0,
							        source: cache.retrieve("all_sectors").response, 
							        maxResults: 10,
							        resultHighlighter: 'subWordMatch',
							        resultFilters: ['subWordMatch']
							});
							inputNode.removeAttribute("disabled");
							
							inputNode.on('focus', function () {
						        inputNode.ac.sendRequest('');
						    });
						     inputNode.ac.on('results', function (e) {
						        if (e.results.length) {
						            lastValue = inputNode.ac.get('value');
						        } else {
						            inputNode.set('value', lastValue);
						        }
						    });
						    inputNode.ac.after('select', function (e) {
						        lastValue = e.result.text;
						    });
			}
			
			
			
			
		    
			this.get('container').one("button.btn-primary").on("click",function(){
							
							var post =  new Y.BABE.PostModel({
								text:this.get('container').one("textarea").get("value"),
								tags:this.get('container').one("[name=tags]").get("value"),
								category:'painpoint',
								images:this.get('img') && this.get('img').image && Y.JSON.stringify([
									this.get('img').image
								]),
								sector:this.get('container').one("[name=sector]").get("value")
									
								
							});
							
							var c = this.get('container');
							post.save(function(err,response){
								
								if(err)
								{
									Y.showAlert("Ooops!",err);
								}
								else
								{
									Y.showAlert("Done!","Your post has been published successfully.");
									
									c.setContent('');
								}
							
							});
							
							
							
							
							
						},this);
		}
		,render:function(){
			
			return this;
		}
	});
	
	var CreateEventView = Y.Base.create('creatEventView',Y.View,[],{
		containerTemplate:'<div class="row-fluid"/>'
		,initializer:function(){
			this.get('container').setContent(Y.one('#create-event').getHTML());
			Y.BABE.autoExpand(this.get('container').one("textarea"));

			this.get('container').one("button.img-upload").on("click",function(){
				this.set('img',new Y.BABE.ImageUploadView({
								display:"#"+this.get('container').one('.image_preview').generateID()
							}));
			},this);
			this.get('container').all(".autocomplete").plug(Y.BABE.AutoLoadTagsPlugin,Y.BABE.TagBoxConfig);	
			this.get('container').one("button.btn-primary").on("click",function(){
							
					var post = new Y.BABE.EventModel({
							text:this.get('container').one("textarea").get("value"),
							tags:this.get('container').one("[name=tags]").get("value"),
							category:this.get('container').one("[name=category]").get("value"),
							images:this.get('img') && this.get('img').image && Y.JSON.stringify([
								this.get('img').image
							]),
							start_time_hours:this.get('container').one("[name=start_time_hours]").get("value"),
							start_time_mins:this.get('container').one("[name=start_time_mins]").get("value"),
							end_time_hours:this.get('container').one("[name=end_time_hours]").get("value"),
							end_time_mins:this.get('container').one("[name=end_time_mins]").get("value"),
							start_date:this.get('container').one("[name=start_date]").get("value"),
							end_date:this.get('container').one("[name=end_date]").get("value"),
							title:this.get('container').one("[name=title]").get("value")
						});
						var c = this.get('container');
						post.save(function(err,response){
							
							if(err)
							{
								Y.showAlert("Ooops!",err.error);
							}
							else
							{
								Y.showAlert("Done!","Your post has been published successfully.");
								c.setContent('');
							}
						
						});
							
							
							
							
							
						},this);
		}
		,render:function(){
			
			return this;
		}
	});
	
	var AnswerModel = Y.Base.create('answerModel',PostModel,[],{
		sync:modelSync
		,idAttribute:'_id'
		,validate:function(){}
		},{
		ATTRS:{
			type:{value:'answer'}
			,'_id':{value:''}
			,author_id:{value:''}
			,question_id:{value:''}
			,text:{value:''}
			
		}
	});
	
    Y.BABE = {
    	male_image:baseURL+'static/images/male_profile.png',
    	female_image:baseURL+'static/images/female_profile.png',
    	TagBoxConfig:TagBoxConfig,
    	AutoLoadTagsPlugin:AutoLoadTagsPlugin,
    	autoExpand : autoExpand,
        requestList: function(config){
			Y.io(baseURL+'in/menu',{
					method:'POST',
					data:config.data,
					context:this,
					on:{
						
						complete:function(i,o,a){
							var response = Y.JSON.parse(o.responseText);
							
							if(response.error)
							{
								config.callback(response.error,null);
							}
							else
							{
								config.callback(null,response);
							}

						}
						
					}
			});
		}
   	   ,loadTemplate:function(template,callback){
			
			
			if(template)
			{
				if(cache.retrieve('template='+template))
				{
					var data = cache.retrieve('template='+template).response;
					Y.one(document.body).append(data);
					callback(); 
					
				}
				else
				{
					Y.io(baseURL+'welcome/template',{
					method:'POST',
					data:'template='+template,
					on:{
						complete:function(i,o,a){
								var data = o.responseText;
								Y.one(document.body).append(data);
								if(callback && typeof callback=="function" )
								{
									cache.add('template='+template,data);
									callback(); 
								}
								
							}
						}
					});
				}
				
			}
			else
			{
				if(callback && typeof callback=="function" )
				{
					callback();
				}
			}
		}
       ,modelSync: modelSync
	   ,listSync:listSync
       ,PostModel : PostModel
       ,EventModel: EventModel
       ,PostList:Y.Base.create('postlist', Y.ModelList, [], {
		 	sync:listSync,
		 	model:PostModel,
		 	comparator: function (model) {
			    return parseInt(model.get('created_at'),10)*-1;
			},
		 	next:function(name,user){
		 		
		 		this.load({
		 			count:this.size()+8,
		 			name:name,
		 			user_id:user
		 		});
		 	}
		 	
		 })
	   ,CommentModel:CommentModel
	   ,CommentList:Y.Base.create('commentlist', Y.ModelList, [], {
		 	sync:listSync,
		 	model:CommentModel,
		 	
		 	comparator: function (model) {
			    return model.get('created_at');
			}
		 	
		 })
		,SignUpView:SignUpView
		,ForgotPasswordView:ForgotPassword
		,UserModel:UserModel
		,ProfileView:ProfileView
		,ImageUploadView:ImageUploadView
		,UserView:UserView
		,sanitizeUI:sanitizeUI
		,ConnectionModel:ConnectionModel
	    ,RelationshipModel:RelationshipModel
	    ,GroupModel:GroupModel
	    ,QuestionModel:QuestionModel
	    ,AnswerModel:AnswerModel
	    ,CreateGroupView:CreateGroupView
	    ,PostView:PostView
	    ,CreateQuestionView:CreateQuestionView
	    ,CreatePostView:CreatePostView
	    ,CreateEventView:CreateEventView
	    ,GroupList:GroupList
	    ,WallView:WallView
   
   };
}, '0.0.1', { 
    requires: ['router','autocomplete', 'autocomplete-highlighters', 'autocomplete-filters', 'datasource-get','datatype-date','app-base', 'app-transitions','node', 'event','json','cache','model','model-list','querystring-stringify-simple','view','querystring-stringify-simple','io-upload-iframe','io-form','io-base','sortable']
});


