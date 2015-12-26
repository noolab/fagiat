Meteor.methods({
    addreward: function (money,description,month,year,delivery,stock,proId) {
        var userId = Meteor.userId();
        var attributes = {
            money: money,
            description: description,
            month: month,
            year: year,
            delivery:delivery,
            stock:stock,
            proId:proId,
            userId:userId
        };
        return reward.insert(attributes);
    },
    removereward:function(id){
        return reward.remove({_id:id});
    }
 });