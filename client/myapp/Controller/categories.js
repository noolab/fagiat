Template.categories.helpers({
    getcatname:function(){
        var result = categories.find({});
        var arr = [];
        var count = 0;
        result.forEach(function(i){
        	count += 1;
        	var obj = {
        		"_id":i._id,
        		"name":i.name,
        		'count':count
        	}
        	arr.push(obj);
        });
         console.log("array obj: "+JSON.stringify(arr));
        return arr.slice(0,8);
    },
    getCateg:function(){
    	var result = categories.find({});
        var arr = [];
        var count = 0;
        result.forEach(function(i){
        	count += 1;
        	var obj = {
        		"_id":i._id,
        		"name":i.name,
        		'count':count
        	}
        	arr.push(obj);
        });
        // console.log("array obj: "+JSON.stringify(arr));
        return arr.slice(8,15);
    }
});
Template.categories.events({
	'click li a.cat':function(e){
		e.preventDefault();
		var id = this._id;
		var obj = {
			"_id":id,
			"name":this.name,
			"count":this.count
		}
		Session.set('categoryName',obj);
		Session.set('mycurrent',"");
		Router.go('/addproject1');
	}
});