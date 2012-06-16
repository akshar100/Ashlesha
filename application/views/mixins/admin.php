<script type="text/x-template" id="admin-view">
	<div class="subnav">
	    <ul class="nav nav-pills">
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Users <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="/admin/additional_profile_info">User Profile Fields</a></li>
	          <li><a href="/admin/search_user">User Management</a></li>
	          <li><a href="/admin/mass_mail">Email All</a></li>
	          <li><a href="/admin/invite_users">Invite</a></li>
	        </ul>
	      </li>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Groups <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	        <!--  <li ><a href="#buttonGroups">Create Groups</a></li> -->
	          <li><a href="#buttonGroups">Manage Groups</a></li>
	       <!--   <li><a href="#buttonGroups">Group Settings</a></li> -->
	        </ul>
	      </li>
	    <!--  <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Pages <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li ><a href="#buttonGroups">Create Page</a></li>
	          <li><a href="#buttonGroups">Manage Pages</a></li>
	        </ul>
	    </li> -->
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Question Bank<b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="/admin/create_question">Create Question</a></li>
	          <li><a href="/admin/manage_questions">Manage Questions</a></li>
	          <li><a href="/admin/create_quiz">Create Question List</a></li>
	          <li><a href="/admin/manage_quiz">Manage Question List</a></li>
	        </ul>
	      </li>
	      <?php if($this->config->item("pages_enabled")){?>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Pages<b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="/admin/create_page">Create Page</a></li>
	          <li><a href="/admin/manage_pages">Manage Pages</a></li>
	        </ul>
	      </li>
	      <?php }?>
	     <li class='stats'><a  href="/admin/stats">Stats</a></li>
	     <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Settings <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	         <!-- <li class=""><a href="#navs">Components</a></li>
	          <li class=""><a href="#navbar">Functionality</a></li> -->
	          <li><a href="/admin/site_parameters">Site Parameters</a></li>
	          <li><a href="/admin/logo">Logo Image</a></li>
	        </ul>
	      </li>
	    <!--  <li class='stats'><a  href="/admin/fb">Facebook Campaign</a></li> -->
	    </ul>
   </div>
   <div class="row-fluid">
   		<div class="span12 mainarea">
   			
   		</div>
   </div>
</script>

<script type="text/x-template" id="infographics-admin-view">
	<div class="row-fluid">
		<div class="span12 well">
			<form class="form-inline">
				<div class="row-fluid"> <input type="text" name="tags" class="span8"/> <button type="button" class='btn btn-primary'>Analyze</button></div>
			</form>
		</div>
	</div>
</script>
<script type="text/x-template" id="stats-view">
	<div class="row-fluid"><div class="span12"><p>&nbsp;</p><h3>Application Wide Statistics</h2><p>&nbsp;</p></div></div>
	<div class="row-fluid">
		<div class="span8 well">
			<div class="row-fluid"><div class="span12"><h3>User Growth</h3></div></div>
			<div class="row-fluid">
				<div class="span12 user-stats">
					
				</div>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class=" well">
			
		</div>
	</div>
