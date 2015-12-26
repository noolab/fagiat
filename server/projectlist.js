Meteor.methods({
    addprojectlist: function (name,projectId,catId) {
      var ownerId = Meteor.userId();
      var attributes = {
        name: name,
        projectId:projectId,
        catId:catId,
        createdAt: new Date(),
        ownerId:ownerId
      };
      return projectlist.insert(attributes);
    }
  });