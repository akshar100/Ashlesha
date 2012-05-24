<?php
$this->load->view("common/header"); 
?>


<script type="text/x-template" id="outer">
	<div class="topbar">

	</div>

	<div id="maincontainer" class="container-fluid">
		
	</div> <!-- /container -->
</script>
    
 <script type="text/x-template" id="main">
	      <div class="content">
	      	<div class="page-header hide">
	          <h1><?php echo $this->session->userdata('user_roles');?></h1>
	        </div>
	        <div class="row-fluid">
	          <div class="span2">
	          	<div class="leftbar sidebar-nav well">
	          		
	          	</div>
	            
	          </div>
	          <div class="span10 centercolumn">
	            <div class='status-bar-area'></div>
	            <div class="row-fluid wallcontainer">
	            	
	            </div>
	          </div>
	        </div>
	      </div>
	
	    <?php $this->load->view("common/footer");?>
</script> 
<?php $this->load->view("mixins/wall"); ?> 
<?php $this->load->view("mixins/sidebar"); ?> 
<?php $this->load->view('mixins/topbar'); ?>
<?php $this->load->view('mixins/group'); ?>
<?php $this->load->view("mixins/statusblock");?>
<?php $this->load->view("mixins/wall");?>
<?php $this->load->view("mixins/notification");?>
<?php $this->load->view("mixins/search");?>
<?php $this->load->view("mixins/user_page");?>
<?php $this->load->view("mixins/admin");?>
<script type="text/x-template" id="error-alert">
	<div class="alert alert-block alert-error fade in">
	            <a href="#" data-dismiss="alert" class="close">×</a>
	            <h4 class="alert-heading">Oh snap! You got an error!</h4>
	            <p id='error-text'>{ERROR}</p>
	           
	</div>
</script>
<script type="text/x-template" id="info-alert">
	<div class="alert alert-block alert-info">
	            <a href="#" data-dismiss="alert" class="close">×</a>
	            <h4 class="alert-heading">Heads Up!</h4>
	            <p>{MESSAGE}</p>
	           
	</div>
</script>


<script src="<?php echo base_url();?>/static/js/framework.js?<?php echo time();?>"></script>

