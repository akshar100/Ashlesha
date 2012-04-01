<script type="text/x-template" id="create-group">
<div class="span12">
	<div class="row-fluid">
		<div class="span9">
			<div class="alert alert-info">
		        <a data-dismiss="alert" class="close">×</a>
		        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
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
							    			
							    			<button type="button" class="btn btn-small btn-primary">Create Group</button>  
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
