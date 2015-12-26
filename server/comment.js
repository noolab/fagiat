Meteor.methods({
	addcomment:function(proId,text){
		var user = Meteor.userId();
		var attr = {
			comment:{
				text: text,
				date: new Date(),
				userId:user
			}
		}
		return project.update({_id:proId},{$addToSet:attr});
	}
	
});