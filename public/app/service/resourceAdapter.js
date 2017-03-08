module.exports = function($rootScope, $http, APIROOT) {
    $rootScope.loading = {};
    function warnError(res){
        console.warn(res);
    }
    function triggerAjaxState(resource, loading) {
        $rootScope.loading[resource] = loading;
    }
    return function(resource, p) {
        return {
            get: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "GET",
                        url: APIROOT + "/" + resource,
                        params: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            postFile: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "POST",
                        url: APIROOT + "/" + resource,
                        headers: {
                            'Content-Type': undefined
                        },
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            post: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "POST",
                        url: APIROOT + "/" + resource,
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            del: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "DELETE",
                        url: APIROOT + "/" + resource,
                        params: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            put: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "PUT",
                        url: APIROOT + "/" + resource,
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            }
        }
    };
};
