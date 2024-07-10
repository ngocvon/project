var app = angular.module('app', ['isteven-multi-select']);
app.controller('TodoController', TodoController);

var App = angular.module('App', ['ui.bootstrap', 'ngResource']);
App.controller('mainCtrl', ['$scope','$sce', function($scope) {
  $scope.totalItems = $scope.todos.length;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  
  $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.todos.indexOf(value);
    return (begin <= index && index < end);
  };
}]);
angular.module("CombineModule", ["app", "App"]);

function TodoController ($scope,$sce) {
	
  $scope.saved = localStorage.getItem('todos');
  $scope.todos = ($scope.saved !== null) ? JSON.parse($scope.saved) : [];
  $scope.todoGender="";
  $scope.searchTitle = '';
  
  var localSet = function() {
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };
	
  localSet();
 
	// check gender
	$scope.newValue = function(value) {
	   console.log(value);
	   $scope.todoGender = value;
	}
		
	function uniqBy(a, key) {
		var seen = {};
		return a.filter(function(item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		})
	}
	// MULTISELECT
	$scope.scopes = [];
	var policyDefs = {
		'html': {
			'enable': {'type': 'bool'},
			'disable': {'type': 'bool'}
		},
		'jquery': {
			'max_count_dpw': {'type': 'int'},
			'max_count_hotp': {'type': 'int'}
		},
		'angular': {
			'max_count_dpw': {'type': 'int'},
			'max_count_hotp': {'type': 'int'}
		}
	};
    angular.forEach(policyDefs, function (value, key) {
		$scope.scopes.push({name: key, ticked: false});
	});  
	$scope.get_pre =function(input){
        return $sce.trustAsHtml(input);
    } 
	$scope.fClick = function() {

		var resultSelect=[];
		var selected = $('.checkBoxContainer .selected');
		if(selected.length > 0){
			selected.each(function(i){
				resultSelect.push($(this).find('.acol span').html().replace(/&nbsp;/gi,'')) ;				
			});
		}
		for(var i=0;i<resultSelect.length;i++){
			//console.log(resultSelect[i]);
			$scope.todoHtml = resultSelect[0];
			$scope.todoJquery = resultSelect[1];
			$scope.todoAngular = resultSelect[2];
		}
		$scope.todonumberImg=resultSelect.length;
		
		switch(resultSelect.length) {
			case 1:
				$scope.todocolAppend = '<img class="img-skill" ng-src="images/'+$scope.todoHtml+'.png" src="images/'+$scope.todoHtml+'.png">';
				break;
			case 2:
				$scope.todocolAppend = '<img class="img-skill" ng-src="images/'+$scope.todoHtml+'.png" src="images/'+$scope.todoHtml+'.png">' + '<img class="img-skill" attr="{{"'+$scope.todoJquery+'"}}" ng-src="images/'+$scope.todoJquery+'.png" src="images/'+$scope.todoJquery+'.png">';
				
				break;
			default:
				$scope.todocolAppend = '<img class="img-skill" ng-src="images/'+$scope.todoHtml+'.png" src="images/'+$scope.todoHtml+'.png">' + '<img class="img-skill" attr="{{"'+$scope.todoJquery+'"}}" ng-src="images/'+$scope.todoJquery+'.png" src="images/'+$scope.todoJquery+'.png">'+ '<img class="img-skill" attr="{{"'+$scope.todoAngular+'"}}" ng-src="images/'+$scope.todoAngular+'.png" src="images/'+$scope.todoAngular+'.png">';
		}
	}
 
  $('.fromAdddata').click(function(){
	  $scope.todoText = ''; 
	  $scope.todoEmail = ''; 
	  $('#username').focus();
	  $(".btn-updateData").prop('disabled', true);
	  $(".btn-addData").prop('disabled', false);
  });
  $('.btn-updateData').click(function(){
	  window.location.reload();  
  })

  $scope.clearData = function(){
	 localSet();
	 $("input[type='radio']").prop('checked', false);
	 $scope.todoText = ''; 
	 $scope.todoEmail = ''; 
	 //window.location.reload(); 
		
  }
  $scope.addTodo = function() {
	  
	if($("#signupForm").valid()){
		$scope.todos.push({
		  text: $scope.todoText,
		  email: $scope.todoEmail,
		  colAppend: $scope.todocolAppend,
		  skillHtml: $scope.todoHtml,
		  skillJquery: $scope.todoJquery,
		  skillAngular: $scope.todoAngular,
		  numberImg: $scope.todonumberImg,
		  gender: $scope.todoGender,
		  doneProd: false,
		  doneDev: false
		});
		$scope.clearData();
	}
    
    
};

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo){
      count+= todo.doneProd && todo.doneDev ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var rusure = confirm("Are you sure you want to remove the completed tasks from the list?");
    if(rusure){
      var oldTodos = $scope.todos;
      $scope.todos = [];

      angular.forEach(oldTodos, function(todo){
        if (!todo.doneProd || !todo.doneDev)
          $scope.todos.push(todo);
      });
      localSet();
    }
  };

  $scope.delete = function ( idx ) {
    var rusure = confirm("Are you sure you want to remove the task from the list?");
    if(rusure){
      $scope.todos.splice(idx, 1);
      localSet();
    }
  };
	
  $scope.edit = function (idx) {
	 
	$(".btn-addData").prop('disabled', true);
	$(".btn-updateData").prop('disabled', false);
	$("#username").val($scope.todos[idx].text);
	$("#email").val($scope.todos[idx].email);
	if($scope.todos[idx].gender=='people'){
		$("input.male").prop('checked', true);
	}else{
		$("input.female").prop('checked', true);
	}
	$scope.newValue = function(value) {
	   $scope.todos[idx].gender = value;
	   localSet();
    }
	
	$scope.fClick = function() {
		var resultSelectUpdate=[];
		var selectedUpdate = $('.checkBoxContainer .selected');
		if(selectedUpdate.length > 0){
			selectedUpdate.each(function(i){
				resultSelectUpdate.push($(this).find('.acol span').html().replace(/&nbsp;/gi,'')) ;				
			});
		}
		for(var i=0;i<resultSelectUpdate.length;i++){
			$scope.todos[idx].skillHtml = resultSelectUpdate[0];
			$scope.todos[idx].skillJquery= resultSelectUpdate[1];
			$scope.todos[idx].skillAngular = resultSelectUpdate[2];
		}
		$scope.todonumberImg=resultSelectUpdate.length;
		console.log(resultSelectUpdate.length);
		switch(resultSelectUpdate.length) {
			case 1:
				$scope.todos[idx].colAppend = $scope.todocolAppend = '<img class="img-skill" ng-src="images/'+$scope.todos[idx].skillHtml+'.png" src="images/'+$scope.todos[idx].skillHtml+'.png">';
				break;
			case 2:
				$scope.todos[idx].colAppend = '<img class="img-skill" ng-src="images/'+$scope.todos[idx].skillHtml+'.png" src="images/'+$scope.todos[idx].skillHtml+'.png">' + '<img class="img-skill" attr="{{"'+$scope.todos[idx].skillJquery+'"}}" ng-src="images/'+$scope.todos[idx].skillJquery+'.png" src="images/'+$scope.todos[idx].skillJquery+'.png">';
				break;
			default:
				$scope.todos[idx].colAppend = $scope.todocolAppend = '<img class="img-skill" ng-src="images/'+$scope.todos[idx].skillHtml+'.png" src="images/'+$scope.todos[idx].skillHtml+'.png">' + '<img class="img-skill" attr="{{"'+$scope.todos[idx].skillJquery+'"}}" ng-src="images/'+$scope.todos[idx].skillJquery+'.png" src="images/'+$scope.todos[idx].skillJquery+'.png">'+ '<img class="img-skill" attr="{{"'+$scope.todos[idx].skillAngular+'"}}" ng-src="images/'+$scope.todos[idx].skillAngular+'.png" src="images/'+$scope.todos[idx].skillAngular+'.png">';
		}
		localSet();
	}
	if($scope.todos[idx].skillHtml=='html'){
		//alert('abc--');
		
		//$('.checkBoxContainer .multiSelectItem').addClass('checked multiSelectFocus selected');
		//$('.ng-binding').trigger('click');
	}
	
	
	var changeData1 = $scope.$watch('todoText', function(val) {
		$scope.todos[idx].text = val;
		localSet();
	});
	var changeData2 = $scope.$watch('todoEmail', function(val) {
		$scope.todos[idx].email = val;
		localSet();
	});
	
	
	
	//$scope.todos[idx].text = changeData1;
	//$scope.todos[idx].email = changeData2;
	//localSet();
	//$scope.$apply();
	//$scope.$digest();
	//var changes2 = angular.element($("#edit-text-input-1").val($scope.todos[idx].text)).val();
	
	//console.log(changes2);
	//$scope.todos[idx].text = changes2;
	//$scope.myVar = $scope.todos[idx].text;
	
	
   //if(changes != null){
      //$scope.todos[idx].text = changes;
      //localSet();
    //}
  };
 
  $scope.checkboxClick = function() {
    localSet();
  };

  
}


function charMc(){

    $('#charpie').highcharts({

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            //text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Html',
                y: 15
            }, {
                name: 'JQuery',
                y: 25,
                selected: true
            }, {
                name: 'Angularjs',
                y: 25
            }, {
                name: 'Magento',
                y: 10
            }, {
                name: 'Wordpress',
                y: 25
            }]
        }]

    });
}

$(function () {
    charMc();
});

