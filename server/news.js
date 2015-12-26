Meteor.methods({
	addnews:function(projectId,title,imgId,description,date){
		var user = Meteor.userId();
		var attr ={
			projectId:projectId,
			title:title,
			imgId:imgId,
			description: description,
			date: date,
			userId:user
		}
		return news.insert(attr);
	},
	updatenews:function(id,projectId,title,imgId,description,date){
		var user = Meteor.userId();
		var attr ={
			projectId:projectId,
			title:title,
			imgId:imgId,
			description: description,
			date: date,
			userId:user
		}
		return news.update({_id:id},{$set: attr});
	}
});