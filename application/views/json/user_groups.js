function(doc)
{
	if(doc.type=="group")
	{
		emit(doc.author_id,doc);
		if(doc.relations)
		{
			for(var r in doc.relations)
			{
				if(doc.relations[r]=="subscribed")
				{
					emit(r,doc);
				}
			}
		}
	}
}
