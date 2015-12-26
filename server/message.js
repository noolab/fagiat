Meteor.methods({
	addmessage:function(subject,textmessage,receiverId,senderId,parent){
		var attr = {
			subject:subject,
			message:textmessage,
			receiverId:receiverId,
			senderId:senderId,
			parent:parent,
			status: 1,
			trash:1,
			date:new Date().toString("yyyy-MM-dd HH:mm:ss")
		}
		return message.insert(attr);
	}
});