</script>
<script type="text/x-template" id="question-creation">
	<div class="row-fluid"><p>&nbsp;</p></div>
	<div class="row-fluid">
		<div class="span6">
			<div class="row-fluid">
				<div class="span12">
					<h3>Question Text</h3>
					<div class="row-fluid">
						<textarea name="question-text" class="span12"></textarea>
					</div>
					
				</div>
			</div>
			
			
			<h3>Drop in the box below</h3>
			<div class="row-fluid">
				<div class="span12 well qdrag-area"> 
					
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12 well">
					<div class="pull-right">
						<button type="button" class='btn btn-info preview'>Preview</button> <button type="button" class='btn btn-primary save-question'>Save</button>
					</div>
				</div>
			</div>
		</div>
		<div class="span6">
			<div class="span6">
            <h3>Drag from here</h3>
            <hr>
          <div class="tabbable drag-zone">
            <ul id="navtab" class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#1">Input</a></li>
            </ul>
            <form id="components" class="form-horizontal">
              <fieldset>
                <div class="tab-content">

                  <div id="1" class="tab-pane active">

                    <div data-type="text" class="control-group component">

                      <!-- Text input-->
                      <label data-valtype="label" for="input01" class="control-label valtype">Text input</label>
                      <div class="controls">
                        <input type="text" data-valtype="placeholder" class="input-xlarge valtype" placeholder="placeholder">
                        <p data-valtype="help" class="help-block valtype">Supporting help text</p>
                      </div>
                    </div>
                    <div data-type="radio" class="control-group component">
                    	 <label data-valtype="label" class="control-label valtype">Radio - Basic</label>
	                      <div data-valtype="radios" class="controls valtype">

	                        <!-- Multiple Radios -->
	                        <label class="radio">
	                          <input type="radio" checked="checked" name="group" value="Option one">
	                          Option one
	                        </label>
	                        <label class="radio">
	                          <input type="radio" name="group" value="Option two">
	                          Option two
	                        </label>
                     	 </div>

                    </div>
                    <br/>
                    <div data-type="textarea" class="control-group component">
                    	 <label data-valtype="label" class="control-label valtype">Select - Basic</label>
	                      <div class="controls">
	                        <textarea></textarea>
	                      </div>

                    </div>

                   
                     

                  </div>

                </div></fieldset>
              </form>
            </div>
          </div>
		</div>
	</div>
</script>

<script type="text/x-template" id="text-question">
	<div class="row-fluid">
		<div data-type="text" class="component border well">
			<div class="row-fluid"><input type="text" class='label span12' placeholder="type a label for textbox"></div>
			<div class="row-fluid"><textarea class='expected span12' placeholder="expected_answer|weightage"></textarea></div>
			<div class="row-fluid">
				<div class="span12">
				<p>If you are expecting certain values from the user you can enter them on each line. Optionally you can also assing weigtages to each answer as shown below</p>
<pre>
answer1|1
answer2|0.5
answer3|-1
</pre>
			</div>
			</div>
			<div class="row-fluid">
				<div class="span12"><div class="pull-right"><button type="button" class="btn close-btn">close</button></div></div>
			</div>
		</div>
		
	</div>
</script>

<script type="text/x-template" id="radio-question">
	<div class="row-fluid">
		<div data-type="radio" class="component border well">
			<div class="row-fluid"><input type="text" class='label span12' placeholder="type a label for radio options"></div>
			<div class="row-fluid"><textarea class='expected span12' placeholder="name|value|weightage"></textarea></div>
			<div class="row-fluid">
				<div class="span12">
				<p>If you are expecting certain values from the user you can enter them on each line. Optionally you can also assing weigtages to each answer as shown below</p>
<pre>
India|IN|1
United States of America|USA|0.5
</pre>
			</div>
			</div>
			<div class="row-fluid">
				<div class="span12"><div class="pull-right"><button type="button" class="btn close-btn">close</button></div></div>
			</div>
		</div>
		
	</div>
</script>

<script type="text/x-template" id="textarea-question">
	<div class="row-fluid">
		<div data-type="radio" class="component border well">
			<div class="row-fluid"><input type="text" class='label span12' placeholder="type a label for textarea"></div>
			<div class="row-fluid">
				<div class="span12">
				<p>This will add a textarea to the answer interface.</p>
			</div>
			</div>
			<div class="row-fluid">
				<div class="span12"><div class="pull-right"><button type="button" class="btn close-btn">close</button></div></div>
			</div>
		</div>
		
	</div>
</script>
<script type="text/x-template" id="question-markup">
	<div class="row-fluid">
		<div class="span12">
			<h3>{QUESTION}</h3>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 answer">
			
		</div>
	</div>
</script>
<script type="text/x-template" id="simple-row">
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid"><label class="control-label">{LABEL}</label></div>
         	<div class="row-fluid">{CONTENT}</div>
        </div>

	</div>
</script>
<script type="text/x-template" id="preview-template">
	    <div class="modal" id="previewModal">
		    <div class="modal-header">
		    <button class="close" data-dismiss="modal">×</button>
		    <h3>Preview</h3>
		    </div>
		    <div class="modal-body row-fluid" style="width:85%">
		    
		    </div>
		    <div class="modal-footer">
		    </div>
    	</div>
