function(doc)
{
	if(doc.type=="group")
	{
		emit(doc.author_id,doc);
		if(doc.relations)
		{
			for(var r in doc.relations)
			{
				if(doc.relations[r]=="subscribed" || doc.relations[r]=="member")
				{
					emit(r,doc);
				}
			}
		}
	}
}
