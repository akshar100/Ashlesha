function(doc){
	 
	if(doc.type=='likes')
	{
		emit(doc.post,doc);
	}
}
