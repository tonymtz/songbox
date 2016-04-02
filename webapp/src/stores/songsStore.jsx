'use strict';

module.exports = function (fluxtore, request) {
    var _cache = [];
    var _currentSong;

    return fluxtore.createStore({
        events: ['change'],

        _getAll: function (cb) {
            function get(err, response, body) {
                if (!err && response.statusCode === 200) {
                    if (cb) {
                        cb();
                    }
                    _cache = JSON.parse(body);
                    this.emitChange();
                }
            }

            request('http://localhost:8080/v1/songs', get.bind(this));
        },

        _getOne: function (song, cb) {
            function get(err, response, body) {
                if (!err && response.statusCode === 200) {
                    if (cb) {
                        cb();
                    }
                    body = JSON.parse(body);
                    _currentSong.url = body.url;
                    this.emitChange();
                }
            }

            request('http://localhost:8080/v1/songs/' + song.path, get.bind(this));
        },

        getList: function () {
            if (_cache.length === 0) {
                this._getAll();
            }

            return {songs: _cache};
        },

        getSelected: function () {
            return {song: _currentSong};
        },

        actions: {
            refresh: function () {
                this._getAll(function () {
                    _cache = [];
                });
            },

            play: function (song) {
                this._getOne(song, function () {
                    _currentSong = song;
                });
            }
        }
    });
};
