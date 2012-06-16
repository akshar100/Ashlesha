
function(doc)
{
	if(doc && doc.type=="page" && doc.published && (doc.published==true || doc.published=="true"))
	{
		emit(doc._id,doc);
	}
}
