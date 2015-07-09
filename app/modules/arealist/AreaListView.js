define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/arealist/arealist.html','modules/arealist/AreaList', 'modules/arealist/AreaCollection','modules/arealist/AreaItemView', 'iscroll'],
    function(App, Backbone, Marionette, Mustache, $, template, AreaList, AreaCollection, AreaItemView) {

        return Marionette.CompositeView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {
                'areaListWrapper': '#areaListWrapper'
            },
            events: {
                'tap .back': 'onBack'
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
                this.ui.areaListWrapper.height($('window').height() - 56);
                this.scroller = new IScroll(this.ui.areaListWrapper[0]);
            },
            onBack: function() {
                this.mainView.foldSecondaryRegion();
            },
            onDestroy: function() {
                if(this.scroller) this.scroller.destroy();
                this.stopListening();
            },
            id: 'areasWrapper'
        });
    });