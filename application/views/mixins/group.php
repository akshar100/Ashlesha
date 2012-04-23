<script type="text/x-template" id="create-group">
<div class="span12">
	<div class="row-fluid">
		<div class="span9">
			<div class="alert alert-info">
		        <a data-dismiss="alert" class="close">×</a>
		        <strong>Heads up!</strong> You are creating a board. Boards are created for focussed discussion generally around certain people or topics.
		     </div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span9">
			<form class="form-vertical">
			<div id="event-form" class="form">
							<fieldset>
								<legend>Create a Board</legend>
								<div class="control-group">
									<div class="controls">
										<input type="text" placeholder="Add a title" name="title"  class="span12">
										<p class="help-block"></p>
									</div>
								</div>
								<div class="control-group">
									<div class="controls">
										<input type="text" placeholder="Brand, Product , Service Name" name="tags"  class="span12 autocomplete">
										<p class="help-block"></p>
									</div>
								</div>
								<div class="control-group">
									<div class="controls">
										<label class="radio">
							                <input type="radio" checked="" value="open"  name="visibility">
							               		Open Board
							            </label>
							            
							            <label class="radio">
							                <input type="radio" value="closed"  name="visibility">
							                	Closed Board
							            </label>
										<p class="help-block">If you set your group as closed then you will have to manually pass the group link to others.</p>
									</div>
								</div>
			
								<div class="control-group">
									<div class="controls">
										<textarea rows="3" name="description"  class="span12" placeholder="Description......"></textarea>
										<p class="help-block">
								            Mention the purpose of the board, who can join, what activity is expected and so on.
								        </p>
							        </div>
							    </div>
							    <div class="contol-group">
							    	<div class="pull-right">
							    			
							    			<button type="button" class="btn btn-small btn-primary">Create</button>  
							    	</div>
							    </div>
							</fieldset>
			</div><!--end form -->
			</form>
		</div>
	</div>
	
</div>	
</script>
<?php $this->load->view("mixins/question");?>

<script type="text/x-template" id="group-page-sidebar">
	<div class="row-fluid">
		
		<img src="{GROUP_IMAGE}" class='thumbnail span6'>
		
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<button type="button" id='invite' class="btn btn-success"><i class='icon-magnet icon-white'></i> Invite</button>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<H5>Members {MEMBERS_COUNT}</H5>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			
		</div>
	</div>
</script>
<script type="text/x-template" id="group-page-main">
	<div class="row-fluid">
		<div class="span9">
			<h2>{GROUP_TITLE}</h2>
			<h3><small>{GROUP_DESCRIPTION}</small></h3>
		</div>
		<div class="span3">
			<div class="group-join">
				<button type="button" class="btn btn-primary join-btn"><i class="icon-plus icon-white"></i> Join</button>
				<button type="button" class="btn btn-danger unjoin-btn hide"><i class="icon-minus icon-white"></i> Leave</button>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<hr/>
		</div>
	</div>
</script>