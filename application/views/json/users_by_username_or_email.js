function(doc)
{
	if(doc.type && doc.type=="user")
	{
		emit(doc.email,doc);
		emit(doc.username,doc);
	}
}
