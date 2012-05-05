<script type="text/x-template" id="admin-view">
	<div class="subnav">
	    <ul class="nav nav-pills">
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Users <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li ><a href="#buttonGroups">Search User</a></li>
	          <li><a href="#buttonGroups">Email All</a></li>
	        </ul>
	      </li>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Groups <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li ><a href="#buttonGroups">Create Groups</a></li>
	          <li><a href="#buttonGroups">Manage Groups</a></li>
	          <li><a href="#buttonGroups">Group Settings</a></li>
	        </ul>
	      </li>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Question Bank<b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="/admin/create_question">Create Question</a></li>
	          <li><a href="#buttonGroups">Manage Questions</a></li>
	          <li><a href="#buttonGroups">Create Question List</a></li>
	          <li><a href="#buttonGroups">Responses</a></li>
	        </ul>
	      </li>
	      <li class='stats'><a  href="/admin/stats">Stats</a></li>
	      <li><a href="#misc">Miscellaneous</a></li>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Settings <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li class=""><a href="#navs">Components</a></li>
	          <li class=""><a href="#navbar">Functionality</a></li>
	          <li><a href="#breadcrumbs">Site Parameters</a></li>
	        </ul>
	      </li>
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
<</script>

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
