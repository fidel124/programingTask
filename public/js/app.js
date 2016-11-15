var app = angular.module('testApp', ["ngRoute","ui.bootstrap"]);

   app.config(['$routeProvider', function($routeProvider){
  		  $routeProvider
  			    .when("/home", { templateUrl: "views/home.html",
                            controller: "HomeController"
  			                   })
  			    .when("/search", { templateUrl: "views/msearch.html",
                              controller: "SearchController"
  			                })              			
  			    .otherwise({ redirectTo: "/home" })
   }]);    