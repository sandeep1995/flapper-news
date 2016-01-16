var app = angular.module('flapperNews', ['ui.router']);
app.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
      })
    .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);
var postData = [
  {title: 'post 1', upvotes: 5},
  {title: 'post 2', upvotes: 2},
  {title: 'post 3', upvotes: 78},
  {title: 'post 4', upvotes: 9},
  {title: 'post 5', upvotes: 4}
];
app.factory('postData', [function () {
    var o = {
        posts: []
    };
    return o;
}]);
app.controller('MainCtrl',['$scope','postData', function ($scope, postData) {
    $scope.posts = postData.posts;
    $scope.addPost = function () {
        if (!$scope.title || $scope.title === '') { return; }
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
   { author: 'Joe', body: 'Cool post!', upvotes: 0 },
   { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
            ]
        });
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes = function (post) {
        post.upvotes += 1;
    }
}]);
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'postData',
function ($scope, $stateParams, postData) {
    $scope.post = postData.posts[$stateParams.id];
    $scope.addComment = function () {
        if ($scope.body === '') { return; }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };
}]);