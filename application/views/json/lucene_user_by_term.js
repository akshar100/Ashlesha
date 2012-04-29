function(doc) { 
	var ret=new Document(); 
	if(doc.type=='user')
	{
		ret.add(doc.fullname);
		ret.add(doc.username);
		
	}
	return ret; 
}