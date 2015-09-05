//console.log("RUNNING");
Router.configure({
layoutTemplate: 'layout'
});
Router.route('/', {name: ''});
Router.route('/borrow', {name: 'borrow'});
Router.route('/register', {name: 'register'});
Router.route('/login', {name: 'login'})
