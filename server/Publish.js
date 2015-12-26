Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});
// Meteor.publish("project", function () {
//     return project.find();
//  });
Meteor.publish("users", function () {
    return Meteor.users.find({});
 });
Meteor.publish("categories", function () {
    return categories.find({});
 });
Meteor.publish('images', function (){ 
  return images.find({})
});
Meteor.publish("news", function () {
    return news.find({});
 });
Meteor.publish("reward", function () {
    return reward.find({});
 });
Meteor.publish("like", function () {
    return like.find({});
 });
Meteor.publish("donations", function () {
    return donations.find({});
 });
Meteor.publish("tags", function () {
    return tags.find({});
 });
Meteor.publish("message", function () {
    return message.find({});
 });
Meteor.publish("projectlist", function () {
    return projectlist.find({});
 });
Meteor.publish("project", function () {
    return project.find();
});
Meteor.publish("limitproject", function (limit) {
  return project.find({}, {limit: limit});
});
Meteor.publish("countries", function () {
    return countries.find();
});

