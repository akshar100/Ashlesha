function(doc)
{
	if(doc && doc.type=='post')
	{
		var tags = doc.tags.split(",");
		for(var i in tags)
		{
			if(tags[i] && tags[i].trim())
			{
				emit(tags[i].trim().toLowerCase(),1);
			}
			
		}
	}
}
