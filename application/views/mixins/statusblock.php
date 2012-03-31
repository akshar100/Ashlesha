<script type="text/x-template" id="statusblock-unauthenticated">
	<div>Painpoint</div>
	
</script>
<script type="text/x-template" id="statusblock-authenticated">
	<ul class="pills nav nav-pills pills-status">
    <li><a  href="#" rel="painpoint">Painpoint</a></li>
    <li><a href="#" rel="surveys">Surveys</a></li>
    <li class="hide"><a href="#" rel="images">Images</a></li>
    <li><a href="#" rel="first" >1st Exp.</a></li>
    <li><a href="#" rel="last">Last Exp.</a></li>
    <li><a href="#" rel="event">Event</a></li>
    </ul>
    <div class="row-fluid shadow hide">
    	
	   	 <div class="span9">
	   	 	<div class="forms">
				<div id="painpoint-form" class="hide form">
					<fieldset>
						<legend>Painpoint</legend>
					<div class="control-group">
						<div class="controls">
							<input type="text" placeholder="Brand, Product , Service Name" name="tags"  class="span12 autocomplete">
							<input type="hidden" name="category" value="painpoint"/>
							
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<textarea rows="3" name="post"  class="span12"></textarea>
							<p class="help-block span8">
					                Explain your painpoint in few words. Be specific and precise.  
					        </p>
					        
				        </div>
				    </div>
				    <div class="contol-group">
				    	<div class="pull-right">
				    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
				    			<button class="btn btn-small btn-primary">Post</button>  
				    	</div>
				    </div>
					</fieldset>
				</div>
				<div id="first-form" class="hide form">
					
					<fieldset>
						<legend>First Experience</legend>
					<div class="control-group">
						<div class="controls">
							<input type="text" placeholder="Brand, Product , Service Name" name="tags"  class="span12 autocomplete">
							<input type="hidden" name="category" value="firstexp"/>
							
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<textarea rows="3" name="post"  class="span12"></textarea>
							<p class="help-block span8">
					                First time you had used this brand/product/service.  
					        </p>
					        
				        </div>
				    </div>
				    <div class="contol-group">
				    	<div class="span12">
				    		<div class="pull-right">
				    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
				    			<button class="btn btn-small btn-primary">Post</button>  
				    		</div>
				    	</div>
				    </div>
					</fieldset>
			        
			        
				</div>
				<div id="last-form" class="hide form">
					
					<fieldset>
						<legend>Last Experience</legend>
					<div class="control-group">
						<div class="controls">
							<input type="text" placeholder="Brand, Product , Service Name" name="tags"  class="span12 autocomplete">
							<input type="hidden" name="category" value="lastexp"/>
							
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<textarea rows="3" name="post"  class="span12"></textarea>
							<p class="help-block span8">
					                Last experience means you wont use that product/brand/service anymore. 
					        </p>
					        
				        </div>
				    </div>
				    <div class="contol-group">
				    	<div class="span12">
				    		<div class="pull-right">
				    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
				    			<button class="btn btn-small btn-primary">Post</button>  
				    		</div>
				    	</div>
				    </div>
					</fieldset>
			        
				</div>
			</div>
			<div id="event-form" class="hide form">
					<fieldset>
						<legend>Create an Event</legend>
					<div class="control-group">
						<div class="controls">
							<input type="text" placeholder="Brand, Product , Service Name" name="tags"  class="span12 autocomplete">
							<input type="hidden" name="category" value="event"/>
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<input type="text" placeholder="Add a title" name="title"  class="span12">
							
							
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
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
					<div class="control-group">
						<div class="controls">
							<textarea rows="3" name="post"  class="span12"></textarea>
							<p class="help-block span8">
					                In details of the event you are supposed to mention location and other stuff. 
					        </p>
					        
				        </div>
				    </div>
				    <div class="contol-group">
				    	<div class="pull-right">
				    			<button class="btn btn-small img-upload"><i class="icon-picture"></i> Add Image</button>
				    			<button class="btn btn-small btn-primary">Post</button>  
				    	</div>
				    </div>
					</fieldset>
				</div>
	   	 </div>
	   	 <div class="span3">
	   	 	<div class="image_preview">
	   	 		
	   	 	</div>
	   	 </div>
	   	 
	</div>
	<div id="upload_status"></div>
	<hr/>
</script>
<?php $this->load->view("mixins/imageuploader");?>
