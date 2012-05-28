function(doc)
{
	if(doc && doc.type=='quiz')
	{
		emit(doc._id,doc);
	}
}
