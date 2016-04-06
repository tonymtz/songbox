'use strict';

module.exports = function (React, playlistStore, songStore) {
    var _audio;
    var _isPlaying;
    var _progress;

    function update(currentState, newState) {
        var resultState = Object.create(currentState);
        for (var prop in currentState) {
            resultState[prop] = typeof newState[prop] === 'undefined' ? currentState[prop] : newState[prop];
        }
        return resultState;
    }

    function convertTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - minutes * 60);
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }

    return React.createClass({
        getInitialState: function () {
            return {
                currentSong: songStore.get(),
                audio: null,
                isPlaying: null,
                progress: null,
                currentTime: 0,
                songDuration: 0
            };
        },

        componentWillMount: function () {
            songStore.addChangeListener(this.onSongStateChange);
        },

        componentWillUnmount: function () {
            songStore.removeChangeListener(this.onSongStateChange);
        },

        onSongStateChange: function () {
            var currentSong = songStore.get();

            if (this.state.audio) {
                this.state.audio.pause();
                this.state.audio.removeEventListener('timeupdate', this.onTimeUpdate);
                this.state.audio.removeEventListener('ended', this.onEnded);
                this.state.audio.removeEventListener('canplay', this.onCanPlay);
            }

            var audio, isPlaying;

            if (currentSong.url) {
                isPlaying = true;
                audio = new Audio(currentSong.url);
                audio.play();
                audio.addEventListener('timeupdate', this.onTimeUpdate);
                audio.addEventListener('ended', this.onEnded);
                audio.addEventListener('canplay', this.onCanPlay);
            } else {
                isPlaying = false;
                audio = null;
            }

            var newState = update(this.state, {
                currentSong: currentSong,
                audio: audio,
                isPlaying: isPlaying,
                progress: 0
            });

            this.setState(newState);
        },

        onTimeUpdate: function () {
            var audio = this.state.audio;
            var number = audio.currentTime / audio.duration * 100;

            var newState = update(this.state, {
                progress: number,
                currentTime: audio.currentTime
            });

            this.setState(newState);
        },

        onEnded: function () {
            playlistStore.next();
        },

        onCanPlay: function () {
            var newState = update(this.state, {
                songDuration: this.state.audio.duration
            });

            this.setState(newState);
        },

        pause: function () {
            if (!this.state.audio) {
                playlistStore.play(0);
                return;
            }

            var isPlaying = this.state.isPlaying;

            if (isPlaying) {
                this.state.audio.pause();
            } else {
                this.state.audio.play();
            }

            isPlaying = !isPlaying;

            var newState = update(this.state, {
                isPlaying: isPlaying
            });

            this.setState(newState);
        },

        render: function () {
            var currentSong = this.state.currentSong || {name: 'Welcome 2 Songbox'};
            var progress = this.state.progress ? this.state.progress.toFixed(3) : 0;
            var songDuration = convertTime(this.state.songDuration);
            var currentTime = convertTime(this.state.currentTime);
            var playPauseButton = this.state.isPlaying ? 'pause' : 'play_arrow';

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
                            <button className="btn blue disabled">
                                <i className="small material-icons">fast_rewind</i>
                            </button>
                            <button className="btn blue" onClick={this.onEnded}>
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
};