</script>
<script type="text/x-template" id="manage-questions">
	<div class="row-fluid">
		<div class="span12 question-list">
		<p>&nbsp;</p>
		</div>
	</div>
</script>
<script type="text/x-template" id="question-row">
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<div class="span6">{QUESTION}</div>
				<div class="span6">
					<div style="padding:10px;">
						<button type="button" class="btn btn-info">Preview</button>
						<button type="button" class="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</script>
<script type="text/x-template" id="question-row-adder">
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<div class="span6">{QUESTION}</div>
				<div class="span6">
					<div style="padding:10px;">
						<button type="button" class="btn btn-primary">Add</button>
						<button type="button" class="btn btn-danger hide">Remove</button>
						<input type="hidden" name="question_id" value="{ID}"/>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</script>
<script type="text/x-template" id="create-quiz">
	<div class="row-fluid">
		<div class="span12">
			<h3><?php echo $this->lang->line('quiz'); ?>!</h3>
			<hr/>
		</div>
	</div>
	<form>
	<fieldset>
		<div class="row-fluid">
			<div class="span2"><label>Give a title</label></div>
			<input class="input span6" type="text" name="title" placeholder="Give a title"/> 
		</div>
		<div class="row-fluid">
			<div class="span2"><label>Description</label></div>
			<textarea class="input span6" type="text" name="description" placeholder="Optional Descriptipon"></textarea> 
		</div>
		<div class="row-fluid">
			<div class="span2">&nbsp;</div>
			<div class="span4">
				<label>Start Date</label>
				<div class='start'></div>
				</div>
			
			<div class="span4">
				<label>End Date</label>
				<div class='end'></div>
				<p>&nbsp;</p>
			</div>
			
		</div>
		<div class="row-fluid">
			<div class="span2"><label>Time For <?php echo $this->lang->line('quiz'); ?></label></div>
			<input class="input span3" type="text" placeholder="time in minutes" name="time"/> 
		</div>
		<div class="row-fluid">
			<div class="span6"><h3>All Questions</h3>
				<div class="row-fluid"><div class="span10 all-questions well"></div></div>
			</div>
			<div class="span6">
				<h3>Questions for This <?php echo $this->lang->line('quiz'); ?></h3>
				<div class="row-fluid"><div class="span10 selected_questions well"></div></div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span10">
				<div class="pull-right">
					<button type="button" class="btn btn-primary create-btn">Save</button>
				</div>
			</div>
		</div>
	</fieldset>
	</form>
</script>
<script type="text/x-template" id="manage-quiz">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>Listing all available <?php echo $this->lang->line('quiz'); ?></h3>
			<a href="/admin/create_quiz" class='btn btn-primary'>Create New</a>
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		
	<table class="quizlist span9 table table-bordered">
	 
	</table>
		
	</div>
</script>
<script type="text/x-template" id="quiz-row">
	<tr>
		<td>
			<h4>{TITLE}</h4>
		</td>
		<td>
			<button type="button" class="btn btn-primary view">View/Edit</button>&nbsp;
			<button type="button" class="btn btn-danger delete">Delete</button>
			<button type="button" class="btn btn-success send">Send To Users</button>
			<button type="button" class="btn btn-info responses">Responses</button>
			<button type="button" class="btn btn-info preview">Preview</button>
			
		</td>
	</tr>
</script>
<script type="text/x-template" id="share-quiz">
	<div class="row-fluid">
		<div class="span12"><h3>Sharing <?php echo $this->lang->line('quiz'); ?></h4><hr/></div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<h4>You are sharing: <small>{TITLE}</small></h4>
			<p>&nbsp;</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span9 roles well">
			<button type="button" class="btn select-all">All</button> 
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<button class="btn btn-primary hide send">Send</button>
		</div>
	</div>
