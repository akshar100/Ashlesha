function(newDoc,saveDoc,uctx){
	function trim(stringToTrim) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}

	function require(field,message){
		if(!newDoc[field])
		{
			throw({forbidden:"The "+field+" is required."});
		}
	}
	
	if(newDoc.type=="post")
	{
		require("tags");
		require("text");
		require("user_id");
	}
	if(newDoc.type=="user" && false)
	{
		require("username");
		require("email");
		require("password");
		require("fullname");
	}		
}
