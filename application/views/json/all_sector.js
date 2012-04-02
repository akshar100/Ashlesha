function(doc)
{

	if(doc['_id']=="Categorizations")
	{

		for(var i in doc)
		{
			if(i!="Sectors" && i!="_id" && i!="_rev")
			{
				
				for(var j in doc[i])
				{
					emit(doc[i][j],i);
				}
			}
		}
	}
}
