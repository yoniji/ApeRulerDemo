define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/arealist/areaitem.html'],
    function(App, Backbone, Marionette, Mustache, $, template) {

        return Marionette.ItemView.extend({
            template: function(serialized_model) {
                console.log(serialized_model);
                return Mustache.render(template, serialized_model);
            },
            ui: {

            },
            events: {

            },
            onDestroy: function() {
                this.stopListening();
            },
            className:'areaItem'
        });
    });