</script >
<script type="text/x-template" id="answer-quiz">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>You are answering <?php echo $this->lang->line('quiz'); ?>: <small>{TITLE}</small></h3>
			
			<div class="alert alert-info">
    			<p>{DESCRIPTION}</p>
    			<p>Starts On: <strong>{START_DATE}</strong></p>
    			<p>Ends On: <strong>{END_DATE}</strong></p>
    			<p>Available Time: <strong>{TIME}</strong> minutes</p>
    		</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 start_quiz hide" style="text-align:center">
			<buttton type="button" class='btn btn-primary btn-large start-btn'>Start <?php $this->lang->line('quiz');?></buttton>
			<p>Once you start you must continue. You wont be allowed to pause.</p>
		</div>
		<div class="span12 wait4_quiz hide" style="text-align:center">
			<strong>The <?php $this->lang->line('quiz');?> is not yet available. It will be available on {START_DATE}.</strong>
		</div>
		<div class="span12 over_quiz hide" style="text-align:center">
			<strong>The last date to answer <?php $this->lang->line('quiz');?> is expired.</strong>
		</div>
		<div class="span12 answered_quiz hide" style="text-align:center">
			<strong>You have already answered <?php $this->lang->line('quiz');?>.</strong>
		</div>
	</div>
</script>
<script type="text/x-template" id="answer-quiz-start">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>You are answering <?php echo $this->lang->line('quiz'); ?>: <small>{TITLE}</small></h3>
			
			<div class="alert alert-info">
    			<p>{DESCRIPTION}</p>
    			<p>Starts On: <strong>{START_DATE}</strong></p>
    			<p>Ends On: <strong>{END_DATE}</strong></p>
    			<p>Available Time: <strong>{TIME}</strong> minutes</p>
    		</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<p>Time:<span class="badge badge-inverse"></span> minutes remaining (We are saving your response periodically so dont bother to save it. )<br/></p>
			    <div class="progress span6">
			    <div class="bar" style="width: 100%;"></div>
			    </div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 questions-area">
			<p>&nbsp;</p>
			
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<div class="centered">
				<button type="button" class="btn btn-primary btn-large save-btn">Done</button>
				<p class="help-text">We save your response periodically hence you need not submit it again and again.</p>
			</div>
		</div>
	</div>
</script>
<script type="x-template" id="answer-row">
	<div class="row-fluid postrow">
		<div class="span1"><span class="badge badge-info">{NO}</span></div>
		<div class="span11">
			<h5>{QUESTION_TITLE}</h5>
			{ANSWER_MARKUP}
		</div>
	</div>
</script>
<script type="x-template" id="text-answer-row">
	<div class="row-fluid">
		<div class="span12">
			<label>{LABEL}</label>
			<input type="text" class="input" name="{NAME}"/>
		</div>
	</div>
</script>
<script type="x-template" id="radio-answer-row"> 
	<div class="row-fluid">
		<div class="span12">
			<label>{LABEL}</label>
			<ul class='radio-area unstyled'>
				
			</ul>
		</div>
	</div>
</script>
<script type="x-template" id="search-user">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>User Management</h3>
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<form class="well form-search">
				
				<input type="text" class="input search-box"/> <button type="button" class="btn search-btn "> Search</button> <button class="btn all-btn" type="button"> List All </button>
				
			</form>			
		</div>
	</div>
	<div class="row-fluid">
		<div class="span6 search-users">
			
		</div>
	</div>
</script>
<script id="mass-mail" type="text/x-template">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>Mass Mailing</h3>
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<span class="span12">
			<form class="form-horizontal well">
		        <fieldset>
		          <div class="control-group">
		            <label for="input01" class="control-label">Subject</label>
		            <div class="controls">
		              <input type="text" id="input01" class="input-xlarge span5 subject">
		              <p class="help-block">In addition to freeform text, any HTML5 text-based input appears like so.</p>
		            </div>
		          </div>
		          <div class="control-group">
		            <label for="textarea" class="control-label">Content</label>
		            <div class="controls">
		              <textarea rows="20" id="textarea" class="input-xlarge span5 content"></textarea>
		               <p class="help-block">Mail will be sent to all the users</p>
		            </div>
		          </div>
		          <div class="form-actions">
		            <button class="btn btn-primary send" type="button">Send</button>
		          </div>
		        </fieldset>
		      </form>
		</span>
	</div>
