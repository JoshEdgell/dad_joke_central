const app = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;

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

  // Create 10 jokes
  this.createTen = function(){
    for (let i = 0; i < 10; i++){
      this.createJoke(i);
    }
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
    console.log(this.newUser);
    console.log('create user button clicked');
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
    }, function(error){
      console.log(error, 'error from this.getAllUsers');
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

  // this.getAllUsers();
  // this.createTen();
  // this.countJokes();
  // this.getRandomJoke();
  // this.getAllJokes();
}])
