var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment']);

app.config(function($routeSegmentProvider, $routeProvider) {    
    $routeSegmentProvider.options.autoLoadTemplates = true;
  
    $routeSegmentProvider  
    
        .when('/home', 'home')
        .when('/articles', 'articles')
        .when('/quotes', 'quotes')
    
        .when('/articles/a1', 'articles.a1')
        .when('/articles/a2', 'articles.a2')
        .when('/articles/a3', 'articles.a3')
    
        .when('/god', 'god')
    
        .when('/404', '404')
        
        .segment('home', {
            templateUrl: 'view/home.html'})
    
    
        .segment('articles', {
            templateUrl: 'view/articles.html'})
        .within()
                .segment('a1', {templateUrl: 'view/articles/a1.html'})
                .segment('a2', {templateUrl: 'view/articles/a2.html'})
                .segment('a3', {templateUrl: 'view/articles/a3.html'})
    
        .up()
    
        .segment('quotes', {
            templateUrl: 'view/quotes.html'})
            /*.within()

                .segment('q1', { 'default': true, templateUrl: 'view/quotes/q1.html'})
                .segment('q2', {templateUrl: 'view/quotes/q2.html'})
                .segment('q3', {templateUrl: 'view/quotes/q3.html'})
    
        .up()*/
    
        .segment('god', {
            templateUrl: 'view/god.html'})
    
        .segment('404', {
            templateUrl: 'view/404.html'});
        
    $routeProvider.otherwise({redirectTo: '/home'}); 
    
}) ;

app.value('loader', {show: false});

app.controller('MainCtrl', function($scope, $routeSegment, loader) {

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;

    $scope.$on('routeSegmentChange', function() {
        loader.show = false;
    });
    
    $scope.hoverIn = function(el){
        if($scope.active==el) return false;
        $scope.active = el;
        var audio = document.getElementById("sound");
        audio.load();
        audio.play();
    };
    
    setTimeout(function() { $scope.active = 'active1'; $scope.$apply(); }, 700);
        
    //$(".god_bg").css("height",$(".god_bg").width()+"px");
    $scope.btnBack = 'home';
    
});

app.controller('PrismCtrl', function($scope, $routeSegment) {
    //$scope.$routeSegment = $routeSegment;
    Prism.highlightAll();
});

app.controller('ErrorCtrl', function($scope, error) {
    $scope.error = error;
});

