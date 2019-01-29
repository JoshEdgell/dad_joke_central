const app               = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.showLoginForm = true;
  this.loginFail = false;
  this.userLoggedIn = false;
  this.invalidUsername = false;
  this.targetMatchesLogged = false;
  this.currentJoke = {};
  this.loggedUser = {};
  this.allUsers = [];
  this.targetUser = {};
  this.validPassword = {
    min: false,
    max: false,
    digit: false,
    capital: false,
    spaces: true,
    criteria: 1
  };
  this.passwordFail = {
    min: false,
    max: false,
    digit: false,
    capital: false,
    spaces: false
  };

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
  this.getRandomInternal = function(){
    $http({
      method: 'GET',
      url: '/jokes/random'
    }).then(function(res){
      console.log(res.data, 'response from this.getRandomInternal');
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
      // Is it possible to check the id of the joke against the ids of the jokes in the loggedUser's favorited jokes to change the class of the star appearing after the joke?
      // console.log(res.data, 'response from this.getRandomExternal')
      controller.currentJoke = res.data;
      // the api_id key of a joke is used for a common id system to put on a joke before getting a Mongo ID on the backend.
      controller.currentJoke.api_id = res.data.id;
      // console.log(controller.currentJoke, 'currentJoke')
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
      // Is it possible to check the ids of the jokes against the ids of the jokes in the loggedUser's favorited jokes to change the class of the star appearing after each joke?
      // To do this, it may be necessary to give each joke an id of the joke._id to find the target joke and apply the class change
      console.log(res.data, 'response from this.searchJokes');
    }, function(error){
      console.log(error, 'error from this.searchJokes');
    })
  };

  // After several of the joke operations call for the same 5/6 lines of code after the response.  Consider putting those lines into a method to run after joke CRUD/favorites

  // Create a joke
  this.createJoke = function(){
    console.log(this.loggedUser, 'logged user')
    $http({
      method: 'POST',
      url: '/jokes/' + this.loggedUser._id,
      data: {
        joke: this.createJokeText,
        api_id: this.generateRandomKey(),
        username: this.loggedUser.username
      }
    }).then(
      function(res){
        controller.createJokeText = '';
        controller.getAllUsers();
        controller.loggedUser = res.data;
        controller.loggedUser.logged = true;
        if (controller.targetMatchesLogged) {
          controller.targetUser = res.data;
        }
      }, function(error){
        console.log(error, 'error from this.createJoke');
      }
    )
  };

  // Get a particular joke
  this.getJoke = function(id){
    $http({
      method: 'GET',
      url: '/jokes/' + id
    }).then(function(res){
      console.log(res.data, 'response from this.getJoke');
    }, function(error){
      console.log(error, 'error from this.getJoke');
    })
  };

  this.editJoke = function(){
    console.log(this.jokeToEdit, 'joke to edit');
    $http({
      method: 'PUT',
      url: '/jokes/' + this.jokeToEdit._id,
      data: this.jokeToEdit
    }).then(function(response){
      controller.jokeToEdit = {};
      controller.getAllUsers();
      controller.loggedUser = response.data;
      controller.loggedUser.logged = true;
      if (controller.targetMatchesLogged) {
        controller.targetUser = response.data;
      }
    }, function(error){
      console.log(error, 'error from this.editJoke');
    })
  };

  // Delete a joke
  this.deleteJoke = function(id){
    console.log(id, 'joke id to be deleted')
    $http({
      method: 'DELETE',
      url: '/jokes/' + id
    }).then(function(res){
      console.log(res, 'response form this.deleteJoke');
      controller.loggedUser = res.data,
      controller.loggedUser.logged = true;
      controller.targetUser = controller.loggedUser;
    }, function(error){
      console.log(error, 'error from this.deleteJoke');
    })
  };

  this.checkUniqueUser = function(username){
    for (let i = 0; i < this.allUsers.length; i++) {
      if (username === this.allUsers[i].username) {
        this.invalidUsername = true;
        return false;
      }
    }
    return true;
  };

  this.checkPassword = function(password) {
    if (this.newUser.password.length > 7) {
      this.validPassword.min = true;
      this.validPassword.criteria++;
    }
    if (this.newUser.password.length < 21) {
      this.validPassword.max = true;
      this.validPassword.criteria++;
    }
    for (let i = 0; i < password.length; i++) {
      if (!this.validPassword.digit) {
        if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58) {
          this.validPassword.digit = true;
          this.validPassword.criteria++;
        }
      }
      if (!this.validPassword.capital) {
        if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) {
          this.validPassword.capital = true;
          this.validPassword.criteria++;
        }
      }
      if (password.charCodeAt(i) === 32) {
          this.validPassword.spaces = false;
          this.validPassword.criteria--;
      }
    }

    // Update this.passwordFail to indicate "true" for the criteria the password fails
    this.passwordFail.min = !this.validPassword.min
    this.passwordFail.max = !this.validPassword.max
    this.passwordFail.digit = !this.validPassword.digit
    this.passwordFail.spaces = !this.validPassword.spaces
    this.passwordFail.capital = !this.validPassword.capital

    if (this.validPassword.criteria === 5) {
      return true;
    }
    return false;
  };

  // Create a user
  this.createUser = function(){
    if (this.checkPassword(this.newUser.password) === false || this.newUser.password !== this.newUser.password2 || this.checkUniqueUser(this.newUser.username) === false) {
    // If the user's password is invalid, or the username matches an existing user, the user cannot be created




    } else {
      console.log("user can be created");
      $('#createUserModal').modal('hide');
      this.invalidUsername = false;
      this.validPassword = {
        min: false,
        max: false,
        digit: false,
        capital: false,
        spaces: true,
        criteria: 1
      };
      this.passwordFail = {
        min: false,
        max: false,
        digit: false,
        capital: false,
        spaces: false
      };




      $http({
        method: 'POST',
        url: '/session',
        data: this.newUser
      }).then(function(response){
        controller.newUser = {};
        controller.loggedUser = response.data;
        controller.userLoggedIn = response.data.logged;
        controller.getAllUsers();
      }, function(error){
        console.log(error, 'error from this.createUser');
      })





    }
  };

  // Get all users
  this.getAllUsers = function(){
    $http({
      method: 'GET',
      url: 'session'
    }).then(function(res){
      // console.log(res.data, 'response from this.getAllUsers');
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
    console.log(this.loginInfo)
    this.showLoginForm = false;
    $http({
      method: 'POST',
      url: 'session/login',
      data: this.loginInfo,
    }).then(function(response){
      if (response.status === 200) {
        $('#hamburger').click();
        controller.loginInfo = {};
        controller.userLoggedIn = response.data.logged;
        controller.loggedUser = response.data;
        // console.log(response, 'response from this.login')
        // console.log(controller.loggedUser, 'user logged in');
      }
    }, function(error){
      // 401 - incorrect password
      // 404 - user not found
      controller.loginFail = true;
      console.log(error, 'error from this.login');
    })
  };

  this.logout = function(){
    $http({
      method: 'GET',
      url: 'session/logout',
    }).then(function(res){
      console.log(res.data, 'response from this.logout');
      controller.userLoggedIn = false;
    }, function(error){
      console.log(error, 'error from this.logout');
    })
  };

  this.displayUser = function(user) {
    console.log(user, 'clicked user');
    console.log(controller.loggedUser, 'logged user');
    if (user._id === this.loggedUser._id) {
      console.log('target matches logged');
      this.targetMatchesLogged = true;
    } else {
      this.targetMatchesLogged = false;
    }
    this.targetUser = user;
    // Compare loggedUser's favorite jokes against user's favorite jokes
    // If user has a joke in his array that loggedUser also has
    // Find the checkbox on the app id matches the api_id of the joke
    // Set the checked property to 'true'
    // The 0.25 second wait is to let the modal start to render
    setTimeout(()=>{
      for (let i = 0; i < this.targetUser.favoriteJokes.length; i++) {
        for (let j = 0; j < this.loggedUser.favoriteJokes.length; j++) {
          if (this.targetUser.favoriteJokes[i].api_id === this.loggedUser.favoriteJokes[j].api_id) {
            $('#' + this.targetUser.favoriteJokes[i].api_id).prop('checked', true);
          }
        }
      }
      for (let i = 0; i < this.targetUser.createdJokes.length; i++) {
        for (let j = 0; j < this.loggedUser.favoriteJokes.length; j++) {
          if (this.targetUser.createdJokes[i].api_id === this.loggedUser.favoriteJokes[j].api_id) {
            $('#' + this.targetUser.createdJokes[i].api_id).prop('checked', true);
          }
        }
      }
    }, 250);

  };

  this.favorite = function(joke){
    // Since this method receives the joke object that could be passed in either from a user's display modal or from a joke currently displayed on the main screen, this.targetJoke is defined here (it doesn't have a key in the controller) and will be used in both
    this.targetJoke = joke
    // If the user is not logged in, prompt the user to log in
    if (!this.loggedUser.logged) {
      console.log('user not logged in');

      $('.toggle').prop('checked',false);


      // This toggles the hamburger menu at the top of the page
      const hamburger = $('#hamburger');
      if (hamburger.attr('aria-expanded') === 'false') {
        hamburger.click();
      }
    } else {
      console.log('user logged in');
      // If the joke is not in the array, pass the joke id into the addJokeToFavorites method
      // Else, pass the joke id into the removeJokeFromFavorites method
      if (this.checkJokeAgainstUsersFavorites(this.targetJoke.api_id)) {
        console.log('the joke is going to be removed from favorites')
        this.removeJokeFromFavorites();
      } else {
        console.log('the joke will be added to favorites')
        this.addJokeToFavorites();
      }
    }
  };

  this.addJokeToFavorites = function(){
    this.loggedUser.favoriteJokes.push(this.targetJoke);
    $http({
      url: 'session/edit/' + this.loggedUser._id,
      method: 'PUT',
      data: this.loggedUser
    }).then(function(response){
      console.log(response, 'response from adding favorite')
      controller.getAllUsers();
      controller.loggedUser = response.data;
      controller.loggedUser.logged = true;
      // if (controller.targetMatchesLogged) {
      //   controller.targetUser = response.data;
      // }


      // const $newDiv = $('<div/>').addClass('favoriteAdd').append($('<p/>').text('Favorited!'));
      // $('.' + controller.targetJoke.api_id).removeClass('far').addClass('fas').append($newDiv);
      // setTimeout(()=>{
      //   $('.favoriteAdd').remove();
      // },1000);


    }, function(error){
      console.log(error, 'error from this.addJokeToFavorites');
    })
  };

  this.removeJokeFromFavorites = function(){

    for (let i = 0; i < this.loggedUser.favoriteJokes.length; i++) {
      if (this.targetJoke.api_id === this.loggedUser.favoriteJokes[i].api_id) {
        this.loggedUser.favoriteJokes.splice(i,1);
        controller.targetUser.favoriteJokes.splice(i,1);
        i--;
      }
    };
    // if (this.targetMatchesLogged) {
    //   $http({
    //     url: '/session/edit' + this.loggedUser._id,
    //     method: 'PUT',
    //     data: this.loggedUser
    //   }).then(function(response){
    //     controller.getAllUsers();
    //     controller
    //   }, function(error){
    //     console.log('error trying to remove joke from favorites')
    //   })
    // } else {
      $http({
        url: 'session/edit/' + this.loggedUser._id,
        method: 'PUT',
        data: this.loggedUser
      }).then(function(response){
        controller.getAllUsers();
        controller.loggedUser = response.data;
        controller.loggedUser.logged = true;
        // if (controller.targetMatchesLogged) {
        //   controller.targetUser = res.data;
        // }
      }, function(error){
        console.log(error, 'error from trying to remove joke from user favorites')
      });
    // }


  };

  this.checkJokeAgainstUsersFavorites = function(id){
    for (let i = 0; i < this.loggedUser.favoriteJokes.length; i++) {
      if (id === this.loggedUser.favoriteJokes[i].api_id) {
        return true;
      }
    }
    return false;
  };

  this.generateRandomKey = function(){
    // Generate a random, 11-digit key to assign to a joke when a user creates one
    let string = '';
    while (string.length < 11) {
      let number = Math.floor(Math.random() * 75 + 48);
      if ( !(57 < number && number < 65) && !(90 < number && number < 97) ) {
        string += String.fromCharCode(number);
      }
    }
    return string;
  };

  this.getRandomExternal();
  this.getAllUsers();
}]);
