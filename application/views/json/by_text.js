function(doc) { 
	var ret=new Document(); 
	if(doc.text && doc.type=='post'){ret.add(doc.text); ret.add(doc.tags); ret.add(doc.author); return ret;}
	return; 
}