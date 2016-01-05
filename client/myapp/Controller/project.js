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
Template.addproject1.helpers({
    getOneCatName:function(){
        var obj = Session.get('categoryName');
        return obj.name;
    },
    getselect:function(){
        //var catId = this.name;
        var catId = $('#getid').val();
        console.log('SelectId:' +catId);
        Session.set('getcatname',catId);
    },
    getcatname:function(){
        var result = categories.find({});
        return result;
    },
    getImage: function(){
        var id = this.imgId;
        //console.log('MyimageId:' + id);
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    gettags:function(){
        var current = Session.get('mycat');
        return tags.find({catId:current});
    },
    count:function(){
        var obj = Session.get('categoryName');
        return obj.count;
    }
});
Template.addproject1.events({
    'click #insert':function(e){
        e.preventDefault();
        var title = $('#title').val();
        var image = Session.get('ADDIMAGEID');
        var description = $('#description').val();
        var location = $('#location').val();
        var category = Session.get('categoryName');
        var datemax = $('#datemax').val();
        var goal = $('#amount').val();
        var userId = Meteor.userId();
        var alltags=Session.get('tags');
        alltags=alltags.split(';');
        var letters = /^[A-Za-z]+$/; 
        jsonToSend=[];
        if(alltags!= null){
            for(var i=0;i<alltags.length;i++){
                var current=alltags[i];
                if(current!='null' && current!='')
                    jsonToSend.push(current);
            }
        }
        if(!userId){
            alert("Error!! Please login first!");
        }else{
            if(title != ""){
                 if(description != ""){
                    if(location != ""){
                        if(datemax != ""){
                            if(goal != "" && goal != letters){
                                Meteor.call('addstartproject',title,image,description,location,category._id,datemax,goal,jsonToSend,function(error,proId){
                                    if(error){
                                        console.log('Insert Problem!!!');
                                    }
                                    else{
                                        Session.setPersistent('myprojectId',proId);
                                        Router.go('/addreward');
                                    }
                                });
                            }else{
                                $('#amount').focus();
                                $('.fun').text('required').css('color','red');
                                return false;
                            }
                            
                        }else{
                            $('#datemax').focus();
                            $('.date').text('required').css('color','red');
                            return false;
                        }

                    }else{
                        $('#location').focus();
                        $('.locate').text('required').css('color','red');
                        return false;
                    }
                        
                }else{
                    $('#description').focus();
                    $('.descript').text('required').css('color','red');
                    return false;
                }
            }else{
                $('#title').focus();
                $('.pro').text('required').css('color','red');
                return false;
            }

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
    },
    'change #categories':function(e){
        e.preventDefault();
        var val = $('#categories').val();
        Session.set('mycat',val);
        //alert('helo'+val);
    },
    'change #tags':function(e){
        e.preventDefault();
        var current = Session.get()
        var value = $('#tags').val();
        var listTags=Session.get("mytags")+value+";";
        //Session.set('mytags', undefined)
        Session.set("mytags", listTags);
        console.log('tag:'+Session.get("mytags"));
        //alert('Mytags'+tags);
    },
    'click #removetags':function(e){
        e.preventDefault();
        var id = this._id;
        return tags.remove({_id:id});
    }
});
// ========================= PROJECT LIST ============================== //

Session.setDefault('param','');
Template.projectlist.helpers({
    getprojectlist: function(){
        var param = Session.get('param');
        if(param == ""){
            return project.find({status:1});
        }
        if(param == "title"){
            return project.find({status:1},{sort:{title:1}});
        }
        if(param == "goal"){
            return project.find({status:1},{sort:{goal:-1}});
        }
        if(param == "datemax"){
            return project.find({status:1},{sort:{datemax:1}});
        }
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
    }
});
Template.projectlist.events({
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
    }
});

Template.addproject1.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

// ========================== PROJECT DETAILS ===========================//
Template.projectdetail.helpers({
    remainday:function(createdAt){
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var currentDate = new Date();
  var createdDate = createdAt;
  var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
  console.log("date: "+ diffDays);
  return diffDays;
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
    owner:function(ownerId){
        var user = Meteor.users.find({_id:ownerId});
        //return user.profile.username;
        return user;
    },
    getAvata:function(avatar){
        var img = images.findOne({_id:avatar});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    news:function(){
         var info = Session.get('info');
         var proId = this._id;
         if(info == "news"){
            return news.find({projectId:proId});   
         }   
    },
    getcomment:function(){
        var com = Session.get('info');
        var proId = this._id;
        if(com == "comment"){
            return project.find({_id:proId});
        }
    },
     presentation:function(){
         var info = Session.get('info');
        var proId = this._id;
         if(info == "presentation"){
            return project.find({_id:proId});   
         }  
    },
    getNewsImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getstatus:function(){
        var projectId = this._id;
        var status = 0;
        var result = like.find({projectId:projectId,userId:Meteor.userId()});
        result.forEach(function(transaction){
            status = transaction.status;
        });
        if(status == 1){
            return "";
    }else{
            return "-empty";
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
    countContributors:function(){
        var proId = this.proId;
        var rewardId = this._id;
        var result = donations.find({projectId:proId,rewardId:rewardId}).count(); 
        return result;
    },
    reward:function(projectId){
        return reward.find({proId:projectId});
    },
    countnews:function(){
        var id = this._id;
        var numnews = news.find({projectId:id}).count();
        if(numnews==''){
            return '0';
        }else{return numnews}
    },
    getprotag:function(){
        var arrtags=[];
        var tagId = this.tags;
        console.log('echo:'+typeof(tagId));
       for(var i=0;i<tagId.length;i++){
            var tagname=tags.findOne({_id:tagId[i]});
            arrtags.push(tagname);
       }
       return arrtags;   
    },
    numDonator:function(){
        return donations.find({projectId:this._id}).count();
    },
    getcountries:function(){
        return countries.find({});
    }

});
Session.setDefault('info',"presentation");
Template.projectdetail.events({
    "change #countries":function(){
        var conId = $("#countries").val();
        alert(conId);
    },
    'click .btn-news':function(e){
    e.preventDefault();
    $(".btn-news").addClass("btn-info"); 
    $(".btn-comment").removeClass("btn-info"); 
    $(".btn-presentation").removeClass("btn-info"); 
    $(".btn-presentation").addClass("btn-black"); 
    Session.set('info',"news");
    },
    'click .btn-comment':function(e){
    e.preventDefault();
    $(".btn-comment").addClass("btn-info"); 
    $(".btn-presentation").removeClass("btn-info"); 
    $(".btn-news").removeClass("btn-info"); 
    $(".btn-presentation").addClass("btn-black"); 
        Session.set('info','comment');
    },
    'click .btn-presentation':function(e){
         e.preventDefault();
    $(".btn-presentation").addClass("btn-info"); 
    $(".btn-comment").removeClass("btn-info"); 
    $(".btn-news").removeClass("btn-info");  
        Session.set('info',"presentation");
    },
    'click .glyphicon-heart-empty':function(e){
        e.preventDefault();
        var projectId = this._id;
        var userId = Meteor.userId();
        var status = 0;
        if(!Meteor.userId()) {
            sAlert.error('Please login');
        } 
        else{
            status = 1;
            $(".likeUnlike").removeClass("glyphicon-heart-empty");
            $(".likeUnlike").addClass("glyphicon-heart");
            Meteor.call('insertlike',projectId,status);   
        }
    },
    'click .glyphicon-heart':function(e){
        e.preventDefault();
        var projectId = this._id;
        if(!Meteor.userId()) {
            Router.go('signin');
        } 
        else{
            $(".likeUnlike").removeClass("glyphicon-heart");
            $(".likeUnlike").addClass("glyphicon-heart-empty");
            Meteor.call('removelike', projectId);
        }
    },
    'click .rewardClass':function(){
        var rewardId = this._id;
        var proId = this.proId;
        Session.set('startdo',proId);
        Session.set('mycurrent',"");
        Session.set('selectedReward',rewardId);
        Router.go('/startdonate');
    },
    'click .start_donate':function(e){
        e.preventDefault();
        Session.set('startdo',this._id);
        Session.set('mycurrent',"");
        Router.go('/startdonate');
    },
    'keyup input[name=price]': function(){
        var iden = "#price_"+this._id;
        var cost = Number($(iden).val());
        var money = this.money;
        var donatebutton = ".btn-donate_"+this._id;
        //alert(cost);
        if(cost < money){
            $(iden).css("border","2px solid red");
            $(donatebutton).css("display","none");
        }else if(cost >= money){ 
            $(iden).css("border","1px solid green");
            $(donatebutton).css("display","block");
        }
    },
    'click div[name=flipre]':function(){
        var iden = "#flipB_"+this._id;
        var val = $(iden).val();
        if(iden){
            $(".panelB_"+this._id).slideToggle("slow");
        }
    },
    'click #paydonate':function(){
        var iden = ".donate_"+this._id;
        var user = Meteor.userId();
        if(!user){
            var reward = "#reward_"+this._id;
            var rewardId = $(reward).val();
            Session.set('myrewardId',rewardId);
            /*var pro = "#proId_"+this._id;
            var proId = $(pro).val();
            Session.set('myproId',proId);*/
            var allamount = "#price_"+this._id;
            var amount = Number($(allamount).val());
            Session.set('mypayment',amount);
            Router.go('login');
        }
        else{
            if(iden){
                var reward = "#reward_"+this._id;
                var rewardId = $(reward).val();
                Session.set('myrewardId',rewardId);
                var pro = "#proId_"+this._id;
                var proId = $(pro).val();
                Session.set('myproId',proId);
                var allamount = "#price_"+this._id;
                var amount = Number($(allamount).val());
                Session.set('mypayment',amount);
                Router.go('payment');
            }
        }
    }
});

//========================== MANAGE MEMBER PROJECT ===================//
Template.popular.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    sortPopular: function(){
        var temp = Session.get('param');
        var arr_id = [];
        var user = Meteor.userId();
        var all_id = project.find({ownerId:user});
        all_id.forEach(function(i){
            arr_id.push(i._id);
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
        if (desc.length >70) {
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
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
    totalLike:function(){
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    }
});
Session.setDefault('template','news');
Template.newspro.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    sortNews:function(){
        var user = Meteor.userId();
        var temp = Session.get('param');
        d = project.find({ownerId:user});
        var arr = [];
        d.forEach(function(item){
            var date = new Date(item.datemax);
            var diffDaysCur = Math.round(Math.abs((date.getTime())));
            var obj = {
                "_id":item._id,
                "date":diffDaysCur
            }
            arr.push(obj);
        });
        arr.sort(function(a, b){
            var keyA = a.date;
            var keyB = b.date;
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        });
        return arr;
    },
    sortedDateProjects:function(){
        return project.find({_id:this._id});
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
        if (desc.length >70) {
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
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
    totalLike:function(){
        var projectId = this._id;
        var sum = 0;
        var result = like.find({projectId:projectId});
            result.forEach(function(transaction){
            sum = sum + transaction.status;
        });
         return sum;   
    }
});
 Session.setDefault('param','datemax');
Template.myproject.events({
    'click .news':function(e){
        e.preventDefault();
        //alert('hello');
        Session.set('param','datemax');
    }, 
    'click .popular' : function(e){
        e.preventDefault();
        Session.set('param','status');
    }
});
Template.myproject.helpers({
    compareData:function(){
        var cd = Session.get('param');
        if(cd == "datemax"){
            return true;
        }else{
            return false;
        }
    }
});

//============================= List Projects By Category ====================//
Template.listprobycat.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
    },
    getprojectlist: function(){
        var catID = this._id;
        var result = project.find({category:catID});
        return result;
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
        if (desc.length >70) {
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
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    }
});
//======================== Project ===================================//
Session.set('limit',4);
Template.project.onCreated(function() {
    $(window).on('scroll', function(e) {
       if($(window).scrollTop() == $(document).height() - $(window).height()) {
            var oldLimit=Session.get('limit');
            oldLimit+=4;
            Session.set('limit',oldLimit);
        }
    });
});
Template.project.helpers({
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
            return project.find({category:catID},{limit:4});
        }
        if(param == "title"){
            return project.find({category:catID},{sort:{title:1}});
        }
    },
    moreProjects:function(){
        var catID = Session.get('catId');
        var param = Session.get('param');
        if(param == ""){
            var items = project.find({category:catID},{limit:Session.get('limit')}).fetch();
            if(items.length>0)
                return items.slice(4,items.length);
            else
                return null;
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
    },
    compare:function(){
        var param = Session.get('param');
        if(param == ""){
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

// ======================= lists of project donated ====================
Template.projectdonated.helpers({ 
    'getProjectDonated':function(){
        var projects =  project.find({ownerId:Meteor.userId()});
        return projects;
    },
     remainday:function(createdAt){
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var currentDate = new Date();
      var createdDate = createdAt;
      var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
      console.log("date: "+ diffDays);
      return diffDays;
     },
      getImage: function(id){
        var img = images.findOne({_id:id});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
     },
    getstatus:function(){
        var projectId = this._id;
        var status = 0;
        var result = like.find({projectId:projectId,userId:Meteor.userId()});
        result.forEach(function(transaction){
            status = transaction.status;
        });
        if(status == 1){
            return "";
    }else{
            return "-empty";
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
    total:function(projectId){
            var sum = 0;
            var result = donations.find({projectId:projectId});
                result.forEach(function(transaction){
                sum = sum + transaction.cost;
            });
             return sum;   
    },
    countContributors:function(){
        var proId = this._id;
        var result = donations.find({projectId:proId}).count(); 
        return result;
     },
    listdonated:function(){
        var proId = this._id;
        return _.uniq(donations.find({projectId:proId},{sort:{cost: -1}}).fetch(),true,function(d){return d.cost});
    },
    categoryName:function(){
        var catId = this.category;
        var result = categories.findOne({_id:catId});
        return result.name;
    },
    countcontributed:function(){
        return donations.find({cost:this.cost}).count();
    }
});