Session.set("tags", "");
Template.addtags.helpers({
	getcatname:function(){
		return categories.find({});
	}
});
Template.admintags.helpers({
	gettags:function(){
		return tags.find({});
	},
	getcatname:function(cat){
		return categories.find({_id:cat});
	}
});
Template.addproject1.helpers({
	gettagsname:function(){
		var alltags=Session.get('tags');
		alltags=alltags.split(';');
		jsonToSend=[];
        if(alltags!= null){
            for(var i=0;i<alltags.length;i++){
                var current=alltags[i];
                if(current!='null' && current!='')
                    jsonToSend.push(current);
            }
        }
		return jsonToSend;
		console.log('MYIDPRO:'+jsonToSend);
	},
	settings: function() {
    return {
	      position: "bottom ",
	      limit: 10,
	      rules: [
	        {
	          token: '@',
	          collection: tags,
	          field: "name",
	          template: Template.userPill
	        },
	        {
	          token: '!',
	          collection: Dataset,
	          field: "_id",
	          options: '',
	          matchAll: true,
	          filter: { type: "autocomplete" },
	          template: Template.dataPiece
	        }
	      ]
	    };
	  }
});
Template.addproject1.events({
	'click #addtags':function(e){
		e.preventDefault();
		var name = $('#tags').val();
		var cat = $('#categories').val();
		var arr = $('#arr').val();
		//alert(name+cat);
		Meteor.call('addtags',name,cat,function(error,result){
				if(error){
					console.log('!!!Error Insert');
				}
				else{
					var tag = result;
					var listTags=Session.get("tags")+tag+";";
					Session.set("tags", listTags);
					console.log('MYTAGESAL:'+listTags);
					//Router.go('test');
				}
			
		});
	}
});