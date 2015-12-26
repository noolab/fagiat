Template.aboutU.helpers({
	getOneCatName:function(){
        var obj = Session.get('categoryName');
        return obj.name;
    },
    count:function(){
        var obj = Session.get('categoryName');
        return obj.count;
    },
    showpro:function(){
        var alltags = Session.get('site');
        alltags = alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        	var obj = {
        		'_id' :alltags[i],
        		'site':alltags[i]
        	};
        	tagsjson.push(obj);
        	}
       }
        Session.set('website',tagsjson);
        return tagsjson;
	}
});
Template.aboutU.events({
	'click .btn-about':function(e){
		e.preventDefault();
		var image = Session.get('imgId');
		var name = $('.name').val();
        var biograph = $('.bio').val();
        var location = $('.location').val();
        var site = Session.get('website');
        var aboutPro = $('.aPro').val();
        var risk = $('.risk').val();
        var fb = null;
        var video = null;
        var proId = Session.get('pr');
        alert("proId: "+proId+" risk: "+risk+" aboutPro: "+aboutPro+" site: "+site+" location: "+location+" biograph: "+biograph+" name: "+name+" Image: "+image);
        Meteor.call('addAboutProj',proId,name,image,biograph,location,site,aboutPro,risk,fb,video,function(error){

            if(error){
                console.log('Insert Problem!!!');
            }
            else{
                //Session.setPersistent('pr',proId);
                Router.go('/administrative');
            }
        });
	},
	'change #upload': function(event, template) {
       var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            console.log(fileObj._id);
            Session.set('imgId', fileObj._id);
          });
        }
    },
    'click .btn-add': function(e) {
        var site = $('.site').val();
        if(Session.get("site")){
		var listTags=Session.get("site")+";"+site;
		}else{
			var listTags=site;
		}
		$('.site').val("");
        Session.set("site", listTags);
    },
	'click .glyphicon-remove':function(e){
		e.preventDefault();
		var alltags = Session.get('site');
		var id = this._id;
		var resl = alltags.replace(id, ""); 
		Session.set("site", resl);	
    }
});