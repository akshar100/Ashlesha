<script type="text/x-template" id="admin-view">
	<div class="subnav">
	    <ul class="nav nav-pills">
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Users <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li class="active"><a href="#buttonGroups">Search User</a></li>
	          <li><a href="#buttonGroups">Email All</a></li>
	        </ul>
	      </li>
	      <li class="dropdown">
	        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Groups <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li class="active"><a href="#buttonGroups">Create Groups</a></li>
	          <li><a href="#buttonGroups">Manage Groups</a></li>
	          <li><a href="#buttonGroups">Group Settings</a></li>
	        </ul>
	      </li>
	      <li><a class='stats' href="/admin/stats">Stats</a></li>
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
