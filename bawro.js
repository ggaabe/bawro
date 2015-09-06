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
    'submit form': function(event, template){
        event.preventDefault();
      console.log("TEST");
        //var name = event.target.xyz.value;
        console.log(name);

        var name = $('#name').val();
        //var daysAvailable = $('#daysAvailable').val();

        var file = template.find('input type=["file"]').files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
      // Add it to your model
        model.update(id, { $set: { src: e.target.result }});

      // Update an image on the page with the data
      $(template.find('img')).attr('src', e.target.result);
    }
    reader.readAsDataURL(file);

         availableItems.insert({
          name: name,
          loanTime: template.find("#number").value,
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

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});
availableItems = new Mongo.Collection("items");
