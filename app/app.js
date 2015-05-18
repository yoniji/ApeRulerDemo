define(function (require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require('backbone');
    var Marionette = require('marionette');


    window.urls = require('urls');
    window.util = require('util');
    

    // The root path to run the application through.
    exports.root = '/';

    var app = new Backbone.Marionette.Application();

    app.addInitializer(function (options) {

        var MainView = require('modules/main/MainView');
        app.mainView = new MainView();        
        app.mainRegion.show(app.mainView);

        Backbone.history.start({ pushState: true, root: "/" });

        
    });

    app.addRegions({
        mainRegion: '#mainWrapper'
    });


    return app;

});
