function(doc)
{
	if(doc.type && doc.type=="post")
	{
		emit(doc.author_id+doc.created_at,doc);
	}
}
