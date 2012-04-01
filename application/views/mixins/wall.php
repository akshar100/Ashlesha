<script type="text/x-template" id="wall">
	<div id="wall-container">
		<div class="row-fluid">
			<div class="span6 left"></div>
			<div class="span6 right"></div>
		</div>
		<div class="row-fluid">
			<div class="span4 left">&nbsp;</div>
			<div class="span6 left"> <button id="loadMore" type="button" class="btn span4">Load More</button></div>
			<div class="span6 left">&nbsp;</div>
		</div>
	</div>
</script>

<script type="text/x-template" id="post-row">
	
	<div class="span1">
        <img class="profile-image" src="{IMG}" alt="" rel="{ID}">
    </div>
	<div class="span11 post-zone"> 
		<div class="row-fluid"><div class="span1"></div><div class="tagzone span10"></div><div class="span1 wall-post-admin"></div></div>
		<div class="row-fluid"><div class="span1"></div><div class="textzone span11 postBody"><blockquote><p>{TEXT}</p><small>{AUTHOR}</small></blockquote></div></div>
		<div class="row-fluid"><div class="span1"></div><div class="metapost span11 "><span class="toolbar"></span></div></div>
	</div>
</script>

<script type="text/x-template" id="post-row-admin">
	
	<div class="span1">
        <img class="profile-image" src="{IMG}" alt="" rel="{ID}">
    </div>
	<div class="span11 post-zone"> 
		<form>
		<div class="row-fluid"><div class="span1"></div><div class="tagzone span10">
			<div class="row-fluid"><input type="text" placeholder="Brand, Product , Service Name" name="tags" value="{TAGS}" class="span12 autocomplete"></div>
		</div>
		<div class="span1 wall-post-admin"><button class='btn btn-danger delete-btn'><i class="icon-trash"></i></button></div></div>
		<div class="row-fluid"><div class="span1"></div><div class="textzone span11 postBody"><div class="row-fluid"><textarea rows="3" name="post"  class="span12">{TEXT}</textarea></div></div></div>
		<div class="row-fluid"><div class="span8">&nbsp;</div><div class="span3"><button type='button' class="btn btn-primary pull-right save-btn">Save Changes</button></span></div>
		</form>
	</div>
</script>


<script type="text/x-template" id="post-comments">
	<div class="row-fluid">
		<div class="span1"><img class="thumbnail profile-image span1" src="{IMG}" alt=""></div>
		<div class="span11">
			
			<blockquote><p>{TEXT}</p><small>{AUTHOR}</small></blockquote></div>
			
		</div>
	</div>
</script>
<script type="text/x-template" id="comment-form">
	<div class="row-fluid commentsForm">
		<div class="span1"></div>
		<div class="span11">
			<hr/>
			<div class="input">
	              <textarea rows="1" class="commentText span11"></textarea>
	              <span class="help-block">
	                
	              </span>
	        </div>
	        <div class="row-fluid">
	        	<div class="span1"></div>
	        	<div class="span11">
	        	
		        	<div class="pull-right">
		        	</br>
						<a class="btn default small submitComment" href="#">Comment</a>
					</div>
	        	</div>
	        </div>
	    </div>
	    
		
    </div>
    
</script>
<script type="text/x-template" id="embedded-image">
	<div class="row">
		<div class="span9">
			<div class="row-fluid"><img src="{IMG}" class="span6 thumbnail"/></div> 
		</div>
	</div>
</script>

<script type="text/x-template" id="post-row-event">
	<div class="span1">
        <img class="profile-image" src="{IMG}" alt="" rel="{ID}"/>
        <img style="margin-left:3px;" class="thumbnail" src="<?php echo base_url();?>static/images/calendar.png"/>
    </div>
	<div class="span11 post-zone">
		<div class="row-fluid"><div class="span1"></div><div class="span11">{TITLE}</div></div>
		<div class="row-fluid"><div class="span1"></div><div class="tagzone span10"></div><div class="span1 wall-post-admin"></div></div>
		<div class="row-fluid">
			<div class="span4"><h2>{START_DATE_ICON}</h2></div>
			<div class="span4">
				<h4>Start Date: <small>{START_DATE}</small> <span class='end-date'>End Date: <small>{END_DATE}</small></span></h4>
				<h4>Timings: <small>{START_TIME_HOURS}-{START_TIME_MINS}</small> to <small>{END_TIME_HOURS}-{END_TIME_MINS}</small> </h4>
			</div>
			<div class="span4 event-actions">
				
			</div>
		</div>
		<div class="row-fluid"><div class="span12">
			<blockquote><p>{TEXT}</p><small>{AUTHOR}</small></blockquote></div>
			<div class="row-fluid"><div class="span1"></div><div class="metapost span11 "><span class="toolbar"></span></div></div>
		</div>
		</div>
		
	</div>
</script>







<script id='wall-event-joined' type="text/x-template">
	<span class="label label-info">You are attending!</span> <button class='btn btn-danger undo-btn btn-mini'>Undo</button>
</script>
<script id='wall-event-ignored' type="text/x-template">
	<span class="label label-info">You are NOT attending!</span> <button class='btn btn-danger undo-btn btn-mini'>Undo</button>
</script>
<script id='wall-event-actions' type="text/x-template">
	<button class='btn btn-primary btn-mini join-btn'>Join</button>
	<button class='btn btn-danger btn-mini  ignore-btn'>Ignore</button>
</script>
<script id='wall-post-admin-btn' type="text/x-template">
	<div class="pull-right"><button class='btn btn-mini'><i class="icon-cog"></i></button></div>
</script>