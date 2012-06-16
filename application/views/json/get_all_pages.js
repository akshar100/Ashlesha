function(doc)
{
	if(doc && doc.type && doc.type=="page")
	{
		doc.id = doc._id;
		emit(doc._id,doc);
	}
}
