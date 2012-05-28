function(doc)
{
	if(doc.type=="group" && doc.allowed_emails)
	{
		for(var i in doc.allowed_emails)
		{
			emit(doc.allowed_emails[i],doc);
		}
	}
}
