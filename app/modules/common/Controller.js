define(['app', 'backbone', 'marionette','modules/welcome/WelcomeView'],
    function (App, Backbone, Marionette, WelcomeView) {
        return Marionette.Controller.extend({
            initialize: function (options) {

            },
            welcome: function() {
                var welcome = new WelcomeView();
            }
        });
    });