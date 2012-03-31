function(doc)
{
	if(doc.type && doc.type=="connection")
	{
		emit(doc.source_user+doc.target_user,doc);
		emit(doc.target_user+doc.source_user,{
			source_user:doc.target_user,
			target_user:doc.source_user,
			source_follows_target:doc.target_follows_source,
			target_follows_source:doc.source_follows_target,
			target_connects_source:doc.source_connects_target,
			source_connects_target:doc.target_connects_source
		})
	}
}
