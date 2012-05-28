function(doc)
{
	if(doc.type && doc.type=="post" && (doc.ownership=="public" || !doc.ownership)){
		if(doc.created_at){
			emit(doc.created_at,doc);
		}
		
	}
	
}
