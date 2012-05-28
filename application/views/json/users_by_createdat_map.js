function(doc)
{
	if(doc.type=='user' && doc.created_at)
	{
		var d = new Date(parseInt(doc.created_at,10)*1000);
		var date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
		emit([d.getFullYear(),(d.getMonth()+1),d.getDate()],1);
	}
	
}
