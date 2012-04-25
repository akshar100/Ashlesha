function(doc)
{
	if(doc.type && doc.type=="notification" && !doc.read)
	{
		emit(doc.target_user,doc);
	}
}
