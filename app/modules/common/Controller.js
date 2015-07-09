define(['app', 'backbone', 'marionette','modules/welcome/WelcomeView','modules/floorplan/FloorplanView'],
    function (App, Backbone, Marionette, WelcomeView, FloorplanView) {
        return Marionette.Controller.extend({
            initialize: function (options) {

            },
            welcome: function() {
                var welcome = new WelcomeView();
            },
            floorplan: function() {
            	var floorplan = new FloorplanView();
            }
        });
    });