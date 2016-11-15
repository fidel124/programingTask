(function(){ 
	app.controller('HomeController', function($scope, $http){
		$scope.currentPage = 1;
		$scope.pageSize = 10;		

		$scope.search= function(lookUpdata){ 
		var data_tobe_searched = lookUpdata.replace(/ /g,'');// remove white space		
		if(data_tobe_searched !== ""){
			$http({
				method:'GET',
				url:'https://api.github.com/repos/'+data_tobe_searched})
			.then(function(result){
				$scope.reponame = "";								
				$scope.searchData = result.data;
				display(result.data);
				$scope.hideme = true; // to hide the welcome panel.								
				if(result.data){
					$http.get("https://api.github.com/repos/"+data_tobe_searched+"/issues")
					.success(function(issues){
						$scope.issues = issues;												
					})									
				}				
			}, function(reason){ // for error response
				$scope.reponame = "";
				console.log(reason.statusText);								
			});			
		}		
	}	

 	function display(response){ 			
    	$scope.chart = c3.generate({ //start of first graph
    		bindto: '#chart',        
        	data: {
        		columns: [
           	 		['forks', response.forks_count],
           	 		['watchers', response.watchers_count],
           	 		['stargazer', response.stargazers_count],
           	 		['issues', response.open_issues],
           	 		['subscribers', response.subscribers_count]
        		],
        	type : 'donut'
    		},
    		donut: {
        		title: "Data visualisation"
    		}
    	});// end of first graph
  	}

	});

	app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
})();