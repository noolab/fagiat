// Load project for home page 
Template.allhomepro.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    count:function(){
        var number;
        for(var i=0;i>0;i++){
            number[i] = i;
        }
        return number;
    },
    getimage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    shortIt: function(description){
        var desc = description;
        if (desc.length > 70) {
            var truncated = desc.trim().substring(0, 70).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    getcat:function(){
        var catId = this.category;
        return categories.find({_id:catId});
    },
    totalLike:function(){
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    },
    total:function(){
            var projectId = this._id;
            console.log("Projeect id for total donation: "+projectId);
            var sum = 0;
            var result = donations.find({projectId:projectId});
                result.forEach(function(transaction){
                sum = sum + transaction.cost;
                console.log("get cost: "+transaction.cost);
            });
                console.log("Projeect id for total donation = "+sum);
             return sum;   
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
  // the posts cursor
  allprojects: function () {
   // return Template.instance().posts();
    var templateInstance = Template.instance().allprojects();
    return templateInstance;
  },
  // are there more posts to show?
  hasMorePosts: function () {
    return Template.instance().allprojects().count() >= Template.instance().limit.get();
  }
});
//............... implement load more button ................
Template.allhomepro.events({
  'click .load-more': function (event, instance) {
    event.preventDefault();
    var limit = instance.limit.get();
    limit += 6;
    instance.limit.set(limit);
  }
});
//............. on create .............
Template.allhomepro.onCreated(function () {
  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(6);
  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {
    var limit = instance.limit.get();

    //console.log("Asking for "+limit+" posts…")
    var subscription = instance.subscribe('limitproject', limit);

    if (subscription.ready()) {
      console.log("> Received "+limit+" posts. \n\n")
      instance.loaded.set(limit);
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

  instance.allprojects = function() { 
    return project.find({}, {limit: instance.loaded.get()});
  }
});

Template.slide.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    projectHome:function(){
        return projectlist.find({catId:null});
    },
    allproject:function(proId){
         var alltags = proId;
        tagsjson=[];
        var limit = 3;
        for(var i=0;i<limit;i++){
            var proname = project.findOne({_id:alltags[i]});
            tagsjson.push(proname);  
       }
        var result;
        if(Session.get('slidenum') == 1){
             result = tagsjson.slice(0,1);
        }else if(Session.get('slidenum') == 2){
             result = tagsjson.slice(1,2);
        }else{
            result = tagsjson.slice(2,3);
        }       
        return result;
    },
    getprojectlist: function(){
        return project.find();
    },
    getimage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getcat:function(){
        var catId = this.category;
        return categories.find({_id:catId});
    },
    shortDescription: function(description){
        var desc = description;
        if (desc.length > 160) {
            var truncated = desc.trim().substring(0, 160).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    totalLike:function(){
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    },
    total:function(){
            var projectId = this._id;
            console.log("Projeect id for total donation: "+projectId);
            var sum = 0;
            var result = donations.find({projectId:projectId});
                result.forEach(function(transaction){
                sum = sum + transaction.cost;
                console.log("get cost: "+transaction.cost);
            });
                console.log("Projeect id for total donation = "+sum);
             return sum;   
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    }
});
Session.set('slidenum',1);
Template.slide.events({
    'click div span.btn-slide1':function(e){
        e.preventDefault();
        Session.set('slidenum',1);
        $('span.btn-slide1').addClass('swiper-pagination-bullet-active');
        $('span.btn-slide3').removeClass('swiper-pagination-bullet-active'); 
        $('span.btn-slide2').removeClass('swiper-pagination-bullet-active');
    },
    'click div span.btn-slide2':function(e){
        e.preventDefault();
        Session.set('slidenum',2);
        $('span.btn-slide2').addClass('swiper-pagination-bullet-active');
        $('span.btn-slide1').removeClass('swiper-pagination-bullet-active'); 
        $('span.btn-slide3').removeClass('swiper-pagination-bullet-active'); 
    },
    'click div span.btn-slide3':function(e){
        e.preventDefault();
        Session.set('slidenum',3);
        $('span.btn-slide3').addClass('swiper-pagination-bullet-active');
        $('span.btn-slide1').removeClass('swiper-pagination-bullet-active'); 
        $('span.btn-slide2').removeClass('swiper-pagination-bullet-active');
    }
});

