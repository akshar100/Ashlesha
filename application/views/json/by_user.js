function(doc) { 
	var ret=new Document(); 
	if(doc.author){ret.add(doc.author);}
	if(doc.author_id){ret.add(doc.author_id);}
	return ret; 
}