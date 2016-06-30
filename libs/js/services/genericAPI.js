// service
(function () {

    "use strict"

    angular.module('cfp').service("genericAPI", function ($http) {

        function _generic (data, scope) {
            return $http({
                method: 'POST',
                url: "src/rest/" + data.class + ".php",
                data: {
                    metodo: data.metodo,
                    data: data.data
                }
            });
        };

        return {
            generic: _generic
        };
    });

})();
