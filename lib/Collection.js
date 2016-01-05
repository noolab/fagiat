project = new Mongo.Collection('project');
categories = new Mongo.Collection('categories');
tags = new Mongo.Collection('tags');
news = new Mongo.Collection('news');
images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "G:/Djibril_project/fagiat/public/upload"})]
});
project.initEasySearch('title');
reward = new Mongo.Collection('reward');
like = new Mongo.Collection("like");
message = new Mongo.Collection('message');
donations = new Mongo.Collection("donations");
projectlist = new Mongo.Collection("projectlist");
countries = new Mongo.Collection("countries");

