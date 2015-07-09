define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/arealist/areaitem.html', 'modules/floorplan/FloorplanListView'],
    function(App, Backbone, Marionette, Mustache, $, template, FloorplanListView) {

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
                'getRandomCount': function() {
                    return Math.round(Math.random() * 10 + 1);
                },
                'getDistanceStr': function() {
                    var distance = Math.round(this.distance);
                    if(distance<1000) {
                        return distance + '米';
                    } else {
                        return Math.round(distance/1000) + '公里';
                    }
                }
            },
            onTap: function() {
                new FloorplanListView({modelData:this.model.toJSON()});
            },
            onDestroy: function() {
                this.stopListening();
            },
            className:'areaItem'
        });
    });