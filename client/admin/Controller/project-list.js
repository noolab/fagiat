//Session.set("myproject", "");
Template.addprojectlist.helpers({
	getpro:function(){
		return project.find({});
	},
	getcat:function(){
		return categories.find({});
	},
	showpro:function(){
        var alltags=Session.get('myproject');
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        		var proname=project.findOne({_id:alltags[i]});
            	tagsjson.push(proname);
        	}
       }
        //console.log('MYJSONTAGS:'+tagsjson);
        return tagsjson;
	}
});
Template.addprojectlist.events({
	'change #project':function(e){
		e.preventDefault();
		var pro = $('#project').val();
		if(Session.get("myproject")){
			var listTags=Session.get("myproject")+";"+pro;
		}else{
			var listTags=pro;
		}
       // console.log('MYERROR:'+listTags);
        Session.set("myproject", listTags);
        //console.log('MYTAGSLIST:'+Session.get("myproject"));
	},
	'click .glyphicon-remove':function(e){
		e.preventDefault();
		var alltags=Session.get('myproject');
		var pro = this._id;
		var res = alltags.replace(pro, ""); 
		Session.set("myproject", res);
        //console.log('REMOVETAGSPRO:'+tagsjson);	
    },
    'click #addlist':function(e){
    	e.preventDefault();
    	var alltags = Session.get('myproject');
        alltags = alltags.split(';');
        var tagsjson = [];
        for(var i = 0;i<alltags.length;i++){
        	if(alltags[i] != ""){
            	tagsjson.push(alltags[i]);
        	}
       }
       var catId = $("#cat").val();
       var catag_id;
       if(catId != ""){
       	 catag_id = catId;
       }else{
       	 catag_id = null;
       }
       var name = $("#name").val();
       Meteor.call('addprojectlist',name,tagsjson,catag_id);
    }
});
Template.manageprojectlist.helpers({
	projectlist:function(){
		return projectlist.find({});
	},
	allproject:function(proId){
		 var alltags = proId;
		// console.log("alltages : "+proId);
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){

        		var proname=project.findOne({_id:alltags[i]});
            	tagsjson.push(proname);
        	
       }
        //console.log('MYJSONTAGS:'+tagsjson);
        return tagsjson;
	}

});
Template.manageprojectlist.events({
	    'click #remove':function(e){
	    e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            projectlist.remove({_id:id});
        } 
    }
});
Template.allprojectlist.helpers({

    allproject:function(proId){
         var alltags = proId;
        tagsjson=[];
        var limit = 3;
        for(var i=0;i<limit;i++){
                var proname = project.findOne({_id:alltags[i]});
                tagsjson.push(proname);  
       }               
        return tagsjson;
    },
    getimage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    shortIt: function(description){
        var desc = description;
        if (desc.length > 50) {
            var truncated = desc.trim().substring(0, 50).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    shortTitle: function(title){
        var desc = title;
        if (desc.length > 20) {
            var truncated = desc.trim().substring(0, 20).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
    getcat:function(){
        var catId = this.category;
        return categories.find({_id:catId});
    },
    // ======== count like =========//
    totalLike:function(){
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    },
    total:function(){
            var projectId = this._id;
            console.log("Projeect id for total donation: "+projectId);
            var sum = 0;
            var result = donations.find({projectId:projectId});
                result.forEach(function(transaction){
                sum = sum + transaction.cost;
                console.log("get cost: "+transaction.cost);
            });
                console.log("Projeect id for total donation = "+sum);
             return sum;   
    }
});