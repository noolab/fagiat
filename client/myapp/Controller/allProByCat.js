Session.set('project',-1);
Template.project.rendered = function () {
    // Do stuff
    $("#flexiselDemo").flexisel({
        visibleItems: 5,
        animationSpeed: 1000,
        autoPlaySpeed: 3000,            
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: { 
            portrait: { 
                changePoint:480,
                visibleItems: 1
            }, 
            landscape: { 
                changePoint:640,
                visibleItems: 2
            },
            tablet: { 
                changePoint:768,
                visibleItems: 3
            }
        }
    });
}
//======================== Project ===================================//

Template.project.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    projectDiscover:function(){
        return projectlist.find({catId:{$not:null}},{limit:1});
    },
    allproject:function(proId){
         var alltags = proId;
        // console.log("alltages : "+proId);
        tagsjson=[];
        var limit = 3;
        for(var i=0;i<limit;i++){

            var proname=project.findOne({_id:alltags[i]});
            tagsjson.push(proname);
       }
        //console.log('MYJSONTAGS:'+tagsjson);
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
    sortNews:function(){
        var catID = Session.get('catId');
        var catdate = project.find({category:catID});
        var arr = [];
        catdate.forEach(function(item){
            var date = new Date(item.datemax);
            var diffDaysCur = Math.round(Math.abs((date.getTime())));
            var obj = {
                "_id":item._id,
                "date":diffDaysCur
            }
            arr.push(obj);
            console.log('Hello Pisey Yeak: '+diffDaysCur);
        });
        arr.sort(function(a, b){
            var keyA = a.date;
            var keyB = b.date;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        return arr;
    },
    getFirstDate:function(){
        var id = this._id;
        return project.find({_id:id});
    },
    sortPopular: function(){
        var catID = Session.get('catId');
        var arr_id = [];
        var all_id = project.find({category:catID});
        all_id.forEach(function(i){
            arr_id.push(i._id);
            //console.log("Hello Lady Kaka: "+JSON.stringify(arr_id));
        });
        //console.log("array Id: "+arr_id);
        Meteor.call('mostlike',arr_id, function(err, data) {
            if (err){
                console.log(err);
            }else{
                data.sort(function(a, b){
                    var keyA = a.sum;
                    var keyB = b.sum;
                    if(keyA < keyB) return 1;
                    if(keyA > keyB) return -1;
                    return 0;
                });
                Session.set('allprojectid',data);
                //console.log("data after sort: "+JSON.stringify(data));
            }
        });
        var allprojectid = Session.get('allprojectid');
        //console.log('MYRESULT:'+JSON.stringify(allprojectid));
        return allprojectid;

    },
    getAllProList:function(){
        var id = this._id;
        return project.find({_id:id});
    },
    getallcategories:function(){
        return categories.find({});
    },
    getprojectlist: function(){
        var catID = Session.get('catId');
        var param = Session.get('param');
        if(param == ""){
            return project.find({category:catID});
        }
        if(param == "title"){
            return project.find({category:catID},{sort:{title:1}});
        }
    },
    sortGoal:function(){
        var catID = Session.get('catId');
        var param = Session.get('param');
        if(param == ""){
            return project.find({category:catID});
        }
        if(param == "goal"){
            return project.find({category:catID},{sort:{goal:-1}});
        }
    },
    getimage: function(id){
        var img = images.findOne({_id:id});
        if(img){
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
        var catId = Session.get('catId');
        return categories.find({_id:catId});
    },
    // =========== Display Project By Lastest Date ============
    getprobydate: function(){
        var catID = Session.get('catId');
        var result = project.find({category:catID}, {sort: {createdAt: -1}, limit: 1});
        return result;
    },
    // =========== Display Project By Most Donation ===========
    getprobydonate: function(){
        var catId = Session.get('catId');
        var arr = [];
        var allId = project.find({category:catId});
        allId.forEach(function(i){
            arr.push(i._id);
        });
        Meteor.call('mostdonate',arr, function(err, data) {
          if (err){
            console.log(err);
        }else{
            var max = Math.max.apply(Math,data.map(function(o){return o.sum;}));
            data.forEach(function(a){
            var abc = a.sum;
            if(abc == max){
                Session.set('proId',a._id); 
            }
           });
        }
    });
    var proId = Session.get('proId');
    var result = project.find({_id:proId});
    return result;
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
    // ============== Display Project By Most Like =================
    getprobylike: function(){
        var catId = Session.get('catId');
        var arr_id = [];
        var all_id = project.find({category:catId});
        all_id.forEach(function(i){
            arr_id.push(i._id);
        });
        Meteor.call('mostlike',arr_id, function(err, data) {
          if (err){
            console.log(err);
        }else{
            var max = Math.max.apply(Math,data.map(function(o){return o.sum;}));
            data.forEach(function(a){
            var abc = a.sum;
            if(abc == max){
                Session.set('pro_Id',a._id); 
            }
           });
        }
        });
        var pro_Id = Session.get('pro_Id');
        var result = project.find({_id:pro_Id});
        return result;
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
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
    comparePop:function(){
        var param = Session.get('param');
        if(param == "status"){
            return true;
        }else{
            return false;
        }
    },
    compareDate:function(){
        var param = Session.get('param');
        if(param == "datemax"){
            return true;
        }else{
            return false;
        }
    },
    compareTitle:function(){
        var param = Session.get('param');
        if(param == "title"){
            return true;
        }else{
            return false;
        }
    },
    compareGoal:function(){
        var param = Session.get('param');
        if(param == "goal"){
            return true;
        }else{
            return false;
        }
    }
});
Session.setDefault('param','title');
Template.project.events({
    'click #basic':function(e){
        e.preventDefault();
        Session.set('param','title');
    },
    'click #funding':function(e){
        e.preventDefault();
        Session.set('param','goal');
    },
    'click #end_date':function(e){
        e.preventDefault();
        Session.set('param','datemax');
    },
    'click #popular':function(e){
        e.preventDefault();
        Session.set('param','status');
    },
    'click .eachCat':function(e){
        e.preventDefault();
        Session.set('catId',this._id);
        var eId = this._id;
        var elementClass = '.eachCat_'+ eId;
        $(elementClass).addClass('btn-info').siblings().removeClass('btn-info');
    },
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