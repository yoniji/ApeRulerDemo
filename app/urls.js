define(function(require, exports, module) {


        var useTestServer = true;
        var testBaseUrl = 'http://10.0.0.9:9999/';
        var releaseBaseUrl = 'https://shiliujishi.com/';

        var testServiceUrls = {
            'account' : testBaseUrl + 'admin/member/members.js'
        };

        var releaseServiceUrls = {
            'account' : testBaseUrl + 'admin/member/members.js'
        };


        exports.ServiceUrls = {
            getServiceUrlByName: function(serviceName) {
                if(useTestServer) {
                    return testServiceUrls[ serviceName ];
                } else {
                    return releaseServiceUrls[ serviceName ];
                }
                
            }
        };
    
});