Template.test.helpers({
	gettest:function(){
		//return categories.find({});
		//return categories.find({},{sort:{name:1}},{skip:3,limit:5}).fetch();
		var select = Session.get('myclick');
		var num = "";
		if(select == "first"){num=1}
		if(select == "second"){	num=2}
		if(select=="third"){num=3}
		var items = categories.find({}, {sort: {name: 1}}).fetch();
  		return items.slice(0,num);
	},
	getmax: function(){
	    var itemNames = project.find({}, {fields: {title: 1}}).map( 
	       function( item ) { return item.title; }
	    );
	    var itemsMostVotes = _.uniq( itemNames ).map( 
	       	function( item2 ) {
	         	return project.findOne({title: item2}, {sort: {goal: -1}});
	       	}
	    );
	    //return itemsMostVotes;
   }
});
Template.test.events({
	'click #first':function(e){
		e.preventDefault();
		Session.set('myclick','first')
		//Session.set('myclick',undefined);
	},
	'click #second':function(e){
		e.preventDefault();
		Session.set('myclick','second');
	},
	'click #third':function(e){
		e.preventDefault();
		Session.set('myclick','third')
	},
	'click #alert':function(){
		//alert('welcome');
		sAlert.info ('Your message');
		//sAlert.info('Boom! <br> Something went wrong!', {effect: 'your-effect-name-here', html: true,position: 'bottom-right'});
		sAlert.close(alertId);
	}
});