function(doc)
{
	if(doc && doc.type=="user" && doc.roles)
	{
		var roles = doc.roles.split("|");
		for(var i in roles)
		{
			emit(roles[i].trim(),1);
		}
	}
}
