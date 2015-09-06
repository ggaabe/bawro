Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

if(Meteor.isClient){
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.layout.rendered = function () {
   Deps.autorun(function () {
   var self = this;
   thisCampaign = Session.get('campaign');
 })}

Template.borrow.helpers({
    availableToBorrow: function (){
      return availableItems.find({});
    }
});

Template.item.helpers({
image: function () {
  console.log(this);
  return Images.findOne(this.photo._id); // Where Images is an FS.Collection instance
}
});

Template.item.events({
  "click #borrow": function(event, template){
    var itemToUpdate = template.data._id;
    availableItems.update({_id:itemToUpdate}, {$set:{
      available: false;
      borrower: Meteor.userId()
    }});


  }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('/');
    }
})

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
    }
});

Template.lend.events({
    'submit form': function(event, template){
        event.preventDefault();
      console.log("TEST");
        //var name = event.target.xyz.value;
        console.log(name);

        var name = $('#name').val();
        //var daysAvailable = $('#daysAvailable').val();
        var file = $('#file').get(0).files[0];
        var imageObject = Images.insert(file);

         availableItems.insert({
          name: name,
          loanTime: template.find("#number").value,
          borrower: null,
          photo: imageObject,
          quantity: 1,
          available: true,
          owner: Meteor.user().username,
          userID: Meteor.userId(),
          itemID: availableItems.find().count()
          //daysAvailable: daysAvailable
        });

            console.log(name);
            console.log(template.find("#number").value);
            return false;

    }
});

/*Template.lend.events({
'change .imageInput': function(event, template) {

}
});*/

Template.layout.events({
  'submit .new-task': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();




  }
})
/*Template.layout.events({
     'click .logout': function(event){
       event.preventDefault();
       console.log("Running event");
       Meteor.logout(function() {
         Router.go('/login');
});
      }
  })
*/

}


if(Meteor.isServer){
    Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
}


availableItems = new Mongo.Collection("items");
