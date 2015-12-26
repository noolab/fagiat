Template.administrative.helpers({
	getOneCatName:function(){
        var obj = Session.get('categoryName');
        return obj.name;
    },
    count:function(){
        var obj = Session.get('categoryName');
        return obj.count;
    },
    showEmail:function(){
        var alltags = Session.get('mail');
        alltags = alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        	var obj = {
        		'_id' :alltags[i],
        		'email':alltags[i]
        	};
        	tagsjson.push(obj);
        	}
       }
        Session.set('emails',tagsjson);
        return tagsjson;
	},
	showePhoneNum:function(){
        var alltags = Session.get('num');
        alltags = alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        	var obj = {
        		'_id' :alltags[i],
        		'phone_num':alltags[i]
        	};
        	tagsjson.push(obj);
        	}
       }
        Session.set('phone_number',tagsjson);
        return tagsjson;
	}
});
Template.administrative.events({
	'click .btn-add-contact':function(e){
		e.preventDefault();
		var emails = Session.get('emails');
		var phone_num = Session.get('phone_number');
        var proId = Session.get('pr');
        alert("proId: "+proId+" emails: "+emails+" phone_num: "+phone_num);
        Meteor.call('addContact',proId,emails,phone_num,function(error){
            if(error){
                console.log('Insert Problem!!!');
            }
            else{
                //Router.go('/administrative');
            }
        });
	},

    'click .btn-add-email': function(e) {
        var site = $('.email').val();
        if(Session.get("mail")){
		var listTags=Session.get("mail")+";"+site;
		}else{
			var listTags=site;
		}
		$('.email').val("");
        Session.set("mail", listTags);
    },
	'click .glyphicon-remove-mail':function(e){
		e.preventDefault();
		var alltags = Session.get('mail');
		var id = this._id;
		var resl = alltags.replace(id, ""); 
		Session.set("mail", resl);	
    },
    'click .btn-add-phone-num': function(e) {
        var site = $('.phone_num').val();
        if(Session.get("num")){
		var listTags=Session.get("num")+";"+site;
		}else{
			var listTags=site;
		}
		$('.phone_num').val("");
        Session.set("num", listTags);
    },
	'click .glyphicon-remove-num':function(e){
		e.preventDefault();
		var alltags = Session.get('num');
		var id = this._id;
		var resl = alltags.replace(id, ""); 
		Session.set("num", resl);	
    }
});



// "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
// 		+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";





	