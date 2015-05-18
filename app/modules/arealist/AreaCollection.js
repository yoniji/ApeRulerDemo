define(['backbone','jquery', 'modules/arealist/AreaItem'],
    function(Backbone, $, AreaItem) {

        return Backbone.Collection.extend({
            model:AreaItem
        });
    });