'use strict';

module.exports = function (fluxtore, request, PATH, songStore) {
    var _cache = [];
    var _currentIndex;

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

            return {
                songs: _cache.sort(function (a, b) {
                    return a.name > b.name;
                })
            };
        },

        actions: {
            next: function () {
                _currentIndex += 1;

                if (_currentIndex >= _cache.length) {
                    _currentIndex = 0;
                }

                songStore.play(_cache[_currentIndex]);
            },
            play: function (song) {
                _currentIndex = song;
                songStore.play(_cache[song] || {});
            },
            refresh: function () {
                this._get(function () {
                    _cache = [];
                });
            }
        }
    });
};
