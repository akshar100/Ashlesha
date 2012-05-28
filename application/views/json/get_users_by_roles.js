function(doc)
{
	if(doc && doc.type=='user' && doc.email)
	{
		if(doc.roles)
		{
			var roles = doc.roles.split("|");
			for(var i in roles)
			{
				if(roles[i].trim())
				{
					emit(roles[i].trim(),[doc.email,doc._id]);
				}
				
			
			}
		}
		
		emit('*',[doc.email,doc._id]);
		
	}
}
