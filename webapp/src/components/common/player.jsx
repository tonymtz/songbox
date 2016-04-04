'use strict';

module.exports = function (React, songStore) {
    var _audio;
    var _isPlaying;
    var _progress;

    function update(currentState, newState) {
        var resultState = Object.create(currentState);
        for (var prop in currentState) {
            resultState[prop] = newState[prop] || currentState[prop];
        }
        return resultState;
    }

    return React.createClass({
        getInitialState: function () {
            return {
                currentSong: songStore.get(),
                audio: null,
                isPlaying: null,
                progress: null
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
            }

            var audio, isPlaying;

            if (currentSong.url) {
                isPlaying = true;
                audio = new Audio(currentSong.url);
                audio.play();
                audio.addEventListener('timeupdate', this.onTimeUpdate);
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
            var isPlaying = number < 100;

            var newState = update(this.state, {
                progress: number,
                isPlaying: isPlaying
            });

            this.setState(newState);
        },

        render: function () {
            var currentSong = this.state.currentSong || {name: 'Welcome 2 Songbox'};
            var progress = this.state.progress ? this.state.progress.toFixed(3) : 0;

            return (
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">
                            <p>{ currentSong.name }</p>
                            <div className="progress">
                                <div className="determinate" style={{width: progress + '%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
};
