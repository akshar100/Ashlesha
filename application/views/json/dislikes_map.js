function(doc){
	 
	if(doc.type=='dislikes')
	{
		emit(doc.post,doc);
	}
}
