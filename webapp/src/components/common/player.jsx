'use strict';

module.exports = function (React, playerStore, playlistStore) {
    return React.createClass({
        getInitialState: getInitialState,

        componentWillMount: function () {
            playerStore.addChangeListener(this.onPlaylistStateChange);
        },

        componentWillUnmount: function () {
            playerStore.removeChangeListener(this.onPlaylistStateChange);
        },

        onPlaylistStateChange: function () {
            this.setState(_getState());
        },

        pause: pause,

        goNext: goNext,

        goBefore: goBefore,

        render: function () {
            var currentSong = this.state.currentSong || {name: 'Welcome 2 Songbox'};
            var currentTime = _convertTime(this.state.currentTime);
            var playPauseButton = this.state.isPlaying ? 'pause' : 'play_arrow';
            var progress = this.state.progress ? this.state.progress.toFixed(3) : 0;
            var songDuration = _convertTime(this.state.songDuration);

            return (
                <div className="player">
                    <div className="container">
                        <div className="data">
                            <div className="title">{ currentSong.name }</div>
                            <div className="time">
                                <span className="light">{ currentTime }</span>
                                <span className="divisor">/</span>
                                { songDuration }
                            </div>
                        </div>
                        <div className="controls">
                            <button className="btn blue" onClick={this.pause}>
                                <i className="small material-icons">{ playPauseButton }</i>
                            </button>
                            <button className="btn blue" onClick={this.goBefore}>
                                <i className="small material-icons">fast_rewind</i>
                            </button>
                            <button className="btn blue" onClick={this.goNext}>
                                <i className="small material-icons">fast_forward</i>
                            </button>
                        </div>
                        <div className="progress">
                            <div className="determinate" style={{width: progress + '%'}}></div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    function _convertTime(time) {
        if (isNaN(time)) {
            return '0:00';
        }
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - minutes * 60);
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }

    function _getState() {
        return {
            currentSong: playerStore.getCurrentSong(),
            currentTime: playerStore.getCurrentTime(),
            isPlaying: playerStore.isPlaying(),
            progress: playerStore.getProgress(),
            songDuration: playerStore.getSongLength()
        };
    }

    function getInitialState() {
        return _getState();
    }

    function pause() {
        playerStore.pause();
    }

    function goNext() {
        playlistStore.next();
        playerStore.goNext();
    }

    function goBefore() {
        playlistStore.prev();
        playerStore.goPrev();
    }
};
