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
	          <h1></h1>
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
<?php $this->load->view('mixins/topbar'); ?>
<?php $this->load->view('mixins/group'); ?>
<script type="text/x-template" id="error-alert">
	<div class="alert alert-block alert-error fade in">
	            <a href="#" data-dismiss="alert" class="close">×</a>
	            <h4 class="alert-heading">Oh snap! You got an error!</h4>
	            <p id='error-text'>{ERROR}</p>
	           
	</div>
</script>
<?php $this->load->view("mixins/wall"); ?> 
<script src="<?php echo base_url();?>/static/js/framework.js?<?php echo time();?>"></script>    
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
			containerTemplate:'<div/>',
			initializer:function()
			{
				
			},
			render:function()
			{

				this.get('container').setContent(Y.Lang.sub(Y.one('#topbar-authenticated').getContent(),{
					user_name:Y.userModel.get("fullname"),
					user_id:Y.userModel.get("user_id")
				}));
				this.get('container').one("#notification-btn").on("click",function(){
					
				});
				this.get('container').one("a.brand").on("click",function(e){
					AppUI.navigate("/");
					e.preventDefault();
				});
				this.get('container').one("#edit-profile").on("click",function(e){
					AppUI.navigate("/me");
					e.preventDefault();
				});
				
				this.get('container').one("a.logout").on('click',function(){
					window.location = baseURL+'in/logout?seed='+Math.random();
				});
				
				jQuery(this.get('container').one('.dropdown-menu').getDOMNode()).dropdown();
				return this;
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
					AppUI.navigate(view);
					e.halt();
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
			containerTemplate:"<div/>",
			render:function(){
				
				var user = new Y.BABE.UserModel({'_id':window.current_user});
				var that = this;
				user.load({},function(){
					
					var template = Y.Lang.sub(Y.one("#sidebar-authenticated").getHTML(),{
						IMG:user.get("profile_pic"),
						FULLNAME:user.get("fullname")
					});
					that.get('container').setHTML(Y.Lang.sub(template,{
						user_name:user.get("fullname"),
						user_id:user.get("_id")
					}));
					
					that.get('container').append(new Y.SideBarMenuView().render().get('container'));
					
					
				});
				
				return this;
				
			}
		}) ; 
		
		Y.StatusBlockView = Y.Base.create('statusblockview', Y.View, [], {
			containerTemplate:'<div id="statusblock"/>',
			initializer:function(){
				
				
				
			},
			hide:function(){
				this.get('container').hide(true);
			},
			show:function(){
				this.get('container').show(true);
			},
			expandForm:function(val){
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
			},
			render:function(){
				
				
				
				this.template_id="#statusblock-authenticated";

				
				this.template = Y.one(this.template_id).getContent();
				this.set('container',Y.Node.create('<div id="statusblock"/>'));
				
				this.get('container').setContent(Y.Lang.sub(this.template,{
					user_name:Y.user.get("name"),
					user_id:Y.user.get("user_id")
				}));
				
				
				
				
				
				this.get('container').one(".pills-status").all("a").on("click",function(e){
						
						var val = Y.one(e.target).get("rel");
						
						this.expandForm(val);
							
						
					
						
						
					},this);
				if(this.get('expand'))
				{
					this.expandForm(this.get('expand'));
				}
				return this;
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
		Y.WallView = Y.BABE.WallView;
		Y.SignUpView =  Y.BABE.SignUpView;
		
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
					this.get('wall').loadWall(command); 
				}
			},
		    render: function () {
		    	var that = this;
		    	var expand = this.get('expand');
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				Y.loadTemplate("topbar",function(){ 
					
					var topbar= new Y.TopBarView();
					con.one(".topbar").setHTML(topbar.render().get('container'));
					
 				});
				Y.loadTemplate("sidebar",function(){ 
					var sidebar = new Y.SideBarView();
					con.one(".leftbar").setHTML(sidebar.render().get('container'));
				 });
				
				Y.loadTemplate("statusblock",function(){
					var statusblock = new Y.StatusBlockView({expand:expand}); 
					con.one('.status-bar-area').setHTML(statusblock.render().get('container'));
					that.set('statusbar',statusblock); 
					if(that.get('expand'))
					{
						that.expandForm(that.get('expand'));
					}
				
				});
				Y.loadTemplate("wall",function(){ 
					var wall = new Y.WallView({loadCommand:'wallposts'}); 
					con.one('.wallcontainer').setHTML(wall.render().get('container'));
					that.set('wall',wall);
				});
		        return this;
		    }
		});
		
		Y.MainProfileView = Y.Base.create('MainProfileView', Y.View, [], {
			containerTemplate:'<div class="the-app"/>',
		    render: function () {
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				Y.loadTemplate("topbar",function(){ 
					
					var topbar= new Y.TopBarView();
					con.one(".topbar").setHTML(topbar.render().get('container'));
					
 				});
				Y.loadTemplate("sidebar",function(){ 
					var sidebar = new Y.SideBarView();
					con.one(".leftbar").setHTML(sidebar.render().get('container'));
				 });
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
				Y.loadTemplate("topbar",function(){ 
					
					var topbar= new Y.TopBarView();
					con.one(".topbar").setHTML(topbar.render().get('container'));
					
 				});
				Y.loadTemplate("sidebar",function(){ 
					var sidebar = new Y.SideBarView();
					con.one(".leftbar").setHTML(sidebar.render().get('container'));
				 });
				 
				Y.BABE.loadTemplate('user_page',function(){
		    		var UserView = new Y.BABE.UserView({user_id:that.get('user_id')});
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
				Y.loadTemplate("topbar",function(){ 
					
					var topbar= new Y.TopBarView();
					con.one(".topbar").setHTML(topbar.render().get('container'));
					
 				});
				Y.loadTemplate("sidebar",function(){ 
					var sidebar = new Y.SideBarView();
					con.one(".leftbar").setHTML(sidebar.render().get('container'));
				 });
				 
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
				this.get('container').setHTML(Y.one('#group-page-main').getHTML('#group-page-main'));
				
			},
			render:function(){
				
				return this;
			}
		});
		
		Y.GroupPageMainView = Y.Base.create('GroupPageMainView', Y.View, [], {
			containerTemplate:'<div/>',
		    render: function () {
		    	var that= this;
		    	var con = this.get('container');
		        con.setHTML(Y.one("#outer").getHTML());
		        con.one('#maincontainer').setHTML(Y.one('#main').getHTML());
				Y.loadTemplate("topbar",function(){ 
					
					var topbar= new Y.TopBarView();
					con.one(".topbar").setHTML(topbar.render().get('container'));
					
 				});
				Y.loadTemplate("sidebar",function(){ 
					var sidebar = new Y.SideBarView();
					con.one(".leftbar").setHTML(Y.one('#group-page-sidebar').getHTML());
				});
				 
				Y.loadTemplate("group",function(){ 
					var group = new Y.BABE.GroupModel({
						"_id":that.get("group_id")
					});
					var creategroup =  new Y.GroupPageView({model:group});
					con.one(".centercolumn").setContent(creategroup.render().get('container'));
				});
				
		        return this;
		    }
		});
		
		
		window.Y = Y;
		
				
		
		
		
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
		
		
		var AppUI =  new Y.App({
		    views: {
		        homepage: {type: 'MainAppView', preserve:true },
		        profile:  {type:'MainProfileView'},
		        userpage: {type:'UserPageView',preserve:true },
		        create_group: {type:'CreateGroupMainView',preserve:true},
		        grouppage:{type:'GroupPageMainView',preserve:true},
		    },
		    transitions: {
		        navigate: 'fade',
		        toChild : 'fade',
		        toParent: 'fade'
		    }
		});
		Y.AppUI = AppUI;
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
				v.loadStream('my');
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
		 	this.showView('grouppage',{group_id:req.params.group_id});
		});
		
		AppUI.render().dispatch(); //.save('/');
		Y.loadTemplate("messagebox",function(){}); 
		

	});
</script>    
    
    
    
   
</body>
</html>
