/*var IR_BeforeHooks = {
    
    getStats: function() { 
        var url=this.request.url;
        var ip=headers.getClientIP();
        Meteor.call('getStats',ip,url);
        this.next()
     },
    
}

// (Global) Before hooks for any route
Router.onBeforeAction(IR_BeforeHooks.getStats);*/
var IR_BeforeHooks = {
   
    checkLogin: function() { 
      	var loggedInUser = Meteor.user();
		if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Admin','owner-user'])) {
	     	 this.render('login');   
	    }
	    else{
	    	 this.next();
	    }	   
     }
};
/*Router.onBeforeAction(IR_BeforeHooks.checkReward, {
	only: ['reward'],
	except: ['admin']
});*/

Router.onBeforeAction(IR_BeforeHooks.checkLogin, {
	only: ['admin','message','myproject','donationList','addproject1','displaynews','addprofile','news',
	'addreward','reward','addnews'],
	//except: ['admin','categories','login','register','projectlist','search','project','tage']	
});

