const app = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/';
  this.getAllJokes = function(){
    $http({
      method: 'GET',
      url: this.url + 'jokes',
    }).then(
      function(res){
        console.log(res.data, 'response from this.getAllJokes');
      }, function(err){
        console.log(err, 'error from this.getAllJokes');
      })
  };
  this.getAllJokes();
}])