</script>
<script id="create-page" type="text/x-template">
	<div class="row-fluid">
		<div class="span12">
			<h3>Create a Page</h3>
		</div>
	</div>
</script>

<script id="invite-users" type="text/x-template">
	<div class="row-fluid">
		<div class="span12">
			<h3>Invite Users</h3>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			 <div class="alert alert-info">
			 	You need to enter email addresses in the following textare and system will send email invitations to all those users. 
			 	If you have configured the system for "invitation-only" signups then only those people will be able to signup.
			 </div>
		</div>
	</div>
	<div class="row-fluid">
		
		<textarea rows="5" cols="50" class="input span8 emails" placeholder="email addresses separated by comma.."></textarea>
		
	</div>
	<div class="row-fluid">
		
		<div class="span8"><label>Add a Personalized message</label></div>
		
	</div>
	<div class="row-fluid">
		
<textarea rows="5" cols="50" class="input span8 message" placeholder="personalized message...."></textarea>
		
	</div>
	<div class="row-fluid">
		<div class="span8">
			<div class="pull-right">
				<button type="button" class="btn btn-primary send">Invite</button>
			</div>
		</div>
	</div>
</script>
<script id="site-parameters" type="text/x-template">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>Site Parameters</h3>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 params">
			
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<button type="button" class="btn btn-primary save-btn">Save</button>
		</div>
	</div>
</script>
<script id="site-parameters-item" type="text/x-template">
	<div class="row-fluid">
		<div class="span12">
			<label>{TITLE}</label>
			<div class="row-fluid"> 
				<textarea id="{KEY}" class="input span8" rows="1">{VAL}</textarea>
				<hr/>
			</div>
		</div>
	</div>
	
</script>
<script id="site-logo-change" type="text/x-template">
	<div class="row-fluid">
		<div class="span8">
			<p>&nbsp;</p>
			<h3>Change Site Logo</h3>
			<p>&nbsp;</p>
			<p class="alert alert-info">
				We recommend that your logo should be 280x65 but for your convinience we will just accept any image you provide us. 
				Please do not embarrass yourself by putting an ugly image.
				The only supported format is <stronng>PNG</stronng>.
			</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span8">
			<div class="thumbnail">
				<img src="<?php echo base_url();?>static/images/logo.png"/>
			</div>
			<p>&nbsp;</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span8">
			
			<div class="image_preview" style="width:280px;">
				
			</div>
		</div>
		<div class="span4">
			<button type="button" class="btn btn-default img-upload">Change Logo</button><button type="button" class="btn btn-primary save hide">Save</button>
		</div>
	</div>
</script>
<script type="text/x-template" id="profile_fields">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>If you want your users to fill up additional information besides the standard one during signup, add it here. </h3>
			
			<hr/>
			<div class="row-fluid">
				<div class="span18 alert alert-info">
					All the additional profile fields are modelled as <strong>Questions</strong>. 
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<div class="well">
						<button type="button" class="btn btn-default add-text">Textfield</button>
						<button type="button" class="btn btn-default add-dropdown">Drop Down</button>
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12 profile-field-area">
					
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<button type="button" class="btn btn-primary save">Save</button>
				</div>
			</div>
		</div>
	</div>
</script>
<script type="text/x-template" id="text-profile-field">
	<div>
	<div class="row-fluid"><div class="span12"><h5>Textbox</h5></div></div>
	<div class="row-fluid">
		<div data-type="text" class="component border well">
			<div class="row-fluid">
				<input type="text" class='label span12' placeholder="type a label for textbox" value="{LABEL}">
				<input type="hidden" class='type span12' value="text">
			</div>
			<div class="row-fluid"><textarea class='expected span12' placeholder="default value if any">{VALUE}</textarea></div>
			<div class="row-fluid">
				<div class="span12"><input type="checkbox" class='required' name="required"> Required <div class="pull-right"><button type="button" class="btn close-btn">close</button></div></div>
			</div>
		</div>
		
	</div>
	</div>
