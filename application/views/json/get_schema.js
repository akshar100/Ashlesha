function(doc)
{
	if(doc.type && doc.type=="schema")
	{
		emit(doc.schema,doc);
	}
}