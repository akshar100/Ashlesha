function(doc) { 
	var ret=new Document(); 
	if(doc.type=='user' && !doc.disabled)
	{
		ret.add(doc.fullname,{
			boost:2
		});
		ret.add(doc.username);
		if(doc.connections)
		{
			ret.add(doc.connections.length,{
				boost:2		
			});
		}
		
		return ret; 
	}
	
}