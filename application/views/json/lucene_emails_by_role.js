function(doc) { 
	var ret=new Document(); 
	if(doc.type=='user')
	{
		if(doc.roles)
		{
			var roles = doc.roles.split("|");
			for(var i in roles)
			{
				ret.add(roles[i].trim());
			}
		}
		else
		{
			ret.add("*");
		}
	}
	return ret; 
}