function fnK(k) {
    return k;
}

export default function(fluxtore, request, PATH, musicStore) {
    let isComponentPlaying = false;
    let progress = 0;
    let audio = new Audio();
    let isReady = false;

    let playerStore = fluxtore.createStore({
        events: ['change'],

        init: init,

        getCurrentTime: getCurrentTime,

        getProgress: getProgress,

        getSongLength: getSongLength,

        isPlaying: isPlaying,

        loadSong: loadSong,

        actions: {
            togglePlay: togglePlay
        }
    });

    return playerStore;

    function init() {
        musicStore.addChangeSongListener(() => {
            let currentSong = musicStore.getCurrentSong();

            if (!currentSong) return;

            loadSong(currentSong.path);
        });

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', musicStore.goNext);
        audio.addEventListener('canplay', play);

        function onTimeUpdate() {
            progress = audio.currentTime / audio.duration * 100;

            playerStore.emitChange();
        }
    }

    function getCurrentTime() {
        return audio.currentTime;
    }

    function getProgress() {
        return progress;
    }

    function getSongLength() {
        return audio.duration;
    }

    function isPlaying() {
        return isComponentPlaying;
    }

    function loadSong(songPath) {
        fetchData(songPath, afterLoadSong);

        function afterLoadSong() {
            if (isComponentPlaying) {
                audio.play();
            }
        }
    }

    function togglePlay() {
        if (!isReady) {
            return;
        }

        if (isComponentPlaying) {
            pause();
        } else {
            play();
        }
    }

    function play() {
        audio.play();
        isComponentPlaying = true;
    }

    function pause() {
        audio.pause();
        isComponentPlaying = false;
    }

    function fetchData(songPath, afterLoadSongFn) {
        afterLoadSongFn = afterLoadSongFn || fnK;

        let normalizedPath = songPath.replace(/\//g, '~');

        request(PATH.SONGS + '/' + normalizedPath, get(playerStore));

        function get(ctx) {
            return function(err, res, chunk) {
                if (err) {
                    throw 'Unhandled Exception: player-store.js -> fetchData -> get';
                }

                chunk = JSON.parse(chunk);

                audio.src = chunk.url;
                isReady = true;

                afterLoadSongFn();

                ctx.emitChange();
            }
        }
    }
};
