{
	"test":false,
	"supported_roles":"student|moderator|faculty|user|administrator", //user and administrator are compulsary do not remove them. 
	"default_role":"student|user",
	"rights":{
		"public_post":"user",
		"create_group":"user",
		"edit_post":"administrator|moderator",
		"public_event":"user",
		"public_first":"user",
		"public_last":"user"
	}
	"user_acceptance":"open" //supported open for singup all, "closed" for no signups and "approval" for admin to approve the users
}
