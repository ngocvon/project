<!doctype html>
<html>
<head>
  <title>vo van do</title>
  <meta charset="UTF-8">
  <!-- LOAD BOOTSTRAP CSS -->
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
  <!-- LOAD JQUERY -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <!-- LOAD ANGULAR -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
</head>
<body>
  
  <div class="col-md-12">
    <h3 align="center">Insert, Update, Delete Data in MySQL using AngularJS with PHP</h3>
    <div ng-app="sa_app" ng-controller="controller" ng-init="show_data()">
      <div class="col-md-6">
          <label>Name</label>
          <input type="text" name="name" ng-model="name" class="form-control">
          <br/>
          <label>Email</label>
          <input type="text" name="email" ng-model="email" class="form-control">
          <br/>
          <label>Age</label>
          <input type="text" name="age" ng-model="age" class="form-control">
          <br/>
          <input type="hidden" ng-model="id">
          <input type="submit" name="insert" class="btn btn-primary" ng-click="insert()" value="{{btnName}}">
      </div>
          <div class="col-md-6">
              <table class="table table-bordered">
                  <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                  <tr ng-repeat="x in showInfo">
                      <td>{{x.id}}</td>
                      <td>{{x.name}}</td>
                      <td>{{x.email}}</td>
                      <td>{{x.age}}</td>
                      <td>
                          <button class="btn btn-success btn-xs" ng-click="update_data(x.id, x.name, x.email, x.age)">
                              <span class="glyphicon glyphicon-edit"></span> Edit
                          </button>
                      </td>
                      <td>
                          <button class="btn btn-danger btn-xs" ng-click="delete_data(x.id)">
                              <span class="glyphicon glyphicon-trash"></span> Delete
                          </button>
                      </td>
                  </tr>
              </table>
          </div>
      </div>
  </div>
  <script>
    var app = angular.module("sa_app",[]);
    app.controller("controller",function($scope,$http){
      $scope.btnName="Insert";
      $scope.insert=function(){
        if($scope.name == null){
          alert("Enter your name");
        }else if($scope.email==null){
          alert("Enter your email id");
        }else if($scope.age == null){
          alert("Enter Your age");
        }else{
          $http.post(
              "insert.php",{
                'name':$scope.name,
                'email':$scope.email,
                'age':$scope.age,
                'btnName':$scope.btnName,
                'id':$scope.id
              }
            ).success(function(data){
                alert(data);
                $scope.name=null;
                $scope.email=null;
                $scope.age=null;
                $scope.btnName="Insert";
                $scope.show_data();
            });
        }
      }
      
      $scope.show_data=function(){
        $http.get("display.php").success(function(data){
            $scope.showInfo = data;
        });
      }

      $scope.update_data=function(id,name,email,age){
        // load du lieu vao form
        $scope.id=id;
        $scope.name=name;
        $scope.email=email;
        $scope.age=age;
        $scope.btnName="Update";
      }

      $scope.delete_data = function(id){
        if(confirm("Are you sure you want to delete")){
          $http.post("delete.php",{
            'id':id
          }).success(function(data){
            alert(data);
            $scope.show_data();
          });
        }else{
          return false;
        }
      }

    });
  </script>
</body>
</html>