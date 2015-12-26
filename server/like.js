Meteor.methods({
	insertlike:function(projectId,status){
		var userId = Meteor.userId();
		var attr = {
			projectId : projectId,
			userId : userId,
			status : status
		}
		return like.insert(attr);
	},
	removelike:function(projectId){
		var userId = Meteor.userId();
		
		return like.remove({projectId:projectId, userId:userId});
	}
});