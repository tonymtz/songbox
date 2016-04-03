'use strict';

module.exports = function (fluxtore, request, PATH) {
    var _currentSong;

    return fluxtore.createStore({
        events: ['change'],

        _get: function (song, cb) {
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

            request(PATH.SONGS + '/' + song.path, get.bind(this));
        },

        get: function () {
            return _currentSong;
        },

        actions: {
            play: function (song) {
                this._get(song, function () {
                    _currentSong = song;
                });
            }
        }
    });
};
