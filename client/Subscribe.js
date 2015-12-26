Meteor.subscribe("roles");

Meteor.subscribe('users');
Meteor.subscribe('categories');
Meteor.subscribe("images");
Meteor.subscribe("news");
Meteor.subscribe("reward");
Meteor.subscribe("donations");
Meteor.subscribe("like");
Meteor.subscribe("tags");
Meteor.subscribe("message");
Meteor.subscribe("projectlist");
Meteor.subscribe('project');
Meteor.subscribe('countries');
// Tracker.autorun(function () {
//      Meteor.subscribe("project",Session.get('project'));
//      //Meteor.subscribe("project",-1);
//      //
// });
