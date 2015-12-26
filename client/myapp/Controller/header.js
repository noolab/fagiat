Template.header.events({
    'click #sms':function(e){
        e.preventDefault();
        alert('hello');
        Router.go('manageaccount');
    },
    'click #displaynews':function(e){
        e.preventDefault();
        Session.set("news","displaynews");
        Session.set("project",undefined);
        Session.set("profile",undefined);
        Session.set('mymessage',undefined);
    },
    'click #profile':function(e){
        e.preventDefault();
        Session.set('profile','profile');
         Session.set("project",undefined);
        Session.set("news",undefined);
        Session.set('mymessage',undefined);
    },
    'click #message':function(e){
        e.preventDefault();
        Session.set('mymessage','message');
        Session.set('profile',undefined);
         Session.set("project",undefined);
        Session.set("news",undefined);
    },
    'click .newmessage':function(e){
        e.preventDefault();
        Session.set('template','newsmessage');
    },
    'click .inbox':function(e){
        e.preventDefault();
        Session.set('template','inbox');
    },
    'click .sent':function(e){
        e.preventDefault();
        Session.set('template',"sent");
    },
    'click .login':function(e){
        e.preventDefault();
        var currentpath = Iron.Location.get().path;
        Session.set('mycurrent',currentpath);
        Router.go('login');
    }
});
