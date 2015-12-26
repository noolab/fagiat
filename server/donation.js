Meteor.methods({
	adddonation:function(projectid,cost){
		var userId = Meteor.userId();
		var attr = {
			projectId: projectid,
			userId: userId,
			cost: Number(cost),
			date: new Date()
		}
		return donations.insert(attr);
	},
	adddonationbyreward:function(rewardId,projectId,cost){
		var userId = Meteor.userId();
		var attr = {
			rewardId: rewardId,
			projectId: projectId,
			userId: userId,
			cost: Number(cost),
			date: new Date()
		}
		return donations.insert(attr);
	}
	
});
