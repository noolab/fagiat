Meteor.methods({
	addmessage:function(subject,textmessage,username,senderId,parent){
		var attr = {
			subject:subject,
			message:textmessage,
			username:username,
			senderId:senderId,
			parent:parent,
			status: 1,
			trash:1,
			date:new Date().toString("yyyy-MM-dd HH:mm:ss")
		}
		return message.insert(attr);
	}
});
