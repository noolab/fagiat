Meteor.methods({
	addcountries:function(name){
		var attr = {
			name:name,
			date:new Date()
		}
		countries.insert(attr);
	},
	removecountries:function(id){
		return countries.remove({_id:id});
	}
});	