function(doc)
{
	if(doc.type && doc.type=='user' && doc.otp)
	{
		emit(doc.otp,doc);
	}
}
