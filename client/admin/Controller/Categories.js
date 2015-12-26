Template.addcategories.events({
	'click #insert':function(e){
		e.preventDefault();
		var name = $('#name').val();
		var imgId = Session.get('ADDIMAGEID');
		//alert('hello:'+name);
		Meteor.call('addcategories',name,imgId);
		Router.go('admincategories');
	},
	'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});
Template.admincategories.helpers({
    getcategories:function(){
        var result = categories.find({});
        return result;
    },
    getImage: function(id){
        //var id = this.imgId;
        //console.log('MyimageId:' + id);
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    }
});
Template.admincategories.events({
    'click #remove':function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
             Meteor.call('removecategories',id);
        }    
    }
});
Template.editcategories.events({
	'click #update':function(e){
		e.preventDefault();
		var id = this._id;
		var name = $('#name').val();
		var imgId = Session.get('ADDIMAGEID');
        var currentImage = $('#currentImage').val();
		//alert('hello:'+name);
        if(imgId){
            Meteor.call('editcategories',id,name,imgId);
            Router.go('admincategories');
        }
        else{
            Meteor.call('editcategories',id,name,currentImage);
            Router.go('admincategories');
        }
		
	},
	'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});
