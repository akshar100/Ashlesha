function(doc) { 
	var ret=new Document(); 
	if(doc.text){ret.add(doc.text); return ret;}
	return; 
}