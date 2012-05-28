function(doc) { 
	var ret=new Document(); 
	if(doc.tags){ret.add(doc.tags); return ret;}
	return; 
}