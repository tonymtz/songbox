export default function(React, playerStore, musicStore) {
    let playerProxy;

    return playerProxy = React.createClass({
        getInitialState: getInitialState,

        componentDidMount: function() {
            playerStore.init();
        },

        componentWillMount: function() {
            playerStore.addChangeListener(this.onPlaylistStateChange);
        },

        componentWillUnmount: function() {
            playerStore.removeChangeListener(this.onPlaylistStateChange);
        },

        onPlaylistStateChange: function() {
            this.setState(_getState());
        },

        render: function() {
            let currentSong = this.state.currentSongPath || { name: 'Welcome 2 Songbox' };
            let currentTime = _convertTime(this.state.currentTime);
            let togglePauseClassName = 'el';
            togglePauseClassName += this.state.isPlaying ? ' el-pause' : ' el-play';
            let progress = this.state.progress ? this.state.progress.toFixed(3) : 0;
            let songDuration = _convertTime(this.state.songDuration);

            return (
                <div className="player">
                    <div className="container">
                        <div className="data">
                            <div className="title">{ currentSong.title }</div>
                            <div className="time">
                                <span className="light">{ currentTime }</span>
                                <span className="divisor">/</span>
                                { songDuration }
                            </div>
                        </div>
                        <div className="controls">
                            <button className="btn blue" onClick={ togglePlayButtonHandler }>
                                <i className={ togglePauseClassName }></i>
                            </button>
                            <button className="btn blue" onClick={ goBefore }>
                                <i className="el el-step-backward"></i>
                            </button>
                            <button className="btn blue" onClick={ goNext }>
                                <i className="el el-step-forward"></i>
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
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }

    function _getState() {
        return {
            currentSongPath: musicStore.getCurrentSong(),
            currentTime: playerStore.getCurrentTime(),
            isPlaying: playerStore.isPlaying(),
            progress: playerStore.getProgress(),
            songDuration: playerStore.getSongLength()
        };
    }

    function getInitialState() {
        return _getState();
    }

    function togglePlayButtonHandler() {
        playerStore.togglePlay();
    }

    function goBefore() {
        musicStore.goPrevious();
    }

    function goNext() {
        musicStore.goNext();
    }
};
