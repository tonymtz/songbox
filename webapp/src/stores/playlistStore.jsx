'use strict';

module.exports = function (fluxtore, request, PATH) {
    var _cache = [];

    return fluxtore.createStore({
        events: ['change'],

        _get: function (cb) {
            function get(err, response, body) {
                if (!err && response.statusCode === 200) {
                    if (cb) {
                        cb();
                    }
                    _cache = JSON.parse(body);
                    this.emitChange();
                }
            }

            request(PATH.SONGS, get.bind(this));
        },

        get: function () {
            if (_cache.length === 0) {
                this._get();
            }

            return {songs: _cache};
        },

        actions: {
            refresh: function () {
                this._get(function () {
                    _cache = [];
                });
            }
        }
    });
};
