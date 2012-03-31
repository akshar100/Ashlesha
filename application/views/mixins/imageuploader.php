<script type="text/x-template" id="image_uploader">
	<div class="modal hide fade" id="imageUploaderModal" style="display: none;">
            <div class="modal-header">
              <a data-dismiss="modal" class="close">×</a>
              <h3>Upload One Image</h3>
            </div>
            <div class="modal-body">
              <div class="alert alert-info">
			    <p><strong>Heads Up!</strong> upload one image with size less than 5 MB and smaller than 1024x748.</p>
			  </div>
			  
              <div id="image-loading"></div>
			  <form id="imageuploader" method="POST" enctype="multipart/form-data">
			  	<input type="file" id="fileInput" name="fileInput" class="input-file"/>
			  </form>
              
            </div>
            <div class="modal-footer">
              <a data-dismiss="modal" class="btn" href="#">Close</a>
              <a class="btn btn-primary" href="#" id="upload-img-btn">Upload</a>
            </div>
     </div>
</script>



