<script type="text/x-template" id="statusblock-unauthenticated">
	<div></div>
	
</script>
<script type="text/x-template" id="statusblock-authenticated">
	<div class="row-fluid">
		<div class="span12 pills-status">
				<a  href="#" rel="painpoint"><i class="icon-pencil"></i> <?php echo $this->lang->line('main_post_title');?></a>
    			<a  href="#" rel="surveys">Surveys</a>
   				<a  href="#" rel="question"><i class="icon-question-sign"></i> Question</a>
    			<a  href="#" rel="event"><i class="icon-calendar"></i> Event</a>
		</div>
	</div>
	
    
    <div class="row-fluid">
    	
	   	<div class="span9">
	   	 <div class="forms">
				
				
			
	   	 </div>
		</div>
	<div id="upload_status"></div>
</script>
<script type="text/x-template" id="create-post">
	<div id="painpoint-form" class="form span12">
		<form >
		
			<h3><?php echo $this->lang->line('main_post_title');?></h3>
		<div class="control-group">
			
			<div class="controls docs-input-sizes">
				<div class="row-fluid">
					<input type="text" placeholder="<?php echo $this->lang->line('tags');?>" name="tags"  class="span12 autocomplete">
					<input type="hidden" name="category" value="painpoint"/>
				
					<p class="help-block"></p>
				</div>
				
			</div>
		</div>
		<div class="control-group">
			<div class="controls docs-input-sizes">
				<div class="row-fluid">
				<input type="text" placeholder="<?php echo $this->lang->line('categorization');?>" name="sector"  class="span12 ac-sector" disabled="">
				<p class="help-block"></p>
				</div>
			</div>
		</div>
		<div class="control-group">
			<div class="controls docs-input-sizes">
				<div class="row-fluid">
				<textarea rows="3" name="post"  class="span12"></textarea>
				<p class="help-block span8"> 
		                Explain your <?php echo $this->lang->line('main_post_title');?> in few words. Be specific and precise.  
		        </p>
		       </div>
	        </div>
	    </div>
	    <div class="contol-group">
	    	<div class="pull-right">
	    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
	    			<button class="btn btn-small btn-primary">Post</button>  
	    	</div>
	    </div>

		</form>
	</div>
	<div class="span4 image_preview">
		
	</div>
</script>
<script type="text/x-template" id="create-event">
	<div id="event-form" class="form span12">
					
						<h3>Create an Event</h3>
					
					<div class="control-group">
						<div class="controls">
							<div class="row-fluid">
							<input type="text" placeholder="<?php echo $this->lang->line('tags');?>" name="tags"  class="span12 autocomplete">
							<input type="hidden" name="category" value="event"/>
							<p class="help-block"></p>
							</div>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<div class="row-fluid">
							<input type="text" placeholder="Add a title" name="title"  class="span12">
							
							
							<p class="help-block"></p>
							</div>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<div class="row-fluid">
								<div class="span12">
							<span>Start Time:</span> 
							<select class="span1" name="start_time_hours">
				               <?php 
				               for($i=0;$i<24;$i++)
				               {
				               		echo "<option value='".$i."' ".($i==16?"selected='selected'":"").">$i</option>";
				               }
				               
				               ?>
				            </select>
				            <select class="span1" name="start_time_mins">
				               <?php 
				               $a = array("00","15","30","45");
				               foreach($a as $v)
				               {
				               		echo "<option value='".$v."' ".($v=="00"?"selected='selected'":"").">$v</option>";
				               }
				               
				               ?>
				            </select>
				            <span>End Time:</span> 
							<select class="span1" name="end_time_hours">
				               <?php 
				               for($i=0;$i<24;$i++)
				               {
				               		echo "<option value='".$i."' ".($i==16?"selected='selected'":"").">$i</option>";
				               }
				               
				               ?>
				            </select>
				            <select class="span1" name="end_time_mins">
				               <?php 
				               $a = array("00","15","30","45");
				               foreach($a as $v)
				               {
				               		echo "<option value='".$v."' ".($v=="00"?"selected='selected'":"").">$v</option>";
				               }
				               
				               ?>
				            </select>
							<input type="text" placeholder="Start Date dd/mm/yyyy" name="start_date"  class="span3">
							<input type="text" placeholder="End Date dd/mm/yyyy" name="end_date"  class="span3">
							<p class="help-block"></p>
							</div>
							</div>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<div class="row-fluid">
							<textarea rows="3" name="post"  class="span12"></textarea>
							<p class="help-block span8">
					                In details of the event you are supposed to mention location and other stuff. 
					        </p>
					       </div>
				        </div>
				    </div>
				    <div class="contol-group">
				    	<div class="pull-right">
				    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
				    			<button class="btn btn-small btn-primary">Post</button>  
				    	</div>
				    </div>
					
				</div>
				<div class="span4 image_preview">
					
				</div>
</script>
<?php $this->load->view("mixins/imageuploader");?>
<?php $this->load->view("mixins/question");?>
