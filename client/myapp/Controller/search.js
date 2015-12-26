Template.header.events({
    'keyup .text': function (){
        var txt = $('.text').val();
        if(txt) {
            Router.go('/search');
        } else {
            var mysearch = Session.get('mycurrent');
            console.log('MYSEARCH:'+mysearch);
            Router.go(mysearch);
        } 
    },
    'focus .text':function(){
        //alert('hello');
        var currentpath = Iron.Location.get().path;
        Session.set('mycurrent',currentpath);
        //alert(currentpath);
    }
});
Template.searchBox.helpers({
    remainday:function(createdAt){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();
        var createdDate = createdAt;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - createdDate.getTime())/(oneDay)));
        console.log("date: "+ diffDays);
        return diffDays;
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
        if (desc.length > 50) {
            var truncated = desc.trim().substring(0, 50).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    shortTitle: function(title){
        var desc = title;
        if (desc.length > 20) {
            var truncated = desc.trim().substring(0, 20).split(" ").slice(0, -1).join(" ") + "…";
            return truncated;
        }else{
            var truncated = desc.trim().substring(0, desc.length);
            return truncated;
        }
    },
    getUser:function(ownerId){
        return Meteor.users.find({_id:ownerId});
    },
    getcat:function(){
        var catId = this.category;
        return categories.find({_id:catId});
    },
    // ======== count like =========//
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
    }
});