</script>
<script type="text/x-template" id="dropdown-profile-field">
	<div>
	<div class="row-fluid"><div class="span12"><h5>Combobox</h5></div></div>
	<div class="row-fluid field">
		<div data-type="text" class="component border well">
			<div class="row-fluid">
				<input type="text" class='label span12' placeholder="type a label for textbox" value="{LABEL}">
				<input type="hidden" class='type span12' value="dropdown">
			</div>
			<div class="row-fluid"><textarea class='expected span12' placeholder="value|label" >{VALUE}</textarea></div>
			<div class="row-fluid">
				<div class="span12"><input type="checkbox" class='required' name="required"> Required <div class="pull-right"><button type="button" class="btn close-btn">close</button></div></div>
			</div>
		</div>
		
	</div>
	</div>
</script>
<script type="text/x-template" id="create_page">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>Publish a Page</h3>
			<p>&nbsp;</p>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<form class="form-horizontal">
        <fieldset>
         <div class="control-group">
            <label class="control-label">Title</label>
            <div class="controls docs-input-sizes">
              <input type="text" placeholder="Title" class="span12 title">
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Page Content</label>
            <div class="controls docs-input-sizes">
            	<form>
            	<div id="wysihtml5-toolbar" style="display: none;">
				  <a class="btn btn-small" data-wysihtml5-command="bold">bold</a>
				  <a class="btn btn-small" data-wysihtml5-command="italic">italic</a>
				  <a class="btn btn-small" title="Insert an unordered list" data-wysihtml5-command="insertUnorderedList" href="javascript:;" unselectable="on">UL</a>
				  <a class="btn btn-small" title="Insert an ordered list" data-wysihtml5-command="insertOrderedList" href="javascript:;" unselectable="on">OL</a>
				  <a class="btn btn-small" title="Insert headline 2" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">H2</a>
				  <a class="btn btn-small" data-wysihtml5-action="change_view">switch to html view</a>
				  
				  <!-- Some wysihtml5 commands like 'createLink' require extra paramaters specified by the user (eg. href) -->
				  <a class="btn btn-small" data-wysihtml5-command="createLink">insert link</a>
				  <div data-wysihtml5-dialog="createLink" style="display: none;">
				    <label>
				      Link:
				      <input data-wysihtml5-dialog-field="href" value="http://" class="text">
				    </label>
				    <a data-wysihtml5-dialog-action="save">OK</a> <a data-wysihtml5-dialog-action="cancel">Cancel</a>
				  </div>
				</div>
				<br/>
              <textarea class="span12 content input" rows="20"></textarea>
             </form>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Float</label>
            <div class="controls docs-input-sizes">
              <input type="text" placeholder="0" class="span12 float" value="1">
            </div>
            <div class="help-text">
            	Float is the rank in which the the page must appear in the menu. 0 will make sure the page comes 1st.
            </div>
         </div>
          <div class="form-actions">
            <button class="btn btn-primary save" type="button">Save</button>
          </div>
        </fieldset>
      </form>
		</div>
		<div id="bootstrap-linkurl" class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>
			<div class='modal-header'>
			<a class='close' data-dismiss='modal'>&times;</a>
			  <h3>Insert Link</h3>
			</div>
			<div class='modal-body'>
			  <input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>
			</div>
			<div class='modal-footer'>
			  <a href='#' class='btn' data-dismiss='modal'>Cancel</a>
			  <a href='#' class='btn btn-primary' data-dismiss='modal'>Insert link</a>
			</div>
		</div>
	</div>
</script>

<script type="text/x-template" id="manage-pages">
	<div class="row-fluid">
		<div class="span12">
			<p>&nbsp;</p>
			<h3>Manage Pages</h3>
		<p>&nbsp;</p>
		<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 pagelist">
		<p>&nbsp;</p>
		</div>
	</div>
</script>
<script type="text/x-template" id="page-row">
	<tr>
		<td>
			<h4>{TITLE} &nbsp; : </h4>
		</td>
		<td>
			<button type="button" class="btn btn-info view">View</button>&nbsp;
			<button type="button" class="btn btn-danger delete">Delete</button>
			<button type="button" class="btn btn-primary edit">Edit</button>
			<button type="button" class="btn btn-success publish">Publish</button>
			<button type="button" class="btn btn-warning unpublish">Un-Publish</button>
			
		</td>
	</tr>
</script>