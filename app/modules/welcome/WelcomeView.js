define(['app', 'underscore', 'backbone', 'marionette', 'mustache', 'jquery', 'text!modules/welcome/welcome.html', 'modules/arealist/AreaListView', 'modules/floorplan/FloorplanListView'],
    function(App, _, Backbone, Marionette, Mustache, $, template, AreaListView, FloorplanListView) {
        //自定义覆盖物
        function ComplexCustomOverlay(point, text, result) {
            this._point = point;
            this._text = text;
            this._data = result;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();

        ComplexCustomOverlay.prototype.initialize = function(map) {
            this._map = map;

            var $element = $('<div class="customMarker"></div>');
            $element.append('<div class="customMarkerTitle">' + this._text + '</div>');
            $element.append('<div class="customMarkerCount">' + this._data.floorplanCount + '</div>');
            var marker  = $element[0];
            this._div = marker;
            marker.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            map.getPanes().labelPane.appendChild(marker);

            var self = this;
            $element.on('touchstart', function(ev){
                new FloorplanListView({modelData:self._data});
            });
            return marker;
        };
        ComplexCustomOverlay.prototype.draw = function() {
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 30 + "px";
            this._div.style.top = pixel.y - 65 + "px";
        };
        return Backbone.Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {
                'map': '#map',
                'input': '#searchInput',
                'locate': '#locate'
            },
            events: {
                'tap @ui.locate': 'onLocate',
                'tap @ui.input': 'onTapSearch'
            },
            initialize: function() {
                this.mainView = App.mainView;
                this.mainView.updatePrimaryRegion(this);

            },
            markers: [],
            areas: [],
            onShow: function() {
                var width = this.$el.parent().width();
                var height = this.$el.parent().height();
                this.$el.width(width).height(height);
                this.ui.map.width(width).height(height);
                this.ui.input.width(width - 96);

                this.initMap();
                this.getCurrentLocation();
            },
            initMap: function() {
                this.map = new BMap.Map("map");
                var initPoint = new BMap.Point(116.356109, 39.980528);
                this.map.centerAndZoom(initPoint, 16);

                var self = this;
                this.map.addEventListener('dragend', function() {
                    self.onMapDragEnd();
                });

            },
            clearMarkers: function() {
                for (var i = 0; i < this.markers.length; i++) {
                    this.map.removeOverlay(this.markers[i]);
                }
                this.markers = [];
            },
            clearAreas: function() {
                this.areas = [];
            },
            onMapDragEnd: function() {
                var newPoint = this.map.getCenter();
                this.searchNearby(newPoint);
            },
            onLocate: function() {
                //move to current point and search again
                if (this.map && this.currentPoint) {

                    this.searchNearby(this.currentPoint);
                    this.map.panTo(this.currentPoint);
                }

            },
            getCurrentLocation: function() {
                var self = this;
                //获取地理位置
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        self.currentPoint = r.point;
                        self.map.panTo(r.point);
                        self.drawCurrentPosition(r.point);
                        self.searchNearby(r.point);
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, {
                    enableHighAccuracy: true
                });
            },
            drawCurrentPosition: function(point) {
                //画出当前位置
                var circle = new BMap.Circle(point, 100, {
                    fillColor: "#1976d2",
                    strokeWeight: 1,
                    fillOpacity: 0.2,
                    strokeOpacity: 1
                });
                var dot = new BMap.Circle(point, 20, {
                    fillColor: "#1976d2",
                    strokeColor: "#FFFFFF",
                    strokeWeight: 1,
                    fillOpacity: 1,
                    strokeOpacity: 1
                });
                this.map.addOverlay(circle);
                this.map.addOverlay(dot);
            },
            searchNearby: function(point) {
                if (this.markers && this.markers.length > 0) this.clearMarkers();
                if (this.areas && this.areas.length > 0) this.clearAreas();
                var self = this;
                //搜索附近的小区
                var options = {
                    onSearchComplete: function(results) {
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var result = results.getPoi(i);
                                result.distance = self.map.getDistance(point, result.point);
                                result.floorplanCount = Math.round(Math.random() * 10 + 1);
                                var myCompOverlay = new ComplexCustomOverlay(result.point, result.title, result);
                                self.markers.push(myCompOverlay);
                                self.areas.push(result);
                                self.map.addOverlay(myCompOverlay);
                            }
                        }
                    }
                };
                var local = new BMap.LocalSearch(self.map, options);
                local.searchNearby("小区", point, 1000);
            },
            onTapSearch: function() {
                var areaListView = new AreaListView({
                    modelData: {},
                    collectionData: _.sortBy(this.areas, function(area) {
                        return area.distance;
                    })
                });
            },
            onDestroy: function() {
                this.stopListening();
            },
            id: 'welcomeWrapper'
        });
    });