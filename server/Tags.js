Meteor.methods({
	addtags:function(name,cat){
		var user = Meteor.userId();
		var attr = {
			name:name,
			catId:cat,
			userId:user
		}
		return tags.insert(attr);
	},
	edittags:function(id,name,cat){
		var attr = {
			name:name,
			catId:cat
		}
		return tags.update({_id:id},{$set:attr});
	},
	removetags:function(id){
		return tags.remove({_id:id});
	}
});	