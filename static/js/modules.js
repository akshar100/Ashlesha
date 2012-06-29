"use strict";
YUI.add('youtube-panel',function(Y){
	var YouTubeView = Y.Base.create('youtubeview', Y.View, [], {
		containerTemplate:'<div/>',
		initializer:function(){
			var c = this.get('container');
			if(this.get('url'))
			{
				c.setHTML(Y.Lang.sub('<iframe width="420" height="315" src="{URL}" frameborder="0" allowfullscreen></iframe>',{
					URL:this.get('url')
				}));
			}
			if(this.get('v_id'))
			{
				c.setHTML(Y.Lang.sub('<div class="video"><img class="thumbnail" src="http://img.youtube.com/vi/{URL}/2.jpg"/><a href="#" class="btn btn-primary"><i class="icon-play"></i></a></div>',{
					URL:this.get('v_id')
				}));
				c.one("a.btn").on('click',function(){
					var node;
					Y.BABE.showAlert("Video",
						Y.Lang.sub('<iframe width="420" height="315" class="youtube-player" src="https://www.youtube-nocookie.com/embed/{URL}?rel=0&autoplay=1" frameborder="1"></iframe>',{
							URL:this.get('v_id')
						})
						
					);
					
				},this);
			}
			
		}
	});
	Y.YouTubeView = YouTubeView;
},'0.0.1',{
	requires:['app']
});
YUI.add('ashlesha-base', function (Y) { 
    var baseURL = Y.baseURL,Base=function(){
    	Base.superclass.constructor.apply(this, arguments);
    };
    Base.NAME = "AshleshaBase";
	Y.extend(Base, Y.Base, {
		initializer:function(config){
			this.set("localStorage",new Y.CacheOffline());
			if(config && config.flush)
			{
				this.flush();
			}
			
			Y.on("ashlesha-base-request",function(e){
				Y.fire("ashlesha-base-response",{
					base:this
				})
			},this);
			this.set('loader',Y.Node.create('<img src="/static/loader.gif"/>'));
		},
		showAlert:function(head,body){
			if(Y.one("#modal-from-dom")){ Y.one("#modal-from-dom").remove();}
			var alertMarkup = Y.Lang.sub(Y.one("#messagebox").getContent(),{ HEADING: head , BODY:body});
			Y.one(document.body).append(alertMarkup);
			jQuery("#modal-from-dom").modal('show');
						Y.one(".close-dialog").on('click',function(){
							jQuery("#modal-from-dom").modal('hide');
							Y.one("#modal-from-dom").remove();
						});
						Y.one("#modal-from-dom").one(".close").on('click',function(){
							jQuery("#modal-from-dom").modal('hide');
							Y.one("#modal-from-dom").remove();
						});
		},
		autoExpand:function(r){
			
			var f = function () {
	                c = Y.Node.create("<div/>");
	                c.addClass("textarea");
	                c.setStyle("width", r.getComputedStyle("width"));
	                c.setStyle("display", "block");
	                c.setContent("<pre>" + r.get("value") + "</pre>");
	                c.setStyle("position", "absolute");
	                c.setStyle("z-index", "-20");
	                Y.one("body").append(c);
	                var targetHeight = c.getComputedStyle('height');
	                r.setStyle("height", targetHeight);
	                c.setStyle("display", "none");
	                c.remove();
	
	           };
            r.on(["change","keyup"], f); 
            f();
          
		},
		flush:function(){
			this.get("localStorage").flush();
		},
	    loadTemplate:function(config){
	    	if(this.get('cache'))
	    	{
	    		if(this.get('localStorage').retrieve(config.name))
	    		{
	    			this.fire("template_loaded:"+config.name,{
				    		template:Y.Node.create(this.get('localStorage').retrieve(config.name).response)
				    });
				    return;
	    		}
	    		
	    	}
	    	Y.io(this.get('baseURL')+'welcome/template',{
	    		method:'POST',
	    		data:{template:config.name},
	    		context:this,
	    		on:{
	    			complete:function(i,o,a){
	    				var n = Y.Node.create(o.responseText);
	    				this.get('localStorage').add(config.name,o.responseText);
				    	this.fire("template_loaded:"+config.name,{
				    		template:Y.Node.create(this.get('localStorage').retrieve(config.name).response)
				    	});
				    	
	    			}
	    		}
	    	});
	    	
	    }
	},{
		ATTRS:{
			cache:{
				value:true
			},
			localStorage:{
				value:new Y.CacheOffline()
			},
			baseURL:{
				value:'' //essential property
			},
			configOptions:{
				value:{}
			}
		}
	});
    
	Y.AshleshaBase = Base;
 
}, '0.1', { 
    requires: ['node','base','event','io','querystring-stringify-simple','cache-offline','json'], 
    skinnable: false
});


