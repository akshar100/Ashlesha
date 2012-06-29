function(doc) { 
	var ret=new Document(),i; 
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
		if(doc.extra_fields){
			for(i in doc.extra_fields){
				ret.add(doc.extra_fields[i].real_value,{
					boost:2
				});
			}
		}
		return ret; 
	}
	
}