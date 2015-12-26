Meteor.methods({
    addAboutProj: function (proId,name,image,biograph,location,site,aboutPro,risk,fb,video) {
      var about = {
        name: name,
        image: image,
        biography: biograph,
        location: location,
        sites: site,
        aboutProj: aboutPro,
        risk: risk,
        fb: fb,
        video:video
      };
      return project.update({_id:proId},{$addToSet:{about}});
    }
  });
