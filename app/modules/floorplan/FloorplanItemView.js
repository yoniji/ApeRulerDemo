define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/floorplan/floorplanitem.html', 'modules/floorplan/FloorplanView'],
    function(App, Backbone, Marionette, Mustache, $, template, FloorplanView) {

        return Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {

            },
            events: {
                'tap': 'onTap'
            },
            templateHelpers: {
                
            },
            onTap: function() {
                new FloorplanView({'model': this.model});
            },
            onDestroy: function() {
                this.stopListening();
            },
            className:'floorplanitem'
        });
    });