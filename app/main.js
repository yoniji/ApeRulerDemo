require(["app", "modules/common/Router", "modules/common/Controller"], function (App, Router, Controller) {

	window.App = App;
	
    App.appRouter = new Router({
        controller: new Controller()
    });


    App.start();

});