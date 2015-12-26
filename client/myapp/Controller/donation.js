Template.startdonate.events({
     'click div[name=flipre]':function(){
        var iden = "#flipB_"+this._id;
        var val = $(iden).val();
        if(iden){
            $(".panelB_"+this._id).slideToggle("slow");
        }
    },
	'click .btn-donate':function(e){
		e.preventDefault();
		var projectid = Session.get('startdo');
		var cost = Number($("#price").val());
		var letters = /^[A-Za-z]+$/; 
		//alert("cost is: "+cost);
		if(cost == ""){
			$("#price").focus();
			return false;
		}else{
			//Meteor.call("adddonation",projectid,cost);
            Session.set("mypayment",undefined);
            Session.set("myrewardId",undefined);
            Session.set("rewardvalue",cost);
            Router.go("payment");
		}
	},
	'click .rewardClass':function(e){
		e.preventDefault();
        var id = this._id;
        var amount = $("#price_"+this._id).val();
        var rewardId = $("#rewardId_"+this._id).val();
        alert(rewardId);
        Session.set("mypayment",undefined);
        Session.set("rewardvalue",undefined);
        Session.set("myrewardId",undefined);
        Session.set("amountselect",amount);
        Session.set("rewardIddonat",rewardId);
		//var letters = /^[A-Za-z]+$/; 
        Router.go("payment");
		//Meteor.call('adddonationbyreward',rewardId,projectid,cost);

	},
	'keyup input[name=price]': function(){
		var iden = "#price_"+this._id;
		var cost = Number($(iden).val());
		var money = this.money;
		var donatebutton = ".btn-donate_"+this._id;
		//alert('hello'+cost);
		if(cost < money){
			$(iden).css("border","2px solid red");
			$(donatebutton).css("display","none");
		}else if(cost >= money){ 
			$(iden).css("border","1px solid green");
			$(donatebutton).css("display","block");
		}
    },
    'click .glyphicon-heart-empty':function(e){
        e.preventDefault();
        var projectId = Session.get('startdo');
        var status = 0;
        if(!Meteor.userId()) {
            Router.go('signin');
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
        var projectId = Session.get('startdo');
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

Template.startdonate.helpers({
	getproject:function(){
		return project.find({_id:Session.get('startdo')});
	},
    title:function(){
        var pro = project.findOne({_id:Session.get('startdo')});
        return pro.title;
    },
	displayreward:function(){
        var proId = Session.get("rewardIdmodify");
        if(proId){
            return reward.find({proId:proId});
        }else{
		  return reward.find({proId:Session.get('startdo')});
        }
	},
	countContributor:function(){
		var rewardId = Session.get('selectedReward');
		var proId = Session.get('startdo');
		var stock = this.stock; 
		var contributor = donations.find({rewardId:rewardId,projectId:proId}).count();
		return contributor;
	},
    getstatus:function(){
        var projectId = Session.get('startdo');
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
        var projectId = Session.get('startdo');
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    }
});

// ======================= donation lists ====================
Template.donationList.helpers({
    compareData:function(){
        var cd = Session.get('params');
        if(cd == "datemax"){
            return true;
        }else{
            return false;
        }
    }
});
// ........... List Projec by Most donated .........
Template.donatPop.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
	'getDonationList':function(){
	var transactions = donations.find({userId:Meteor.userId()}).fetch();
	var donatedProject = _.uniq(transactions,true, function(transaction) {return transaction.projectId});
    var p_Id = [];
    donatedProject.forEach(function(it){
    	p_Id.push(it.projectId);
    });

    Meteor.call('mostlike',p_Id, function(err, data) {
      if (err){
        console.log(err);
        }else{
            data.sort(function(a, b){
                var keyA = a.sum;
                var keyB = b.sum;
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            });
            Session.set('allprojectid',data);
            //console.log("data after sort: "+JSON.stringify(data));
        }
    });
    var allprojectid = Session.get('allprojectid');
    //console.log('MYRESULT:'+JSON.stringify(allprojectid));
    return allprojectid;
	}, 
	'getProjectDonated':function(projectId){
		var projects =  project.find({_id:projectId});
		return projects;
	},
	 remainday:function(createdAt){
	  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	  var currentDate = new Date();
	  var createdDate = createdAt;
	  var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
	  console.log("date: "+ diffDays);
	  return diffDays;
	 },
	  getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
     },
    getstatus:function(){
        var projectId = this._id;
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
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    },
    total:function(projectId){
            var sum = 0;
            var result = donations.find({projectId:projectId});
                result.forEach(function(transaction){
                sum = sum + transaction.cost;
            });
             return sum;   
    },
    countContributors:function(){
        var proId = this._id;
        var result = donations.find({projectId:proId}).count(); 
        return result;
    },
    getRewardFromDonation:function(){
    	var id = Meteor.userId();
    	var proId = this._id;
    	return _.uniq(donations.find({projectId:proId,userId:id}).fetch(),true,function(d){return d.rewardId});
    },
    reward:function(){
    	var rewardId = this.rewardId;
        return reward.find({_id:rewardId});
    },
    categoryName:function(){
    	var catId = this.category;
    	var result = categories.findOne({_id:catId});
    	return result.name;
    },
    countContributorsForReward:function(){
    	var proId = this.proId;
        var rewardId = this._id;
        var result = donations.find({projectId:proId,rewardId:rewardId}).count(); 
        return result;
    },
    countHisReward:function(){
    	return donations.find({rewardId:this._id,userId:Meteor.userId()}).count();
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    }
});

// ............. Lastest Donate ...........
Template.donatNews.helpers({
	'getDonationList':function(){
	var transactions = donations.find({userId:Meteor.userId()}).fetch();
	var donatedProject = _.uniq(transactions,true, function(transaction) {return transaction.projectId});
    var p_Id = [];
    donatedProject.forEach(function(it){
    	p_Id.push(it.projectId);
    });
    var proj = project.find({_id:{$in:p_Id}});
    var arr = [];
    proj.forEach(function(item){
        var date = new Date(item.datemax);
        var diffDaysCur = Math.round(Math.abs((date.getTime())));
        var obj = {
            "_id":item._id,
            "date":diffDaysCur
        }
        arr.push(obj);
    });
    arr.sort(function(a, b){
        var keyA = a.date;
        var keyB = b.date;
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
    });
    return arr;
	}, 
	'getProjectDonated':function(projectId){
		var projects =  project.find({_id:projectId});
		return projects;
	},
	 remainday:function(createdAt){
	  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	  var currentDate = new Date();
	  var createdDate = createdAt;
	  var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
	  console.log("date: "+ diffDays);
	  return diffDays;
	 },
	  getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
     },
    getstatus:function(){
        var projectId = this._id;
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
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    },
    total:function(projectId){
    var sum = 0;
    var result = donations.find({projectId:projectId});
        result.forEach(function(transaction){
        sum = sum + transaction.cost;
    });
     return sum;   
    },
    countContributors:function(){
        var proId = this._id;
        var result = donations.find({projectId:proId}).count(); 
        return result;
    },
    getRewardFromDonation:function(){
    	var id = Meteor.userId();
    	var proId = this._id;
    	return _.uniq(donations.find({projectId:proId,userId:id}).fetch(),true,function(d){return d.rewardId});
    },
    reward:function(){
    	var rewardId = this.rewardId;
        return reward.find({_id:rewardId});
    },
    categoryName:function(){
    	var catId = this.category;
    	var result = categories.findOne({_id:catId});
    	return result.name;
    },
    countContributorsForReward:function(){
    	var proId = this.proId;
        var rewardId = this._id;
        var result = donations.find({projectId:proId,rewardId:rewardId}).count(); 
        return result;
    },
    countHisReward:function(){
    	return donations.find({rewardId:this._id,userId:Meteor.userId()}).count();
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    }
});
Session.setDefault('params','datemax');
Template.donationList.events({
    'click .news':function(e){
        e.preventDefault();
        Session.set('params','datemax');
    }, 
    'click .popular' : function(e){
        e.preventDefault();
        Session.set('params','status');
    }
});