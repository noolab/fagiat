Template.countries.events({
	"click #insert":function(e){
		e.preventDefault();
		var name = $("#countries").val();
		Meteor.call("addcountries",name,function(error,result){
			if(error){}
			else{
				sAlert.info('countries has been inserted',{position: 'bottom',timeout: 2000});
				$("#countries").val("");
			}
		});
	},
	"click #remove":function(e){
		e.preventDefault();
		if (confirm("Are you sure you want to delete this?")) {
             Meteor.call('removecountries',this._id);
        } 
	}
});
Template.countries.helpers({
	getcountries:function(){
		return countries.find({});
	}
});