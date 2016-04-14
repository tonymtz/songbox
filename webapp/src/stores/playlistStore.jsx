'use strict';

module.exports = function (fluxtore, request, PATH, Promise, _, spinnerStore) {
    var _cache = [];
    var _currentIndex = 0;

    var playlistStore = fluxtore.createStore({
        events: ['change'],

        getCurrentIndex: function () {
            return _currentIndex;
        },

        getUrl: getUrl,

        getSongs: getSongs,

        actions: {
            prev: function () {
                _currentIndex -= 1;

                if (_currentIndex < 0) {
                    _currentIndex = _cache.length - 1;
                }

                this.emitChange();
            },

            next: function () {
                _currentIndex += 1;

                if (_currentIndex >= _cache.length) {
                    _currentIndex = 0;
                }

                this.emitChange();
            },

            refresh: function () {
                this._get(function () {
                    _cache = [];
                });
            }
        }
    });

    return playlistStore;

    function _fetchSongs() {
        return new Promise(function (resolve, reject) {
            spinnerStore.show();

            request(PATH.SONGS, get);

            function get(err, response, body) {
                if (!err && response.statusCode === 200) {
                    body = JSON.parse(body);
                    resolve(body);
                } else {
                    reject(err);
                    spinnerStore.panic();
                }
                spinnerStore.hide();
            }
        });
    }

    function getSongs() {
        if (_cache.length === 0) {
            _fetchSongs()
                .then(function (songsCollection) {
                    _cache = _.sortBy(songsCollection, 'name');
                    playlistStore.emitChange();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        return _cache;
    }

    function getUrl(index) {
        var song = _cache[index];

        _currentIndex = index;

        return new Promise(function (resolve, reject) {
            spinnerStore.show();

            request(PATH.SONGS + '/' + song.path_display, get);

            function get(err, response, body) {
                if (!err && response.statusCode === 200) {
                    body = JSON.parse(body);
                    song.url = body.url;
                    resolve(song);
                } else {
                    reject(err);
                }
                spinnerStore.hide();
            }
        });
    }
};
