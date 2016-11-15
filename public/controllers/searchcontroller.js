(function(){ 
	app.controller('SearchController', function($scope, $http){
		$scope.currentPage = 1;
		$scope.pageSize = 4;
		$scope.checknow = function(reponame){
			var betterName = reponame.replace(/ /g,'');
			if(betterName !== ""){
				$http.get("https://api.github.com/search/repositories?q="+betterName)				
					.success(function(result){
						$scope.loginname = "";
						$scope.hideme = true;
						$scope.users = result.items;																		
					})
			}
		}		
	});

	app.filter('startCount', function() {
    	return function(input, start) {
        	if (!input || !input.length) { return; }
        		start = +start; //parse to int
        	return input.slice(start);
    	}
	});
})();