function(doc)
{
	if(doc.type=="group")
	{
		if(!doc.title){
			doc.title = "Untitled";
		}
		emit(doc.author_id,doc);
		if(doc.relations)
		{
			for(var r in doc.relations)
			{
				if(doc.relations[r]=="subscribed" || doc.relations[r]=="member" || doc.relations[r]=="owner")
				{
					emit(r,doc);
				}
			}
		}
	}
}
