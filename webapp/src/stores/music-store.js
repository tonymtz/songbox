export default function(fluxtore, request, lodash, PATH, spinnerStore) {
    let data = [];
    let playlists = [];
    let currentPlaylist = '';
    let currentSong = '';
    let musicStoreProxy;

    return musicStoreProxy = fluxtore.createStore({
        events: ['change', 'changeSong'],

        getCurrentPlaylist: getCurrentPlaylist,

        getCurrentSong: getCurrentSong,

        getPlaylists: getPlaylists,

        getSongs: getSongs,

        actions: {
            changeToPlaylist: changeToPlaylist,

            changeToSong: changeToSong,

            changeToPath: changeToPath,

            goPrevious: goPrevious,

            goNext: goNext
        }
    });

    function getCurrentPlaylist() {
        return currentPlaylist;
    }

    function getCurrentSong() {
        return currentSong;
    }

    function getPlaylists() {
        if (playlists.length === 0) {
            fetchData.apply(musicStoreProxy);
        }

        return playlists;
    }

    function getSongs(playlistName) {
        playlistName = playlistName || currentPlaylist;

        let playlist = lodash.find(data, ['title', playlistName]);

        return playlist ? playlist.songs : [];
    }

    function changeToPlaylist(playlistName) {
        if (lodash.indexOf(playlists, playlistName) > -1) {
            currentPlaylist = playlistName;

            musicStoreProxy.emitChange();
        } else {
            throw 'Unknow playlist name';
        }
    }

    function changeToSong(newSong) {
        currentSong = newSong;

        musicStoreProxy.emitChangeSong();
        musicStoreProxy.emitChange();
    }

    function changeToPath(newSongPath) {
        let songs = musicStoreProxy.getSongs();

        currentSong = lodash.find(songs, (song, index) => {
            if (song.path === newSongPath) {
                return song;
            }
            return false;
        });

        musicStoreProxy.emitChangeSong();
        musicStoreProxy.emitChange();
    }

    function goPrevious() {
        let songs = musicStoreProxy.getSongs();
        let currentSongIndex = -1;

        lodash.find(songs, (song, index) => {
            if (song.path === currentSong.path) {
                currentSongIndex = index;
                return true;
            }
            return false;
        });

        let newSong = currentSongIndex <= 0 ? songs[songs.length - 1] : songs[currentSongIndex - 1];

        changeToSong(newSong);
    }

    function goNext() {
        let songs = musicStoreProxy.getSongs();
        let currentSongIndex = -1;

        lodash.find(songs, (song, index) => {
            if (song.path === currentSong.path) {
                currentSongIndex = index;
                return true;
            }
            return false;
        });

        let newSong = currentSongIndex + 1 >= songs.length ? songs[0] : songs[currentSongIndex + 1];

        changeToSong(newSong);
    }

    function fetchData() {
        spinnerStore.show();

        request(PATH.SONGS, get(musicStoreProxy));

        function get(ctx) {
            return function(err, res, chunk) {
                if (err) {
                    throw 'Unhandled Exception: music-store.js -> fetchData -> get';
                }

                chunk = JSON.parse(chunk);

                data = chunk.playlists;
                playlists = lodash.map(data, (playlist) => playlist.title);
                currentPlaylist = currentPlaylist || playlists[0] || '';

                if (playlists.length > 0) {
                    ctx.emitChange();
                }

                spinnerStore.hide();
            }
        }
    }
}

