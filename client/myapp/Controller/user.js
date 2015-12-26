Template.register.events({
    'click #register': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var select = 'owner-user';
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        var letters = /^[A-Za-z]+$/;  
        if(username.match(letters)){
            if(email.match(mailformat))
            {
                if(password.match(passw))   
                {
                    Meteor.call('registerUser',username,email,password,select);
                    Router.go('/login');
                }  
                else  
                { 
                $("#error_pass").text("[6 to 10 characters,at least 1 specail characters and 1 numeric digits]").css("color","red");  
                $('[name=password]').focus(); 
                return false;  
                } 
            }  
            else  
            {  
                $("#error_email").text("invalid email address!").css("color","red");  
                $('[name=email]').focus();  
                return false;  
            }  
            
        }else{
            $("#error_fname").text("plese fill username").css("color","red");
            $('[name=username]').focus(); 
            return false;    
        }
         /////
    },
    'click #login-fb': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            else{
                var currentRouter = Session.get('mycurrent');
                Router.go(currentRouter);
            }
         });
     }
});
Template.login.events({
    'click #login': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                $('[name=email]').focus('');
                $(".error_login").text("Doesn't match").css("color","red");
            }else{
                var currentRouter = Session.get('mycurrent');
                var pay = Session.get('mypayment');
                if(pay){
                    Router.go("payment");
                }
                console.log('MYPAYMENT:'+pay);
                if(currentRouter == ""){

                }
                else if(pay){Router.go(pay)}
                else{
                Router.go('/discover');
                }
            }
        });
        
    },
    'click #login-fb': function(event) {
         Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            else{
                Router.go("/adminproject");
            }
         });
     }
});
Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        //alert('logout!!!');
        Meteor.logout();
        Router.go('login');
    }
});
// ========================== add profile ====================== //
Template.addprofile.events({
  'click #addprofile':function(e){
    e.preventDefault();
    var email = $("#email").val();
    var username = $("#username").val();
    var avatar = Session.get('ADDIMAGEID');
    alert(email+username+avatar);
    Meteor.call('addprofile',email,username,avatar);
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
    },
    'click #login-fb': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            else{
                //alert("working ");
            }
        });
    },
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }else{
                //alert("success");
                Router.go('/login');
            }
        });
    }
});
Template.addprofile.helpers({
    getuser:function(){
        return Meteor.user().profile.username;
    },
    getemail:function(){
        return Meteor.user().emails[0].address;
    },
    getavatar:function(){
        var id = Meteor.user().profile.avatar;
        console.log("MYIMAGEID_"+id);
        var img = images.findOne({_id:id});
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
    },
    countproject: function() {
   // return Meteor.call("countpro"); 
        var id= Meteor.userId();
        return project.find({ownerId:id}).count();

    },
    countprogress: function(){
        var count = 0;
        id= Meteor.userId();
        var today = new Date();
        var a = project.find({ownerId:id});
        //console.log("currentdate"+today);
        
        a.forEach(function(item){
            
            var displaymax = new Date(item.datemax);
            var currentDate = new Date(today);
            //console.log(" max date : "+displaymax + " / : current date: "+currentDate);
            var diffDaysMax = Math.round(Math.abs((displaymax.getTime())));
            var diffDaysCur = Math.round(Math.abs((currentDate.getTime())));
            console.log(" max date : "+diffDaysMax + " / : current date: "+diffDaysCur);
            if(diffDaysCur <= diffDaysMax){
                count +=1;
            }
            //console.log("MYERRO-PROGRESS"+diffDays);
        });
    //var result = Session.get('mypro');
    //console.log("MYERRO-PROGRESS"+result);
    return count;
    }
});
Template.addprofile.events({  
    'click #change': function(event) {
        event.preventDefault();
        var currentPassword = $('#password').val();
        var newPassword = $('#newpassword').val();
        //alert("Change password:"+ currentPassword +'/'+ newPassword);
        Accounts.changePassword(currentPassword, newPassword, function(error) {
            if (error) {
                $('#form-messages').html('There was an issue: ' + error.reason).css("color","red");            } else {
                $('#form-messages').html('Your password is changed!').css("color","blue");
            }
        });
    }
});
//============================= User Info ======================== //
Template.userinfo.helpers({
    getAvata:function(avatar){
        var img = images.findOne({_id:avatar});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getProjectList:function(id){
        return project.find({ownerId:id});
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
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    }
});
Template.userinfo.events({
    'click .btn-message':function(e){
        e.preventDefault();
        Session.set('projectOwnerId',this._id);
        Router.go('/message');
    }
});
//========================= MANAGE USER ROLES ==========================//
Template.edituser.events({
   'click #edituser': function(e){
        e.preventDefault();
        var id = this._id;
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        alert(mySelect);

        //Meteor.call('updateroles',mySelect);
        Meteor.call('edituser',id,username,email);
        Meteor.call('updateroles',id,mySelect);
        Router.go('/manage-users');
    }
});
Template.edituser.helpers({
    position: function(posit){
        return posit[0];
    },
    displayuser:function(){
        return Meteor.roles.find({});
    }
});
Template.manageuser.events({
    "click #remove":function(e){
        e.preventDefault();
        var id = this._id;
        alert('Remove Project!!!'+id);
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("deleteUser",id);
        }
    },
        'click #adduser': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        //alert(username+email+password+mySelect);
        Meteor.call('registerUser',username,email,password,mySelect);
        //Router.go('project');
    }
});
Template.manageuser.helpers({
    getroles:function(){
        return Meteor.roles.find({});
    },
    listuser:function(){
        return Meteor.users.find({});
    },
    position: function(posit){
        console.log(posit.ownergroup[0]);
        return posit.ownergroup[0];
    },
    countuser:function(){
        return project.find({}).count();
    },
    getroles:function(){
        return Meteor.roles.find({});
    }
});