YUI.add('ashlesha-generic-model', function (Y) {
	
	   
		Y.GenericModel = Y.Base.create('GenericModel', Y.Model, [], {
		initializer:function(){
			Y.on("ashlesha-base-response",function(e){
				this.setBaseURL(e.base.get('baseURL'))
				
			},this);
			Y.fire("ashlesha-base-request");
		},
		setBaseURL:function(v){
			this.set('baseURL',v);
		},
		getBaseURL:function(){
			if(this.get('baseURL'))
			{
				return this.get('baseURL');
			}
			return Y.baseURL;
		},
        sync:function(action, options, callback){
            
            var model = this;
            if(action=='read'){
                if(model.get('_id'))
                {
                    
                    Y.io(this.getBaseURL()+'io/get_model',{
                    method:'POST',
                    data:model.toJSON(),
                    on:{
                        complete:function(i,o,a){
                            var response = Y.JSON.parse(o.responseText);
                            callback(null, response);
                        }
                    }
                    });
                }
                else
                {
                    callback(null,model.toJSON());
                }
                return;
            }
            if(action=='delete'){
                if(model.get('_id'))
                {
                    Y.io(this.getBaseURL()+'io/delete_model',{
                    method:'POST',
                    data:model.toJSON(),
                    on:{
                        complete:function(i,o,a){
                            var response = Y.JSON.parse(o.responseText);
                            callback(null, response);
                        }
                    }
                    });
                }
                else
                {
                    callback(null,model.toJSON());
                }
                return;
            }
            if(action=='create' || !model.get('_id'))
            {
                Y.io(this.getBaseURL()+'io/create_model',{
                    method:'POST',
                    data:model.toJSON(),
                    on:{
                        complete:function(i,o,a){
                            var response = Y.JSON.parse(o.responseText);
                            callback(null, response);
                        }
                    }
                });
                return;
            }
            if(action=='update')
            {
                Y.io(this.getBaseURL()+'io/update_model',{
                    method:'POST',
                    data:model.toJSON(),
                    on:{
                        complete:function(i,o,a){
                            var response = Y.JSON.parse(o.responseText);
                            callback(null, response);
                        }
                    }
                });
                return;
            }
        }
    },{});
	
	},'0.1',{
	requires: ['model','ashlesha-base'], 
    skinnable: false
});

YUI.add('ashlesha-generic-list', function (Y) {
	
	   Y.GenericList = Y.Base.create('groupList', Y.ModelList, [], {
	   	initializer:function(){
	   		Y.on("ashlesha-base-response",function(e){
				this.setBaseURL(e.base.get('baseURL'))
				
			},this);
			Y.fire("ashlesha-base-request");
	   	},
	   	setBaseURL:function(v){
			this.set('baseURL',v);
		},
		getBaseURL:function(){
			if(this.get('baseURL'))
			{
				return this.get('baseURL');
			}
			return Y.baseURL;
		},
		/**
		 * @options = { action:'quiz_response|...'} 
		 */
        sync:function(action, options, callback){
               Y.io(this.getBaseURL()+'in/get_list',{
                   method:'POST',
                   data:options,
                   on:{
                       success:function(i,o,a){
                            var data = Y.JSON.parse(o.responseText);
                            callback(null,data);
                       }
                   }
               });
       },
        model:Y.GenericModel
    });
		
	
	},'0.1',{
	requires: ['model-list','ashlesha-generic-model'], 
    skinnable: false
});

/**
 * Contains PostModel , PostView , CreatePostView 
 * 
 */
