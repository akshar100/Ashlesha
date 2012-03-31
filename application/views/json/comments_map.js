function(doc){
	
	if(doc.type=="comments")
	{
		emit(doc.post_id,doc);
	}
}
