const app               = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.showLoginForm = true;
  this.userLoggedIn = false;
  this.currentJoke = {};
  this.loggedUser = {};
  this.allUsers = [];

  // Get all jokes from my API
  this.getAllJokes = function(){
    $http({
      method: 'GET',
      url: '/jokes'
    }).then(
      function(res){
        console.log(res.data, 'response from this.getAllJokes');
      }, function(error){
        console.log(error, 'error from this.getAllJokes');
      })
  };

  // Get a count of jokes in my API
  this.countJokes = function(){
    $http({
      method: 'GET',
      url: '/jokes/count'
    }).then(function(res){
      console.log(res.data, 'response from this.countJokes');
    }, function(error){
      console.log(error, 'error from this.countJokes');
    })
  };

  //Get a count of all the jokes on the dad joke API
  this.countAPI = function(){
    $http({
      method: 'get',
      url: 'https://icanhazdadjoke.com/search',
      headers: {'Accept':'application/json'}
    }).then(
      function(response){
        console.log(res.data.total_jokes, 'response from this.countAPI');
      }, function (error){
        console.log(error, 'error from this.countAPI');
      }
    )
  };

  // Get a random joke from my API
  this.getRandomJoke = function(){
    $http({
      method: 'GET',
      url: '/jokes/random'
    }).then(function(res){
      console.log(res.data, 'response from this.getRandomJoke');
    }, function(error){
      console.log(error, 'error from this.getRandomJoke');
    })
  };

  // Get a random joke from the dad joke API
  this.getRandomExternal = function(){
    $http({
      method: 'GET',
      url: 'https://icanhazdadjoke.com/',
      headers: { 'Accept':'application/json'}
    }).then(function(res){
      console.log(res.data, 'response from this.getRandomExternal')
      controller.currentJoke = res.data;
    }, function(error){
      console.log(error, 'error from this.getRandomExternal')
    })
  };

  //Search API for dad jokes based on search term
  this.searchJokes = function(word){
    $http({
      method: 'GET',
      url: 'https://icanhazdadjoke.com/search?term=' + word,
      headers: { 'Accept':'application/json'}
    }).then(function(res){
      console.log(res.data, 'response from this.searchJokes');
    }, function(error){
      console.log(error, 'error from this.searchJokes');
    })
  };

  // Create a joke
  this.createJoke = function(num){
    $http({
      method: 'POST',
      url: '/jokes',
      data: {
        username: 'josh_edgell',
        joke: 'Joke ' + num + ' test body'
      }
    }).then(
      function(res){
        console.log(res.data, 'response from this.createJoke');
      }, function(error){
        console.log(error, 'error from this.createJoke');
      }
    )
  };

  // Get a particular joke
  this.getJoke = function(){
    $http({
      method: 'GET',
      url: '/5be9c03334cd1118074f4f0f'
    }).then(function(res){
      console.log(res.data, 'response from this.getJoke');
    }, function(error){
      console.log(error, 'error from this.getJoke');
    })
  };

  // Delete a joke
  this.deleteJoke = function(id){
    $http({
      method: 'DELETE',
      url: '/jokes/' + id
    }).then(function(res){
      console.log(res, 'response form this.deleteJoke');
    }, function(error){
      console.log(error, 'error from this.deleteJoke');
    })
  };

  // Create a user
  this.createUser = function(){
    // Use this route to check to verify that passwords match prior to sending the request.  If they don't match, pop up the error message to prompt the user for a match.  If they do match, send the $http request
    $http({
      method: 'POST',
      url: '/session',
      // data: this.newUser
      data: {
        firstName: 'Josh',
        lastName: 'Edgell',
        username: 'joshedgell',
        password: 'Tacocat1',
        password2: 'Tacocat1'
      }
    }).then(function(res){
      console.log(res.data, 'response from this.createUser');
      controller.loggedUser = res.data;
      controller.userLoggedIn = res.data.logged;
    }, function(error){
      console.log(error, 'error from this.createUser');
    })
  };

  // Get all users
  this.getAllUsers = function(){
    $http({
      method: 'GET',
      url: 'session'
    }).then(function(res){
      console.log(res.data, 'response from this.getAllUsers');
      controller.allUsers = res.data;
    }, function(error){
      console.log(error, 'error from this.getAllUsers');
    })
  };

  //Get a specific user
  this.getUser = function(id){
    $http({
      method: 'GET',
      url: 'session/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.getUser');
    }, function(error){
      console.log(error, 'error from this.getUser')
    })
  };

  // Delete a user
  this.deleteUser = function(id){
    $http({
      method: 'DELETE',
      url: 'session/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.deleteUser');
      controller.getAllUsers();
    }, function(error){
      console.log(error, 'error from this.deleteUser');
    })
  };

  // Log in a user
  this.login = function(){
    this.showLoginForm = false;
    $http({
      method: 'POST',
      url: 'session/login',
      // data: this.loginInfo,
      data: {
        username: 'joshedgell',
        password: 'Tacocat1'
      }
    }).then(function(res){
      if (res.status === 200) {
        console.log(res, 'response from this.login')
        console.log('user logged in');
      }
      // console.log(res, 'response from this.login');
    }, function(error){
      // 401 - incorrect password
      // 404 - user not found
      console.log(error, 'error from this.login');
    })
  };

  this.logout = function(){
    $http({
      method: 'GET',
      url: 'session/logout',
    }).then(function(res){
      console.log(res.data, 'response from this.logout');
    }, function(error){
      console.log(error, 'error from this.logout');
    })
  };

  this.displayUser = function(id) {
    console.log(id, 'input for this.displayUser')
  };

  this.getRandomExternal();
  this.getAllUsers();
}]);