YUI.add('ashlesha-post', function (Y) {
	
	Y.PostModel = Y.Base.create('postModel', Y.Model, [], {
		initializer:function(){
	   		Y.on("ashlesha-base-response",function(e){
				this.setBaseURL(e.base.get('baseURL'))
				
			},this);
			Y.fire("ashlesha-base-request");
	   	},
	   	setBaseURL:function(v){
			this.set('baseURL',v);
		},
		getBaseURL:function(){
			if(this.get('baseURL'))
			{
				return this.get('baseURL');
			}
			return Y.baseURL;
		},
        sync: function(action, options, callback){
       
            if (action == "create") {
                var model = this;
                data = this.toJSON();
                data.id = Y.Lang.now();
                delete data.nlp;
                Y.io(this.getBaseURL() + 'io/create_post', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (!response.error && response.data) {
                                model.setAttrs(response.data);
                            }
                            callback(null, data);
                        }
                    }
                });

                return;
            }
            if (action == "update") {
                var model = this;
                var data = this.toJSON();
                data.id = Y.Lang.now();
                delete data.nlp;
                Y.io(this.getBaseURL()  + 'io/update_post', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (!response.error && response.data) {
                                model.setAttrs(response.data);
                            }
                            callback(null, data);
                        }
                    }
                });

                return;
            }
            if (action == 'read') {
                var model = this;
                var data = this.toJSON()
                Y.io(this.getBaseURL() + 'io/get_model/', {
                    method: 'POST',
                    data: {
                        '_id': data['_id']
                    },
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response) {
                                model.setAttrs(response);
                            }

                            callback(null, model.toJSON());

                        }
                    }
                });
            }
            if (action == 'delete') {
                var model = this;
                var data = this.toJSON()
                Y.io(this.getBaseURL() + 'io/delete_model/', {
                    method: 'POST',
                    data: {
                        '_id': data['_id']
                    },
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response) {
                                model.setAttrs(response);
                            }

                            callback(null, model.toJSON());

                        }
                    }
                });
            }

        
        },
        idAttribute: '_id',
        profilePic: function () {

            return this.getBaseURL()  + 'in/profile_pic/' + this.get('author_id');
        },
        validate: function (attributes) {

            attributes.text = Y.Lang.trim(attributes.text);
            attributes.tags = Y.Lang.trim(attributes.tags);
            if (!attributes.text || !Y.Lang.trim(attributes.text) || !Y.Lang.isString(attributes.text)) {
                return "Text cannot be empty";
            }
            if (!attributes.tags || !Y.Lang.trim(attributes.tags) || !Y.Lang.isString(attributes.tags)) {
                return "Please provide brand,product,service names separated by comma";
            }
            var tags = attributes.tags.split(",");
            if (tags.length > 4) {
                return "Provide only 4 brand,product,service names";
            }
            if (!attributes.sector) {
                return "You need to enter a valid sector.";
            } else {
                if (cache.retrieve("all_sectors")) {
                    if (!Y.Array.indexOf(cache.retrieve("all_sectors"), attributes.sector)) {
                        return "Please select a valid sector. The one you have provided is incorrect.";
                    }
                }
            }
        }
    }, {
        ATTRS: {
            id: {
                value: null
            },
            images: {
                value: {}
            },
            type: {
                value: 'post'
            },
            visible: {
                value: true
            },
            tags: {
                value: 'sample'
            },
            text: {
                value: 'Default text'
            },
            category: {
                value: 'painpoint'
            },
            author_id: {
                value: 1
            },
            author: {
                value: 'unknown'
            },
            like: {
                value: false
            },
            dislike: {
                value: false //DOES THE CURRENT USER LIKE THIS POST ? 
            },
            likes: {
                value: 0 //TOTAL LIKES FOR THIS POST 
            },
            dislikes: {
                value: 0
            },
            comments: {
                value: 0
            },
            _id: {
                value: 0
            },
            sector: {
                value: ''
            },
            sentiment:{
            	value:''
            },
            ownership:{
            	value:'public'
            },
            comment_count:{
            	value: 0
            }

        }
    });
	Y.CommentModel = Y.Base.create('commentModel', Y.Model, [], {
		initializer:function(){
	   		Y.on("ashlesha-base-response",function(e){
				this.setBaseURL(e.base.get('baseURL'))
				
			},this);
			Y.fire("ashlesha-base-request");
	   	},
	   	setBaseURL:function(v){
			this.set('baseURL',v);
		},
		getBaseURL:function(){
			if(this.get('baseURL'))
			{
				return this.get('baseURL');
			}
			return Y.baseURL;
		},
        sync: function(action, options, callback){
        	var model = this;
        	if (action == "create") {
                
                var data = this.toJSON();
                data.id = Y.Lang.now();
                Y.io(this.getBaseURL() + 'io/create_comment', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (!response.error && response.data) {
                                model.setAttrs(response.data);
                            }

                            callback(null, response.data);
                        }
                    }
                });
                
                return;
            }
            if (action == 'delete') {
               
                var data = this.toJSON()
                Y.io(this.getBaseURL() + 'io/delete_model/', {
                    method: 'POST',
                    data: {
                        '_id': data['_id']
                    },
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response) {
                                model.setAttrs(response);
                            }

                            callback(null, model.toJSON());

                        }
                    }
                });
            }
        },
        idAttribute: '_id',

    }, {

        ATTRS: {
			'_id':{
				value:null
			},
            comment: {
                value: 'Some Comment'
            },
            post_id: {
                value: 0
            },
            author: {
                value: 'comment_author'
            },
            author_id: {
                value: 0
            },
            type: {
                value: "comments"
            }
        }
    });
    Y.CommentList= Y.Base.create('commentlist', Y.ModelList, [], {
    	initializer:function(){
	   		Y.on("ashlesha-base-response",function(e){
				this.setBaseURL(e.base.get('baseURL'))
				
			},this);
			Y.fire("ashlesha-base-request");
	   	},
	   	setBaseURL:function(v){
			this.set('baseURL',v);
		},
		getBaseURL:function(){
			if(this.get('baseURL'))
			{
				return this.get('baseURL');
			}
			return Y.baseURL;
		},
        sync: function(action, options, callback){
		           Y.io(this.getBaseURL() + 'in/comments', {
		                method: 'POST',
		                data: {
		                    post_id: options.post_id
		                },
		                on: {
		                    success: function (i, o, a) {
		                        var data = Y.JSON.parse(o.responseText);
		                        for (var i in data) {
		                            data[i]['id'] = data[i]['_id'];
		
		                        }
		                        callback(null, data);
		                    }
		                }
		            });
		
		            return;
            },
            model: Y.CommentModel,
            comparator: function (model) {
                return model.get('created_at');
            }

    });
    Y.CommentView = Y.Base.create('commentview',Y.View,[],{
			containerTemplate:'<div class="row-fluid commentsView hide" />',
			initializer:function(config){
				var viewObj = this,r;
				Y.on("ashlesha-base-response",function(baseevent){
					this.setBaseURL(baseevent.base.get('baseURL'));
					this.template=Y.one("#post-comments").getContent();
					this.list = new Y.CommentList();
					this.list.on("add",this.addComment,this);
					this.list.on("remove",this.render,this);
					this.postId = config.postId;
					this.get('container').setHTML(baseevent.base.get('loader'));
					this.list.on('load',function(){
						this.get('container').setHTML('');
						if(viewObj.list.size()>0)
						{
							viewObj.get('container').append("<hr/><br/>");
						}
						viewObj.list.each(function(item,index){
							viewObj.addComment({model:item});
						},viewObj);
						viewObj.get('container').append(Y.one("#comment-form").getContent());
						r = this.get('container').one(".commentText");
						baseevent.base.autoExpand(r);
						this.get('container').one("textarea").on("focus",function(){
							this.get('container').one("textarea").set("rows",3);
						},this);
						this.get('container').one(".submitComment").on("click",function(e){
							this.get('container').one('.commentsForm').one('.help-block').setHTML();
							e.halt();
							var container = this.get('container'),list = this.list,that=this,comment = new Y.CommentModel({comment:this.get('container').one("textarea.commentText").get("value"),post_id:this.get('model').get("_id"),author_id:Y.userModel.get('id') });
							if(comment.get('comment'))
							{
								comment.save(function(err,response){
									if(!err){
										list.add(comment);
										that.get('container').one('.commentsForm').one('.help-block').setHTML('');
										r.set('value','');
									}	
									
									else
									{
										that.get('container').one('.commentsForm').one('.help-block').setHTML(err.error);
									}
								});
							}
							
							r.focus();
						
						},this);
					
						
					},this);
					this.list.load({post_id:this.get('model').get("id"),name:this.list.name});
				},this);
				Y.fire("ashlesha-base-request");
				
				
				
				
			},
			addComment:function(e){
				var form = null; 
				if(this.get('container').one(".commentsForm")){form = this.get('container').one(".commentsForm").remove(); }
				var that = this;
				var c = Y.Node.create('<div/>');
				c.setHTML(Y.Lang.sub(that.template,{
					TEXT:e.model.get("comment"),
					AUTHOR:e.model.get("author"),
					IMG:baseURL+'in/profile_pic/'+e.model.get("author_id")
				}));
				that.get('container').append(c);
				
				if(e.model.get("author_id")==window.current_user)
				{
					e.model.on('destroy',function(){
						c.remove();
					});
					c.one('.delete-link').removeClass('hide');
					c.one('.delete-link').on('click',function(ev){
						ev.halt();
						e.model.destroy({remove:true});
					});
				}
				
				if(form){
					this.get('container').append(form); 
				} 
				
				
			},
			render:function(config){
				return this;
			}
		});
    
	Y.PostView = Y.Base.create('postView', Y.View, [], {
        expandComments: false,
        containerTemplate: "<div class='row-fluid postrow'/>",
        close: function () {
            this.get('container').destroy();
        },
        initializer: function (config) {
        	
        	Y.on("ashlesha-base-response",function(eventbase){
				
				this.setBaseURL('baseURL',eventbase.base.get('baseURL'));
				this.expandComments = (config && config.expandComments) || false;
	            this.template = Y.Lang.sub(Y.one('#post-row').getContent(), {
	                IMG: eventbase.base.get('baseURL') + 'in/profile_pic/' + this.get('model').get('author_id')
				
	            });
		        this.get('model').after("change", this.render, this);
	            this.get('model').on('destroy', function () {
	                this.get('container').addClass('hide');
	            }, this);
	            if (this.get('model').get("type") == "post") {

	                this.get('container').setHTML(Y.Lang.sub(this.template, {
	                    TEXT: this.get('model').get("text"),
	                    AUTHOR: this.get('model').get("author"),
	                    IMG: "http://placehold.it/40x40",
	                    ID: this.get('model').get("author_id")
	                }));
	                 this.sanitize();
	            }
	            
	            
			},this);
			Y.fire("ashlesha-base-request");
            
        },
        rerender:function(config){
        	 if (this.get('model').get("type") == "post") {

	                this.get('container').setHTML(Y.Lang.sub(this.template, {
	                    TEXT: this.get('model').get("text"),
	                    AUTHOR: this.get('model').get("author"),
	                    IMG: "http://placehold.it/40x40",
	                    ID: this.get('model').get("author_id")
	                }));
	         }
	        this.sanitize(config);
        	this.appendVideos(config.videos);
        },
        setBaseURL:function(v){
        	this.set('baseURL',v);
        },
        getBaseURL:function(){
        	return this.get('baseURL');
        },
        appendVideos:function(videos){
        	videos = Y.Array.unique(videos);
        	for(var v in videos)
        	{
        		this.get('container').one(".postBody").append(new Y.YouTubeView({
        			v_id:videos[v]
        		}).render().get('container'));
        	}	
        },
        processURLs: function (text) {

            var that = this, m = this.get('model'),urls,videos=[],qstrings,param;
           	
            if (text.match(/https?:\/\//)) {
            	try{
            	urls = text.match(/(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi);
            	for(var i in urls)
            	{
            		if(urls[i].match('www.youtube.com'))
            		{
            			qstrings = urls[i].split("?").pop().split("&");
            			for(var j in qstrings)
            			{
            				param = qstrings[i].split("=");
            				
            				if(param.length==2)
            				{
            					if(param[0]=="v")
            					{
            						videos.push(param[1]);
            					}
            				}
            			}
            		}
            	}
            	}catch(ex){
            		Y.log(ex);
            	}
                Y.io(this.getBaseURL() + "in/url_encode", {
                    method: 'POST',
                    data: {
                        text: text
                    },
                    on: {
                        success: function (i, o, a) {

                            if(videos && videos.length>0)
                            {
                            	that.rerender({
                                	text: o.responseText,
                                	videos:videos
                            	});
                            }
                            else
                            {
                            	that.rerender({
                                text: o.responseText
                            	});
                            }
                        }
                    }

                });
            }
           

        },
        addImages: function () {
            var c = this.get('container'), images = this.get('model').get("images"),baseURL=this.getBaseURL();
            if (images) {

                try {
                    images = Y.JSON.parse(images);
                    if (typeof images == "object") {
                        var width;
                        var height;
                        for (var i in images) {
                            var img = new Image();
                            img.onload = function () {
                                width = this.width;
                                height = this.height;
                                var node = Y.Node.create(Y.Lang.sub(
                                Y.one("#embedded-image").getContent(), {
                                    IMG: baseURL + images[i]
                                }

                                ));
								if(c.one(".postBody").all("img").size()==0)
								{
									 c.one(".postBody").append(node);
								}
                               
                                
                                if (node.one("img").get("clientWidth") && node.one("img").get("clientWidth") > width) {
                                    node.one("img").removeClass("span6");
                                    node.one("img").setStyle("width", width + "px");

                                }

                            };
                            img.src = baseURL + images[i];
                            break; //Let us add only one image to the view
                        }

                    }
                } catch (ex) {

                }

            }
        },
        events: {

        },
        adminView: function () { //Overrride this method for other views
            this.get("container").setContent(Y.Lang.sub(Y.one("#post-row-admin").getContent(), {
                TEXT: this.get('model').get('text'),
                TAGS: this.get('model').get('tags'),
                IMG: this.get('model').profilePic() 
            }));
            this.get('ashleshabase').autoExpand(this.get("container").one("textarea"));
            this.get('container').all(".autocomplete").plug(Y.Plugin.AutoComplete, Y.BABE.TagBoxConfig);
            this.get('container').one(".delete-btn").on("click", function (e) {
                this.get('model').destroy({
                    remove: true
                });
                e.halt();
            }, this);
			if(this.get('usermodel').hasRole('administrator')){
				if(this.get('model').get('sentiment'))
				{
					this.get('container').one(".administrator").all('button').removeClass('btn-success');
					var btn = this.get('container').one(".administrator").one('button.'+this.get('model').get('sentiment'));
					if(btn)
					{
						btn.addClass('btn-primary'); 
					}
				}
				this.get('container').one(".administrator").removeClass('hide');
				this.get('container').one(".administrator").all('button').on('click',function(e){
					if(e.target.hasClass('positive'))
					{
						this.get('model').set('sentiment','positive');
					}
					else if(e.target.hasClass('negative'))
					{
						this.get('model').set('sentiment','negative');
					}
					else if(e.target.hasClass('neutral'))
					{
						this.get('model').set('sentiment','neutral');
					}
					this.get('model').save();
				},this);
			}
			else
			{
				this.get('container').one(".administrator").remove(true);
			}
            this.get('container').one(".save-btn").on("click", function () {
                this.get('model').set('tags', this.get('container').one('[name=tags]').get('value'));
                this.get('model').set('text', this.get('container').one('textarea').get('value'));
                var viewObj = this;
                this.get('model').save(function (err, response) {

                    if (err) {
                        
                        if(err.error)
                        {
                        	this.get('ashleshabase').showAlert("Ooops!", err.error);
                        }
                        else
                        {
                        	this.get('ashleshabase').showAlert("Ooops!", "You can not edit this.");
                        }
                    } else {
                        this.get('ashleshabase').showAlert("Done!", "Your changes are saved successfully!");
                        viewObj.render();
                    }

                });
            }, this);
        },
        updateToolbar: function () {

            var cmodel = this.get('model');
            if (cmodel.get('author_id') == window.current_user || this.get('usermodel').hasRole('administrator')) {
                this.get('container').one('.wall-post-admin').setHTML(Y.one('#wall-post-admin-btn').getHTML());
                this.get('container').one('.wall-post-admin').one("button").on('click', function () {
                    this.adminView();
                }, this);
                this.get('container').one('.wall-post-admin').setStyle("visibility", "hidden");
                this.get('container').on('hover', function () {
                    this.get('container').one('.wall-post-admin').setStyle("visibility", "visible");
                }, function () {
                    this.get('container').one('.wall-post-admin').setStyle("visibility", "hidden");
                }, this);
                this.one
            }
            var c = this.get('container').one(".toolbar");
            c.setContent("");
            if (this.get('model').get("like")) {

                if (parseInt(this.get('model').get("likes")) <= 1) {
                    c.append(Y.Lang.sub("<span>You like this post. {DISLIKES} people dislike this post! <a class='undo' href='#'>Undo</a> </span>", {
                        DISLIKES: parseInt(this.get('model').get("dislikes"))
                    }));
                } else {
                    c.append(Y.Lang.sub("<span>You and {LIKES} like this post. {DISLIKES} people dislike this post! <a class='undo' href='#'>Undo</a> </span>", {
                        LIKES: parseInt(this.get('model').get("likes")) - 1,
                        DISLIKES: parseInt(this.get('model').get("dislikes"))
                    }));
                }


            } else if (this.get('model').get("dislike")) {
                if (parseInt(this.get('model').get("dislikes")) <= 1) {
                    c.append(Y.Lang.sub("<span>You dislike this post. {LIKES} people like this post! <a class='undo' href='#'>Undo</a> </span>", {
                        LIKES: parseInt(this.get('model').get("likes")),
                        DISLIKES: parseInt(this.get('model').get("dislikes"))
                    }));
                } else {
                    c.append(Y.Lang.sub("<span>You and {DISLIKES} dislike this post. {LIKES} people like this post! <a class='undo' href='#'>Undo</a> </span>", {
                        LIKES: parseInt(this.get('model').get("likes")),
                        DISLIKES: parseInt(this.get('model').get("dislikes")) - 1
                    }));
                }
            } else {

                c.append(Y.Lang.sub("<span><a class='like' href='#'>Like {LIKES} </a> <a class='dislike' href='#'>Dislike {DISLIKES} </a> </span>", {
                    LIKES: this.get('model').get("likes"),
                    DISLIKES: this.get('model').get("dislikes")

                }));
                c.one('.like').on("click", function (e) {
                    this.get('model').set("like", true);
                    this.get('model').save(function (err, response) {
                        cmodel.setAttrs(response.data);
                    });
                    e.halt();

                }, this);
                c.one('.dislike').on("click", function (e) {
                    this.get('model').set("dislike", true);
                    this.get('model').save(function (err, response) {
                        cmodel.setAttrs(response.data);
                    });
                    e.halt();
                }, this);
            }
            if (c.one("a.undo")) {
                c.one("a.undo").on("click", function (e) {
                    this.get('model').set("like", 0);
                    this.get('model').set("dislike", 0);
                    this.get('model').save(function (err, response) {
                        if (err) {
                            this.get('ashleshabase').showAlert("Ooops! Something went wrong.", "Could not save your response. Try doing it again.");
                        } else {

                            cmodel.setAttrs(response.data);

                        }
                    });
                    e.halt();
                }, this);
            }
            c.append(Y.Lang.sub("<span><a class='comments' href='#'>Comments ({COUNT})</a></span>",{
            	COUNT:this.get('model').get("comment_count") || 0 
            }));
            c.append("<span> <a href='#' class='share'>Share</a></span>")
            c.setStyle("opacity", 0);
            c.transition({
                easing: 'ease-out',
                duration: 0.5,
                opacity: 1.0
            });

            c.one('.comments').on("click", function (e) {
                this.showComments();
                e.halt();
            }, this);
            c.one('a.share').on("click", function (e) {
                AppUI.navigate("/post/" + this.get('model').get('category') + "/" + this.get('model').get('_id'));
                e.halt();
            }, this);
        },
        showComments: function () {
            var comments = new Y.CommentView({
                model: this.get('model')
            });
            this.get('container').one(".post-zone").append(comments.render().get('container'));
            if (this.get('container').one(".commentsView")) {

                this.get('container').one(".commentsView").removeClass('hide');
                this.get('container').one(".commentsView").setStyle("opacity", 0);
                this.get('container').one(".commentsView").transition({
                    opacity: 1,
                    duration: 0.8
                });
                


            }
        },
        sanitize: function (config) {
            var m = this.get('model'), c = this.get('container'), t = this.template;

            if (c.one(".profile-image")) {
                c.one(".profile-image").on("click", function (e) {
                	Y.fire("navigate",{
                		action:'/user/' + m.get("author_id")
                	})
                    e.halt();
                });
            }


            this.get('container').set('id', m.get('_id'));
            var tags = m.get("tags").split(",");
            for (var i in tags) {
                if (Y.Lang.trim(tags[i])) {
                    c.one(".tagzone").append(Y.Lang.sub('<span class="label notice">{TAG}</span>&nbsp;', {
                        TAG: tags[i]
                    }));

                }

            }
            
            if (!config || !config.text) {
                this.processURLs(m.get("text"));

            }
            this.updateToolbar();
            this.addImages();
            if (this.expandComments) {
                this.showComments();
            }

        },
        render: function (){
            return this;
        }

    });
	},'0.1',{
	requires: ['ashlesha-base','app','event','youtube-panel'], 
    skinnable: false
});
