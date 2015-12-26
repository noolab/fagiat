// Initail the datepicker
Template.addnews.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

Template.addnews.helpers({
 projects:function(){
  var user = Meteor.userId();
  return project.find({ownerId:user});
 }
});

Template.addnews.events({
 'click #addnews':function(){
  var projectId = $("#projects").val();
  var title = $("#title").val();
  var imgId = Session.get('ADDIMAGEID');
  var date = $("#date").val();
  var description = $("#description").val();
  var letters = /^[A-Za-z]+$/;  
  
    if(date != ''){ 
      Meteor.call('addnews',projectId,title,imgId,description,date);
      Router.go('news');
    }else{
      $("#date").focus();
      return false;
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
//===================== Manage news page =======================
Template.news.helpers({
 userProject:function(){
  var userId = Meteor.userId();
  //console.log("user id: "+userId);
     return project.find({ownerId:userId});
 },
 // display news
 projectNews:function(projectId){
  //console.log("project id :"+ projectId);
  return news.find({projectId:projectId});
 },
 getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getprojectname:function(projectId){
     return project.find({_id:projectId});
    },
 // display date in a right format
 rightdate:function(date){
  var date = new Date(date);
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  return rightformatdate = day+"/"+month+"/"+year ;

 }
});
Template.news.events({
    "click #remove":function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            news.remove(id);
        }
    }
});

//======================= update news ===================

// Initail the datepicker
Template.updatenews.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

Template.updatenews.helpers({
 projects:function(){
  return project.find({});
 },
 getproject:function(projectId){
  return project.find({_id:projectId});
 }
});

Template.updatenews.events({
 'click #updatenews':function(){
  var id = this._id;
  var projectId = $("#projects").val();
  var title = $("#title").val();
  var imgId = Session.get('ADDIMAGEID');
  var currentImage = $("#currentImage").val();
  var date = $("#date").val();
  var description = $("#description").val();
  if(imgId){
      Meteor.call('updatenews',id,projectId,title,imgId,description,date);
      Router.go('news');
  }
  else{
      Meteor.call('updatenews',id,projectId,title,currentImage,description,date);
      Router.go('news');
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

//======================== view one news =================
Template.viewnews.helpers({
 getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    rightdate:function(date){
  var date = new Date(date);
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  return rightformatdate = day+"/"+month+"/"+year ;

 }
});
Template.displaynews.helpers({
    getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getnews:function(){
        var arr = [];
        var user = Meteor.userId();
        var don = donations.find({userId:user});
        don.forEach(function(item){
            var result = item.projectId;
            var a = news.find({projectId:result});
            a.forEach(function(entry){
                var dat = new Date(entry.date);
                var diffDaysCur = Math.round(Math.abs((dat.getTime())));
                var obj = {
                    "_id":entry._id,
                    "date":diffDaysCur
                }
                arr.push(obj);
            });
                arr.sort(function(a, b){
                var keyA = a.date;
                var keyB = b.date;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        });
        return arr;
    },
    getdonews:function(){
        var id = this._id;
        return news.find({_id:id});
    }
});