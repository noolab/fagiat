// ============================== LAYOUT PAGS ======================= //

Router.configure({
    layoutTemplate: 'mainLayout'
});
Router.route('/', {
    name: 'home'
});

//**** ======================= ADMIN PAGE ========================*****//

// =========================== PAGE PROJECT ========================= //
Router.route('/adminproject', {
    name: 'adminproject'
});
Router.route('/editproject/:_id', {
    name: 'editproject',
    data:function(){
    	return project.findOne({_id: this.params._id});
    }
});
// =========================== PAGE MANAGE CATEGORIES ========================= //
Router.route('/admincategories', {
    name: 'admincategories'
});
Router.route('/addcategories', {
    name: 'addcategories'
});
Router.route('/editcategories/:_id', {
    name: 'editcategories',
    data:function(){
    	return categories.findOne({_id: this.params._id});
    }
});
// =========================== PAGE TAGS ========================= //
// Router.route('/tage', {
//     name: 'tage'
// });
Router.route('/tage', {
    name: 'admintags'
});
//***** ======================= FRONTEND PAGE =====================*****//
Router.route('/discover', {
    name: 'discover'
});


// =========================== PAGE PROJECT ========================= //
Router.route('/projectlist', {
    name: 'projectlist'
});
Router.route('/addproject1', {
    onBeforeAction: function () {
        if (!Meteor.userId()) {
          this.render('login');
        } else {
          this.next();
        }
      }
});
Router.route('/about_you', {
    name: 'aboutU'
});
Router.route('/administrative', {
    name: 'administrative'
});
Router.route('/myproject', {
    name: 'myproject'
});
Router.route('/projectdetail/:_id', {
    name: 'projectdetail',
    data: function(){
        return project.findOne({_id: this.params._id});
    }
});
Router.route('/listprobycat/:_id', {
    name: 'listprobycat',
    data: function(){
        return categories.findOne({_id: this.params._id});
    }
});
Router.route('/manageaccount', {
    name: 'mainaccount'
});
// List project by categories
Router.route('/project', {
    name: 'project'
});
// =========================== PAGE CATEGORIES ========================= //
Router.route('/categories', {
    name: 'categories'
});
// =========================== PAGE REGISTER LOGIN ========================= //
Router.route('/register', {
    name: 'register'
});
Router.route('/login', {
    name: 'login'
});
// =========================== PAGE SEARCH ========================= //
Router.route('/search', {
    name: 'searchBox'
});
// =========================== PAGE NEWS ========================= //
Router.route('/news',{
    name:'news'
});
Router.route('news/view/:_id',{
    name:'viewnews',
    data:function(){
        return news.findOne({_id: this.params._id});
    }
});
Router.route('/news/updatenews/:_id',{
    name:'updatenews',
    data:function(){
        return news.findOne({_id: this.params._id});
    }
});
Router.route('/displaynews',{
    name:'displaynews'
});
Router.route('/addnews', {
    name: 'addnews'
});
// =========================== PAGE REWARD =================== //
Router.route('/addreward', {
    name: 'addreward'
});
Router.route('/reward', {
    onBeforeAction: function () {
        if (!Meteor.userId()) {
          this.render('login');
        } else {
          this.next();
        }
      }
});
// =========================== PAGE PROFILE USERS =================== //
Router.route('/addprofile', {
    name: 'addprofile'
});
Router.route('userinfo/:_id',{
    name: 'userinfo',
    data:function(){
        return Meteor.users.findOne({_id: this.params._id});
    }
});
//=========================== PAGE DONATE ==================
Router.route('/startdonate', {  
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('login');
    } else {
      this.next();
    }
  }
});
// ====================== List Donations ====================
Router.route('/contribution', {
    name: 'donationList'
});
Router.route('/payment', {
    name: 'payment'
});
//=========================== PAGE MESSAGE ====================== //
Router.route('/message/replymessage/:_id', {
    name: 'replymessage',
    data:function(){
         return message.findOne({_id: this.params._id}); 
    }
});
Router.route('/message', {
    name: 'message'
});
Router.route('/inbox', {
    name: 'inbox'
});
//=========================== PAGE COMMENT ====================== //
Router.route('/comment', {
    name: 'comment'
});

// ======================= MANAGE USER ROLES ========================//
Router.route('/manage-users', {
    name: 'manageuser'
});
Router.route('/edituser/:_id', {
    name: 'edituser',
    data: function(){
        return Meteor.users.findOne({_id: this.params._id});
    }
});
// ============= project list ====== //
Router.route('/manageprojectlist', {
    name: 'manageprojectlist'
});
Router.route('/addprojectlist', {
    name: 'addprojectlist'
});
Router.route('/editprojectlist/:_id', {
    name: 'editprojectlist',
    data: function(){
        return projectlist.findOne({_id: this.params._id});
    }
});
Router.route('/allprojectlist/:_id', {
    name: 'allprojectlist',
    data: function(){
        return projectlist.findOne({_id: this.params._id});
    }
});
// FOR TEST
Router.route('/test', {
    name: 'test'
});
Router.route('/projectdonated',{
    name: 'projectdonated'
});
Router.route('/cover', {
    name: 'cover'
});
// ================ Add Countries ================ //
Router.route('/addcountries', {
    name: 'countries'
});