<script>
	


	var baseURL = "<?php echo base_url();?>";
	YUI().use('app','babe','node-event-simulate','json','event-custom','event-focus', 'model', 'model-list', 'view','transition', 'io-base', 'history','querystring-stringify-simple','autocomplete', 'autocomplete-highlighters', 'autocomplete-filters', 'datasource-get','cache', function (Y) {
		Y.user = new Y.Model({ authenticated:false , user_id:null, name:null });
		<?php
			$current_user = $this->user->get_current();
			if(!empty($current_user))
			{
				?>
				Y.userModel = new Y.BABE.UserModel(<?php echo json_encode($this->user->get_user($this->user->get_current())); ?>);
				window.current_user = <?php echo json_encode($this->user->get_current()); ?>;
				Y.userModel.load();
				Y.user.set("authenticated",true);
				Y.user.set("id",<?php echo json_encode($this->user->get_current()); ?>);
				Y.APPCONFIG =  <?php echo json_encode($config);?>;
				<?php
			}
		?>
		
		
		
		
		Y.hs = new Y.History();
		 Y.on('io:failure', function(){
		 //	Y.BABE.showAlert("Its the connection","We are unable to contact the server. May be something is down at our end or your connection just bombed.");
		 }, Y);
		 
		Y.requestList = Y.BABE.requestList;
		Y.loadTemplate = Y.BABE.loadTemplate;
		Y.modelSync = Y.BABE.modelSync;
		Y.listSync = Y.BABE.listSync;
		Y.PostModel = Y.BABE.PostModel;
		Y.ProfileView = Y.BABE.ProfileView;
		Y.CommentModel = Y.BABE.CommentModel; 
		Y.CommentList = Y.BABE.CommentList;
		Y.SideBarView = Y.BABE.SideBarView;
		Y.wall = new Y.BABE.PostList();	
		Y.TopBarView= Y.BABE.TopBarView;
		var SideBarView = Y.BABE.SideBarView;
		
		
		
		
		Y.CommentView = Y.Base.create('commentview',Y.View,[],{
			containerTemplate:'<div class="row-fluid commentsView hide" />',
			initializer:function(config){
				var viewObj = this,r;
				this.template=Y.one("#post-comments").getContent();
				this.list = new Y.CommentList();
				this.list.on("add",this.addComment,this);
				this.list.on("remove",this.render,this);
				this.postId = config.postId;
				this.get('container').setHTML(Y.BABE.LOADER);
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
					Y.BABE.autoExpand(r);
					this.get('container').one("textarea").on("focus",function(){
						this.get('container').one("textarea").set("rows",3);
					},this);
					this.get('container').one(".submitComment").on("click",function(e){
						this.get('container').one('.commentsForm').one('.help-block').setHTML(Y.BABE.LOADER);
						e.halt();
						var container = this.get('container'),list = this.list,that=this,comment = new Y.CommentModel({comment:this.get('container').one("textarea.commentText").get("value"),post_id:this.get('model').get("_id"),author_id:Y.user.get('id') });
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
				Y.log(e.model.toJSON());
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
		
		
		Y.PostView = Y.BABE.PostView;
		
		Y.EventView = Y.Base.create('eventView',Y.PostView,[],{
			initializer:function(config){
				
				Y.PostView.constructor.apply(this,config);
				var relmodel = new Y.BABE.RelationshipModel({
							owner_id:window.current_user, 
							resource_id:this.get('model').get('_id')
						});
				
				this.relmodel = relmodel;
				this.relmodel.load();
			},
			changeAction:function(){
				
				
				if(!this.relmodel.get('relationship'))
				{
					this.get('container').one(".event-actions").setHTML(Y.one('#wall-event-actions').getHTML());
					var join = this.get('container').one(".join-btn");
					var ignore = this.get('container').one('.ignore-btn');
					if(join){
						join.on('click',function(){
							this.relmodel.set('relationship','attending'); 
							this.relmodel.save(); 
							
						},this);
					}
					
					if(ignore){
						ignore.on('click',function(){
							this.relmodel.set('relationship','ignore');
							this.relmodel.save();
							
						},this);
					}
						
				}
				else if(this.relmodel.get('relationship') == "attending")
				{
					this.get('container').one('.event-actions').setHTML(Y.one('#wall-event-joined').getHTML());
					this.get('container').one('.event-actions').one(".undo-btn").on('click',function(){
						this.relmodel.set('relationship','');
						this.relmodel.save();
					},this);
				}
				else if(this.relmodel.get('relationship') == "ignore")
				{
					this.get('container').one('.event-actions').setHTML(Y.one('#wall-event-ignored').getHTML());
					this.get('container').one('.event-actions').one(".undo-btn").on('click',function(){
						this.relmodel.set('relationship','');
						this.relmodel.save();
					},this);
				}
					
			}
			,render:function(config){
				var month=new Array();
					month[0]="January";
					month[1]="February";
					month[2]="March";
					month[3]="April";
					month[4]="May";
					month[5]="June";
					month[6]="July";
					month[7]="August";
					month[8]="September";
					month[9]="October";
					month[10]="November";
					month[11]="December";
					
					
					if(this.get('model').get("category")=='event')
					{
						var dt = this.get('model').get('start_date').split("/");
						this.get('container').setContent(Y.Lang.sub(Y.one('#post-row-event').getContent(),{
							TEXT: (config && config.text )|| this.get('model').get("text"),
							AUTHOR:this.get('model').get("author"),
							IMG:baseURL+'in/profile_pic/'+this.get('model').get('author_id'),
							ID:this.get('model').get("author_id"),
							START_DATE_ICON:dt[0]+" "+month[parseInt(dt[1],10)],
							START_DATE:this.get('model').get("start_date"),
							END_DATE:this.get('model').get("end_date"),
							START_TIME_HOURS:this.get('model').get("start_time_hours"),
							START_TIME_MINS:this.get('model').get("start_time_mins"),
							END_TIME_HOURS:this.get('model').get("end_time_hours"),
							END_TIME_MINS:this.get('model').get("start_time_mins"),
							TITLE:this.get('model').get("title")
						}));
						if(!this.get('model').get("end_date"))
						{
							this.get('container').one("span.end-date").setHTML('');
						}
						this.sanitize();
						this.changeAction();
						this.relmodel.on('load|change',this.changeAction,this);
						this.relmodel.load();
					}
					return this;
			}
		}); 
		Y.WallView = Y.BABE.WallView;
		Y.SignUpView =  Y.BABE.SignUpView;
		Y.TopBarView = Y.BABE.TopBarView;
		
		
		Y.sidebar = new SideBarView({
			usermodel:Y.userModel
		});
		Y.topbar= new Y.TopBarView({
			usermodel:Y.userModel
		});			
		
		
		
		
		Y.MainAppView = Y.Base.create('MainAppView', Y.View, [], {
			containerTemplate:'<div class="the-app"/>',
			expand:false,
			expandForm:function(val){
				if(this.get('statusbar'))
				{
					this.get('statusbar').expandForm(val); //expand the CreateX form
				}
				
			},
			loadStream:function(command){
				if(this.get('wall'))
				{
					this.get('wall').clearWall();
					this.get('wall').loadWall(command); 
				}
			},
		    render: function () {
		    	var that = this;
		    	var expand = this.get('expand');
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				
				
				
				Y.loadTemplate("statusblock",function(){
					var statusblock = new Y.BABE.StatusBlockView({expand:expand}); 
					con.one('.status-bar-area').setHTML(statusblock.render().get('container'));
					that.set('statusbar',statusblock); 
					if(that.get('expand'))
					{
						that.expandForm(that.get('expand'));
					}
				
				});
				
				var wall = new Y.WallView({loadCommand:'wallposts',usermodel:Y.userModel}); 
				con.one('.wallcontainer').setHTML(wall.render().get('container'));
				that.set('wall',wall); 
				
		        return this;
		    }
		});
		
		Y.MainProfileView = Y.Base.create('MainProfileView', Y.View, [], {
			containerTemplate:'<div class="the-app"/>',
		    render: function () {
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				Y.loadTemplate("profile",function(){ 
					var user = new Y.BABE.UserModel({
						'_id':window.current_user
					});
					
					
					user.load({
					},function(){
						var current = new Y.ProfileView({model:user});
						con.one('.centercolumn').setContent(current.render().get('container'));
					});
				
				});
		        return this;
		    }
		});
		
		Y.UserPageView = Y.Base.create('UserPageView', Y.View, [], {
			containerTemplate:'<div class="the-app"/>',
		    render: function () {
		    	var that= this;
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container')); 				
				 
				Y.BABE.loadTemplate('user_page',function(){
		    		var UserView = new Y.BABE.UserView({user_id:that.get('user_id'),usermodel:Y.userModel});
		    		con.one('.centercolumn').setContent(UserView.render().get('container'));
		    	});
		        return this;
		    }
		});

		Y.CreateGroupMainView = Y.Base.create('CreateGroupMainView', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var that= this;
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				
				 
				Y.loadTemplate("group",function(){ 
					var group = new Y.BABE.GroupModel({
						author_id:window.current_user
					});
					var creategroup =  new Y.BABE.CreateGroupView({model:group});
					con.one(".centercolumn").setContent(creategroup.render().get('container'));
				});
		        return this;
		    }
		});
		
		Y.GroupPageView = Y.Base.create('GroupPage',Y.View,[],{
			containerTemplate:'<div/>',
			initializer:function(){
				var con = this.get('container'),main=Y.Node.create("<DIV/>");
				this.set('sidebar',Y.Node.create('<div/>')); 
				this.set('relation',new Y.BABE.RelationshipModel());
				con.setHTML(Y.one("#outer").getHTML());
				con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				
				con.one('.centercolumn').setHTML(main);
				var r = this.get('relation'),m=this.get('model'),c=this.get('container');
				
				
				this.get('model').on(['load','save'],function(){
					con.one(".leftbar").setHTML(this.getSidebar());
					con.one(".topbar").append(Y.topbar.render().get('container'));
					this.set('wall',new Y.BABE.WallView({loadCommand:'groupposts',usermodel:this.get('usermodel'),group_id:this.get('model').get('_id')}));
					r.on('save',function(){
						this.get('wall').loadWall('groupposts');
					},this);
					this.set('statusbar',new Y.BABE.StatusBlockView({
						ownership: this.get('model').get('_id')
					}));
					main.setHTML(Y.Lang.sub(Y.one('#group-page-main').getHTML(),{
						'GROUP_TITLE':m.get('title'),
						'GROUP_DESCRIPTION':m.get('description'),
						'MEMBERS_COUNT':m.get('count') || '0',
						'GROUP_IMAGE':m.get('image') || 'http://placehold.it/100x100',
						'VISIBILITY':m.get('visibility')
						
					}));
					this.get('sidebar').setHTML(Y.Lang.sub(Y.one('#group-page-sidebar').getHTML('#group-page-sidebar'),{
						'GROUP_TITLE':m.get('title'),
						'GROUP_DESCRIPTION':m.get('description'),
						'MEMBERS_COUNT':m.get('count') || '0',
						'GROUP_IMAGE':m.get('image') || 'http://placehold.it/100x100',
						'VISIBILITY':m.get('visibility')
						
					}));
					this.get('sidebar').one('.members').on('click',function(e){
						this.set('mainContainer',main);
 						con.one(".centercolumn").setHTML(this.getMembersView());
 						con.one(".leftbar").one('button.members').addClass('hide');
 						con.one(".leftbar").one('button.home').removeClass('hide');
	 				},this);
	 				
	 				this.get('sidebar').one('.home').on('click',function(e){
	 					con.one(".centercolumn").setHTML(this.get('mainContainer'));
	 					con.one(".leftbar").one('button.home').addClass('hide');
	 					con.one(".leftbar").one('button.members').removeClass('hide');
	 				},this);
	 				
					main.one(".status-block").setHTML(this.get('statusbar').render().get('container'));
					main.one(".wall").setHTML(this.get('wall').render().get('container'));
					this.get('sidebar').one('#invite').addClass('hide');
					this.get('sidebar').one('#invite').on('click',function(){
							var emails;
							if(Y.one('#invite-box')) { Y.one('#invite-box').remove(); }
							Y.one('body').append(Y.one('#invite-group-members').getHTML());
						    jQuery('#invite-box').modal('show');
						    Y.one('#invite-box').one('.modal-body').setHTML(new Y.BABE.InviteView({invite_action:'group',group_id:this.get('model').get('_id')}).render().get('container'));
						    Y.one('#invite-box').one('.send-invites').on('click',function(e){
						    	var content =  Y.one('#invite-box').one('.send-invites').get('innerHTML');
						    	Y.one('#invite-box').one('.send-invites').addClass('btn-warning');
						    	Y.one('#invite-box').one('.send-invites').setHTML('Sending Invitations....');
						    	e.halt();
						    	emails = Y.one('#invite-box').one('textarea#email_invites').get('value');
						    	Y.io(baseURL+'io/invite_to_group',{
						    		method:'POST',
						    		context:this,
						    		data:{
						    			group_id:this.get('model').get('_id'),
						    			emails:emails
						    		},
						    		on:{
						    			success:function(i,o,a){
						    				var res = Y.JSON.parse(o.responseText);
						    				Y.one('#invite-box').one('.send-invites').removeClass('btn-warning');
						    				Y.one('#invite-box').one('.send-invites').addClass('btn-success');
						    				Y.one('#invite-box').one('.send-invites').set('innerHTML','Sent');
						    				setTimeout(function(){
						    					Y.one('#invite-box').one('.send-invites').removeClass('btn-success');
						    					Y.one('#invite-box').one('.send-invites').set('innerHTML','Send Invites');
						    				},2000)
						    			}
						    		}
						    	});
						    },this);
							Y.one('#invite-box').all('.close').on('click',function(){
								Y.one('#invite-box').destroy();
							});
						
					},this);
					main.one('.join-btn').on('click',function(){
							if(this.get('model').get('visibility')==='closed')
							{
								r.set('relationship','requested');
							}
							else
							{
								r.set('relationship','member');
							}
							
							r.save();
						},this);
						main.one('.unjoin-btn').on('click',function(){
							r.set('relationship','');
							r.save();
						},this);
						main.one('.leave-btn').on('click',function(){
							r.set('relationship','');
							r.save();
						},this);
						main.one('.delete-btn').on('click',function(){
							this.get('model').destroy({remove:true});
							Y.fire("sidebar:refresh");
							Y.fire('navigate',{action:"/"});
						},this);
					
					},this);
					
				this.get('relation').on(['load','save'],function(){
						Y.fire("sidebar:refresh");
						if(this.get('relation').get('relationship')==="")
						{
							main.one('.join-btn').removeClass('hide');
							main.one('.leave-btn').addClass('hide');
							main.one('.unjoin-btn').addClass('hide');
							if(m.get('visibility')=='hidden' && this.get('usermodel').get('_id')!=m.get('author_id'))
							{
								
								this.get('sidebar').hide(true);
								c.hide(true);
								Y.BABE.showAlert('Message','Such resource either does not exist or you do not have enough permissions to have a look at them.')
							}
							
						}
						else if(this.get('relation').get('relationship')==="member")
						{
							
							main.one('.join-btn').addClass('hide');
							main.one('.leave-btn').addClass('hide');
							main.one('.unjoin-btn').removeClass('hide');
							
						}
						else if(this.get('relation').get('relationship')==="requested")
						{
							
							main.one('.join-btn').addClass('hide');
							main.one('.leave-btn').removeClass('hide');
							
						}
						if(this.get('model').get('author_id')===window.current_user)
						{
							
							main.one('.join-btn').addClass('hide');
							main.one('.unjoin-btn').addClass('hide');
							main.one('.leave-btn').addClass('hide');
							main.one('.delete-btn').removeClass('hide'); 
							this.get('sidebar').one('#invite').removeClass('hide');
							Y.io(baseURL+'in/pending_members',{
								method:'POST',
								data:{group_id: this.get('model').get('_id')},
								context:this,
								on:{
									success:function(i,o,a){
										var r = Y.JSON.parse(o.responseText),n;
										for(var i in r)
										{
											n = Y.Node.create(Y.Lang.sub(Y.one('#user-request-accept').getHTML(),{
												USER_ID:r[i]['user_id'],
												USER_NAME:r[i]['user_name']
											}));
											n.one('.accept-btn').on('click',function(){
												var rm = new Y.BABE.RelationshipModel();
												rm.set('resource_id',m.get("_id"));
												rm.set('owner_id',r[i]['user_id']);
												rm.set('relationship','member');
												rm.save();
												n.remove(true);
											},this);
											n.one('.reject-btn').on('click',function(){
												var rm = new Y.BABE.RelationshipModel();
												rm.set('resource_id',m.get("_id"));
												rm.set('owner_id',r[i]['user_id']);
												rm.set('relationship','');
												rm.save();
												n.remove(true);
											},this);
											this.get('sidebar').one('.membership-request').append(n);
										}
									}
								}
							});
						}
						
						if(this.get('model').get('visibility')=='closed' && this.get('relation').get('relationship')!=='member' && this.get('relation').get('relationship')!=='owner')
						{
							this.get('statusbar').hide();
						}
						else
						{
							this.get('statusbar').show();
						}
						
						
					},this);
				
				r.set('resource_id',m.get("_id"));
				r.set('owner_id',window.current_user);
				this.get('model').load({},function(){
					r.load({
						resource_id:m.get("_id")
					});
				});
				
				
			},
			getMembersView:function(){
				var node = Y.Node.create(Y.one("#group-member-list").getHTML());
				
				node.one(".member-list").setHTML(Y.BABE.LOADER);
				Y.io(baseURL+'in/group_members',{
					method:'POST',
					data:{
						group_id:this.get('model').get('_id')
					},
					on:{
						success:function(i,o,a){
							var response = Y.JSON.parse(o.responseText),model;
							node.one(".member-list").setHTML('');
	                        for (var i in response) {
	                            model = new Y.BABE.UserModel(response[i]);
	                            uv = new Y.BABE.UserBlockView({
	                                model: model,
	                                adminView:true,
	                                disableRoles:true
	                            });
	                            var user = uv.render().get('container');
	                            node.one(".member-list").append(user);
	                        }
						}
					}
				});
				return node;
			},
			getSidebar:function(){
				return this.get('sidebar');
			},
			render:function(){
				
				return this;
			}
		});
		
		Y.GroupPageMainView = Y.Base.create('GroupPageMainView', Y.View, [], {
			containerTemplate:'<div/>',
			initializer:function(){
				var that= this,con = this.get('container'),group = new Y.BABE.GroupModel({
						"_id":that.get("group_id")
					});
		        
				var grp =  new Y.GroupPageView({model:group,usermodel:this.get('usermodel')});
 				
 				con.setHTML(grp.render().get('container'));
 				
				
				
				
				
			},
		    render: function () {
		    	
		        return this;
		    }
		});
		
		
		Y.PostPage = Y.Base.create('PostPage', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var that= this;
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				
				Y.loadTemplate("wall",function(){ 
					
					var id = that.get('post_id');
					
					var postModel = new Y.BABE.PostModel({
						'_id':id
					});
					postModel.on('load',function(){
						if(postModel.get('category')=='event')
						{
							var view = new Y.EventView({model:postModel,usermodel:this.get('usermodel'),expandComments:true});
						}
						else
						{
							var view = new Y.PostView({model:postModel,usermodel:this.get('usermodel'),expandComments:true});
						}
						con.one(".centercolumn").setHTML(view.render().get('container'));
					},that);
					postModel.load();
					
					
				});
				
		        return this;
		    }
		});
		Y.NotificationListView = Y.Base.create('PostPage', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var con = this.get('container');
		    	con.setHTML(Y.one("#outer").getHTML());
		    	con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				
		    	var nlist = new Y.BABE.NotificationList();
		    	
		    	nlist.on('load',function(){
		    		con.one('.centercolumn').setHTML('');
		    		if(con.one('.alert'))
		    		{
		    			con.one('.alert').remove();
		    		}
		    		
		    		if(nlist.size()===0)
		    		{
		    			
		    			con.one('.centercolumn').append(Y.Lang.sub(Y.one('#info-alert').getHTML(),{
		    				MESSAGE:'No new notifications here!'
		    			}));
		    		}
		    		else
		    		{
		    			con.one('.centercolumn').append(Y.one('#clear-all-btn').getHTML());
		    			con.one('.clear').on('click',function(){
		    				nlist.each(function(item,index){
				    			item.set('mark_read','true');
				    			item.save();
				    		});
				    		nlist.load({name:'notificationlist'});
		    			});
		    		}
		    		nlist.each(function(item,index){
		    			con.one('.centercolumn').append(
		    				new Y.BABE.NotificationView({
		    					model:item
		    				}).render().get('container') 
		    			);
		    		});
		    	});
		    	nlist.load({name:'notificationlist'});
		    	return this;
		    }
		});
		
		Y.SearchPageView = Y.Base.create('SearchPageView', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var con = this.get('container');
		    	con.setHTML(Y.one("#outer").getHTML());
		    	con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				var searchView = new Y.BABE.SearchView({
					search:this.get('search'),
					usermodel:this.get('usermodel')
				});
				con.one('.centercolumn').setHTML(searchView.render().get('container'));
		    
		    	return this;
		    }
		});
		
		Y.AdminPageView = Y.Base.create('AdminPageView', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var con = this.get('container');
		    	con.setHTML(Y.one("#outer").getHTML());
		    	con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				var adminView = new Y.BABE.AdminView({user:Y.userModel,action:this.get('action'),quiz_id:this.get('quiz_id')});
				con.one('.centercolumn').setHTML(adminView.render().get('container'));
		    	return this;
		    }
		});
		
		
		Y.AnswerQuizPageView = Y.Base.create('AnswerQuizPageView', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var con = this.get('container'),aq= new Y.BABE.AnswerQuizView({
		    		quiz_id:this.get('quiz_id')
		    	});
		    	con.setHTML(Y.one("#outer").getHTML());
		    	con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				
				con.one(".topbar").setHTML(Y.topbar.render().get('container'));
				con.one(".leftbar").setHTML(Y.sidebar.render().get('container'));
				
		    	con.one('.centercolumn').setHTML(aq.render().get('container'));
		    	return this;
		    }
		});
		
		
				
		
		
		
		
		Y.AdminView = Y.BABE.AdminView;
		Y.CampaignView = Y.BABE.CampaignView;
		
		var AppUI =  new Y.App({
		    views: {
		        homepage: {type: 'MainAppView', preserve:false },
		        profile:  {type:'MainProfileView'},
		        userpage: {type:'UserPageView',preserve:false },
		        create_group: {type:'CreateGroupMainView',preserve:true}, 
		        grouppage:{type:'GroupPageMainView',preserve:false},
		        postpage:{type:'PostPage',preserve:false},
		        notificationpage:{type:'NotificationListView',preserve:false},
		        searchpage:{type:'SearchPageView',preserve:false},
		        adminview:{type:'AdminPageView',preserve:false},
		        quizview:{type:'AnswerQuizPageView',preserve:false},
		        campaignview:{type:'CampaignView'}
		    },
		    transitions: {
		        navigate: 'fade',
		        toChild : 'fade',
		        toParent: 'fade'
		    }
		});
		window.AppUI = AppUI;
		<?php if($this->config->item('ui_test_enabled')){?>
				APPCONFIG = Y.APPCONFIG;
		<?php } ?>
		AppUI.route('/', function (req) {
		    this.showView('homepage',{expand:false,loadCommand:'stream'});
		});
		
		AppUI.route('/me', function (req) {
		    this.showView('profile');
		});
		
		AppUI.route('/post/new',function(req){
			this.showView('homepage',{expand:'painpoint'},{callback:function(v){
				v.expandForm('painpoint');
			}});
		});
		
		AppUI.route('/event/new',function(req){
			this.showView('homepage',{expand:'event'},{callback:function(v){
				v.expandForm('event');
			}});
		});
		
		AppUI.route('/question/new',function(req){
			this.showView('homepage',{expand:'question'},{callback:function(v){
				v.expandForm('question');
			}});
		});
		
		AppUI.route('/my',function(req){
			this.showView('homepage',{},{callback:function(v){
				setTimeout(function(){v.loadStream('my');},1000);
			}});
		});
		AppUI.route('/stream',function(req){
			this.showView('homepage',{},{callback:function(v){
				v.loadStream('stream');
			}});
		});
		AppUI.route('/user/:user_id',function(req){
			this.showView('userpage',{user_id:req.params.user_id},{callback:function(v){
				
			}});
		});
		
		AppUI.route('/group/new',function(req){
			this.showView('create_group');
		});
		
		AppUI.route('/group/:group_title/:group_id',function(req){
		 	this.showView('grouppage',{group_id:req.params.group_id,usermodel:Y.userModel});
		});
		
		AppUI.route('/post/:post_tags/:post_id',function(req){
		 	this.showView('postpage',{post_id:req.params.post_id,usermodel:Y.userModel});
		});
		AppUI.route('/search/:term',function(req){
		 	this.showView('searchpage',{search:req.params.term,usermodel:Y.userModel});
		});
		AppUI.route('/search',function(req){
		 	this.showView('searchpage',{search:'',usermodel:Y.userModel});
		});
		AppUI.route('/notifications',function(req){
			this.showView('notificationpage');
		});
		
		AppUI.route('/admin',function(req){
			if(Y.userModel.get('_id')) // do this only if the user is loaded!
			{
				this.showView('adminview',{
						userModel:Y.userModel
					});
			}
			else
			{
				var that = this;
				Y.userModel.load({"id":<?php echo json_encode($this->user->get_current()); ?>},function(){
					that.showView('adminview',{
						userModel:Y.userModel
					});
				});
			}
			if(!Y.userModel.hasRole('administrator'))
			{
				AppUI.navigate("/");
			}
		});
		
		AppUI.route('/admin/quiz/:id',function(req){
			
			this.showView('adminview',{
						userModel:Y.userModel,
						action:'quiz',
						quiz_id:req.params.id
					});
		});
		
		AppUI.route('/admin/fb',function(req){
			
			this.showView('campaignview',{
						userModel:Y.userModel,
					});
		});
		
		AppUI.route('/admin/share_quiz/:id',function(req){
			
			this.showView('adminview',{
						userModel:Y.userModel,
						action:'share_quiz',
						quiz_id:req.params.id
					});
		});
		AppUI.route('/quiz/:id',function(req){
			this.showView('quizview',{
				userModel:Y.userModel,
				quiz_id:req.params.id
			});
		});
		
		AppUI.route('/admin/:sub_action',function(req){
			
			if(Y.userModel.get('_id')) // do this only if the user is loaded!
			{
				this.showView('adminview',{
						userModel:Y.userModel,
						action:req.params.sub_action
					});
					
			}
			else
			{
				
				var that = this;
				Y.userModel.load({"id":<?php echo json_encode($this->user->get_current()); ?>},function(){
					that.showView('adminview',{
						userModel:Y.userModel,
						action:req.params.sub_action
					});
				});
			}
		});
		
		
		Y.on('search-init',function(e){ 
			AppUI.navigate('/search/'+e.search);
		});
		
		Y.on('navigate',function(e){
			AppUI.navigate(e.action);
		});
		AppUI.render().dispatch(); //.save('/');
		Y.loadTemplate("messagebox",function(){}); 
		

	});
</script>    
    
    
    
<?php if($this->config->item('ui_test_enabled')){?><script src="<?php echo base_url();?>/static/js/test.js"></script><?php }?> 

<!--
<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '<?php echo $this->config->item('facebook_appid');?>', // App ID
      channelUrl : '//<?php echo base_url();?>channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>
-->
</body>
</html>

