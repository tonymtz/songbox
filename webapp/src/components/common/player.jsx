'use strict';

module.exports = function (React, songsStore) {
    var _audio;
    var _isPlaying;
    var _progress;

    return React.createClass({
        getInitialState: function () {
            return {
                currentSong: songsStore.getSelected(),
                audio: null,
                isPlaying: null,
                progress: null
            };
        },

        componentWillMount: function () {
            songsStore.addChangeListener(this.onSongsStateChange);
        },

        componentWillUnmount: function () {
            songsStore.removeChangeListener(this.onSongsStateChange);
        },

        onSongsStateChange: function () {
            this.setState(songsStore.getSelected());

            var song = this.state.song || {};

            if (!song.url) {
                return;
            }

            _audio = new Audio(song.url);
            _isPlaying = true;
            _audio.play();

            _audio.addEventListener('timeupdate', this.onTimeUpdate);
        },

        onTimeUpdate: function () {
            var el = _audio;
            var number = el.currentTime / el.duration * 100;

            this.setState({
                progress: number
            });

            if (number === 100) {
                _isPlaying = false;
            }
        },

        render: function () {
            var song = this.state.song || {title: 'Welcome 2 Songbox'};
            var progress = this.state.progress ? this.state.progress.toFixed(3) : 0;

            return (
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">
                            <p>{ song.title }</p>
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
