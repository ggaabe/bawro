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
    'submit .new-item': function(event){
        event.preventDefault();

        //var name = event.target.text.value;
        var name = $('#name').val();
        var daysAvailable = $('#daysAvailable').val();

        availableItems.insert({
          name: name
          //daysAvailable: daysAvailable
        });

            console.log(name);
            console.log(daysAvailable);
    }
});

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

availableItems = new Mongo.Collection("items");
