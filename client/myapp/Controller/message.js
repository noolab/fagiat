
Session.setDefault('template','newsmessage');
Session.set('lastmessage','');
Template.message.helpers({
	template:function(){
		var temp = Session.get('template');
		if (temp == "newsmessage") {
			return true;
		}else{
			return false;
		}
	},
	nexttemplate:function(){
		var tp = Session.get('template');
		if(tp == "inbox"){
			return true;
		}else{
			return false;
		}
	},
	senttemplate:function(){
		var tmp = Session.get('template');
		if (tmp == "sent") {
			return true;
		}else{
			return false;
		}
	}
});
Template.message.events({
    'click .newmessage':function(e){
        e.preventDefault();
        Session.set('template','newsmessage');
    },
    'click .inbox':function(e){
        e.preventDefault();
        Session.set('template','inbox');
    },
    'click .sent':function(e){
        e.preventDefault();
        Session.set('template',"sent");
    }
});
Template.newmessage.events({
	"click .btn-sendmessage":function(e){
		e.preventDefault();
		var receiverId = Session.get('projectOwnerId');
		var subject = $('#subject').val();
		var textmessage = $('#message').val();
		var senderId = Meteor.userId();
		var parent = 0;
			
		if(subject == ""){
			$('#subject').focus();
			return false;
		}else{
			if(message == ""){
				$('#message').focus();
				return false;
			}else{
				Meteor.call('addmessage',subject,textmessage,receiverId,senderId,parent);
			}
		}
		
	}
});
//================== Inbox =====================
Template.inbox.helpers({
	getmessage:function(){
		var user = Meteor.userId();
		console.log('myuserLogin:'+user);
		var result = message.find({receiverId:user,parent:0,status:1},{parent:0},{sort: {count:-1}, limit:1});
		return result;
	},
	getusername:function(id){
		console.log("senderId "+id);
		var result = Meteor.users.find({_id:id});
		return result;
	}
});
Template.inbox.events({
	'click #trash_inbox':function(){
        $('input:checkbox:checked').each(function(i){
          message.update({_id:$(this).val()},{$set:{status:0}});
        });
	}
});
//================== sent =====================
Template.sent.helpers({
	getmessage:function(){
		var user = Meteor.userId();
		console.log('myuserLogin:'+user);
		var result = message.find({senderId:user,parent:0,trash:1},{parent:0},{sort: {count:-1}, limit:1});
		return result;
	},
	getusername:function(id){
		console.log("senderId "+id);
		var result = Meteor.users.find({_id:id});
		return result;
	}
});
Template.sent.events({
	'click #trash_sent':function(){
        $('input:checkbox:checked').each(function(i){
          message.update({_id:$(this).val()},{$set:{trash:0}});
        });
	}
});
//=================== reply message ================
Template.children.helpers({
	getChild:function(subId){
		
		var result = message.findOne({parent:subId});
		console.log('MysubParent:'+subId);
		Session.set('lastmessage',result._id);
		return result;
	}
	,
	getusername:function(id){
		var result = Meteor.users.find({_id:id});
		return result;
	},
	getChildAvata:function(avatar){
        var img = images.findOne({_id:avatar});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    }
});

Template.replymessage.helpers({
	firstmessage:function(send_id , receiver_id,id){
		var parent = this.parent;
		
		if (parent === 0){
			var result = message.findOne({senderId:send_id,parent:0,receiverId:receiver_id,_id:id});
		}
		else{
			var senderId;
			var parentofreceiver = parent;
			function callandcall(){
				var getparent = message.find({_id:parentofreceiver});
				 getparent.forEach(function(transaction){
				 	parentofreceiver = transaction.parent;
				 	senderId = transaction.senderId;
				 	
				 });
				 if(parentofreceiver == 0){

				 }else{
				 	callandcall();
				 }
				 
			}
			callandcall();
			var result = message.findOne({senderId:senderId, parent:parentofreceiver});
		}

		Session.set('lastmessage',result._id);
		return result;
	},
	getname:function(){
		var user = this.senderId;
		var result = Meteor.users.find({_id:user});
		return result;
	},
	getusername:function(){
		var user = Meteor.userId();
		var result = Meteor.users.find({_id:user});
		return result;
	},
	sendername:function(id){
		var result = Meteor.users.find({_id:id});
		return result;
	},
	getAvata:function(avatar){
        var img = images.findOne({_id:avatar});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    }
});
Template.replymessage.events({
	'click #btn-reply':function(e){
		e.preventDefault();
		console.log('lastmessage'+Session.get('lastmessage'));
		var parent = Session.get('lastmessage');
		var subject = this.subject;
		var receiverId = this.senderId;
		var user = Meteor.userId();
		var message = $('#reptext').val();
		Meteor.call('addmessage',subject,message,receiverId,user,parent);
	}
});


