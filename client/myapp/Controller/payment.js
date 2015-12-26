Template.payment.helpers({
	payamount:function(){
		var pay = Session.get("mypayment"); // get price from project deatial select reward
		var rewardSelect = Session.get("rewardvalue"); // get rewardId from project detail select
		var amount = Session.get("amountselect");
		console.log("MYPAY:"+amount);
		if(pay){return pay}
		else{
			if(rewardSelect){return rewardSelect;}
			else{return amount}
		}
	},
	rewardSelect:function(){
		var rewardId = Session.get("myrewardId");
		var Idrewarddonate = Session.get("rewardIddonat");
		console.log("MYREWARDID:"+rewardId);
		if(rewardId){
			return reward.findOne({_id:rewardId});
		}else{return reward.findOne({_id:Idrewarddonate});}
	},
    displaytitle:function(){
        var rewardId = Session.get("myrewardId");
        if(rewardId){
            var result = reward.findOne({_id:rewardId});
            var id = result.proId;
            var pro = project.findOne({_id:pro});
            return pro.title;
        }
    },
	getstatus:function(){
        var projectId = Session.get("myproId");
        var status = 0;
        var result = like.find({projectId:projectId,userId:Meteor.userId()});
        result.forEach(function(transaction){
            status = transaction.status;
        });
        if(status == 1){
            return "";
    }else{
            return "-empty";
        }
    },
    totalLike:function(){
    	var projectId = Session.get("myproId");
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    }
});
Template.payment.events({
    "click #pay":function(e){
        e.preventDefault();
        var rewardId = Session.get("myrewardId");
        var Idrewarddonate = Session.get("rewardIddonat");
        if(rewardId){
            var result = reward.findOne({_id:rewardId});
            var projectid = result.proId;
        }else{var result = reward.findOne({_id:Idrewarddonate});}
        //var rewardId = result._id;
        var cost = Session.get("mypayment");
        alert("hello");
        Meteor.call("adddonationbyreward",rewardId,projectid,cost,function(error,result){
            if(error){}
            else{
                sAlert.info('Your Payment has been success',{position: 'bottom',timeout: 9000});
            }
        });
    },
	"click #modify":function(e){
		e.preventDefault();
		var projectId = Session.get("myproId");
		Session.set("rewardIdmodify",projectId);
		//alert(projectId);
		Router.go("startdonate");
	},
	'click .glyphicon-heart-empty':function(e){
        e.preventDefault();
        var projectId = Session.get("myproId");
        var userId = Meteor.userId();
        var status = 0;
        if(!Meteor.userId()) {
            sAlert.error('Please login');
        } 
        else{
            status = 1;
            $(".likeUnlike").removeClass("glyphicon-heart-empty");
            $(".likeUnlike").addClass("glyphicon-heart");
            Meteor.call('insertlike',projectId,status);   
        }
    },
    'click .glyphicon-heart':function(e){
        e.preventDefault();
        var projectId = Session.get("myproId");
        if(!Meteor.userId()) {
            Router.go('signin');
        } 
        else{
            $(".likeUnlike").removeClass("glyphicon-heart");
            $(".likeUnlike").addClass("glyphicon-heart-empty");
            Meteor.call('removelike', projectId);
        }
    }
});