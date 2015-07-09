define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/floorplan/floorplanlist.html','modules/floorplan/FloorplanList', 'modules/floorplan/FloorplanCollection','modules/floorplan/FloorplanItemView', 'iscroll'],
    function(App, Backbone, Marionette, Mustache, $, template, FloorplanList, FloorplanCollection, FloorplanItemView) {

        return Marionette.CompositeView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {
                'floorplanListWrapper': '#floorplanListWrapper'
            },
            events: {
                'tap .back': 'onBack'
            },
            initialize: function(options) {
                this.model = new FloorplanList(options.modelData);
                this.collection = new FloorplanCollection();
                this.collection.addDemoData(options.modelData.floorplanCount);
                this.mainView = App.mainView;
                this.mainView.updateSecondaryRegion(this);

            },
            childView: FloorplanItemView,
            childViewContainer: '#floorplanList',
            onShow: function() {
                this.ui.floorplanListWrapper.height($('window').height() - 56);
                this.scroller = new IScroll(this.ui.floorplanListWrapper[0]);
            },
            onBack: function() {
                this.mainView.foldSecondaryRegion();
            },
            onDestroy: function() {
                if(this.scroller) this.scroller.destroy();
                this.stopListening();
            },
            id: 'floorplanListContainer'
        });
    });