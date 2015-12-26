Template.addreward.events({
	'click #valider':function(e){
		e.preventDefault();
		var money = $('#money').val();
		var description = $('#description').val();
		var month = $('#month').val();
		var year = $('#year').val();
		var delivery = $('#delivery').val();
		var stock = $('#stock').val();
		var proId = Session.get('myprojectId');
		var mone = /^[0-9]+$/;
		var stocks = /^[0-9]+$/;
	if(money.match(mone)){
			if(stock.match(stocks)){
				Meteor.call('addreward',money,description,month,year,delivery,stock,proId,function(error,rewarid){
                    if(error){
                        console.log(error);
                       }
                       else{
                        Session.setPersistent('rewarid',rewarid);
                       }
                      });
                      Router.go('/about_you');
			}else{ 
		        $("#error_stock").text("Only number 0 to 9 characters").css("color","red");  
		        $('[name=stock]').focus(); 
		        return false; 
		     } 
	     }else{ 

	        $("#error_money").text("Only number 0 to 9 characters").css("color","red");  
            $('[name=money]').focus(); 
            return false;  
		} 
	
   }
});
Template.addreward.helpers({
	getOneCatName:function(){
        var obj = Session.get('categoryName');
        return obj.name;
    },
    count:function(){
        var obj = Session.get('categoryName');
        return obj.count;
    },
	rewarid: function(){
		return Session.get('myprojectId');
	},
	getcatname:function(){
		var pro = Session.get('proId');
		var result = project.findOne({_id:pro});
		var res = result.category;
		var cat = categories.find({_id:res});
		return cat;
	},
	getImage: function(){
		var pro = Session.get('proId');
		var result = project.findOne({_id:pro});
		var res = result.category;
		var cat = categories.findOne({_id:res});
		var catname = cat.imgId;
		console.log('MYPROJECTCAT:'+ catname);
        var img = images.findOne({_id:catname});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getoldreward: function(){
    	var result = reward.find();
    	return result;
    }
});
Template.addreward.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
// ===================== Show all rewards =========================== //

Template.rewards.helpers({
	getreward:function(){
	  	return reward.find();
	},
    shortIt: function(description){
        var desc = description;
        if (desc.length >70) {
            var truncated = desc.trim().substring(0, 70).split(" ").slice(0, -1).join(" ") + "…";
           return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
           return truncated;
        }
    }
});
Template.rewards.events({
	'click #remove':function(){
	  	var id = this._id;
	  	Meteor.call('removereward',id);
	}
});