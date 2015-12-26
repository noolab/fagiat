Meteor.methods({
    addstartproject: function (title,image,description,location,category,datemax,goal,jsonToSend) {
      var ownerId = Meteor.userId();
      var attributes = {
        title: title,
        image: image,
        description: description,
        location:location,
        category:category,
        createdAt: new Date(),
        ownerId:ownerId,
        status: 0,
        datemax: datemax,
        goal: Number(goal),
        tags:jsonToSend
      };
      return project.insert(attributes);
    },
    updateproject: function(id,title,image,description,location,category,datemax,goal) {
      var ownerId = Meteor.userId();
      var attr = {
        title:title,
        image:image,
        description:description,
        location:location,
        category:category,
        createdAt: new Date(),
        datemax:datemax,
        goal:goal,
        ownerId:ownerId
      }
      project.update({_id:id},{$set: attr});
    },
    editstartproject:function(email,phone){
      var attr = {
        contact:
          {
            email:email,
            phone:phone
          }
        
      }
      return project.update({_id:'eocJxEpNKdsyMTLas'},{$addToSet:attr});
    },
    removeproject:function(id){
      return project.remove({_id:id});
    },
     disable:function(id){
      var ds = 1;
      attr = {
        status:ds
      } 
      return project.update({_id:id},{$set:attr});
    },
    enable:function(id){
      var en = 0;
      attr = {
        status:en
      }
      return project.update({_id:id},{$set:attr});
    },
    mostdonate:function(arr){
      var data = [
          { $match: { projectId: { $in: arr } } },
          { $group: {
              _id: '$projectId',
              sum: { $sum: '$cost'}
          }}
        ];
    var result = donations.aggregate(data);
      return result;
    },
    mostlike:function(arr){
      var data = [
          { $match: { projectId: {$in: arr } } },
          { $group: {
              _id: '$projectId',
              sum: { $sum: '$status'}
          }}
        ];
    var result = like.aggregate(data);
      return result;
    }

 });