define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/floorplan/floorplan.html'],
    function(App, Backbone, Marionette, Mustache, $, template) {

        return Backbone.Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            originalScale:1,
            scale:1,
            originalX:0,
            originalY:0,
            x:0,
            y:0,
            ui: {
                'floorplan':'#floorplanSvg',
                'floorplanPannelInput':'#floorplanPannelInput',
                'floorplanPannel': '#floorplanPannel'
            },
            events: {
                'tap polygon': 'onTapRoom',
                'tap rect': 'onTapRoom',
                'pinchmove @ui.floorplan': 'onPinch',
                'pinchend @ui.floorplan': 'onPinchEnd',
                'panmove @ui.floorplan': 'onPan',
                'panend @ui.floorplan': 'onPanEnd',
                'touchend': 'onTouchMove',
                'tap .back': 'onBack'
            },
            initialize: function() {
                this.mainView = App.mainView;
                this.mainView.updateSecondaryRegion(this);

            },
            onTapRoom: function(ev) {
                this.ui.floorplanPannel.show();
                var room = $(ev.currentTarget);
                this.$el.find('.current').removeClass('current').attr('stroke', '#000000');
                room.attr('class', 'current').attr('stroke', '#f44336');
                this.ui.floorplanPannelInput.text(room.attr('id'));
            },
            onShow: function() {

            },
            onPinch: function(ev) {
                this.scale = this.originalScale * ev.originalEvent.gesture.scale;
                this.updateFloorplanTransform();
            },
            onPinchEnd: function(ev) {
                this.originalScale = this.scale;
            },
            onPan: function(ev) {
                this.x = this.originalX + ev.originalEvent.gesture.deltaX;
                this.y = this.originalY + ev.originalEvent.gesture.deltaY;
                this.updateFloorplanTransform();
                
            },
            onPanEnd: function(ev) {
                this.originalX = this.x;
                this.originalY = this.y;
            },
            updateFloorplanTransform: function(ev) {
                var transformStr = 'scale3d(' + this.scale + ',' + this.scale + ',1) translate3d(' + this.x + 'px,' + this.y + 'px,0)';
                this.ui.floorplan.css({
                    '-webkit-transform': transformStr
                });
            },
            onTouchMove: function(ev) {
                ev.preventDefault();
            },
            onBack: function() {
                this.mainView.foldSecondaryRegion();
            },
            onDestroy: function() {
                this.stopListening();
            },
            id: 'floorplanWrapper'
        });
    });