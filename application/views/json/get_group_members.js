function(doc)
{
	if(doc.type=='group')
	{
		if(doc.relations)
		{
			relations = doc.relations;
			for(i in relations)
			{
				if(relations[i]=="member" || relations[i]=="owner" || relations[i]=="subscribed")
				{
					emit(doc['_id'],i);
				}
				
			}
		}
	}
}
