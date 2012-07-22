YUI.add('babe', 
function (Y) {
    window.Y = Y;
    Y.kLINK_DETECTION_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    var cache = new Y.CacheOffline({
        max: 200
    });
    cache.flush();
    function showAlert(head,body){
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
		}
    function genericModelSync(action, options, callback){
    		
        	var model = this;
        	if(action=='read'){
        		if(model.get('_id'))
        		{
        			
        			Y.io(baseURL+'io/get_model',{
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
        			Y.io(baseURL+'io/delete_model',{
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
        		Y.io(baseURL+'io/create_model',{
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
        		Y.io(baseURL+'io/update_model',{
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
    	function createMarkup(response) {
            var n = Y.Node.create('<div/>');
            n.setHTML(Y.Lang.sub(Y.one('#question-markup').getHTML(), {
                QUESTION: response.question
            }));
            for (var i in response.items) {
                var markup = Y.one('#simple-row').getHTML();
                if (response.items[i]['data-type'] == 'text') {
                    markup = Y.Lang.sub(markup, {
                        CONTENT: "<input type='text' class='input span12' id='item" + i + "'/>",
                        LABEL: response.items[i]['label']
                    });
                } else if (response.items[i]['data-type'] == 'radio') {
                    markup = Y.Lang.sub(markup, {
                        CONTENT: "<input type='text' class='input span12' id='item" + i + "'/>",
                        LABEL: response.items[i]['label']
                    });
                } else if (response.items[i]['data-type'] == 'textarea') {
                    markup = Y.Lang.sub(markup, {
                        CONTENT: "<textarea class='input span12' id='item" + i + "'></textarea>",
                        LABEL: response.items[i]['label']
                    });
                }
                n.one('.answer').append(markup);
            }
            return n.getHTML();
        }
  
   function genericListSync(action, options, callback){
   		Y.io(baseURL+'in/get_list',{
   			method:'POST',
   			data:options,
   			on:{
   				success:function(i,o,a){
   					 var data = Y.JSON.parse(o.responseText);
   					 callback(null,data);
   				}
   			}
   		});
   }
    function listSync(action, options, callback) {

        if (options.name == "notificationlist" && action == "read") {
            Y.io(baseURL + 'io/notifications', {
                method: 'GET',
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
        }

        if (options.name == "commentlist" && action == "read") {
            Y.io(baseURL + 'in/comments', {
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

        }
        if (options.name == "menusectionlist" && action == "read") {


            Y.requestList({
                data: "option=" + options.name,
                callback: callback
            });
            return;

        }

        if (options.name == "menuitemlist" && action == "read") {

            var data = [new MenuItemModel({
                id: 1,
                label: 'signup',
                view: 'signup'
            }), new MenuItemModel({
                id: 2,
                label: 'item1'
            }), new MenuItemModel({
                id: 3,
                label: 'item1'
            })];

            Y.requestList({
                data: "option=" + options.name + "&section=" + options.section,
                callback: callback
            });

            return;

        }
        if (options.name == "wallposts" && action == "read") {
            if (!options.count) {
                options.count = 8;
            }

            Y.io(baseURL + 'in/wallposts', {
                method: 'POST',
                data: {
                    count: options.count
                },
                on: {
                    success: function (i, o, a) {
                        var data = Y.JSON.parse(o.responseText);
                        if (Y.Lang.isFunction(options.callback)) {
                            options.callback();
                        }
                        callback(null, data);
                    }
                }
            });

            return;
        }
        
        if (options.name == "groupposts" && action == "read") {
            if (!options.count) {
                options.count = 8;
            }

            Y.io(baseURL + 'in/groupposts', {
                method: 'POST',
                data: {
                    count: options.count,
                    group_id:options.group_id
                },
                on: {
                    success: function (i, o, a) {
                        var data = Y.JSON.parse(o.responseText);
                        if (Y.Lang.isFunction(options.callback)) {
                            options.callback();
                        }
                        callback(null, data);
                    }
                }
            });

            return;
        }
        
        if (options.name == "myposts" && action == "read") {
            if (!options.count) {
                options.count = 8;
            }
            if (!options.user_id) {
                options.user_id = window.current_user;
            }

            Y.io(baseURL + 'in/userposts', {
                method: 'POST',
                data: {
                    count: options.count,
                    user_id: options.user_id
                },
                on: {
                    success: function (i, o, a) {
                        var data = Y.JSON.parse(o.responseText)
                        callback(null, data);
                    }
                }
            });
            return;
        }

        if (options.name == "groupList" && action == "read") {


            Y.io(baseURL + 'in/user_groups', {
                method: 'POST',
                on: {
                    success: function (i, o, a) {
                        var data = Y.JSON.parse(o.responseText)
                        callback(null, data);
                    }
                }
            });
        }


    }

    function modelSync(action, options, callback) {

        var data = this.toJSON();
        if (data._id == 0) {
            action = "create";

        }

        if (this.name == "postModel" || this.name == "eventModel" || this.name == "questionModel") {
            if (action == "create") {
                var model = this;
                data = this.toJSON();
                data.id = Y.Lang.now();
                delete data.nlp;
                Y.io(baseURL + 'io/create_post', {
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
                Y.io(baseURL + 'io/update_post', {
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
                Y.io(baseURL + 'io/get_model/', {
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
                Y.io(baseURL + 'io/delete_model/', {
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

        }
        if (this.name == "groupModel") {
            if (action == "create") {
                var model = this;
                data = this.toJSON();

                data.id = Y.Lang.now();
                Y.io(baseURL + 'io/create_group', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (!response.error && response.data) {
                                model.setAttrs(response.data);
                            }
                            callback(null, model.toJSON());
                        }
                    }
                });

                return;
            }

            if (action == "read") {
                var model = this;
                var data = this.toJSON()
                Y.io(baseURL + 'io/get_model/', {
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
            
            if (action == "delete") {
                var model = this;
                var data = this.toJSON()
                Y.io(baseURL + 'io/delete_model/', {
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
        }

        if (this.name == "commentModel") {
            if (action == "create") {
                var model = this;
                var data = this.toJSON();
                data.id = Y.Lang.now();
                Y.io(baseURL + 'io/create_comment', {
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
                //THIS NEEDS TO BE INSIDE AN AJAX CALL
                return;
            }
            if (action == 'delete') {
                var model = this;
                var data = this.toJSON()
                Y.io(baseURL + 'io/delete_model/', {
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

        }

        

        if (this.name == "ConnectionModel") {
            var model = this;
            if (action == "update" || action == "create") {

                var data = this.toJSON();

                Y.io(baseURL + 'io/update_connection', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response.success && response.data) {
                                model.setAttrs(response.data);
                                callback(null, data);
                            } else {
                                callback(response.error);
                            }
                        }
                    }
                });

                return;
            }
            if (action == "read") {
                var data = this.toJSON()
                Y.io(baseURL + 'io/get_connection/', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            for (var k in response) {
                                if (response[k] == "false") {
                                    response[k] = false;
                                }
                                if (response[k] == "true") {
                                    response[k] = true;
                                }
                            }
                            if (response) {
                                model.setAttrs(response);
                            }

                            callback(null, model.toJSON());

                        }
                    }
                });
            }
        }

        if (this.name == 'relationshipModel') {
            var model = this;
            if (action == "update" || action == "create") {

                var data = this.toJSON();

                Y.io(baseURL + 'io/update_relationship', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response.success && response.data) {
                                model.setAttrs(response.data);
                                callback(null, data);
                            } else {
                                callback(response.error);
                            }
                        }
                    }
                });

                return;
            }
            if (action == "read") {
                var data = this.toJSON()
                Y.io(baseURL + 'io/get_relationship/', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            for (var k in response.data) {
                                if (response[k] == "false") {
                                    response[k] = false;
                                }
                                if (response[k] == "true") {
                                    response[k] = true;
                                }
                            }
                            if (response) {
                                model.setAttrs(response.data);
                            }

                            callback(null, model.toJSON());

                        }
                    }
                });
            }
        }

        if (this.name == "notificationModel") {
            var model = this;
            if (action == "create" || action == "update") {

                var data = this.toJSON();

                Y.io(baseURL + 'io/create_notification', {
                    method: 'POST',

                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response) {
                                model.setAttrs(response);
                                callback(null, response);
                            } else {
                                callback(response.error);
                            }
                        }
                    }
                });

                return;
            }
            if (action == "read") {
                var data = this.toJSON();
                Y.io(baseURL + 'io/get_notification/', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            for (var k in response) {
                                if (response[k] == "false") {
                                    response[k] = false;
                                }
                                if (response[k] == "true") {
                                    response[k] = true;
                                }
                            }
                            if (response) {
                                model.setAttrs(response);
                                callback(null, response);
                            }



                        }
                    }
                });
                return;
            }
        }


    }
    var autoExpand = function (r) {
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
          };
     var GenericModel = Y.Base.create('GenericModel', Y.Model, [], {
        sync: genericModelSync
        ,idAttribute:'_id'
      });
    var GenericList = Y.Base.create('groupList', Y.ModelList, [], {
    	sync:genericListSync,
    	model:GenericModel
    });
    var FormOnFlyView = Y.Base.create('FormOnFlyView', Y.View, [], {
    	containerTemplate:'<div/>',
    	labelToName:function(label){
    		return label.replace(" ","").toLowerCase();
    	},
    	initializer:function(){
    		
    		var c=this.get('container'),data=this.get('items'),n;
    		c.setHTML(Y.Lang.sub(Y.one("#forms-on-fly").getHTML(),{
    			TITLE:this.get('title') || "TITLE"
    		}));
    		
    		if(data)
    		{
    			for(var f in data)
    			{
    				
    				var d = data[f];
    				if(d.type=="text")
	    			{
	    				n = Y.Node.create(Y.Lang.sub(Y.one('#form-item-text').getHTML(),{
	    					NAME:this.labelToName(d.label),
	    					VALUE: d.real_value || d.value,
	    					LABEL:d.label
	    				}));
	    				if(d.required)
	    				{
	    					n.one('input').addClass('required');
	    				}
	    				n.one('input').addClass('component');
	    				n.one('input').setAttribute("rel",d.label);
	    			}
	    			if(d.type=="dropdown")
	    			{
	    				n = Y.Node.create(Y.Lang.sub(Y.one('#form-item-dropdown').getHTML(),{
	    					NAME:this.labelToName(d.label),
	    					LABEL:d.label
	    				}));
	    				if(d.required)
	    				{
	    					n.one('select').addClass('required');
	    				}
	    				n.one('select').addClass('component');
	    				var values = d.value.split("\n");
	    				for(var i in values)
	    				{
	    					
	    					var v = values[i].split("|");
	    					if(!d.real_value || d.real_value!==v[0])
	    					{
	    						n.one("select").append("<option value='"+v[0]+"'>"+v[1]+"</option>");
	    					}
	    					else
	    					{
	    						n.one("select").append("<option value='"+v[0]+"' selected>"+v[1]+"</option>");
	    					}
	    				}
	    				n.one('select').setAttribute("rel",d.label);
	    			}
	    			
	    			
	    			c.one('.form-area').append(n);
    			}
    			c.one(".save").on('click',function(){
    				var data = [],flag=false;
    				
    				c.all(".control-group").removeClass('error');
    				c.all('.component').each(function(item){
    					
    					if(item.hasClass('required') && !item.get("value"))
    					{
    						item.ancestor(".control-group").addClass("error");
    						item.focus();
    						flag=true; 
    						return;
    					}
    					if(item.get("tagName")=="INPUT")
    					{
    						data.push({
    							type:'text',
    							real_value:item.get("value"),
    							label:item.getAttribute("rel")
    						});
    					}
    					if(item.get("tagName")=="SELECT")
    					{
    						data.push({
    							type:'dropdown',
    							real_value:item.get("value"),
    							label:item.getAttribute("rel")
    						});
    					}
    				});
    				if(!flag)
    				{
    					Y.io(this.get("save_url"),{
    						method:'POST',
    						data:{
    							data:Y.JSON.stringify(data)
    						},
    						on:{
    							success:function(i,o,a){
    								var r = Y.JSON.parse(o.responseText);
    								if(r.success)
    								{
    									showAlert("Success","Saved successfully!");
    									Y.fire("navigate",{
    										action:'/'
    									});
    								}
    	
    							}
    						}
    					})
    				}
    			},this);
    		}
    	},
    	render:function(){
    		return this;
    	}
    });
    
    var ConnectionModel = Y.Base.create('ConnectionModel', Y.Model, [], {
        sync: modelSync,
        idAttribute: '_id',
        isFriend: function () {
            if (this.get('target_connects_source') && this.get('source_connects_target')) {
                return true;
            } else {
                return false;
            }
        },
        requestedFriend: function () {
            if (this.get('target_connects_source') && !this.get('source_connects_target')) {
                return true;
            } else {
                return false;
            }
        },
        requestPending: function () {
            if (!this.get('target_connects_source') && this.get('source_connects_target')) {
                return true;
            } else {
                return false;
            }
        },
        isFollowing: function () {
            if (this.get('source_follows_target')) {
                return true;
            }
            return false;
        }
    }, {
        ATTRS: {

            'source_user': {
                value: ''
            },
            'target_user': {
                value: ''
            },
            'source_follows_target': {
                value: false
            },
            'target_follows_source': {
                value: false
            },
            'target_connects_source': {
                value: false
            },
            'source_connects_target': {
                value: false
            },
            'type': {
                value: 'connection'
            }
        }

    });
    var WallView = Y.Base.create('wall', Y.View, [], {
        containerTemplate: '<div/>',
        user_id: window.current_user,
        events: {
            '#loadMore': {
                click: 'loadNext'
            }
        },
        clearWall: function () {
            this.get('container').setHTML(Y.one('#wall').getHTML());
        },
        loadWall: function (command) {
            if (command == 'my') {
                command = 'myposts';
            }
            if (command == 'stream') {
                command = null;
            }
            this.get('wall').load({
                name: command || this.get('loadCommand'),
                user_id: this.get('user_id') || window.current_user,
                group_id: this.get('group_id') || ''
            });
        },
        loadNext: function () {
            this.get('wall').next(this.get('loadCommand'), (this.get('user_id') || window.current_user));
        },
        initializer: function () {
            this.get('container').setHTML(Y.one('#wall').getHTML());
           
            var wall = new Y.BABE.PostList();
            if (this.get('list')) {
                wall = this.get('list');
            }
            if (this.get('disableLoadMore')) {
                this.get('container').one("#loadMore").addClass('hide');
            }


			wall.after('load',function(){
				if(wall.size()==0)
				{
					this.get('container').one("#loadMore").addClass('hide');
				}
				else
				{
					this.get('container').one("#loadMore").removeClass('hide');
				}
				
			},this);
            wall.after('add', this.prepend, this);
            wall.after('load', this.render, this);
            wall.load({
                name: this.get('loadCommand'),
                user_id: this.get('user_id') || window.current_user,
                group_id: this.get('group_id') || ''
            });
			Y.on("wall:refresh",function(e){
				this.get('container').setHTML(Y.one('#wall').getHTML());
            	wall.load({
	                name: this.get('loadCommand'),
	                user_id: this.get('user_id') || window.current_user,
	                group_id: this.get('group_id') || ''
	            });
            },this);
            this.set('wall', wall); 
			
        },
        prepend: function (e) {

            var view;
            if (e.model.get('category') == 'event' && !Y.APPCONFIG.event_enabled) {
                return true;
            }
            if (e.model.get('category') == 'event') {
                view = new Y.EventView({
                    model: e.model,
                    usermodel:this.get('usermodel')
                });
            } else {
                view = new Y.PostView({
                    model: e.model,
                    usermodel:this.get('usermodel')
                });
            }
            var post = view.render().get('container');
            if (!this.get('container').one("#" + e.model.get("_id"))) {
                if (this.get('container').one(".left").all(".postrow").size() > this.get('container').one(".right").all(".postrow").size()) {
                    this.get('container').one(".right").append(post);
                } else {
                    this.get('container').one(".left").append(post);
                }
            }

        },
        render: function () {


            this.get('wall').each(function (item, index) {
                this.prepend({
                    model: item
                });
            }, this);

            return this;
        }

    });
    var UserView = Y.Base.create('UserView', Y.View, [], {
        containerTemplate: '<div/>',
        updateContainer: function () {
			var profile_fields;
            this.get('container').setContent(
            Y.Lang.sub(Y.one('#user_page').getHTML(), {
                USERID: this.get('model').get('_id'),
                FULLNAME: this.get('model').get('fullname'),
            }));
            if (this.get('wall')) {
                this.get('container').one('#user_wall').setHTML(this.get('wall').render().get('container'));
            }

            if (this.connection.get('source_follows_target')) {
                this.get('container').one("#follow_user").set("innerHTML", '<i class="icon-white icon-eye-close"></i> Unfollow');
                this.get('container').one("#follow_user").set("data-content", "You will stop seeing activity of this user on your homepage.");
                this.get('container').one("#follow_user").set("data-original-title", "Unfollow");
                this.get('container').one("#follow_user").removeClass("btn-success").addClass("btn-warning");



            } else if (this.connection.get('target_follows_source')) {
                this.get('container').one("#follow_user").set("innerHTML", '<i class="icon-white icon-eye-open"></i> Follow Back');
                this.get('container').one("#follow_user").set("data-content", "This user is already following you. You might want to return the gesture.");
                this.get('container').one("#follow_user").set("data-original-title", "Follow Back");
                this.get('container').one("#follow_user").removeClass("btn-warning").addClass("btn-success");

            }

            if (this.connection.isFriend()) {
                this.get('container').one("#connect_user").set("innerHTML", '<i class="icon-white icon-minus"></i> Disconnect');
                this.get('container').one("#connect_user").set("data-content", "You will not be able to share private stuff anymore.");
                this.get('container').one("#connect_user").set("data-original-title", "Disconnect");
                this.get('container').one("#connect_user").removeClass("btn-success").addClass("btn-warning");
                jQuery(this.get('container').all('button[rel=popover]').getDOMNodes()).popover({
                    placement: 'bottom'
                });
            } else if (this.connection.requestedFriend()) {
                this.get('container').one("#connect_user").set("innerHTML", '<i class="icon-white icon-plus"></i> Accept Connection Request');
                this.get('container').one("#connect_user").set("data-content", "This user has sent you a connection request. You want to accept it ?");
                this.get('container').one("#connect_user").set("data-original-title", "Accept Connection");
                this.get('container').one("#connect_user").removeClass("btn-warning").addClass("btn-success");


            } else if (this.connection.requestPending()) {
                this.get('container').one("#connect_user").set("innerHTML", '<i class="icon-white icon-minus"></i> Withdraw Request');
                this.get('container').one("#connect_user").set("data-content", "This person has not yet accepted your Connect Request");
                this.get('container').one("#connect_user").set("data-original-title", "Disconnect");
                this.get('container').one("#connect_user").removeClass("btn-success").addClass("btn-warning");


            }
			if(this.get("usermodel").get("_id")==this.get("user_id"))
			{
				this.get('container').one("#connect_user").addClass('hide');
				this.get('container').one("#follow_user").addClass('hide');
			}
			if(this.get("usermodel").hasRole("administrator"))
			{
				this.get('container').one('#user_profile_details').removeClass('hide');
				this.get('container').one('#user_profile_details').setHTML(this.get("usermodel").toJSON());
				profile_fields = this.get('model').get("extra_fields");
				
				if(profile_fields)
				{
					Y.Array.each(profile_fields,function(item){
						this.get('container').one('#user_profile_details').append(Y.Lang.sub(Y.one("#profile_field_row").getHTML(),{
							LABEL:item.label,
							VALUE:item.real_value
						}));
					},this);
					
				}
				
			}
            this.get('container').one("#connect_user").on('click', function () {

                var old = this.connection.get('source_connects_target');
                this.connection.set('source_connects_target', !this.connection.get('source_connects_target'));
                
                Y.log(this.connection.get('source_connects_target'),this.connection.get('target_connects_source'));
                
                 if (this.connection.get('source_connects_target') && this.connection.get('target_connects_source')) {
                    var notify = new NotificationModel({
                        source_user: window.current_user,
                        target_user: this.get('model').get('_id'),
                        notification_action: 'friend',
                        linked_resource: '',
                        mark_read: '',
                        send_mail:true,
                        
                    });
                    notify.save();
                }
                
                if (this.connection.get('source_connects_target') && !this.connection.get('target_connects_source')) {

                    var notify = new NotificationModel({
                        source_user: window.current_user,
                        target_user: this.get('model').get('_id'),
                        notification_action: 'friend_request',
                        linked_resource: '',
                        mark_read: '',
                        send_mail:true
                    });
                    notify.save();


                }
                this.connection.save();

            }, this);

            this.get('container').one("#follow_user").on('click', function () {
                this.connection.set('source_follows_target', !this.connection.get('source_follows_target'));
                this.connection.save();
                if (this.connection.get('source_follows_target')) {
                    var notify = new NotificationModel({
                        source_user: window.current_user,
                        target_user: this.get('model').get('_id'),
                        notification_action: 'follow',
                        linked_resource: '',
                        mark_read: '',
                        send_mail:true
                    });
                    notify.save();
                }

            }, this);


        },
        initializer: function (config) {

            var that = this;
            if (config && config.user_id) {
                this.set('model', new Y.BABE.UserModel({
                    '_id': config.user_id
                }));
                this.connection = new ConnectionModel({
                    source_user: window.current_user,
                    target_user: config.user_id
                });
                this.get('model').after('change', this.updateContainer, this);
                this.connection.after('change', function () {
                    this.updateContainer();
                }, this);
                this.connection.load({}, function () {
                    that.updateContainer.call(that); //change the context of the function
                });
                this.get('model').load({}, function () {
                    that.updateContainer.call(that); //change the context of the function
                });
                var wall = new WallView({
                    loadCommand: 'myposts',
                    user_id: config.user_id,
                    usermodel:this.get('usermodel')
                });
                this.set('wall', wall);

            }
        },
        render: function () {

            return this;
        }
    });



    var ImageUploadView = Y.Base.create('ImageUploadView', Y.View, [], {
        containerTemplate: '<div/>',
        display: '',
        getUploadedImage: function () {
            if (this.image) {
                return this.image;
            }
            return false;
        },
        initializer: function (config) {
            this.display = config && config.display;
            this.uploadedCallback = config && config.uploadedCallback;
            var viewObj = this;
            if (!Y.one("#imageUploaderModal")) {
                this.get('container').setContent(Y.Lang.sub(Y.one("#image_uploader").getContent(),{
                	SIZE: this.get('size') || '1024x748'
                }));
                Y.one("body").append(this.get('container'));

                Y.one("#upload-img-btn").on("click", function () {
                    var cfg = {
                        method: 'POST',
                        data:{
                        	param:this.get('param')
                        },
                        form: {
                            id: Y.one("#imageuploader"),
                            upload: true
                        },
                        on: {
                            start: function () {
                                Y.one("#image-loading").setContent("<img src='" + baseURL + "static/loader.gif'/>");
                            },
                            end: function (i, o, a) {
                                //$("#imageUploaderModal").modal('hide');
                            },
                            complete: function (i, o, a) {
                                var r = Y.JSON.parse(o.responseText);
                                if (r.success) {

                                    Y.one("#image-loading").setContent("Success!");
                                    viewObj.image = r.image_url;
                                    $("#imageUploaderModal").modal('hide');
                                    if (viewObj.uploadedCallback && Y.Lang.isFunction(viewObj.uploadedCallback)) {
                                        viewObj.uploadedCallback(r.image_url);
                                    }
                                    if(viewObj.display)
                                    {
                                    	Y.one(viewObj.display).setContent("<img src='" + baseURL + viewObj.image + "' class='span11 thumbnail'/><p class='pull-right'><a href='#' class='remove'>Remove</a></p>");
	                                    Y.one(viewObj.display).one(".remove").on("click", function (e) {
	                                        e.preventDefault();
	                                        Y.one(viewObj.display).setContent("");
	                                    }); 
                                    }
                                    
                                } else {

                                    Y.one("#image-loading").setContent(Y.Lang.sub(
                                    Y.one("#error-alert").getContent(), {
                                        ERROR: r.error
                                    }));
                                    $("#" + Y.one("#image-loading").one(".alert").generateID()).alert();

                                }

                            }
                        }
                    };
                    var request = Y.io(baseURL + 'io/image_upload', cfg);
                },this);

            }

            $("#imageUploaderModal").modal({
                keyboard: false
            });

        },
        render: function () {
            $("#imageUploaderModal").modal('show');
        }
    });
    
    var CommentModel = Y.Base.create('commentModel', Y.Model, [], {
        sync: modelSync,
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

    var PostModel = Y.Base.create('postModel', Y.Model, [], {
        sync: modelSync,
        idAttribute: '_id',
        profilePic: function () {

            return baseURL + 'in/profile_pic/' + this.get('author_id');
        },
        initializer: function (config) {


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
                value: 'forbash,sample'
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
    var PostView = Y.Base.create('postView', Y.View, [], {
        expandComments: false,
        containerTemplate: "<div class='row-fluid postrow'/>",
        close: function () {
            this.get('container').destroy();
        },
        initializer: function (config) {
            this.expandComments = (config && config.expandComments) || false;
            this.template = Y.Lang.sub(Y.one('#post-row').getContent(), {
                IMG: baseURL + 'in/profile_pic/' + this.get('model').get('author_id')

            });

            this.get('model').after("change", this.render, this);
            this.get('model').on('destroy', function () {
                this.get('container').addClass('hide');
            }, this);
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
            	urls = text.match(Y.kLINK_DETECTION_REGEX);
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
                Y.io(baseURL + "in/url_encode", {
                    method: 'POST',
                    data: {
                        text: text
                    },
                    on: {
                        success: function (i, o, a) {

                            if(videos && videos.length>0)
                            {
                            	that.render({
                                	text: o.responseText,
                                	videos:videos
                            	});
                            }
                            else
                            {
                            	that.render({
                                text: o.responseText
                            	});
                            }
                        }
                    }

                });
            }
           

        },
        addImages: function () {
            var c = this.get('container');
            var images = this.get('model').get("images");
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
            Y.BABE.autoExpand(this.get("container").one("textarea"));
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
                        	showAlert("Ooops!", err.error);
                        }
                        else
                        {
                        	showAlert("Ooops!", "You can not edit this.");
                        }
                    } else {
                        showAlert("Done!", "Your changes are saved successfully!");
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
                            showAlert("Ooops! Something went wrong.", "Could not save your response. Try doing it again.");
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
            var m = this.get('model');
            var c = this.get('container');
            var t = this.template;

            if (c.one(".profile-image")) {
                c.one(".profile-image").on("click", function (e) {
                    AppUI.navigate('/user/' + m.get("author_id"));
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
        render: function (config) {



            if (this.get('model').get("type") == "post") {

                this.get('container').setHTML(Y.Lang.sub(this.template, {
                    TEXT: (config && config.text) || this.get('model').get("text"),
                    AUTHOR: this.get('model').get("author"),
                    IMG: "http://placehold.it/40x40",
                    ID: this.get('model').get("author_id")
                }));
            }
			if(config && config.videos)
			{
				this.appendVideos(config.videos)
			}
            this.sanitize(config);
            return this;
        }

    });
    var EventModel = Y.Base.create('eventModel', PostModel, [], {
        sync: modelSync,
        idAttribute: '_id',
        validate: function (attributes) {
            attributes.text = Y.Lang.trim(attributes.text);
            attributes.tags = Y.Lang.trim(attributes.tags);
            if (!attributes.text || !Y.Lang.isString(attributes.text)) {
                return {
                    'field': 'text',
                    'error': 'Text cannot be empty!'
                };
            }

            if (!attributes.title || !Y.Lang.isString(attributes.title)) {
                return {
                    'field': 'text',
                    'error': 'Title cannot be empty!'
                };
            }
            if (!attributes.tags || !Y.Lang.isString(attributes.tags)) {

                return {
                    'field': 'tags',
                    'error': "Please provide brand,product,service names separated by comma"
                };
            }
            var tags = attributes.tags.split(",");
            if (tags.length > 4) {
                return {
                    'field': 'tags',
                    'error': "Provide only 4 brand,product,service names"
                };
            }
            var checkdate = function (d) {

                    if (d.split("/").length !== 3) {
                        return false;
                    } else {
                        var dt = d.split("/");
                        if (Y.DataType.Date.parse(dt[2] + "-" + dt[1] + "-" + dt[0])) {

                            return Y.DataType.Date.parse(dt[2] + "-" + dt[1] + "-" + dt[0]);
                        } else {
                            return false;
                        }
                    }
                };
            if (!checkdate(attributes.start_date.trim())) {
                return {
                    'field': 'end_date',
                    'error': 'We could not understand the start date you entered. Please enter it in dd/mm/yyyy format.'
                };
            }
            //end date can be empty
            if (attributes.end_date.trim() && !checkdate(attributes.end_date.trim())) {
                return {
                    'field': 'start_date',
                    'error': 'We could not understand the end date you entered. Please enter it in dd/mm/yyyy format.'
                };
            }
            //If the end date is empty then make sure that end time is later than the start time
            if (!attributes.end_date.trim() || attributes.end_date.trim() == attributes.start_date.trim()) {
                if ((parseInt(attributes.start_time_hours, 10) * 60 + parseInt(attributes.start_time_mins, 10)) > (parseInt(attributes.end_time_hours, 10) * 60 + parseInt(attributes.end_time_mins, 10))) {
                    return {
                        'field': 'end_time_hours',
                        'error': 'Your ending time is sooner than the start time.'
                    };
                }
            }

            if (attributes.end_date.trim() && attributes.start_date.trim()) {
                if (checkdate(attributes.start_date) > checkdate(attributes.end_date)) {
                    return {
                        'field': 'start_date',
                        'error': 'Ending date is sooner than Start Date.'
                    };
                }
            }

        }
    }, {
        ATTRS: {

            start_date: {
                value: ''
            },
            end_date: {
                value: ''
            },
            start_time_hours: {
                value: ''
            },
            start_time_mins: {
                value: ''
            },
            end_time_hours: {
                value: ''
            },
            end_time_mins: {
                value: ''
            },
            title: {
                value: ''
            },
            sentiment:{
            	value:''
            }
        }
    });

    /** This model will be used where a user attaches himself to a resource. Such as user attending and event. **/
    var RelationshipModel = Y.Base.create('relationshipModel', Y.Model, [], {
        sync: modelSync,
    }, {
        ATTRS: {
            owner_id: {
                value: window.current_user
            },
            resource_id: {
                value: ''
            },
            relationship: {
                value: ''
            }
        }
    });


    var ForgotPassword = Y.Base.create('forgotPassword', Y.View, [], {
        containerTemplate: '<div/>',
        template_id: '#forgot-password',
        initializer: function () {
            this.render();
        },
        render: function () {
            this.template = Y.one(this.template_id).getContent();
            this.get('container').setContent(this.template);
            var container = this.get('container');
            var email = this.get('container').one("#email");
            this.get('container').one('#forgot-password-btn').on('click', function (e) {
                e.preventDefault();
                Y.io(baseURL + 'in/forgot_password', {
                    method: 'POST',
                    data: {
                        email: email.get("value")
                    },
                    on: {
                        success: function (i, o, a) {
                            var data = Y.JSON.parse(o.responseText);
                            if (!data.success) {
                                container.one('.error-content').setContent(data.message);
                                container.one('.alert-heading').setContent('Ooops!');
                                container.one(".alert").removeClass('alert-success');
                                container.one(".alert").addClass('alert-error show');
                                $(".alert").alert();
                            } else {
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
            source: baseURL + 'in/tag?'
        }),
        requestTemplate: '&q={query}',
        resultListLocator: function (response) {
            var results = response[0].query.results && response[0].query.results.tags;

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
            source: baseURL + 'in/tag?'
        }),
        requestTemplate: '&q={query}',
        resultListLocator: function (response) {
            var results = response[0].query.results && response[0].query.results.tags;

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

    var GroupModel = Y.Base.create('groupModel', PostModel, [], {
        sync: modelSync,
        idAttribute: '_id',
        validate: function (attributes) {
            if (!attributes.title || !Y.Lang.trim(attributes.title)) {
                return {
                    "field": 'title',
                    "error": "You must give your group a title"
                }
            }
            if (!attributes.description || !Y.Lang.trim(attributes.description)) {
                return {
                    "field": 'title',
                    "error": "A Group must have description"
                }
            }
            if (!attributes.tags || !Y.Lang.trim(attributes.tags)) {
                return {
                    "field": 'title',
                    "error": "A Group must have some tags"
                }
            }
        }
    }, {
        ATTRS: {
            type: {
                value: 'group'
            },
            '_id': {
                value: ''
            },
            visibility: {
                value: 'open'
            } //other value is closed
            ,
            prerequisits: {
                value: false
            },
            author_id: {
                value: ''
            },
            title: {
                value: ''
            },
            description: {
                value: ''
            },
            tags: {
                value: ''
            },
            count: {
                value: '0'
            },
            image: {
                value: 'http://placehold.it/100x100'
            }

        }
    });

    var GroupList = Y.Base.create('groupList', Y.ModelList, [], {
        model: GroupModel,
        sync: listSync
    });


    var CreateGroupView = Y.Base.create('createGroupView', Y.View, [], {
        containerTemplate: '<div class="row-fluid"/>',
        initializer: function () {
            this.get('container').setHTML(Y.one('#create-group').getHTML());
            this.get('container').one("button.btn-primary").on('click', function () {

                var g = new GroupModel({
                    visibility: this.get('container').one('input[name=visibility]:checked').get('value'),
                    author_id: window.current_user,
                    title: this.get('container').one('[name=title]').get('value'),
                    description: this.get('container').one('[name=description]').get('value'),
                    tags: this.get('container').one('[name=tags]').get('value')
                }),c = this.get('container');
                g.save(function (err, response) {

                    if (err) {
                        showAlert("Ooops!", err.error);
                    } else {
                        showAlert("Done!", "Your group is created!");
						Y.fire("sidebar:refresh");
						
						Y.fire('navigate',{
							action:'/group/'+g.get('title')+'/'+g.get('_id')
						})
                    }

                });
            }, this);
        },
        render: function () {
            return this;
        }
    });


    var QuestionModel = Y.Base.create('questionModel', PostModel, [], {
        sync: modelSync,
        idAttribute: '_id',
        validate: function (attributes) {
            if (!attributes.question_text || !attributes.question_text.trim()) {
                return {
                    "field": 'question',
                    "error": "Question field was empty!"
                }
            }
        }
    }, {
        ATTRS: {
            type: {
                value: 'question'
            },
            '_id': {
                value: ''
            },
            author_id: {
                value: ''
            },
            question_text: {
                value: ''
            },
            description: {
                value: ''
            },
            answer_count: {
                value: 0
            }

        }
    });


    var CreateQuestionView = Y.Base.create('createQuestionView', Y.View, [], {
        containerTemplate: '<div class="row-fluid"/>',
        initializer: function () {
            this.get('container').setHTML(Y.one('#create-question').getHTML());
            Y.BABE.autoExpand(this.get('container').one('textarea'));
            this.get('container').one('button.btn-primary').on('click', function () {
                var q = new QuestionModel({
                    tags: 'question',
                    author_id: window.current_user,
                    question_text: this.get('container').one('[name=question]').get('value'),
                    description: this.get('container').one('[name=description]').get('value')
                });
                var c = this.get('container');
                q.save(function (err, response) {

                    if (err) {
                        showAlert("Ooops!", err.error);
                    } else {
                        showAlert("Done!", "Your post has been published successfully.");

                        c.setContent('');
                    }

                });
            }, this);
        },
        render: function () {
            return this;
        }
    });

    var CreatePostView = Y.Base.create('creatPost', Y.View, [], {
        containerTemplate: '<div class="row-fluid"/>',
        initializer: function () {
            this.get('container').setContent(Y.one('#create-post').getHTML());
            Y.BABE.autoExpand(this.get('container').one("textarea"));
			if(this.get('post_title'))
			{
				this.get('container').one(".post_title").setHTML(this.get('post_title'));
			}
            this.get('container').one("button.img-upload").on("click", function () {
                this.set('img', new Y.BABE.ImageUploadView({
                    display: "#" + this.get('container').one('.image_preview').generateID()
                }));
            }, this);
            var lastValue;
            this.get('container').all(".autocomplete").plug(Y.BABE.AutoLoadTagsPlugin, TagBoxConfig);

            var inputNode = this.get('container').one(".ac-sector");
            if (inputNode) {
                if (!Y.APPCONFIG.post_sector_enabled) {
                    inputNode.addClass('hide');
                }
                inputNode.on('blur', function () {
                    if (inputNode.get('value').trim().length < 4) {
                        inputNode.set("value", '');
                    }
                });
            }

            if (!cache.retrieve("all_sectors")) {
                Y.io(baseURL + 'in/all_sectors', {
                    method: 'POST',
                    on: {
                        success: function (i, o, a) {
                            var tags = Y.JSON.parse(o.responseText);
                            cache.add('all_sectors', tags);
                            inputNode.plug(Y.Plugin.AutoComplete, {
                                activateFirstItem: true,
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
            } else {
                inputNode.plug(Y.Plugin.AutoComplete, {
                    activateFirstItem: true,
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





            this.get('container').one("button.btn-primary").on("click", function () {

                var sector = null;
                if (!Y.APPCONFIG.post_sector_enabled) {
                    sector = 'other';
                }
                var post = new Y.BABE.PostModel({
                    text: this.get('container').one("textarea").get("value"),
                    tags: this.get('container').one("[name=tags]").get("value"),
                    category: 'painpoint',
                    images: this.get('img') && this.get('img').image && Y.JSON.stringify([
                    this.get('img').image]),
                    sector: sector || this.get('container').one("[name=sector]").get("value"),
                    ownership: this.get('ownership') || 'public'


                });

                var c = this.get('container');
                post.save(function (err, response) {
					Y.fire("wall:refresh");
                    if (err) {
                        showAlert("Ooops!", err);
                    } else {
                        showAlert("Done!", "Your post has been published successfully.");

                        c.setContent('');
                    }

                });





            }, this);
        },
        render: function () {

            return this;
        }
    });

    var CreateEventView = Y.Base.create('creatEventView', Y.View, [], {
        containerTemplate: '<div class="row-fluid"/>',
        initializer: function () {
            this.get('container').setContent(Y.one('#create-event').getHTML());
            Y.BABE.autoExpand(this.get('container').one("textarea"));

            this.get('container').one("button.img-upload").on("click", function () {
                this.set('img', new Y.BABE.ImageUploadView({
                    display: "#" + this.get('container').one('.image_preview').generateID()
                }));
            }, this);
            this.get('container').all(".autocomplete").plug(Y.BABE.AutoLoadTagsPlugin, Y.BABE.TagBoxConfig);
            this.get('container').one("button.btn-primary").on("click", function () {

                var post = new Y.BABE.EventModel({
                    text: this.get('container').one("textarea").get("value"),
                    tags: this.get('container').one("[name=tags]").get("value"),
                    category: this.get('container').one("[name=category]").get("value"),
                    images: this.get('img') && this.get('img').image && Y.JSON.stringify([
                    this.get('img').image]),
                    start_time_hours: this.get('container').one("[name=start_time_hours]").get("value"),
                    start_time_mins: this.get('container').one("[name=start_time_mins]").get("value"),
                    end_time_hours: this.get('container').one("[name=end_time_hours]").get("value"),
                    end_time_mins: this.get('container').one("[name=end_time_mins]").get("value"),
                    start_date: this.get('container').one("[name=start_date]").get("value"),
                    end_date: this.get('container').one("[name=end_date]").get("value"),
                    title: this.get('container').one("[name=title]").get("value"),
                    ownership: this.get('ownership') || 'public'
                });
                var c = this.get('container');
                post.save(function (err, response) {
					Y.fire("wall:refresh");
                    if (err && err.error) {
                        Y.showAlert("Ooops!", err.error);
                    } else {
                        Y.showAlert("Done!", "Your post has been published successfully."); 
                        c.setContent('');
                    }

                });





            }, this);
        },
        render: function () {

            return this;
        }
    });

    var AnswerModel = Y.Base.create('answerModel', PostModel, [], {
        sync: modelSync,
        idAttribute: '_id',
        validate: function () {}
    }, {
        ATTRS: {
            type: {
                value: 'answer'
            },
            '_id': {
                value: ''
            },
            author_id: {
                value: ''
            },
            question_id: {
                value: ''
            },
            text: {
                value: ''
            }

        }
    });

    var TopBarView = Y.Base.create('topbarview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
        	var that = this;
            this.get('container').setContent(Y.Lang.sub(Y.one('#topbar-authenticated').getContent(), {
                user_name: this.get('usermodel').get("fullname"),
                user_id: this.get('usermodel').get("user_id")
            }));
            if(this.get('usermodel').hasRole('administrator'))
            {
            	this.get('container').one('#admin-btn').removeClass('hide');
            }
            else
            {
            	this.get('container').one('#admin-btn').remove(true);
            }
            
            var sv = new Y.BABE.SearchBoxView();
            this.get('container').one('.topbar-buttons').append(sv.render().get('container'));
            if(this.get('usermodel').hasRole('guest'))
            {
            	 this.get('container').one('.topbar-buttons').addClass('hide');
            	 this.get('container').one(".grouppage").remove();
            }
            if (!Y.APPCONFIG.notifications_enabled || this.get('usermodel').hasRole('guest')) {
                this.get('container').one("#notification-btn").addClass('hide');
                this.get('container').one("#notification-btn").remove();
            } else {

                this.get('container').one("#notification-btn").on("click", function (e) {
                    Y.fire('navigate',{'action':'/notifications'}); 
                    e.preventDefault();
                });
                if (!window.nl && Y.APPCONFIG.push_notifications_enabled) {
                    window.nl = new NotificationList();
                    var sr = setInterval(function () {
                        nl.load({
                            name: 'notificationlist'
                        }, function () {
                            if (!that.get('container')) {
                                clearInterval(sr);
                            }
                            if (that.get('container').one("#notification-btn").one('.badge')) {
                                that.get('container').one("#notification-btn").one('.badge').remove();
                            }
                            if (nl.size() > 0) {
                                that.get('container').one("#notification-btn").append(' <span class="badge badge-error">' + nl.size() + '</span>');

                            }
                        });
                    }, 100000);
                    this.on('destroy', function () {
                        clearInterval(sr);
                    });
                }


            }
            this.get('container').one('.navbtns').all("a").on("hover",function(e){
            	if(e.target.getAttribute("title") && e.target.one("span"))
            	{
            		e.target.one("span").setHTML("&nbsp;"+e.target.getAttribute("title"));
            	}
            },function(e){
            	if(e.target.getAttribute("title") && e.target.one("span"))
            	{
            		e.target.one("span").setHTML('');
            	}
            });
            this.get('container').one("a.brand").on("click", function (e) {
               Y.fire("navigate",{
                	action:"/"
                });
                e.preventDefault();
            });
            if(!this.get('usermodel').hasRole('guest'))
            {
            	this.get('container').one("#edit-profile").on("click", function (e) {
	                Y.fire("navigate",{
	                	action:"/me"
	                });
	                e.preventDefault();
	            });
           
            

	            this.get('container').one("a.logout").on('click', function () {
	                window.location = baseURL + 'in/logout?seed=' + Math.random();
	            });
				
	            jQuery(this.get('container').one('.dropdown-menu').getDOMNode()).dropdown();
			}

        },
        render: function () {
            
            return this;
        }
    });

    var MenuItemModel = Y.Base.create('menuitemmodel', Y.Model, [], {}, {
        ATTRS: {
            label: {
                value: 'unlabled'
            },
            view: {
                value: 'myposts'
            },
            hide: {
                value: false
            }
        }
    });

    var MenuItemList = Y.Base.create('menuitemlist', Y.ModelList, [], {
        sync: listSync,
        model: MenuItemModel

    });

    var MenuSectionModel = Y.Base.create('menusectionmodel', Y.Model, [], {}, {
        ATTRS: {
            label: {
                value: 'unlabled'
            }

        }
    });

    var MenuSectionList = Y.Base.create('menusectionlist', Y.ModelList, [], {
        sync: listSync,
        model: MenuSectionModel

    });

    var MenuItemView = Y.Base.create('menuitemview', Y.View, [], {
        containerTemplate: "<li class='menuitem'/>",
        hide: function () {
            this.get('container').addClass('hide');
        },
        show: function () {
            this.get('container').removeClass('hide');
        },
        initializer: function (config) {

            this.get('model').on('hideChange', function (e) {

                if (e.newVal == false) {
                    this.get('container').removeClass('hide').addClass('show');

                } else {
                    this.get('container').removeClass('show').addClass('hide');
                }
            }, this);
            if (this.get('model').get('name')) {
                if (this.get('model').get('name').toLowerCase() == 'group' && !Y.APPCONFIG.group_enabled) {
                    this.get('container').addClass('hide');
                }
                if (this.get('model').get('name').toLowerCase() == 'painpoint' && !Y.APPCONFIG.post_enabled) {
                    this.get('container').addClass('hide');
                }
                if (this.get('model').get('name').toLowerCase() == 'question' && !Y.APPCONFIG.question_enabled) {
                    this.get('container').addClass('hide');
                }
                if (this.get('model').get('name').toLowerCase() == 'event' && !Y.APPCONFIG.event_enabled) {
                    this.get('container').addClass('hide');
                }
                if (this.get('model').get('name').toLowerCase() == 'survey' && !Y.APPCONFIG.survey_enabled) {
                    this.get('container').addClass('hide');
                }
            }


            this.get('container').on("click", function (e) {
                var view = this.get('model').get("view");
                AppUI.navigate(view);
                e.halt();
            }, this);
        },
        render: function () {

            if (this.get('model').get("label").length <= 20) {
                this.get('container').setContent(this.get('model').get("label"));
            } else {
                this.get('container').setContent(this.get('model').get("label").substr(0, 10) + "..");
                this.get('container').set("title", this.get('model').get("label"));
            }
            return this;
        }
    });
    var MenuSectionView = Y.Base.create('menusectionview', Y.View, [], {
        containerTemplate: '<div />',
        initializer: function () {
            this.template = Y.one("#menu-section").getContent();
        },
        render: function () {
            if (this.get('model').get('name') == 'group' && !(Y.APPCONFIG && Y.APPCONFIG.group_enabled)) {
                this.get('container').addClass('hide');
            }
            this.get('container').setContent(Y.Lang.sub(this.template, {
                LABEL: this.get('model').get("label")
            }));
            return this;
        }
    });
    var SideBarMenuView = Y.Base.create('sidebarview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
        	if(this.get('usermodel').hasRole("guest"))
        	{
        		this.get('container').addClass('hide');
        	}
            var items = new GroupList();
            this.set('items', items);
            Y.on('sidebar:refresh',this.render,this);
        },
        toggleList: function (sectionContainer) {
            var max_item = 2,items = this.get('items'),hide;
            if (items.size() > max_item && (sectionContainer.one("a.more").hasClass('hide') || sectionContainer.one("a.more").hasClass('dropped'))) {

                hide = 0;
                items.each(function (item, index) {
                    if (hide < max_item) {
                        item.set('hide', false);
                        item.save();
                        hide++;
                    } else {
                        item.set('hide', true);
                        item.save();
                    }

                });
                sectionContainer.one("a.more").removeClass('hide');
                sectionContainer.one("a.more").setHTML("<h4><small>MORE</small></h4>");
                sectionContainer.one("a.more").removeClass('dropped');
            } else {

                items.each(function (item, index) {

                    item.set('hide', false);
                    item.save();


                });
                sectionContainer.one("a.more").addClass('dropped');
                sectionContainer.one("a.more").setHTML("<h4><small>LESS</small><h4>");

            }
        },
        render: function () {
        	
            var menuContainer = this.get('container'),sections = new MenuSectionList(),that = this;
			this.get('container').setHTML('');
			if(this.get('usermodel').hasRole("guest"))
        	{
        		return this;
        	}
            sections.load({
                name: 'menusectionlist'
            }, function () {
                sections.each(function (item, index) {
                    var section = new MenuSectionView({
                        model: item
                    });

                    if (item.get('name') == 'group') {


                        var sectionContainer = section.render().get('container');
                        menuContainer.append(sectionContainer);
                        var items = that.get('items');
                        items.load({
                            name: 'groupList'
                        }, function () {


                            items.each(function (item, index) {

                                sectionContainer.one("ul").append(new MenuItemView({
                                    model: item
                                }).render().get('container'));

                            });


                            that.toggleList(sectionContainer);
                            sectionContainer.one("a.more").on('click', function () {
                                that.toggleList(sectionContainer);
                            });

                        });
                    } else {
                        var items = new MenuItemList();
                        var sectionContainer = section.render().get('container');
                        menuContainer.append(sectionContainer);
                        items.load({
                            name: 'menuitemlist',
                            section: item.get("id")
                        }, function () {
                            items.each(function (item, index) {
                                sectionContainer.one("ul").append(new MenuItemView({
                                    model: item
                                }).render().get('container'));
                            });
                        });
                    }



                });

            });
            return this;
        }
    });
    var SideBarView = Y.Base.create('sidebarview', Y.View, [], {
        containerTemplate: "<div/>",
        initializer:function(){
        	
        	var user = new UserModel({
                '_id': window.current_user
            });
            var that = this;
            user.load({}, function () {

                var template = Y.Lang.sub(Y.one("#sidebar-authenticated").getHTML(), {
                    IMG: (function(){ if(user.get("profile_pic").match("^http://")){ return user.get("profile_pic");}else{ return baseURL+user.get("profile_pic");} })(),
                    FULLNAME: user.get("fullname")
                });
                
                that.get('container').setHTML(Y.Lang.sub(template, {
                    user_name: user.get("fullname"),
                    user_id: user.get("_id")
                }));

                that.get('container').append(new SideBarMenuView({usermodel:user}).render().get('container'));
				

            });
        },
        render: function () {

            

            return this;

        }
    });

    var StatusBlockView = Y.Base.create('statusblockview', Y.View, [], {
        containerTemplate: '<div id="statusblock"/>',
        initializer: function () {
        	var post_cats,i;
			this.set('container', Y.Node.create('<div id="statusblock"/>'));

            this.get('container').setContent(Y.Lang.sub(Y.one('#statusblock-authenticated').getContent(), {
                user_name: this.get('usermodel').get("username"),
                user_id: this.get('usermodel').get("_id")
            }));
            if (Y.config) {
                if (!Y.APPCONFIG.post_enabled) {
                    this.get('container').one('a.post').addClass('hide');
                }
                if (!Y.APPCONFIG.event_enabled) {
                    this.get('container').one('a.event').addClass('hide');
                }
                if (!Y.APPCONFIG.survey_enabled) {
                    this.get('container').one('a.survey').addClass('hide');
                }
                if (!Y.APPCONFIG.question_enabled) {
                    this.get('container').one('a.question').addClass('hide');
                }
                if(Y.APPCONFIG.additional_post_categories){
                	post_cats = Y.APPCONFIG.additional_post_categories;
                	for(i in post_cats)
                	{
                		
                		this.get('container').one(".pills-status").append('<a class="event" href="#" rel="'+post_cats[i]+'"><i class="icon-plus"></i>'+post_cats[i].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})+'</a>');
                	}
                }
            }

            this.get('container').one(".pills-status").all("a").on("click", function (e) {

                var val = Y.one(e.target).get("rel");

                this.expandForm(val);

            }, this);
            if (this.get('expand')) {
                this.expandForm(this.get('expand'));
            }


        },
        hide: function () {
            this.get('container').hide(true);
        },
        show: function () {
            this.get('container').show(true);
        },
        expandForm: function (val) {
            if (val == "question") {

                var q = new Y.BABE.CreateQuestionView({
                	ownership: this.get('ownership') || 'public'
                });
                this.get('container').one(".forms").setContent(q.render().get('container'));

            }
            if (val == "event") {

                var q = new Y.BABE.CreateEventView({
                	ownership: this.get('ownership') || 'public'
                });
                this.get('container').one(".forms").setContent(q.render().get('container'));

            }
            if (val == "painpoint") {

                var q = new Y.BABE.CreatePostView({
                	ownership: this.get('ownership') || 'public'
                });
                this.get('container').one(".forms").setContent(q.render().get('container'));

            }
        }
    });

    var InviteView = Y.Base.create('inviteview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            var c = this.get('container');
            c.setHTML(Y.one('#invite-users-box').getHTML());

            c.one(".nav-tabs").all('a').on('click', function (e) {
                e.preventDefault(); 
                c.one('.tab-content').all('div.tab-pane').removeClass('active');
                c.one('.tab-content').one("#" + e.target.get('rel')).addClass('active');
            },this);
        },
        render: function () {
            return this;
        }
    });

    var NotificationModel = Y.Base.create('notificationModel', Y.Model, [], {
        sync: modelSync,
        idAttribute: '_id',
    }, {
        '_id': {
            value: ''
        },
        source_user: {
            value: window.current_user
        },
        target_user: {
            value: ''
        },
        notification_action: {
            value: ''
        },
        linked_resource: {
            value: ''
        },
        type: {
            value: 'notification'
        },
        created_at: {
            value: ''
        },
        mark_read: {
            value: ''
        }

    });
    var NotificationList = Y.Base.create('notificationlist', Y.ModelList, [], {
        sync: listSync,
        model: NotificationModel

    });

    var NotificationView = Y.Base.create('notificationview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            var c = this.get('container'),
                m = this.get('model');
            m.on('change', function () {
                if (m.get('mark_read')) {
                    c.remove();
                }
            }, this);

        },
        render: function () {

            var c = this.get('container'),
                m = this.get('model');
            var u = new UserModel({
                'id': m.get('source_user')
            });
            u.load({
                'id': m.get('source_user')
            }, function () {
            	if(!Y.one('#notification-row-' + m.get('notification_action'))){ return;}
            	
            	
                
                if (m.get('notification_action') == 'friend' || m.get('notification_action') == 'friend_request' || m.get('notification_action') == 'follow') {
                    c.setHTML(Y.Lang.sub(Y.one('#notification-row-' + m.get('notification_action')).getHTML(), {
                    		SOURCE_USER: u.get('fullname'),
                    		SOURCE_ID:u.get('_id'),
                    		
                	}));
                    
                    c.one('.visit').on('click', function () {
                       
                        Y.fire('navigate',{
                        	action:'/user/'+m.get('source_user')
                        });
                    });
                }
                else if (m.get('notification_action') == 'group_add' || m.get('notification_action') == 'group_post') {
                	
                    c.setHTML(Y.Lang.sub(Y.one('#notification-row-' + m.get('notification_action')).getHTML(), {
                    		SOURCE_USER: u.get('fullname'),
                    		GROUP_NAME:m.get('group_name'),
                    		SOURCE_ID:u.get('_id')
                	}));
                    
                    c.one('.visit').on('click', function () { 
                       
                        Y.fire('navigate',{
                        	action:'/group/'+m.get('group_name')+'/'+m.get('linked_resource')
                        });
                    });
                }
                else
                {
                	
                	c.setHTML(Y.Lang.sub(Y.one('#notification-row-' + m.get('notification_action')).getHTML(), {
                    		SOURCE_USER: u.get('fullname'),
                    		SOURCE_ID:u.get('_id'),
                    		RESOURCE: m.get('linked_resource') || ''
                	}));
                }
                c.one('.close').on('click', function () {
                    m.set('mark_read', 'true');
                    m.set('send_mail', '');
                    m.save();
                });
            });



            return this;
        }
    });
    var BarChartView = Y.Base.create('barchartview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function (config) {
            var c = this.get('container');
            var mychart = new Y.Chart({
                dataProvider: [{
                    "tag": 'loading',
                    "posts": 10
                }],
                type: "column"
            });
            this.set('chart', mychart);
            var dataSource = Y.Base.create('chartds', Y.ModelList, [], {

                sync: function (action, options, callback) {
                    var data;

                    if (action === 'read') {
                        Y.io(baseURL + 'in/get_top_tags', {
                            method: 'GET',
                            on: {
                                complete: function (i, o, a) {
                                    var response = Y.JSON.parse(o.responseText);
                                    var data = [];
                                    for (var row in response.rows) {
                                        data.push({
                                            "category": response.rows[row].key,
                                            "posts": parseInt(response.rows[row].value, 10)
                                        });

                                    }
                                    callback(null, data);

                                }
                            }
                        });

                    } else {
                        callback('Unsupported sync action: ' + action);
                    }
                }
            });
            this.set('dataSource', new dataSource());
            this.get('dataSource').on('load', function () {
                mychart.set('dataProvider', this.get('dataSource').toJSON());
            }, this);
            this.get('dataSource').load();


        },
        render: function (par) {
            var par = this.get('parentNode');
            var chartnode = Y.Node.create("<div/>")
            chartnode.setStyle('height', par.get('clientHeight'));
            chartnode.setStyle('width', par.get('clientWidth'));
            par.setHTML(chartnode);
            this.get('chart').render('#' + chartnode.generateID());
            var ds = this.get('dataSource');
            return this;
        }
    });
    var UserBlockView = Y.Base.create('searchboxview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
			if(!this.get('model')){ //if model is not provided look for the id
				this.set('model',new UserModel({
					'id':this.get('user_id'),
					'_id':this.get('user_id')
				}));
				this.get('model').on('load',this.update,this);
				this.get('model').load();
			}
			this.update();
        },
        update:function(){
        	
        	var available_roles,roles,node,that=this;
        	 if(!this.get('model').get('username')){
	        		this.get('container').addClass('hide');
	        		
        	 }
        	 else
        	 {
        	 	this.get('container').removeClass('hide');
        	 }
        	
			if(!this.get('adminView'))
			{
				 this.get('container').setHTML(Y.Lang.sub(Y.one('#user_block').getHTML(), {
	                SRC: this.get('model').get('profile_pic') || baseURL + 'in/profile_pic/' + this.get('model').get('_id'),
	                HEIGHT: '40',
	                WIDTH: '40',
	                FULLNAME: this.get('model').get('fullname'),
	                USERNAME: this.get('model').get('username'),
	                GENDER: this.get('model').get('gender'),
	                USERID: this.get('model').get('_id')
	            }));
	           
			}
			else
			{
				this.get('container').setHTML(Y.Lang.sub(Y.one('#user_block_for_admin').getHTML(), {
	                SRC: this.get('model').get('profile_pic') || baseURL + 'in/profile_pic/' + this.get('model').get('_id'),
	                HEIGHT: '40',
	                WIDTH: '40',
	                FULLNAME: this.get('model').get('fullname'),
	                USERNAME: this.get('model').get('username'),
	                GENDER: this.get('model').get('gender'),
	                USERID: this.get('model').get('_id'),
	                EMAIL:this.get('model').get('email')
	            }));
	            
	            
	             if(!this.get('disableRoles'))
	             {
	             	this.get('container').one('.disable').on('click',function(e){
	            	this.get('model').set('disabled',true);
	            	this.get('model').save();
	            	this.get('container').remove(true);
	            	e.halt();
	           		 },this);
		             this.get('container').one('.delete').on('click',function(e){
		             	this.get('model').destroy({
		             		remove:true
		             	});
		             	this.get('container').remove(true);
		             	e.halt();
		             },this);
		             available_roles = Y.APPCONFIG.supported_roles.split("|");
		             roles = this.get('model').get('roles').split("|");
		             for(var i in available_roles)
		             {
		             	node = Y.Node.create('<button type="button" class="btn btn-mini" rel="'+available_roles[i]+'">'+available_roles[i]+'</button>');
		             	for(var j in roles)
		             	{
		             		if(available_roles[i]==roles[j])
		             		{
		             			node.addClass('btn-success');
		             		}
		             	}
		             	node.on('click',function(e){
		             		if(e.target.hasClass('btn-success'))
		             		{
		             			e.target.removeClass('btn-success');
		             			roles = Y.Array.filter(roles,function(o){
		             				if(e.target.getAttribute('rel')==o){ return false;}
		             				return true;
		             			});
		             			that.get('model').set("roles",roles.join("|"));
		             			that.get('model').save();
		             			
		             		}
		             		else
		             		{
		             			e.target.addClass('btn-success');
		             			roles.push(e.target.getAttribute('rel'));
		             			
		             			roles = Y.Array.unique(roles);
		             			that.get('model').set("roles",roles.join("|"));
		             			that.get('model').save();
		             		}
		             		
		             	});
		             	this.get('container').one('.actions').append("&nbsp;");
		             	this.get('container').one('.actions').append(node);
	             	}
	             
	             }
	             else
	             {
	             	this.get('container').one('.disable').remove(true);
	             	this.get('container').one('.delete').remove(true);
	             }
			}
        }
    });
    var SearchBoxView = Y.Base.create('searchboxview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            var sb = Y.Node.create(Y.one('#searchbutton').getHTML()),
                si = Y.Node.create(Y.one('#search-box').getHTML());
            this.get('container').setHTML(Y.one('#searchbutton').getHTML());
            this.get('container').one('#search-btn').on('click', function (e) {
                this.get('container').setHTML(si);
                this.get('container').one('.search').on('click', function (e) {
                    Y.fire('search-init', {
                        search: this.get('container').one('.search-query').get('value')
                    });
                    e.halt();
                }, this);
            }, this);
        },
        render: function () {

            return this;
        }
    });
    var SearchView = Y.Base.create('searchboxview', Y.View, [], {
        containerTemplate: '<div/>',
        search: '',
        initializer: function (config) {
            if (config && config.search) {
                this.set('search', config.search);
            }
            this.get('container').setHTML(Y.Lang.sub(Y.one('#search-area').getHTML(), {
                SEARCH: this.get('search')
            }));
            this.get('container').one('.search').on('click', function (e) {
                Y.fire('search-init', {
                    search: this.get('container').one('.search-query').get('value')
                });
                e.halt();
            }, this);

        },
        render: function () {
            var c = this.get('container'),that=this;
            c.one(".search-users").setHTML(Y.BABE.LOADER);
            Y.io(baseURL + 'in/search_posts', {
                method: 'POST',
                data: {
                    search: this.get('search')
                },
                on: {
                    complete: function (i, o, a) {
                        var response = Y.JSON.parse(o.responseText);
                        var model;
						c.one(".search-posts").setHTML('');
                        for (var i in response) {
                            model = new PostModel(response[i]);
                            var view;
                            if (model.get('category') == 'event' && !Y.APPCONFIG.event_enabled) {
                                return true;
                            }
                            if (model.get('category') == 'event') {
                                view = new Y.EventView({
                                    model: model,
                                    usermodel:that.get('usermodel')
                                });
                            } else {
                                view = new Y.PostView({
                                    model: model,
                                    usermodel:that.get('usermodel')
                                    
                                });
                            }
                            var post = view.render().get('container');
                            c.one(".search-posts").append(post);
                        }

                        if (response.length == 0) {
                            c.one(".search-posts").append(Y.Lang.sub(Y.one('#info-alert').getHTML(), {
                                MESSAGE: 'No posts found with that keyword!'
                            }));
                        }


                    }
                }
            });
            Y.io(baseURL + 'in/search_users', {
                method: 'POST',
                data: {
                    search: this.get('search')
                },
                on: {
                    complete: function (i, o, a) {
                        var response = Y.JSON.parse(o.responseText),model,user;
                        
						c.one(".search-users").setHTML('');
                        for (var i in response) {
                            model = new UserModel(response[i]);
                            uv = new UserBlockView({
                                model: model,
                                usermodel:that.get('usermodel')
                            });
                            user = uv.render().get('container');
                            
                            c.one(".search-users").append(user); 
                        }

                        if (response.length == 0) {
                            c.one(".search-users").append(Y.Lang.sub(Y.one('#info-alert').getHTML(), {
                                MESSAGE: 'No <strong>Users</strong> found with that keyword!'
                            }));
                        }


                    }
                }
            });
            return this;
        }
    });
    var SiteSettingsView = Y.Base.create('searchboxview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		var model = new GenericModel({'_id':'language_english','id':'language_english'});
    		this.set('model',model);
    		this.get('container').setHTML(Y.one("#site-parameters").getHTML());
    		this.get('container').one('.params').setHTML(Y.BABE.LOADER);
    		this.get('model').on(['load','save'],function(e){
    			var data = this.get('model').toJSON();
    			this.get('container').one('.params').setHTML('');
    			for(var i in data)
    			{
    				if(Y.Array.indexOf(["_id","_rev","author_id","created_at","updated_at"],i.toLowerCase())===-1)
    				{
    					this.get('container').one('.params').append(Y.Lang.sub(Y.one('#site-parameters-item').getHTML(),{
	    					TITLE:i.toUpperCase(),
	    					VAL:data[i],
	    					KEY:i
    					}));
    					autoExpand(this.get('container').one('.params').one('textarea#'+i)); 
    					jQuery('#'+this.get('container').one('.params').one('textarea#'+i).generateID()).wysihtml5({
    						image:false,
    						link:false,
    						html:true
    					});
    				}
    				
    			}
    		},this);
    		this.get('model').load();
    		this.get('container').one(".save-btn").on('click',function(){
    			
    			 this.get('container').one('.params').all("textarea").each(function(item){
    			 	this.get('model').set(item.getAttribute('id'),item.get('value'));
    			 },this);
    			 this.get('container').one('.params').setHTML(Y.BABE.LOADER);
    			 this.get('model').save();
    		},this);
    	}
    });
    var GroupBlock = Y.Base.create('allgroupview', Y.View, [], {
    	containerTemplate:"<div/>",
    	initializer:function(){
    		this.get('container').setHTML(Y.Lang.sub(Y.one("#groupblock").getHTML(),{
    			URL:"/group/"+this.get('model').get("title")+"/"+this.get('model').get("_id"),
    			IMG:this.get('model').get("image"),
    			TITLE:this.get('model').get("title"),
    			DESC:this.get('model').get("description")
    		}));
    	}
    });
    
    var AllGroupPageView = Y.Base.create('allgroupview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		this.get('container').setHTML(Y.one("#group-page").getHTML());
    		this.loadOpenGroups();
    	},
    	loadOpenGroups:function(){
    		var c = this.get('container');
    		Y.io(baseURL+'in/top_open_groups',{
    			method:'POST',
    			on:{
    				success:function(i,o,a){
    					var r = Y.JSON.parse(o.responseText);
    					for(var i in r)
    					{
    						c.one(".open-groups").append("<li><a href='#'>"+r[i]['title']+"</a></li>").one("a").on('click',function(e){
    							
    							c.one(".groupinfo").setHTML(new GroupBlock({
    								model:new Y.Model(r[i])
    							}).render().get('container'));
    							e.halt();
    						});
    					}
    				}
    			}
    		});
    	}
    });
    
    var AdvancedStatsView = Y.Base.create("advancedstats",Y.View,[],{
    	 containerTemplate: '<div/>',
    	 initializer:function(){
    	 	var c = this.get('container');
    	 	c.setHTML(Y.one("#advancedstats").getHTML()); 
    	 	Y.on("stats:visualization",function(e){
    	 		
    	 		if(!Y.one('.advanced-stats-content'))
    	 		{
    	 			Y.log("Maps canvas not found");
    	 			return;
    	 		}
    	 		var visual = c.one(".visual").get("value"), datatype= c.one(".datatype").get("value"),param = e.selected;
    	 		Y.log(visual); Y.log(datatype);
    	 		Y.one('.advanced-stats-content').setStyle("width","80%");
    	 		Y.one('.advanced-stats-content').setStyle("height","400px");
    	 		if(visual==="maps" && datatype==="zip"){
    	 			
    	 			var ll=new google.maps.LatLng(20.397, 77.644), map = new google.maps.Map(Y.one('.advanced-stats-content').getDOMNode(),{
    	 			center: ll,
          			zoom: 5,
          			mapTypeId: google.maps.MapTypeId.ROADMAP
	    	 		});
					Y.io(baseURL+'in/profile_stats',{
						method:'POST',
						data:param,
						on:{
							success:function(i,o,a){
								var i,r = Y.JSON.parse(o.responseText), gc = new google.maps.Geocoder(),url = "http://ws.geonames.org/postalCodeLookupJSON?&username=eyantra&postalcode={ZIP}&country=IN";
								r = Y.Array.unique(r);
								
								for(i in r)
								{
									if(r[i])
									{
										Y.jsonp(Y.Lang.sub(url,{ZIP:r[i]}), function(data){
											if(data && data.postalcodes && data.postalcodes.length>0)
											{
												var marker = new google.maps.Marker({
										            map: map,
										            position: new google.maps.LatLng(data.postalcodes[0].lat,data.postalcodes[0].lng)
										        });
											}
											
										});
									}
								}
								
							}
						}
					});
    	 		}
    	 		else if(visual==="piechart" && datatype==="count"){
    	 			Y.io(baseURL+'in/profile_stats',{
					method:'POST',
					data:param,
					context:this,
					on:{
						success:function(i,o,a){
							
							var r = Y.JSON.parse(o.responseText),i,data,result={},datatable=[],key;
					       
							for(i in r)
							{
								key = ""+r[i];
								key = key.trim().toLowerCase();
								if(result[key])
								{
									result[key] +=1;
								}
								else
								{
									result[key]=1; 
								}
							}
							datatable.push([param.label,'category']);
							for(i in result)
							{
								datatable.push([i,result[i]]);
							}
							data = google.visualization.arrayToDataTable(datatable);
							new google.visualization.PieChart(Y.one('.advanced-stats-content').getDOMNode()).draw(data, {title:param.label});
						}
					}
					});
    	 		}
    	 		else
    	 		{
    	 			showAlert("Invalid Input","The Combination of Visualization and DataType is incorrect");
    	 		}
    	 		
    	 	},this);
    	 }
    });
    
    var AdminView = Y.Base.create('searchboxview', Y.View, [], {
        containerTemplate: '<div/>',
        showProfileStats:function(){
        	var c = this.get('container'),extra_fields;
        	extra_fields = new GenericModel({
				_id:"additional_profile_fields"
			});
			c.one(".content").setHTML(new AdvancedStatsView().render().get('container'));
			extra_fields.on('load',function(){
				var fields = extra_fields.toJSON();
				
				c.one(".field-list").setHTML('');
				Y.Array.each(fields.data,function(item){
					var n = Y.Node.create(Y.Lang.sub("<LI><a href='#'>{LABEL}</li><LI>",{
						LABEL:item.label
					}));
					n.one("a").on("click",function(e){
						
						 Y.fire("stats:visualization",{
						 	model : extra_fields,
						 	selected : item
						 });
						 e.halt();
					},this);
					c.one(".field-list").append(n);
				},this);
				
			},this);
			extra_fields.load();
        },
        showStats: function () {
            var c = this.get('container');
            if (this.get('container').one("a.stats")) {
                this.get('container').one("a.stats").addClass('active');
            }

            Y.io(baseURL + 'in/site_stats', {
                method: 'GET',
                context:this,
                on: {
                    complete: function (i, o, a) {
                        var response = Y.JSON.parse(o.responseText);
                        var myDataValues = response.users;
                        var n = Y.Node.create(Y.one('#stats-view').getHTML());
                        c.one('.mainarea').setHTML(n);
                        c.one('.mainarea').one('.user-stats').setStyle('height', 300);
                        c.one('.mainarea').one('.user-stats').setStyle('width', 600);
                        var mychart = new Y.Chart({
                            dataProvider: myDataValues,
                            render: "#" + c.one('.mainarea').one('.user-stats').generateID(),
                            categoryKey: "date",
                            horizontalGridlines: {
                                styles: {
                                    line: {
                                        color: "#dad8c9"
                                    }
                                }
                            },
                            verticalGridlines: {
                                styles: {
                                    line: {
                                        color: "#dad8c9"
                                    }
                                }
                            },
                            styles: {
                                axes: {
                                    date: {
                                        label: {
                                            rotation: -45,
                                            color: "#ff0000"
                                        }
                                    }
                                }
                            }
                        });
                        this.showProfileStats();
                    }
                }
            });

			
 
        },
        initializer: function (config) {
        	Y.log(config);
            this.get('container').setHTML(Y.one('#admin-view').getHTML());
            if(!this.get('user').hasRole('administrator'))
            {
            	this.get('container').setHTML('You dont have permission to access this content.');
            }

        },
        showCreateQuestion:function(){
	    	var qc = new QuestionCreationView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
	    },
        render: function () {
            if (this.get('action')) {
                switch (this.get('action')) {
                case "stats":
                    this.showStats();
                    break;
                case "create_question":
                    this.showCreateQuestion();
                    break;
                case "manage_questions":
                	this.showManageQuestions();
                	break;
                case "create_quiz":
                	this.showCreateQuiz(null);
                	break;
                case "quiz":
                	this.showCreateQuiz(this.get('quiz_id'));
                	break;
                case "manage_quiz":
                	this.manageQuiz();
                	break;
                case "share_quiz":
                	this.shareQuiz(this.get('quiz_id'));
                	break;
                case "search_user":
                	this.searchUser();
                	break;
                case "mass_mail":
                	this.massMail();
                	break;
                case "invite_users":
                	this.inviteUsers();
                	break;
                case "site_parameters":
                	this.siteParameters();
                	break;
                case "logo":
                	this.siteLogo();
                	break;
                case "additional_profile_info":
                	this.extraProfileDetails();
                	break;
                case "create_page":
                	this.createPage();
                	break;
                case "page":
                	this.createPage(this.get("page_id"));
                	break; 
                case "manage_pages":
                	this.managePages();
                	break;
                case "send_sms":
                	this.sendSMS();
                	break;
                default:
                    this.showStats();
                }
            } else {
                this.showStats();
            }
            return this;
        },
        sendSMS:function(){
        	
        	var qc = new SendSMSView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
	    	qc.fire("rendered");
        },
        createPage:function(page){
        	
        	var qc = new CreatePageView({
        		page_id:page
        	});
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
	    	qc.fire("rendered");
        },
        managePages:function(){
        	var qc = new ManagePagesView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        siteParameters:function(){
        	var qc = new SiteSettingsView();
        	
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        inviteUsers:function(){
        	var qc = new InviteUsersView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        updateCharts: function () {
            this.render();
        },
        showManageQuestions:function(){
        	var qc = new QuestionManageView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        showCreateQuiz:function(id){
        	var qc = new CreateQuizView({
        		model:new QuizModel({
        			'_id':id || null
        		})
        	});
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        manageQuiz:function(id){
        	var qc = new ManageQuizesView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        shareQuiz:function(id){
        	var qc = new ShareQuizView({
        		quiz_id:id
        	});
        	
        	
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        searchUser:function(id){
        	var qc = new SearchUserView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        massMail:function(){
        	var qc = new MassMailView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        siteLogo:function(){
        	var qc = new SiteLogoView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        },
        extraProfileDetails:function(){
        	var qc = new ExtraProfileView();
	    	this.get('container').one('.mainarea').setHTML(qc.render().get('container'));
        }
        
    });
    var PageList = Y.Base.create('pagelist', Y.ModelList, [], {
            sync: function(action, options, callback){
            	Y.io(baseURL+'in/pagelist',{
            		method:'POST',
            		on:{
            			complete:function(i,o,a){
            				callback(null,Y.JSON.parse(o.responseText))
            			}
            		}
            	});
            },
           model:GenericModel

       });
    var ManagePagesView = Y.Base.create('managepagesview', Y.View, [], {
    	 containerTemplate:'<div/>',
    	 initializer:function(){
    	 	var list = new PageList(),c=this.get('container');
    	 	this.get('container').setHTML(Y.one('#manage-pages').getHTML());
    	 	list.on('load',function(){
    	 		c.one('.pagelist').setHTML('');
    	 		var that = this;
    	 		list.each(function(item){
    	 			that.append(item);
    	 			item.on('change',function(){
    	 				list.load();
    	 			});
    	 		});
    	 	},this);
    	 	list.load();
    	 	this.set('list',list);
    	 },
    	 render:function(){ 
    	 	return this;
    	 },
    	 append:function(item)
    	 {
    	 	var c=this.get('container'),node=Y.Node.create(Y.Lang.sub(Y.one('#page-row').getHTML(),{
    	 		TITLE:item.get('title')
    	 	}));
    	 	
    	 	if(item.get('published') && (item.get('published')=="true" || item.get('published')==true) )
    	 	{
    	 		node.one('.publish').addClass('hide');
    	 		node.one('.unpublish').removeClass('hide');
    	 	}
    	 	else
    	 	{
    	 		node.one('.publish').removeClass('hide');
    	 		node.one('.unpublish').addClass('hide');
    	 	}
    	 	node.one('.view').on('click',function(){
    	 		Y.fire('navigate',{
    	 			action:'/page/'+item.get('_id')
    	 		})
    	 	});
    	 	node.one('.edit').on('click',function(){
    	 		Y.fire('navigate',{
    	 			action:'/admin/page/'+item.get('_id')
    	 		})
    	 	});
    	 	node.one('.delete').on('click',function(){
    	 		item.destroy({
    	 			remove:true
    	 		});
    	 		node.remove(true);
    	 	});
    	 	node.one('.publish').on('click',function(){
    	 		item.set("published",true);
    	 		item.save();
    	 		
    	 	},this);
    	 	node.one('.unpublish').on('click',function(){
    	 		item.set("published",false);
    	 		item.save();
    	 		
    	 	},this);
    	 	
    	 	c.one('.pagelist').append(node);
    	 }
    });
    var CreatePageView = Y.Base.create('createpageview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		var c = this.get('container'),model = new GenericModel(),editor,that=this;
    		c.setHTML(Y.one('#create_page').getHTML());
		    this.set("model",model);
    		c.one(".save").on("click",function(){
    			if(!c.one(".content").get("value"))
    			{
    				showAlert("Oops!","Plese provide some content");
    				return;
    			}
    			if(!c.one(".title").get("value"))
    			{
    				showAlert("Oops!","Plese provide some title");
    				return;
    			}
    			model.set("title",c.one(".title").get("value"));
    			model.set("float",c.one(".float").get("value"));
    			model.set("content",c.one(".content").get("value"));
    			model.set("type","page");
    			model.save();
    			
    		});
    		model.on("load",function(){
    			c.one(".title").set("value",model.get("title"));
    			c.one(".float").set("value",model.get("float"));
    			c.one(".content").set("value",model.get("content"));
    			c.one(".content").focus();
    		});
    		model.on("save",function(){
    			Y.fire("navigate",{
    				action:"/admin/page/"+model.get("_id")
    			});
    		});
    		
    		if(that.get("page_id"))
    		{
    			model.set("id",that.get("page_id"));
    			model.set("type","page");
    			model.load({
    				"_id":that.get("page_id"),
    				"id":that.get("page_id"),
    				"type":"page"
    			},function(){});
    		}
    		
    	},
    	render:function(){
    		
    		var that = this;
    		setTimeout(function(){
    			editor = new wysihtml5.Editor(that.get('container').one(".content").generateID(), { // id of textarea element
				  toolbar:      "wysihtml5-toolbar" // id of toolbar element
				  ,parserRules:  wysihtml5ParserRules // defined in parser rules set 
				});
				that.set('editor',editor);
    		},1000);
    		
    		return this;
    	}
    });
    var ExtraProfileView = Y.Base.create('massmailview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		var c = this.get('container'),flag=false,that=this;
    		c.setHTML(Y.one('#profile_fields').getHTML());
    		c.one('.add-text').on('click',function(){
    			this.addField({
    				type:"text",
    				label:'',
    				value:''
    			});
    		},this);
    		c.one('.add-dropdown').on('click',function(){
    			this.addField({
    				type:"dropdown",
    				label:'',
    				value:''
    			});
    		},this);
    		c.one(".save").on('click',function(){
    			var list=[];
    			c.all('.component').each(function(item){
    				if(!item.one('.label').get('value'))
    				{
    					flag = true; return;
    				}
    				list.push({
    					type:item.one('.type').get('value'),
    					label:item.one('.label').get('value'),
    					value:item.one('.expected').get('value'),
    					required:item.one('.required').get('checked')
    				})
    			});
    			
    			if(!flag)
    			{
    				Y.io(baseURL+'io/save_profile_fields',{
    					method:'POST',
    					data:{
    						data:Y.JSON.stringify(list)
    					}
    					,on:{
    						success:function(){
    							showAlert("Success!","The additional field were successfully saved.");
    							Y.fire("navigate",{
    								action:"/" 
    							});
    						}
    					}
    				});
    			}
    			else
    			{
    				showAlert("Oops!","Please make sure that none of the label fields are empty.");
    			}
    		});
			Y.io(baseURL+'io/get_additional_profile_fields',{
    					method:'POST',
    					on:{
    						success:function(i,o,a){
    							var list = Y.JSON.parse(o.responseText);
    							for(var i in list)
    							{
    								that.addField(list[i]);
    							}
    						}
    					}
    				});
			
    	},
    	addField:function(obj){
    		var c = this.get('container'),n,id;
    		
    		if(obj.type=="text")
    		{
    			n = Y.Node.create(Y.Lang.sub(Y.one("#text-profile-field").getHTML(),{
    				LABEL:obj.label, 
    				VALUE:obj.value
    			}));
    		}
    		if(obj.type=="dropdown")
    		{
    			n = Y.Node.create(Y.Lang.sub(Y.one("#dropdown-profile-field").getHTML(),{
    				LABEL:obj.label,
    				VALUE:obj.value
    			}));
    		}
    		n.addClass('hello');
    		if(obj.required)
    		{
    			n.one('.required').set('checked','true');
    		}
    		n.one('.close-btn').on('click',function(){
    			n.remove(true);
    		});
    		c.one('.profile-field-area').append(n);
    		
    		
    	}
    });
    var SiteLogoView = Y.Base.create('massmailview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		
    		this.get('container').setHTML(Y.one('#site-logo-change').getHTML());
    		var c = this.get('container'),that=this;
    		this.get('container').one('.img-upload').on('click',function(e){
    			var displayImage= function(){
    				c.one('.image_preview').setHTML(Y.Lang.sub('<img src="{IMG}"/>',{IMG:baseURL+that.get('img').getUploadedImage()}));
    				c.one('.save').removeClass('hide');
    			};
    		   this.set("img",new Y.BABE.ImageUploadView({
                    size:'280x65',
                    param:'logo',
                    uploadedCallback:displayImage
               }));
               
    		},this);
    		c.one('.save').on('click',function(){
    			Y.io(baseURL+'io/change_logo',{
    				method:'POST',
    				data:{
    					img:that.get('img').getUploadedImage()
    				},
    				on:{
    					success:function(){
    						window.location.reload(true);
    					}
    				}
    			});
    		},this);
    	}
    });
    
    var InviteUsersView = Y.Base.create('massmailview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		this.get('container').setHTML(Y.one('#invite-users').getHTML());
    		
    		this.get('container').one(".send").on("click",function(){
    			this.get('container').one(".send").removeClass('btn-primary').addClass('btn-warning');
    			this.get('container').one(".send").set("innerHTML","Sending......");
    			var emails = this.get('container').one("textarea.emails").get("value"),message=this.get('container').one("textarea.message").get("value");
    			Y.io(baseURL+'io/invite_users',{
    				method:'POST',
    				context:this,
    				data:{
    					emails:emails,
    					message:message 
    				},
    				on:{
    					success:function(i,o,a){
    						var c = this.get('container');
    						c.one("textarea.emails").set("value","");
    						c.one(".send").removeClass('btn-warning').addClass('btn-success');
    						c.one(".send").set("innerHTML","Sent Successfully");
    						setTimeout(function(){
    							c.one(".send").removeClass('btn-success').addClass('btn-primary');
    							c.one(".send").set("innerHTML","Invite");
    						},2000);
    					}
    				}
    			});
    		},this);
    		 
    	},
    	render:function(){
    		return this;
    	}
    });
    var MassMailView = Y.Base.create('massmailview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){ 
    		var c = this.get('container');
    		c.setHTML(Y.one('#mass-mail').getHTML());
    		c.one('.send').on('click',function(e){
    			c.all('.help-block').setHTML('');
    			c.all('.control-group').removeClass('error');
    			if(!c.one('.subject').get('value'))
    			{
    				
    				c.one('.subject').ancestor('.control-group').one('.help-block').setHTML('Subject can not be Empty.');
    				c.one('.subject').ancestor('.control-group').addClass('error');
    				return;
    			}
    			if(!c.one('.content').get('value'))
    			{
    				
    				c.one('.content').ancestor('.control-group').one('.help-block').setHTML('We need some text to send isnt it ?');
    				c.one('.content').ancestor('.control-group').addClass('error');
    				return;
    			}
    			Y.io(baseURL+'io/mass_mail',{
    				method:'POST',
    				data:{
    					subject:c.one('.subject').get('value'),
    					content:c.one('.content').get('value')
    				},
    				on:{
    					success:function(i,o,a){
    						
    					}
    				}
    			});
    		});
       	},
    	render:function(){
    		return this;
    	}
    });
    var SearchUserView = Y.Base.create('searchuserview', Y.View, [], {
    	containerTemplate:'<div/>',
    	searchLoad:function(i,o,a){
    						var response = Y.JSON.parse(o.responseText),c=this.get('container'),model;
							c.one(".search-users").setHTML('');
	                        for (var i in response) {
	                            model = new UserModel(response[i]);
	                            uv = new UserBlockView({
	                                model: model,
	                                adminView:true
	                            });
	                            var user = uv.render().get('container');
	                            c.one(".search-users").append(user);
	                        }
	
	                        if (response.length == 0) {
	                            c.one(".search-users").append(Y.Lang.sub(Y.one('#info-alert').getHTML(), {
	                                MESSAGE: 'No <strong>Users</strong> found with that keyword!'
	                            }));
	                        }
    					},
    	initializer:function(){
    		var c = this.get('container');
    		c.setHTML(Y.one('#search-user').getHTML());
    		c.one('.search-btn').on('click',function(){
    			var q = c.one('.search-box').get('value').trim();
    			c.one(".search-users").setHTML(Y.BABE.LOADER);
    			Y.io(baseURL+'in/search_users',{
    				method:'POST',
    				context:this,
    				data:{
    					search:q
    				},
    				on:{
    					success:this.searchLoad
    				}
    			});
    		},this);
    		c.one('.all-btn').on('click',function(){
    			var q = Y.Lang.trim(c.one('.search-box').get('value'));
    			c.one(".search-users").setHTML(Y.BABE.LOADER);
    			Y.io(baseURL+'in/all_users',{
    				method:'POST',
    				context:this,
    				data:{
    					search:q
    				},
    				on:{
    					success:this.searchLoad
    				}
    			});
    		},this);
    	},
    	render:function(){ return this;}
    	
    });
    var QuizModel = Y.Base.create('quizModel', Y.Model, [], {
        sync: genericModelSync,
        validate:function(attrs){
        	
        	if(!attrs.title)
        	{
        		return {
        			field:'Title',
        			error:'Title can not be Empty'
        		}
        	}
        	if(!attrs.start_date)
        	{
        		return {
        			field:'Start Date',
        			error:'Start Date can not be Empty'
        		}
        	}
        	if(!attrs.end_date)
        	{
        		return {
        			field:'End Date',
        			error:'End Date can not be Empty'
        		}
        	}
        	if(new Date(attrs.start_date)>new Date(attrs.end_date))
        	{
        		return {
        			field:'End Date',
        			error:'End Date is before Start Date'
        		}
        	}
        	
        	if(!attrs.questions)
        	{
        		return {
        			field:"questions",
        			error:'You need to add at least one question to the list'
        		}
        	}
        },
        hasQuestion:function(id){
        	var qs= this.get('questions').split(",");
        	for(var i in qs)
        	{
        		if(Y.Lang.trim(qs[i])==id)
        		{
        			return true;
        		}
        	}
        	return false;
        },
        idAttribute: '_id',
    	}, {
    		
    		ATTRS:{
		        '_id': {
		            value: ''
		        },
		        title:{
		        	value:''
		        },
		        description:{
		        	value:''
		        },
		        start_date:{
		        	value:new Date().toUTCString()
		        },
		        end_date:{
		        	value:new Date().toUTCString()
		        },
		        time:{
		        	value:60
		        },
		        questions:{
		        	value:''	
		        },
		        author_id:{
		        	value:''
		        },
		        type:{
		        	value:'quiz'
		        },
		        created_at:{
		        	value:''
		        }
       		}

    });

    var QuizList = Y.Base.create('quizlist', Y.ModelList, [], {
            sync: function(action, options, callback){
            	Y.io(baseURL+'in/quizlist',{
            		method:'POST',
            		on:{
            			complete:function(i,o,a){
            				callback(null,Y.JSON.parse(o.responseText))
            			}
            		}
            	});
            },
            model: QuizModel,
            comparator: function (model) {
                return parseInt(model.get('created_at'), 10) * -1;
            }

        })
    var ManageQuizesView = Y.Base.create('managequizesview', Y.View, [], {
    	 containerTemplate:'<div/>',
    	 initializer:function(){
    	 	var list = new QuizList(),c=this.get('container');
    	 	this.get('container').setHTML(Y.one('#manage-quiz').getHTML());
    	 	list.on('load',function(){
    	 		c.one('.quizlist').setHTML('');
    	 		var that = this;
    	 		list.each(function(item){
    	 			that.append(item);
    	 		});
    	 	},this);
    	 	list.load();
    	 	this.set('list',list);
    	 },
    	 render:function(){
    	 	return this;
    	 },
    	 append:function(item)
    	 {
    	 	var c=this.get('container'),node=Y.Node.create(Y.Lang.sub(Y.one('#quiz-row').getHTML(),{
    	 		TITLE:item.get('title')
    	 	}));
    	 	node.one('.view').on('click',function(){
    	 		Y.fire('navigate',{
    	 			action:'/admin/quiz/'+item.get('_id')
    	 		})
    	 	});
    	 	node.one('.delete').on('click',function(){
    	 		item.destroy({
    	 			remove:true
    	 		});
    	 		node.remove(true);
    	 	});
    	 	node.one('.send').on('click',function(){
    	 		Y.fire('navigate',{
    	 			action:'/admin/share_quiz/'+item.get('_id')
    	 		});
    	 	});
    	 	node.one('.preview').on('click',function(){
    	 		Y.fire('navigate',{
    	 			action:'/quiz/'+item.get('_id')
    	 		});
    	 	});
    	 	c.one('.quizlist').append(node);
    	 }
    });
    var ShareQuizView = Y.Base.create('sharequizview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(){
    		var c = this.get('container'),quiz=new QuizModel({'_id':this.get('quiz_id')}),that=this;
    		quiz.on('load',function(){
    			c.setHTML(Y.Lang.sub(Y.one('#share-quiz').getHTML(),{
    				TITLE:quiz.get('title')
    			}));
    			c.one('.roles').one('.select-all').on('click',function(e){
    				e.target.toggleClass('btn-success');
    				if(e.target.hasClass('btn-success'))
    				{
    					c.all('.select-role').removeClass('btn-success');
    				}
    				if(c.one('.roles').all('button.btn-success').size()==0)
					{
						c.one('.send').addClass('hide');
					}
					else
					{
						c.one('.send').removeClass('hide');
					}
    			});
    			c.one('button.send').on('click',function(e){
    				var text = e.target.getHTML(),roles=[];
    				if(c.one('.roles').one('.select-all').hasClass('btn-success'))
    				{
    					roles.push('*');
    				}
    				else
    				{
    					c.one('.roles').all('.select-role').each(function(n){
    						roles.push(n.getAttribute('rel'))
    					});
    				}
    				
    				e.target.addClass('btn-warning');
    				e.target.set('innerHTML','Sending...');
    				Y.io(baseURL+'io/send_quiz',{
    					method:'POST',
    					data:{
    						roles:roles.join("|"),
    						id:quiz.get('_id'),
    					},
    					on:{
    						complete:function(i,o,a){
    							e.target.removeClass('btn-warning');
    							e.target.addClass('btn-success');
    							e.target.set('innerHTML','Sent!');
    							setTimeout(function(){
			    					e.target.removeClass('btn-success');
			    					e.target.removeClass('btn-warning');
			    					e.target.addClass('btn-primary');
			    					e.target.set('innerHTML',text);
			    				},2000);
    						}
    					}
    				});
    						
    				
    			});
    			Y.io(baseURL+'in/available_roles',{
    				method:'POST',
    				on:{
    					complete:function(i,o,a){
    						var roles = Y.JSON.parse(o.responseText);
    						for(var i in roles)
    						{
    							that.addRole(roles[i]['key'],roles[i]['value']);
    						}
    						c.all('.select-role').on('click',function(e){
    							e.target.toggleClass('btn-success');
    							c.one('.select-all').removeClass('btn-success');
    							if(c.one('.roles').all('button.btn-success').size()==0)
    							{
    								
    								c.one('.send').addClass('hide');
    							}
    							else
    							{
    								c.one('.send').removeClass('hide');
    							}
    						});
    					}
    				}
    			});
    		});
    		quiz.load();
    	},
    	addRole:function(key,value){
    		var c = this.get('container');
    		c.one('.roles').append('&nbsp;<button type="button" class="btn select-role" rel="'+key+'">'+key.toUpperCase()+' ('+value+')</button> ');
    	},
    	render:function(){
    		return this;
    	}
    });
    
	var CreateQuizView = Y.Base.create('managequestionview', Y.View, [], {
		containerTemplate:'<div/>',
		initializer:function(){
			this.get('container').setHTML(Y.one('#create-quiz').getHTML());
			var m = this.get('model'), cs = this.get('container').one(".all-questions"),ct=this.get('container').one(".selected_questions");;
			
			Y.one('body').addClass('yui3-skin-sam');
			m.on('load',function(){
			 this.set('start',new Y.Calendar({
			          height:'200px', 
			          width:'200px',
			          showPrevMonth:false,
			          showNextMonth: false,
			          date: new Date(m.get('start_date'))}));
			 this.set('end',new Y.Calendar({
			          height:'200px',
			          width:'200px',
			          showPrevMonth: false,
			          showNextMonth: false,
			          date: new Date(m.get('end_date'))}));
			 
			 this.get('start').render(this.get('container').one('.start'));
			 this.get('start').selectDates(new Date(m.get('start_date')));
			 this.get('end').render(this.get('container').one('.end')); 
			 this.get('end').selectDates(new Date(m.get('end_date')));
			 
			 this.get('container').one('[name=title]').set('value',m.get('title'));
			 this.get('container').one('[name=time]').set('value',m.get('time'));
			 this.get('container').one('[name=description]').set('value',m.get('description'));
			 Y.io(baseURL+'in/get_questions',{
				method:'POST',
				on:{
					complete: function(i,o,a){
						var res = Y.JSON.parse(o.responseText),node;
						for(var i in res)
						{
							
							var node = Y.Node.create(Y.Lang.sub(Y.one('#question-row-adder').getHTML(),{
								QUESTION:res[i].data.question,
								ID:res[i]['_id']
							})),d = res[i].data;
							node.one('.btn-primary').on('click',(function(d2,n){
									return function(e){ 
										n.remove();
										ct.append(n);
										n.one('.btn-primary').addClass('hide');
										n.one('.btn-danger').removeClass('hide');
									};
							})(d,node)
							);
							node.one('.btn-danger').on('click',(function(d2,n){
									return function(e){ 
										n.remove();
										cs.append(n);
										n.one('.btn-primary').removeClass('hide');
										n.one('.btn-danger').addClass('hide');
									};
							})(d,node)
							);
							
							cs.append(((function(r){ return r;})(node)));
							if(m.hasQuestion(res[i]['_id']))
							{
								node.one('.btn-primary').simulate('click');
							}
							
						}
					}
				}
			});
			 
			 
				
			},this);
			 
			m.load();
			this.get('container').one('.create-btn').on('click',function(e){
				
				m.setAttrs({
					title:this.get('container').one("[name=title]").get('value'),
					start_date:(this.get('start').get('selectedDates').length && this.get('start').get('selectedDates')[0].toUTCString()) || null,
					end_date:(this.get('end').get('selectedDates').length && this.get('end').get('selectedDates')[0].toUTCString()) || null,
					time:this.get('container').one("[name=time]").get('value'),
					questions:this.getSelectedQuestions(),
					description:this.get('container').one("[name=description]").get('value')
					 
				});
				e.target.addClass('btn-warning');
				var old_text = e.target.get('innerText');
				e.target.set('innerText','Saving.....');
				m.save(function(err){
					if(err)
					{
						Y.showAlert("Problem with field:"+err.field,err.error);
					}
					else
					{
						Y.fire('navigate',{
							action:'/admin/quiz/'+m.get('_id')
						});
					}
					e.target.removeClass('btn-warning');
					e.target.set('innerText',old_text);
				});
			},this);
		},
		render:function(){
			
			
			return this;
		},
		getSelectedQuestions:function(){
			var str=[];
			this.get('container').all('[name=question_id]').each(function(item){
				str.push(item.get('value'));
			});
			return str.join(",");
		}
	});
	var QuestionManageView =  Y.Base.create('managequestionview', Y.View, [], {
		containerTemplate: '<div/>',
		initializer:function(){
			this.get('container').setHTML(Y.one('#manage-questions').getHTML());
			var c = this.get('container').one('.question-list');
			Y.io(baseURL+'in/get_questions',{
				method:'POST',
				on:{
					complete: function(i,o,a){
						var res = Y.JSON.parse(o.responseText),node;
						for(var i in res)
						{
							
							var node = Y.Node.create(Y.Lang.sub(Y.one('#question-row').getHTML(),{
								QUESTION:res[i].data.question
							})),d = res[i].data;
							node.one('.btn-info').on('click',(function(d2){
									return function(){ 
									var form = d2;
					                if (Y.one('#previewModal')) {
					                    Y.one('#previewModal').remove();
					                }
					                Y.one('body').append(Y.one('#preview-template').getHTML());
					                Y.one('#previewModal').one('.modal-body').setHTML(createMarkup(form));
					                jQuery('#previewModal').modal({
					                    keyboard: true
					                });
								};
							})(d)
							);
							node.one('.btn-danger').on('click',(function(d2,n){
									return function(e){ 
									
									Y.io(baseURL+'io/delete_question',{
										method:'POST',
										data:{
											id:d2['_id']
										},
										on:{
											complete:function(i,o,a){
												n.remove();
											}
										}
									});
									
					               
								};
							})(res[i],node)
							);
							c.append(((function(r){ return r;})(node)));
						}
					}
				}
			});
		}
	});
    var TextQuestionView = Y.Base.create('textquestionview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            this.get('container').setHTML(Y.one('#text-question').getHTML());
            this.get('container').one('.close-btn').on('click', function () {
                this.get('container').remove();
            }, this);
        },
        render: function () {
            return this;
        }
    });
    var RadioQuestionView = Y.Base.create('radioquestionview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            this.get('container').setHTML(Y.one('#radio-question').getHTML());
            this.get('container').one('.close-btn').on('click', function () {
                this.get('container').remove();
            }, this);
        },
        render: function () {
            return this;
        }
    });
    var TextAreaQuestionView = Y.Base.create('radioquestionview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            this.get('container').setHTML(Y.one('#radio-question').getHTML());
            this.get('container').one('.close-btn').on('click', function () {
                this.get('container').remove();
            }, this);
        },
        render: function () {
            return this;
        }
    });
    var QuestionCreationView = Y.Base.create('searchboxview', Y.View, [], {
        containerTemplate: '<div/>',
        initializer: function () {
            var c = this.get('container');
            c.setHTML(Y.one('#question-creation').getHTML());
            var drop = new Y.DD.Drop({
                node: c.one('.qdrag-area')
            });
            c.one('.drag-zone').all('.component').each(function (item) {

                var drag = new Y.DD.Drag({
                    node: item
                }).plug(Y.Plugin.DDProxy, {
                    moveOnEnd: false,
                    cloneNode: true

                });
                drag.on('drag:drophit', function (e) {
                    var type = e.drag.get('node').getAttribute('data-type');
                    switch (type) {
                    case "text":
                        c.one('.qdrag-area').append((new TextQuestionView()).render().get('container'));
                        break;
                    case "radio":
                        c.one('.qdrag-area').append((new RadioQuestionView()).render().get('container'));
                        break;
                    case "freetext":
                        c.one('.qdrag-area').append((new TextAreaQuestionView()).render().get('container'));
                        break;
                    default:

                    }
                });

            });
            c.one('.save-question').on('click', function (e) {
            	e.target.addClass('btn-warning');
                var question = this.get('container').one('textarea[name=question-text]').get('value');
                if (!question) {
                    showAlert('Oh Snap!', 'Please enter a question');
                    return;
                }
                if (this.get('container').one('.qdrag-area').all(".component").size() == 0) {
                    showAlert('Oh Snap!', 'Please drag at-least one answering model');
                    return;
                }
                Y.io(baseURL+'io/save_question',{
                	method:'POST',
                	data:{form:Y.JSON.stringify(this.getFormObject())},
                	on:{
                		complete:function(i,o,a){
                			e.target.removeClass('btn-warning');
                			e.target.addClass('btn-success');
                			setTimeout(function(){
                				e.target.removeClass('btn-success');
                			},2000);
                			showAlert('Saved!', 'Your question has been saved');
                			Y.fire('navigate',{
                				action:'/admin/create_question'
                			});
                		}
                	}
                });

            }, this);
            c.one('.preview').on('click', function () {
                var form = this.getFormObject();
                if (Y.one('#previewModal')) {
                    Y.one('#previewModal').remove();
                }
                Y.one('body').append(Y.one('#preview-template').getHTML());
                Y.one('#previewModal').one('.modal-body').setHTML(this.getMarkup(form));
                jQuery('#previewModal').modal({
                    keyboard: false
                });
            }, this);

        },
        render: function () {
            return this;
        },
        getFormObject: function () {
            var obj = [],
                response = {};
            this.get('container').one('.qdrag-area').all(".component").each(function (item) {
                obj.push({
                    'data-type': item.getAttribute('data-type'),
                    'label': item.one('.label').get('value'),
                    'expected': item.one('.expected').get('value')
                });
            });
            response.items = obj;
            response.question = this.get('container').one('textarea[name=question-text]').get('value');
            return response;
        },
        getMarkup: createMarkup

    });
   
    var AnswerBlock = Y.Base.create('searchboxview', Y.View, [], {
    	containerTemplate:'<div/>',
    	initializer:function(config)
    	{
    		
    		this.get('container').setHTML(Y.Lang.sub(Y.one('#answer-row').getHTML(),{
    			NO:config.index,
    			QUESTION_TITLE:config.data.question,
    			ANSWER_MARKUP:this.getMarkup(config)
    		}));
    		this.get('container').all('input').on('change',function(e){
    			Y.fire('answerblock:change',{
    				question_id:e.target.getAttribute('name'),
    				value:e.target.getAttribute('value')
    			});
    		},this);
    	},
    	render:function(){
    		return this;
    	},
    	getMarkup:function(config){
    		
    		var markup = '',node,expected,items=config.data.items;
    		for(var i in items)
    		{
    			switch(items[i]['data-type']) 
    			{
    				case "text":
    					markup+=Y.Lang.sub(Y.one('#text-answer-row').getHTML(),{
    						LABEL:items[i].label,
    						NAME:config['_id']
    					});
    					break;
    				case "radio":
    					node = Y.Node.create(Y.Lang.sub(Y.one('#radio-answer-row').getHTML(),{
    						LABEL:items[i].label,
    						NAME:config['_id']
    					}));
    					expected = items[i].expected.split("\n"); 
    					for(var j in expected)
    					{
    						var row = expected[j].split("|");
    						node.one('.radio-area').append('<li><input type="radio" name="'+config['_id']+'" value="'+row[1]+'"/> '+row[0]+'</li>')
    					}
    					markup+=node.getHTML(); 
    					break;
    				default:
    					break;
    			}
    		}
    		return markup; 
    	}
    });
	var AnswerQuizView = Y.Base.create('searchboxview', Y.View, [], {
		containerTemplate:'<div/>',
		initializer:function(){
			var c = this.get('container'),m=new QuizModel({
				'_id':this.get('quiz_id')
			}),now=new Date(),that=this;
			m.on('load',function(){
				c.setHTML(Y.Lang.sub(Y.one('#answer-quiz').getHTML(),{
					TITLE:m.get('title'),
					DESCRIPTION:m.get('description'),
					START_DATE:Y.DataType.Date.format(new Date(m.get('start_date')),'%F'),
					END_DATE:Y.DataType.Date.format(new Date(m.get('end_date')),'%F'),
					TIME:m.get('time')
				}));
				if(now<new Date(m.get('start_date')))
				{
					c.one('.wait4_quiz').removeClass('hide');
				}
				else
				{
					Y.io(baseURL+'in/quiz_response',{
						method:'POST',
						data:{
							quiz_id:m.get('_id')
						}, 
						on:{
							complete:function(i,o,a){
									var r = Y.JSON.parse(o.responseText);
									if(r.answered)
									{
										c.one('.answered_quiz').removeClass('hide');
									}
									else
									{
										if(now>new Date(m.get('end_date')))
										{
											c.one('.over_quiz').removeClass('hide');
										}
										else
										{
											c.one('.start_quiz').removeClass('hide');
											that.setupQuiz();
										}
									}
							}
						}
					});
				}
			
				
			});
			this.set('model',m);
			m.load();
		},
		freezeQuiz:function(){
			
		},
		setupQuiz:function(){
			var c = this.get('container'),m=this.get('model'),that=this,quiz=new GenericList();
			c.one('.start-btn').on('click',function(){
				var count = 1,timer,start=Date.now(),questions, response = new GenericModel();
				
				Y.io(baseURL+'io/start_quiz',{
					method:'POST',
					data:{
						id:m.get('_id')
					},
					on:{
						success:function(i,o,a){
							var r = Y.JSON.parse(o.responseText);
							response.setAttrs(r);
							that.set('response',response);
							response.set('_id',r['_id']);
							response.save();
							start = response.get('created_at')*1000; 
							
						}
					}
				});
				c.setHTML(Y.Lang.sub(Y.one('#answer-quiz-start').getHTML(),{
					TITLE:m.get('title'),
					DESCRIPTION:m.get('description'),
					START_DATE:Y.DataType.Date.format(new Date(m.get('start_date')),'%F'),
					END_DATE:Y.DataType.Date.format(new Date(m.get('end_date')),'%F'),
					TIME:m.get('time')
				}));
				
				timer = setInterval(function(){
					Y.io(baseURL+'in/remaining_time',{
						method:'POST',
						data:{ quiz_id: m.get('_id') },
						on:{
							success:function(i,o,a){
								var total=m.get('time')*60,pec=0,remaining = parseInt(o.responseText,10);
								pec = (remaining/total)*100;
								if(remaining<=0)
								{
									if(that.get('response'))
									{
										that.get('response').set('finished',true);
										that.get('response').save();
									}
									remaining = 0;
									clearInterval(timer);
									that.freezeQuiz();
									return;
								}
								if(pec>99.99){ pec = 100; }
								if(pec<1){ pec = 0; }
								pec = Math.ceil(pec);
								pec = 100-pec;
								c.one('.bar').setStyle('width',pec+'%');
								c.one('.badge-inverse').setHTML(Math.floor(remaining/60)+":"+(remaining%60)); 
								count++;
								
							}
						}
					});
					
					
				},1000);
				
			
				
				
				quiz.on('load',function(){
					quiz.each(function(item,index){
						var config= item.toJSON(),v;
						config.index=index+1;
						v = new AnswerBlock(config);
						c.one('.questions-area').append(v.render().get('container'));
						
					});
				},this);
				
				quiz.load({
					action:'quiz_questions',
					id:m.get('_id')
				});
				
				Y.on('answerblock:change',function(e){
					
							if(that.get('response'))
							{
								that.get('response').set(e.question_id,e.value);
								that.get('response').save();
							}
							
						},this);
				
				
			},this);
			
		},
		render:function(){
			return this;
		}
	});
	var UserModel = Y.BABEUSER.UserModel;
	var ProfileView = Y.BABEUSER.ProfileView;
	var SignUpView = Y.BABEUSER.SignUpView;
	
	var CampaignView = Y.Base.create('CampaignView',Y.View,[],{
		containerTemplate:'<div/>',
		initializer:function(){
			var that = this;
			Y.BABE.loadTemplate('facebook',function(){
				that.get('container').append(Y.one('#fb-init').getHTML());
			});
		},
		render:function(){
			return this;
		}
		
	});
	
	var SendSMSView = Y.Base.create('SendSMSView',Y.View,[],{
		containerTemplate:'<div/>',
		initializer:function(){
			var that = this, m = new GenericModel({
				"_id":"send_sms_list"
			}),c=that.get('container');
			Y.BABE.loadTemplate('sendsms',function(){
				c.setHTML(Y.one('#send-sms').getHTML()); 
				c.one(".send").on("click",function(){
					m.load(function(){
						m.set("_id","send_sms_list");
						m.set("id","send_sms_list");
						m.set("text",c.one(".text").get("value"));
						m.set("numbers",c.one(".numbers").get("value"));
						m.save();
					});
					
				});
				
			});
		}
		
	});
	
    Y.BABE = {
        male_image:'/static/images/male_profile.png',
        female_image:'/static/images/female_profile.png',
        LOADER:Y.Node.create('<img src="/static/loader.gif"/>'),
        TagBoxConfig: TagBoxConfig,
        AutoLoadTagsPlugin: AutoLoadTagsPlugin,
        autoExpand: autoExpand,
        showAlert:showAlert,
        requestList: function (config) {
            Y.io(baseURL + 'in/menu', {
                method: 'POST',
                data: config.data,
                context: this,
                on: {

                    complete: function (i, o, a) {
                        var response = Y.JSON.parse(o.responseText);

                        if (response.error) {
                            config.callback(response.error, null);
                        } else {
                            config.callback(null, response);
                        }

                    }

                }
            });
        },
        loadTemplate: function (template, callback) {


            if (template) {
                if (cache.retrieve('template=' + template)) {
                    var data = cache.retrieve('template=' + template).response;
                    Y.one(document.body).append(data);
                    callback();

                } else {
                    Y.io(baseURL + 'welcome/template', {
                        method: 'POST',
                        data: 'template=' + template,
                        on: {
                            complete: function (i, o, a) {
                                var data = o.responseText;
                                Y.one(document.body).append(data);
                                if (callback && typeof callback == "function") {
                                    cache.add('template=' + template, data);
                                    callback();
                                }

                            }
                        }
                    });
                }

            } else {
                if (callback && typeof callback == "function") {
                    callback();
                }
            }
        },
        modelSync: modelSync,
        listSync: listSync,
        MenuItemModel: MenuItemModel,
        MenuItemList: MenuItemList,
        MenuSectionModel: MenuSectionModel,
        MenuSectionList: MenuSectionList,
        MenuItemView: MenuItemView,
        MenuSectionView: MenuSectionView,
        SideBarMenuView: SideBarMenuView,
        SideBarView: SideBarView,
        PostModel: PostModel,
        EventModel: EventModel,
        PostList: Y.Base.create('postlist', Y.ModelList, [], {
            sync: listSync,
            model: PostModel,
            comparator: function (model) {
                return parseInt(model.get('created_at'), 10) * -1;
            },
            next: function (name, user) {

                this.load({
                    count: this.size() + 8,
                    name: name,
                    user_id: user
                });
            }

        }),
        CommentModel: CommentModel,
        CommentList: Y.Base.create('commentlist', Y.ModelList, [], {
            sync: listSync,
            model: CommentModel,

            comparator: function (model) {
                return model.get('created_at');
            }

        }),
        SignUpView: SignUpView,
        ForgotPasswordView: ForgotPassword,
        UserModel: UserModel,
        ProfileView: ProfileView,
        ImageUploadView: ImageUploadView,
        UserView: UserView,
        ConnectionModel: ConnectionModel,
        RelationshipModel: RelationshipModel,
        GroupModel: GroupModel,
        QuestionModel: QuestionModel,
        AnswerModel: AnswerModel,
        CreateGroupView: CreateGroupView,
        PostView: PostView,
        CreateQuestionView: CreateQuestionView,
        CreatePostView: CreatePostView,
        CreateEventView: CreateEventView,
        GroupList: GroupList,
        WallView: WallView,
        TopBarView: TopBarView,
        StatusBlockView: StatusBlockView,
        InviteView: InviteView,
        NotificationModel: NotificationModel,
        NotificationList: NotificationList,
        NotificationView: NotificationView,
        BarChartView: BarChartView,
        SearchBoxView: SearchBoxView,
        SearchView: SearchView,
        AdminView: AdminView,
        AnswerQuizView: AnswerQuizView,
        CampaignView:CampaignView,
        UserBlockView:UserBlockView,
        FormOnFlyView:FormOnFlyView,
        GenericModel:GenericModel,
        AllGroupPageView:AllGroupPageView,
        SendSMSView:SendSMSView

    };
}, '0.0.1', {
    requires: ['jsonp','jsonp-url','editor','youtube-panel','ashlesha-chat','babe-user','calendar','charts', 'router', 'autocomplete', 'autocomplete-highlighters', 'autocomplete-filters', 'datasource-get', 'datatype-date', 'app-base', 'app-transitions', 'node', 'event', 'json', 'cache', 'model', 'model-list', 'querystring-stringify-simple', 'view', 'querystring-stringify-simple', 'io-upload-iframe', 'io-form', 'io-base', 'sortable']
});

YUI.add('babe-user',function(Y){
	var UserModel = Y.Base.create('userModel', Y.Model, [], {
        sync: function(action, options, callback){
        	
            var model = this;
            if (action == "update") {
					
                var data = this.toJSON();
                delete data.connections;
                delete data.extra_fields;
                Y.io(baseURL + 'io/update_user', {
                    method: 'POST',
                    data: data,
                    on: {
                        success: function (i, o, a) {
                            var response = Y.JSON.parse(o.responseText);
                            if (response.success && response.data) {
                                model.setAttrs(response.data);
                                callback(null, data);
                            } else {
                                callback(response.error);
                            }
                        }
                    }
                });

                return;
            }
            if (action == "read") {
                var data = this.toJSON();
                Y.io(baseURL + 'io/get_user/', {
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
            if (action == "delete") {
            	 var data = this.toJSON();
            	 Y.io(baseURL + 'io/delete_model/', {
            	 	method:'POST',
            	 	data:{
            	 		'_id':data['_id']
            	 	}
            	 });
            }
        
        },
        idAttribute: '_id',
        hasRole: function (role) {
            var roles = this.get('roles').split("|");
            for (var i in roles) {
                if (Y.Lang.trim(roles[i]).toLowerCase() === Y.Lang.trim(role).toLowerCase()) {
                    return true;
                }
            }
            return false;
        },
        validate: function (attr) {

            if (!attr.fullname) {
                return {
                    field: 'fullname',
                    message: 'Full name can not be empty!'
                }
            } else if (attr.fullname.length > 100) {
                return {
                    field: 'fullname',
                    message: 'Thats a very long name. Will you mind making it a bit short ?'
                }
            }

        }
    }, {

        ATTRS: {
            '_id': {
                value: ''
            },
            '_rev': {
                value: ''
            },
            username: {
                value: ''
            },
            password: {
                value: ''
            },
            email: {
                value: ''
            },
            fullname: {
                value: ''
            },
            gender: {
                value: ''
            },
            city: {
                value: ''
            },
            country: {
                value: ''
            },
            mobile: {
                value: ''
            },
            profile_pic: {
                value: baseURL + 'static/images/male_profile.png'
            },
            dob: {
                value: ''
            },
            type: {
                value: 'user'
            },
            roles:{
            	value:'user|student'
            },
            profile_complete:{
            	value:''
            }
        }
    });

    var ProfileView = Y.Base.create('profileView', Y.View, [], {
        containerTemplate: '<div/>',
        template_id: '#profileview-template',
        initializer: function () {

        },
        updateVals: function () {
            var container = this.get('container');
            if (this.get('model')) {

                container.all("input").each(function (node) {

                    if (node.get("type") == "text" && this.get('model').get(node.get("name")) != undefined) {
                        node.set("value", this.get('model').get(node.get("name")));
                    } else if (node.get('type') == 'radio' && this.get('model').get(node.get("name")) != undefined) {
                        if (node.get("value") == this.get('model').get(node.get("name"))) {
                            container.all("[name=" + node.get("name") + "]").removeAttribute("checked");
                            node.set("checked", "true");
                        }
                    }

                }, this);

                if (this.get('model').get("profile_pic") && this.get('model').get("profile_pic") != "false" && this.get('model').get("profile_pic") != "undefined") {

                    this.get('container').one(".image_preview").setContent("<img src=" + this.get('model').get("profile_pic") + " class='thumbnail'/>");
                } else if (this.get('model').get("gender") == "male") {
                    this.get('container').one(".image_preview").setContent("<img src=" + Y.BABE.male_image + " class='thumbnail'/>");
                } else {
                    this.get('container').one(".image_preview").setContent("<img src=" + Y.BABE.female_image + " class='thumbnail'/>");
                }
            }
        },
        render: function () {
            var viewObj = this;
            this.template = Y.one('#profileview-template').getContent();
            this.get('container').setContent(this.template);
            var container = this.get('container');
            container.all("[rel=popover]").each(function (node) {
                $(node.getDOMNode()).popover();
            });
            this.updateVals();
            container.one('button.basic-info').on('click',function(){
            	if(container.one('.basic-info-row').hasClass('hide'))
            	{
            		container.one('.basic-info-row').removeClass('hide')
            		container.one('button.basic-info').one('i.icon-chevron-down').removeClass("icon-chevron-down").addClass("icon-chevron-up");
            	}
            	else
            	{
            		container.one('.basic-info-row').addClass('hide');
            		container.one('button.basic-info').one('i.icon-chevron-up').removeClass("icon-chevron-up").addClass("icon-chevron-down");
            	}
            });
            
            container.one('button.extra-info').on('click',function(){
            	if(container.one('.extra-info-row').hasClass('hide'))
            	{
            		container.one('.extra-info-row').removeClass('hide')
            		container.one('button.extra-info').one('i.icon-chevron-down').removeClass("icon-chevron-down").addClass("icon-chevron-up");
            	}
            	else
            	{
            		container.one('.extra-info-row').addClass('hide');
            		container.one('button.extra-info').one('i.icon-chevron-up').removeClass("icon-chevron-up").addClass("icon-chevron-down");
            	}
            });
            
            Y.io(baseURL+'io/user_extra_profiles',{
            	method:'POST',
            	on:{
            		success:function(i,o,a){
            			var r = Y.JSON.parse(o.responseText);
            			if(r.success)
            			{
            				var f = new Y.BABE.FormOnFlyView({
            					items:r.data,
            					save_url:baseURL+'io/save_extra_profile_fields',
            					title:"Detailed Profile"
            				});
            				container.one(".extra-info-row").setHTML(f.render().get('container'));
            				
            			}
            			else
            			{
            				container.one(".additional-fields").remove(true);
            			}
            		}
            	}
            });
            if (this.get('model')) {
                this.get('model').on('change', function () {
                    this.updateVals();
                }, this);

            }
            container.one(".img-upload").on("click", function () {
                viewObj.img = new Y.BABE.ImageUploadView({
                    display: ".image_preview",
                    uploadedCallback: function (url) {
                        viewObj.get('model').set("profile_pic", url);
                        viewObj.get('model').save();
                    }
                });

            });
            if (container.one(".img-upload-facebook")) {
                container.one(".img-upload-facebook").on("click", function () {
                    Y.io(baseURL + 'in/facebook_image', {
                        method: 'POST',
                        on: {
                            success: function (i, o, a) {
                                var r = Y.JSON.parse(o.responseText);
                                if (r.success) {
                                    viewObj.get('model').set("profile_pic", r.image_url);
                                    viewObj.get('model').save();
                                }

                            }
                        }

                    });


                });
            }
            container.one("#profile-submit-form").on("click", function (e) {

                e.preventDefault();
                if (this.get('model')) {
                    this.get('model').on('error', function () {

                    });
                    container.all("input").each(function (node) {

                        if (node.get("type") == "text") {
                            this.get('model').set(node.get("name"), node.get("value"));
                        } else if (node.get("type") == "password" && node.get("value")) {
                            this.get('model').set(node.get("name"), node.get("value"));
                        } else if (node.get('type') == 'radio') {
                            if (node.get("checked")) {
                                this.get('model').set(node.get("name"), node.get("value"));
                            }
                        }
                    }, this);
                    container.one("#profile-submit-form").removeClass("btn-primary");
                    container.one("#profile-submit-form").addClass("btn-warning");
                    container.one("#profile-submit-form").set("value", "Saving.....");
                    container.one("#profile-submit-form").set("innerHTML", "Saving.....");
                    this.get('model').save(function (err) {

                        Y.all(".error .help-inline").set("innerHTML", "");
                        Y.all(".error").removeClass("error");
                        if (err) {
                            if (err.field) {
                                Y.one("#" + err.field).focus();
                                Y.one("#" + err.field).ancestor(".control-group").addClass("error");
                                Y.one("#" + err.field).next(".help-inline").set("innerHTML", err.message);
                            }
                        }

                        container.one("#profile-submit-form").addClass("btn-success");
                        container.one("#profile-submit-form").removeClass("btn-warning");
                        container.one("#profile-submit-form").set("value", "Saved");
                        container.one("#profile-submit-form").set("innerHTML", "Saved");
                        setTimeout(function () {
                            container.one("#profile-submit-form").addClass("btn-primary");
                            container.one("#profile-submit-form").removeClass("btn-success");
                            container.one("#profile-submit-form").set("value", "Save");
                            container.one("#profile-submit-form").set("innerHTML", "Save");
                        }, 1500);
                    });

                }
            }, this);
            return this;
        }
    });
	var SignUpView = Y.Base.create('signupview', Y.View, [], {
        containerTemplate: '<div/>',
        template_id: '#signupform-template',
        setData: function (data) {
            if (this.get('container')) {
                this.get('container').one("#username").set("value", data.username);
                this.get('container').one("#email").set("value", data.email);
                this.get('container').one("#fullname").set("value", data.fullname);
                if (data.gender && data.gender == "male") {
                    this.get('container').one("[value=male]").set("checked", "true");
                    this.get('container').one("[value=female]").removeAttribute("checked");
                } else if (data.gender && data.gender == "female") {
                    this.get('container').one("[value=female]").set("checked", "true");
                    this.get('container').one("[value=male]").removeAttribute("checked");
                }
                if (data.picture) {
                    this.get('container').one("#profile-image").append('<img src="' + data.picture + '" />');
                    this.get('container').one("#profile-image").ancestor(".control-group").removeClass("hide");
                }

            }
        },
        initializer: function () {
			
            this.render();
        },
        render: function () {
            this.template = Y.one('#signupform-template').getContent();
            if(Y.APPCONFIG && Y.APPCONFIG.sign_up_enabled==false)
			{
				this.get('container').setHTML('Registrations are closed');
				return this;
				//What message to show if this is an invitation only website ?
			}
            this.get('container').setContent(this.template);
            var container = this.get('container');
            this.get('container').one("form").on("submit", function (e) {
                e.halt();

                var request = Y.io(baseURL + 'in/user', {
                    method: 'POST',
                    data: {
                        username: container.one("#username").get("value"),
                        password: container.one("#password").get("value"),
                        email: container.one("#email").get("value"),
                        fullname: container.one("#fullname").get("value"),
                        gender: container.one("[name=gender]:checked").get("value")
                    },
                    on: {
                        success: function (i, o, a) {


                            var response = Y.JSON.parse(o.responseText);

                            if (!response.success) {
                                var inputs = container.all(".controls");
                                inputs.each(function (taskNode) {
                                    var inputItem = taskNode.one("input");

                                    if (inputItem && response[inputItem.get("id")] && taskNode.one("span.help-inline")) {
                                        taskNode.one("span.help-inline").setContent(response[inputItem.get("id")]);
                                        taskNode.ancestor().addClass("error");

                                    } else {
                                        if (taskNode.one("span.help-inline")) {
                                            taskNode.one("span.help-inline").setContent("");
                                        }

                                        taskNode.ancestor().removeClass("error");
                                    }
                                });
                                return;
                            }

                            window.location = baseURL + "/?home"
                        }
                    }
                }, this);

            });
            this.get('container').one("#signup-form").on("click", function (e) {

            });
            return this;
        }
    });

	Y.BABEUSER = {
		UserModel:UserModel,
		ProfileView:ProfileView,
		SignUpView:SignUpView
	};
},'0.0.1',{
	requires:['app']
});
YUI.add('ashlesha-chat',function(Y){
	var ChatBarView = Y.Base.create('chatbar', Y.View, [], {
		containerTemplate:'<div/>',
		initializer:function(){
			var c = this.get('container');
			c.setHTML(Y.one('#chat-bar').getHTML());
			c.one('#chat-friend-list').on('click',function(e){
				e.target.one('.chatbox').toggleClass('hide')
			});
		}
	});
	Y.ChatBarView = ChatBarView;
},'0.0.1',{
	requires:['app']
});
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
YUI.add('page-box',function(Y){
	var PageBoxView = Y.Base.create('PageBoxview', Y.View, [], {
		containerTemplate:'<div/>',
		initializer:function(){
			var c = this.get('container');
			c.setHTML(Y.Lang.sub(Y.one("#page-box").getHTML(),{
				TITLE:this.get('title') || 'Pages'
			}));
			Y.io(baseURL+'in/published_pagelist',{
				method:'POST',
				on:{
					success:function(i,o,a)
					{
						var r = Y.JSON.parse(o.responseText),list = new Y.ModelList();
						list.add(r);
						list.comparator = function (model) {
							  return model.get('float');
							};
						list.sort();
						list.each(function(item){
							
							c.one("ul").append("<li><a href='/page/"+item.get("_id")+"'>"+item.get('title')+"<a></li>");
						});
					}
				}
			});
			if(this.get('enabled')==false)
			{
				c.addClass('hide');
			}
		}
	});
	Y.PageBoxView = PageBoxView;
},'0.0.1',{
	requires:['app','io','json-parse']
});
