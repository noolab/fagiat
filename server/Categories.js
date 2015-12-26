Meteor.methods({
	addcategories:function(name,imgId){
		var attr = {
			name:name,
			imgId:imgId
		}
		categories.insert(attr);
	},
	editcategories:function(id,name,imgId){
		var attr = {
			name:name,
			imgId:imgId
		}
		categories.update({_id:id},{$set:attr});
	},
	removecategories:function(id){
		return categories.remove({_id:id});
	}
});	