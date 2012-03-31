function(doc){
	
	if(doc.type && doc.type=="post")
	{
		if(doc.tags)
		{
			var taglist = doc.tags.split(",");
			for(var i in taglist)
			{
				var tag = taglist[i].trim().toLowerCase();
				if(tag)
				{
					emit(tag,null);
				}
			}
		}
	}
}
