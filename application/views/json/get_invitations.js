function(doc)
{
	if(doc.type=='invitation')
	{
		
		emit(doc.email,doc);
		
		
	}
}
