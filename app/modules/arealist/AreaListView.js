define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/arealist/arealist.html','modules/arealist/AreaList', 'modules/arealist/AreaCollection','modules/arealist/AreaItemView', 'iscroll'],
    function(App, Backbone, Marionette, Mustache, $, template, AreaList, AreaCollection, AreaItemView) {

        return Marionette.CompositeView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {

            },
            events: {

            },
            initialize: function(options) {
                this.model = new AreaList(options.modelData);
                this.collection = new AreaCollection(options.collectionData);
                this.mainView = App.mainView;
                this.mainView.updateSecondaryRegion(this);

            },
            childView: AreaItemView,
            childViewContainer: '#areaList',
            onShow: function() {

            },
            onDestroy: function() {
                this.stopListening();
            },
            id: 'AreaListWrapper'
        });
    });