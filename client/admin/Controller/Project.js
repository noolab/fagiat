 Session.setDefault('param','');
Template.adminproject.helpers({
    getproject:function(){
        // var result = project.find({});
        // return result;
        var param = Session.get('param');
        if(param == ""){
            return project.find({});
        }
        if(param == "title"){
            return project.find({},{sort:{title:1}});
        }
        if(param == "goal"){
            return project.find({},{sort:{goal:-1}});
        }
        if(param == "createdAt"){
            return project.find({},{sort:{createdAt:-1}});
        }
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
    },
    getcatname:function(id){
        return categories.find({_id:id});
    },
    mystatus:function(){
        return project.find({});
    },
    getvalue:function(){
        var id=this._id;
        var status = this.status;
        //alert("status"+ status);
        var dis = 'disable';
        var en = 'enable';
        if(status==1){
            return dis;
        }else{
            return en;
        }
          
    }
});
Template.adminproject.events({
    'click #remove':function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
             Meteor.call('removeproject',id);
        } 
    },
    'click #name':function(e){
        e.preventDefault();
        Session.set('param','title');
    },
    'click #price':function(e){
        e.preventDefault();
        Session.set('param','goal');
    },
    'click #date':function(e){
        e.preventDefault();
        Session.set('param','createdAt');
    },
    'click #myButton': function(){
        var id=this._id;
        var status = this.status;
        if(status==0){
            Meteor.call('disable',id);

        }else{
             Meteor.call('enable',id);
        }
    }
});
Template.editproject.events({
     "click .remove": function (event,tpl) {
        event.preventDefault();
        var currentCamid = $(event.currentTarget).attr("data-cpid");
        var proid = tpl.$("#pro-id").val();
        //alert(proid);
        if (confirm("Are you sure you want to delete this?")) {
            project.update({_id:proid},{$pull:{compaign:{comid:currentCamid}}});
        }
    },
    'click #update':function(e){
        e.preventDefault();
        var id = this._id;
        var title = $('#title').val();
        var image = Session.get('ADDIMAGEID');
        var oldimage = $('#oldimage').val();
        var description = $('#description').val();
        var location = $('#location').val();
        var category = $('#categories').val();
        var datemax = $('#datemax').val();
        var goal = $('#amount').val();
        alert(title);
        //alert('Myproject:'+title+image+description+address+datemax+goal);
        if(image){
            Meteor.call('updateproject',id,title,image,description,location,category,datemax,goal,function(error,proId){
                if(error){
                    
                }
                else{
                    Session.setPersistent('proId',proId);
                    Router.go('adminproject');
                }
            });
        }else{
            Meteor.call('updateproject',id,title,oldimage,description,location,category,datemax,goal,function(error,proId){
                if(error){
                    
                }
                else{
                    Session.setPersistent('proId',proId);
                    Router.go('adminproject');
                }
            });
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
Template.editproject.helpers({
    getcatname:function(){
        return categories.find({});
    },
    currentcat:function(){
        var id = this.category;
        console.log('CURRENT'+id);
        return categories.find({_id:id});
    }
});
Template.addproject.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});