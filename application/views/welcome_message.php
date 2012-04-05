<?php
$this->load->view("common/header"); 
?>
<div class="topbar">

</div>

    <div id="maincontainer" class="container-fluid">
		
    </div> <!-- /container -->
    
 <script type="text/x-template" id="main">
	      <div class="content">
	      	<div class="page-header hide">
	          <h1></h1>
	        </div>
	        <div class="row-fluid">
	          <div class="span2">
	          	<div class="leftbar sidebar-nav well">
	          		
	          	</div>
	            
	          </div>
	          <div class="span9 centercolumn">
	            
	          </div>
	        </div>
	      </div>
	
	    <?php $this->load->view("common/footer");?>
</script> 
<?php $this->load->view('mixins/topbar'); ?>
<script type="text/x-template" id="error-alert">
	<div class="alert alert-block alert-error fade in">
	            <a href="#" data-dismiss="alert" class="close">×</a>
	            <h4 class="alert-heading">Oh snap! You got an error!</h4>
	            <p id='error-text'>{ERROR}</p>
	           
	</div>
</script>
<?php $this->load->view("mixins/wall"); ?> 
<script src="./static/js/framework.js"></script>    
<script>

	var baseURL = "<?php echo base_url();?>";
	YUI().use('app','babe','node-event-simulate','json','event-custom','event-focus', 'model', 'model-list', 'view','transition', 'io-base', 'history','querystring-stringify-simple','autocomplete', 'autocomplete-highlighters', 'autocomplete-filters', 'datasource-get','cache', function (Y) {
		Y.user = new Y.Model({ authenticated:false , user_id:null, name:null });
		Y.hs = new Y.History();
		 Y.on('io:failure', function(){
		 	Y.showAlert("Its the connection","We are unable to contact the server. May be something is down at our end or your connection just bombed.");
		 }, Y);
		 
		Y.requestList = Y.BABE.requestList;
		Y.loadTemplate = Y.BABE.loadTemplate;
		Y.modelSync = Y.BABE.modelSync;
		Y.listSync = Y.BABE.listSync;
		Y.PostModel = Y.BABE.PostModel;
		Y.ProfileView = Y.BABE.ProfileView;
		Y.CommentModel = Y.BABE.CommentModel;
		 
		Y.CommentList = Y.BABE.CommentList;
		 
		 
		Y.wall = new Y.BABE.PostList();	

		Y.TopBarView= Y.Base.create('topbarview', Y.View, [], {
			containerTemplate:'',
			initializer:function()
			{
				
			},
			render:function()
			{

				Y.one(".topbar").setContent(Y.Lang.sub(Y.one('#topbar-authenticated').getContent(),{
					user_name:Y.user.get("name"),
					user_id:Y.user.get("user_id")
				}));
				Y.one(".topbar").one("#notification-btn").on("click",function(){
					
				});
				
				Y.one(".topbar").one("#edit-profile").on("click",function(e){
					e.preventDefault();
					Y.App.showProfile();
				});
				if(Y.one("#signup"))
				{
					Y.one("#signup").on("click",function(){
						Y.App.signup();
					});
				}
				Y.one(".topbar").setStyle("opacity",0);
				Y.one('.topbar').transition({
				    easing: 'ease-out',
				    duration: 0.8, 
				    opacity:1.0
				});
				jQuery('.dropdown').dropdown();
			}
		});
		
		Y.MenuItemModel = Y.Base.create('menuitemmodel',Y.Model,[],{},{
			ATTRS:{
				label:{value:'unlabled'},
				view:{value:'myposts'},
				hide:{value:false}
			}
		});
		
		Y.MenuItemList = Y.Base.create('menuitemlist', Y.ModelList, [], {
		 	sync:Y.BABE.listSync,
		 	model:Y.MenuItemModel
		 	
		});
		
		Y.MenuSectionModel = Y.Base.create('menusectionmodel',Y.Model,[],{},{
			ATTRS:{
				label:{value:'unlabled'}
				
			}
		});
		
		Y.MenuSectionList = Y.Base.create('menusectionlist', Y.ModelList, [], {
		 	sync:Y.BABE.listSync,
		 	model:Y.MenuSectionModel
		 	
		});
		
		Y.MenuItemView = Y.Base.create('menuitemview',Y.View,[],{
			containerTemplate:"<li class='menuitem'/>",
			hide:function(){
				this.get('container').addClass('hide');
			},
			show:function(){
				this.get('container').removeClass('hide');
			},
			initializer:function(config){
				
				this.get('model').on('hideChange',function(e){
				
					if(e.newVal==false)
					{
						this.get('container').removeClass('hide').addClass('show');
						
					}
					else
					{
						this.get('container').removeClass('show').addClass('hide');
					}
				},this);
				this.get('container').on("click",function(e){
					var view = this.get('model').get("view");
					if(Y.App[view] && typeof Y.App[view]=="function")
					{
						Y.App[view]();
					}
				},this); 
			},
			render:function(){
				
				if(this.get('model').get("label").length<=12)
				{
					this.get('container').setContent(this.get('model').get("label"));
				}
				else
				{
					this.get('container').setContent(this.get('model').get("label").substr(0,10)+"..");
					this.get('container').set("title",this.get('model').get("label"));
				}
				return this;
			}
		});
		Y.MenuSectionView = Y.Base.create('menusectionview', Y.View, [], {
			containerTemplate:'<div />',
			initializer:function(){
				this.template=Y.one("#menu-section").getContent();
			},
			render:function(){
				this.get('container').setContent(Y.Lang.sub(this.template,{
					LABEL:this.get('model').get("label")
				}));
				return this;
			}
		});
		
		Y.SideBarMenuView = Y.Base.create('sidebarview', Y.View, [], {
			containerTemplate:'<div/>',
			initializer:function(){
				var items = new Y.BABE.GroupList();
				this.set('items',items);
			},
			toggleList:function(sectionContainer){
				var max_item = 2;
				var items = this.get('items');
				if(items.size()>max_item && (sectionContainer.one("a.more").hasClass('hide') || sectionContainer.one("a.more").hasClass('dropped')))
				{
					
					var hide = 0;
					items.each(function(item,index){
						if(hide<max_item)
						{
							item.set('hide',false);
							item.save();
							hide++;
						}
						else
						{
							item.set('hide',true);
							item.save();
						}
					
					});
					sectionContainer.one("a.more").removeClass('hide');
					sectionContainer.one("a.more").setHTML("<h4><small>MORE</small></h4>");
					sectionContainer.one("a.more").removeClass('dropped');
				}
				else
				{
					
					items.each(function(item,index){
						
							item.set('hide',false);
							item.save();
							

					});
					sectionContainer.one("a.more").addClass('dropped');
					sectionContainer.one("a.more").setHTML("<h4><small>LESS</small><h4>");
					
				}
			},
			render:function(){
				var menuContainer = this.get('container');
				var sections  = new Y.MenuSectionList(); 
				var that = this;
				
				sections.load({name:'menusectionlist'},function(){
					sections.each(function(item,index){
						var section = new Y.MenuSectionView({model:item});
						
						if(item.get('name')=='group')
						{
							
							
							var sectionContainer = section.render().get('container');
							menuContainer.append(sectionContainer);
							var items = that.get('items');
							items.load({
								name:'groupList'
							},function(){
								
								
								items.each(function(item,index){
								
									sectionContainer.one("ul").append(new Y.MenuItemView({model:item}).render().get('container')); 
									
								});
								
								
								that.toggleList(sectionContainer);
								sectionContainer.one("a.more").on('click',function(){
									that.toggleList(sectionContainer);
								});
								
							});
						}
						else
						{
							var items = new Y.MenuItemList();
							var sectionContainer = section.render().get('container');
							menuContainer.append(sectionContainer);
							items.load({name:'menuitemlist',section:item.get("id")},function(){
								items.each(function(item,index){
									sectionContainer.one("ul").append(new Y.MenuItemView({model:item}).render().get('container')); 
								});
							});
						}
						
						
						
					});
					
				});
				return this;
			}
		});
		
		
		Y.SideBarView = Y.Base.create('sidebarview', Y.View, [], {
			
			initializer:function(){
				
				this.render();
				Y.user.after("change",this.render);
				Y.userModel.on('change',this.render);
			},
			hide:function(){
				Y.one('.leftbar').hide(true);
			},
			show:function(){
				Y.one('.leftbar').show(true);
			},
			render:function(){
				
				var template_id="#sidebar-authenticated";
				var template = Y.Lang.sub(Y.one(template_id).getContent(),{
					IMG:Y.userModel.get("profile_pic"),
					FULLNAME:Y.userModel.get("fullname")
				});
					
				
				
				
				Y.one(".leftbar").setContent(Y.Lang.sub(template,{
					user_name:Y.user.get("name"),
					user_id:Y.user.get("user_id")
				}));
				
				Y.one(".leftbar").append(new Y.SideBarMenuView().render().get('container'));
				Y.one(".leftbar").setStyle("opacity",0);
				Y.one('.leftbar').transition({
				    easing: 'ease-out',
				    duration: 0.8, 
				    opacity:1.0
				});
				
				
				
			}
		}) ; 
		
		Y.StatusBlockView = Y.Base.create('statusblockview', Y.View, [], {
			containerTemplate:'<div id="statusblock"/>',
			initializer:function(){
				
				this.render();
				Y.user.after("change",this.render);
			},
			hide:function(){
				Y.one('#statusblock').hide(true);
			},
			show:function(){
				Y.one('#statusblock').show(true);
			},
			render:function(){
				
				
				
				this.template_id="#statusblock-authenticated";

				
				this.template = Y.one(this.template_id).getContent();
				if(Y.one('#statusblock')) {
					 Y.one('#statusblock').remove();
				}
				this.set('container',Y.Node.create('<div id="statusblock"/>'));
				
				this.get('container').setContent(Y.Lang.sub(this.template,{
					user_name:Y.user.get("name"),
					user_id:Y.user.get("user_id")
				}));
				
				this.get('container').setStyle("opacity",0);
				
				
				
					this.get('container').one(".pills-status").all("a").on("click",function(e){
						
						var val = Y.one(e.target).get("rel");
						
						if(val=="question"){
							
							var q = new Y.BABE.CreateQuestionView();
							this.get('container').one(".forms").setContent(q.render().get('container'));
							
						}
						if(val=="event"){
							
							var q = new Y.BABE.CreateEventView();
							this.get('container').one(".forms").setContent(q.render().get('container'));
						
						}
						if(val=="painpoint"){
							
							var q = new Y.BABE.CreatePostView();
							this.get('container').one(".forms").setContent(q.render().get('container'));
							
						}
							
						
					
						
						
					},this);
					
			if(Y.one(".centercolumn")){
					Y.one(".centercolumn").prepend(this.get('container')); 
					
					Y.one('#statusblock').transition({
					    easing: 'ease-out',
					    duration: 0.8, 
					    opacity:1.0
					});
			}
			return this.get('container');
			}
		});
		Y.showAlert = function(head,body){
			if(Y.one("#modal-from-dom")){ Y.one("#modal-from-dom").remove();}
			var alertMarkup = Y.Lang.sub(Y.one("#messagebox").getContent(),{ HEADING: head , BODY:body});
			Y.one(document.body).append(alertMarkup);
			jQuery("#modal-from-dom").modal('show');
						Y.one(".close-dialog").on('click',function(){
							jQuery("#modal-from-dom").modal('hide');
							Y.one("#modal-from-dom").remove();
						});
		};
		
		Y.CommentView = Y.Base.create('commentview',Y.View,[],{
			containerTemplate:'<div class="row-fluid commentsView hide" />',
			initializer:function(config){
				this.template=Y.one("#post-comments").getContent();
				this.list = new Y.CommentList();
				this.list.on("add",this.addComment,this);
				this.list.on("remove",this.render,this);
				this.postId = config.postId;
				
			},
			addComment:function(e){
				var form = null; 
				if(this.get('container').one(".commentsForm")){form = this.get('container').one(".commentsForm").remove(); }
				var that = this;
				
				that.get('container').append(Y.Lang.sub(that.template,{
					TEXT:e.model.get("comment"),
					AUTHOR:e.model.get("author"),
					IMG:baseURL+'in/profile_pic/'+e.model.get("author_id")
				}));
				
				
				if(form){
					this.get('container').append(form);
				} 
				
				
			},
			render:function(config){
				
				var viewObj = this;
				
				this.list.load({post_id:this.get('model').get("id"),name:this.list.name},function(){
					if(viewObj.list.size()>0)
					{
						viewObj.get('container').append("<hr/>");
					}
					viewObj.list.each(function(item,index){
						viewObj.addComment({model:item});
						
					},viewObj);
					
				});
				
				this.get('container').append(Y.one("#comment-form").getContent());
				var r = this.get('container').one(".commentText");
				Y.BABE.autoExpand(r);
				
				
				
				
				this.get('container').one("textarea").on("focus",function(){
					this.get('container').one("textarea").set("rows",3);
				},this);
				
				this.get('container').one(".submitComment").on("click",function(e){
					e.halt();
					var comment = new Y.CommentModel({comment:this.get('container').one("textarea.commentText").get("value"),post_id:this.get('model').get("_id"),author_id:Y.user.get('id') });
					var list = this.list;
					var container = this.get('container'); 
					comment.save(function(err,response){
						if(!err){
							comment.setAttrs(response);
							list.add(comment);
							container.one("textarea").set("value","");
						}
					});
					
					
				},this);
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
		Y.WallView = Y.Base.create('wall',Y.View,[],{
			containerTemplate:Y.one("#wall").getContent(),
			events:{
				'#loadMore':{
					click: 'loadNext'
				}
			}
			,loadNext:function(){
				this.wall.next(this.get('loadCommand'));
			}
			,initializer:function()
			{
				var wall = this.wall = new Y.BABE.PostList();
				wall.after('add',this.prepend,this);
				wall.after(['load'],this.render, this);
				wall.load({
					name:this.get('loadCommand')
				});
				
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
				

				post.setStyle("opacity",0);
				post.transition({ 
				    easing: 'ease',
				    duration: 1.0, 
				    opacity:1.0
				});
				
				
			},
			render:function()
			{
				
				this.wall.each(function(item,index){
					this.prepend({
						model:item
					});
				},this);
				
				return this;
			}
			
		});
		
		Y.SignUpView =  Y.BABE.SignUpView;
		
		window.Y = Y;
		
		Y.App = { views:{} };
		Y.App.load_wall = function(command){
			Y.loadTemplate("wall",function(){ 
			
					if(Y.one(".centercolumn").one("#wall-container"))
					{
						if(Y.App.views.wall){
							Y.App.views.wall.destroy();
						}
						Y.one(".centercolumn").one("#wall-container").remove();
					}
					Y.App.views.wall = new Y.WallView({loadCommand:command});
					
					Y.one(".centercolumn").append(Y.App.views.wall.render().get('container'));
				
			} );
		};
		Y.App.homepage = function(){
			Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
			Y.loadTemplate("topbar",function(){ Y.App.views.topbar = new Y.TopBarView(); Y.App.views.topbar.render();  });
			Y.loadTemplate("sidebar",function(){ Y.App.views.sidebar = new Y.SideBarView(); });
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); });
			Y.App.load_wall('wallposts');
			
			
			
		};
		
		Y.App.signup = function(){
			Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
			Y.loadTemplate("singupform",function(){ Y.App.views.signupform = new Y.SignUpView(); });
		};
		
		Y.App.myposts = function(){
			
			Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
			Y.loadTemplate("topbar",function(){ Y.App.views.topbar = new Y.TopBarView(); Y.App.views.topbar.render();  });
			Y.loadTemplate("sidebar",function(){ Y.App.views.sidebar = new Y.SideBarView(); });
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); });
			Y.App.load_wall('myposts');
			
		};
		Y.App.wallposts = function(){
	
			Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
			Y.loadTemplate("topbar",function(){ Y.App.views.topbar = new Y.TopBarView(); Y.App.views.topbar.render();  });
			Y.loadTemplate("sidebar",function(){ Y.App.views.sidebar = new Y.SideBarView(); });
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); });
			Y.App.load_wall('wallposts');
			
		};
		Y.App.showPost = function(model){
			Y.one("#maincontainer").setContent(Y.one("#main").getContent()); 
			Y.loadTemplate("topbar",function(){ Y.App.views.topbar = new Y.TopBarView(); Y.App.views.topbar.render(); });
			Y.loadTemplate("sidebar",function(){ Y.App.views.sidebar = new Y.SideBarView(); });
			Y.loadTemplate("wall",function(){ 
				if(model.get("category")=="event")
				{
					Y.App.views.current = new Y.EventView({model:model , expandComments:true});
				}
				else
				{
					Y.App.views.current = new Y.PostView({model:model , expandComments:true});
				}
				
				Y.one(".centercolumn").setContent(Y.App.views.current.render().get('container'));
			});
		};
		Y.App.showProfile = function(model){
			Y.BABE.sanitizeUI();
			Y.loadTemplate("profile",function(){ 
				var user = Y.userModel;
				user.set("id",Y.user.get("user_id"));
				user.set("_id",Y.user.get("user_id"));
				
				user.load({
					'_id':Y.user.get("user_id")
				},function(){
					Y.App.views.current = new Y.ProfileView({model:user});
					Y.one(".centercolumn").setContent(Y.App.views.current.render().get('container'));
				});
				
			});
		}; 
		Y.App.painpoint = function(){
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); 
			Y.one("a[rel=painpoint]").simulate('click');
		});
		};
		Y.App.firstexp = function(){
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); 
			Y.one("a[rel=first]").simulate('click');
		});
		};
		Y.App.lastexp = function(){
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); 
			Y.one("a[rel=last]").simulate('click');
		});
		};
		Y.App.profile = function() {
			Y.App.showProfile();
		};
		Y.App.survey = function(){
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); 
			Y.one("a[rel=surveys]").simulate('click');
		});
		};
		Y.App.images = function(){
			Y.loadTemplate("statusblock",function(){ Y.App.views.statusblock = new Y.StatusBlockView(); 
			Y.one("a[rel=images]").simulate('click');
		});
		};
		Y.App.createGroup = function(){
			
			Y.BABE.sanitizeUI();
			Y.loadTemplate("group",function(){ 
				var group = new Y.BABE.GroupModel({
					author_id:window.current_user
				});
				Y.App.views.current = new Y.BABE.CreateGroupView({model:group});
				Y.one(".centercolumn").setContent(Y.App.views.current.render().get('container'));
			});
		};
		
		
		<?php
			$current_user = $this->user->get_current();
			if(!empty($current_user))
			{
				?>				
				Y.userModel = new Y.BABE.UserModel({"id":<?php echo json_encode($this->user->get_current()); ?>});
				window.current_user = <?php echo json_encode($this->user->get_current()); ?>;
				Y.userModel.load();
				Y.user.set("authenticated",true);
				Y.user.set("id",<?php echo json_encode($this->user->get_current()); ?>);
				<?php
			}
		?>
		Y.App.homepage();
		Y.user.after("authenticatedChange",Y.App.homepage);
		Y.loadTemplate("messagebox",function(){}); 
		

	});
</script>    
    
    
    
   
</body>
</html>
