'use strict';

module.exports = function (fluxtore, playlistStore, spinnerStore) {
    var _currentSong = null;
    var _isPlaying = false;
    var _audio = new Audio();
    var _progress = 0;

    var playerStore = fluxtore.createStore({
        events: ['change'],

        init: init,

        getAudio: getAudio,

        getCurrentSong: getCurrentSong,

        getCurrentTime: getCurrentTime,

        getProgress: getProgress,

        getSongLength: getSongLength,

        isPlaying: isPlaying,

        loadSong: loadSong,

        actions: {
            goNext: goNext,

            goPrev: goPrev,

            pause: pause,

            togglePlay: togglePlay
        }
    });

    return playerStore;

    function _onTimeUpdate() {
        _progress = _audio.currentTime / _audio.duration * 100;
        playerStore.emitChange();
    }

    function _onCanPlay() {
        spinnerStore.hide();
        playerStore.emitChange();
    }

    function init() {
        _audio.addEventListener('timeupdate', _onTimeUpdate);
        _audio.addEventListener('ended', goNext);
        _audio.addEventListener('canplay', _onCanPlay);
    }

    function getAudio() {
        return _audio;
    }

    function getCurrentSong() {
        return _currentSong || {};
    }

    function getCurrentTime() {
        return _audio.currentTime;
    }

    function getProgress() {
        return _progress;
    }

    function getSongLength() {
        return _audio.duration;
    }

    function isPlaying() {
        return _isPlaying;
    }

    function goNext() {
        var index = playlistStore.getCurrentIndex();
        playerStore.loadSong(index);
    }

    function goPrev() {
        var index = playlistStore.getCurrentIndex();
        playerStore.loadSong(index);
    }

    function loadSong(index) {
        spinnerStore.show();

        // TODO - this hardcoded value
        _audio.src = '/static/1sec.mp3';
        _audio.play();

        playlistStore.getUrl(index)
            .then(function (song) {
                _currentSong = song;

                _audio.pause();
                _audio.src = song.url;
                _audio.play();
                _isPlaying = true;

                playerStore.emitChange();
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function pause() {
        if (_audio.paused) {
            _audio.play();
            _isPlaying = true;
        } else {
            _audio.pause();
            _isPlaying = false;
        }

        this.emitChange();
    }

    function togglePlay() {
    }
};
