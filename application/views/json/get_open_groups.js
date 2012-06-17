function(doc)
{
	if(doc && doc.type=="group" && doc.visibility=="open")
	{
		emit(doc._id,doc);
	}
}
