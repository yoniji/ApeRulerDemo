define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/welcome/welcome.html', 'iscroll'],
    function(App, Backbone, Marionette, Mustache, $, template) {

        return Backbone.Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {

            },
            events: {

            },
            initialize: function() {
                this.mainView = App.mainView;
                this.mainView.updatePrimaryRegion(this);

            },
            onShow: function() {
                this.iscroll = new IScroll(this.$el[0]);
                console.log( this.$el[0]);

            },
            onDestroy: function() {
                this.stopListening();
            },
            id: 'welcomeWrapper'
        });
    });