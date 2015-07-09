define(['backbone', 'jquery', 'modules/floorplan/FloorplanItem'],
    function(Backbone, $, FloorplanItem) {
        var typs = ['A','B','C','D','E','F','G'];
        function getRandomType() {
            return typs[Math.floor(Math.random() * typs.length)];
        }
        function getRandomRoomCount() {
            return Math.floor(Math.random() * 3 + 1);
        }

        function getRandomArea() {
            return Math.floor(Math.random() * 100 + 50);
        }
        var orintations = ['东','南','西','北','南北','东南','西北','东西'];
        function getRandomOritation() {
            return orintations[Math.floor(Math.random() * orintations.length)];
        }
        return Backbone.Collection.extend({
            model: FloorplanItem,
            addDemoData: function(count) {
                for (var i = 0; i < count; i++) {
                    this.add({
                        'title': getRandomType() + (i+1) + '户型',
                        'type': getRandomRoomCount() + '室' + getRandomRoomCount() + '厅1厨1卫',
                        'area': getRandomArea(),
                        'orintation': getRandomOritation()
                    });
                }

            }
        });
    });