Template.comment.rendered = function() {
    $(document).ready(function(){
        $("#flip").click(function(){
            $("#panel").slideToggle("slow");
        });
    });
    $(document).ready(function(){
        $("#show").click(function(){
            $("#show-text").slideToggle("slow");
        });
    });
    $(document).ready(function(){
        $("b").click(function(){
            $(".fa-angle-down").slideToggle("slow");
        });
    });
},
Template.comment.events({
    'click #post':function(e){
        e.preventDefault();
        var text = $('#text').val();
        var proId = this._id;
        //alert('hello'+text+'===='+proId);
        Meteor.call('addcomment',proId,text);
    },
    'click .btn-sms-register':function(){
        var currentpath = Iron.Location.get().path;
        Session.set('mycurrent',currentpath);
        Router.go('/register');
    },
    'click .btn-sms-login':function(){
        var currentpath = Iron.Location.get().path;
        Session.set('mycurrent',currentpath);
        Router.go('/login');
    }
});
Template.comment.helpers({
    getcomment:function(){
        var id = this._id;
        return project.find({_id:id});
    },
    getuser:function(id){
        var user = Meteor.userId();
        return Meteor.users.find({_id:id});
    },
    getavatar: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
     passday:function(createdAt){
          var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
          var currentDate = new Date();
          var createdDate = createdAt;
          var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
          console.log("MYdate: "+ diffDays);
          return diffDays;
    }
});
