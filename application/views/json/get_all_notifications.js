function(doc)
{
	if(doc.type && doc.type=="notification" && !doc.mark_read)
	{
		emit(doc.target_user,doc);
	}
}
