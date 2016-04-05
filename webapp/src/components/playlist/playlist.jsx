'use strict';

module.exports = function (React, Card, playlistStore) {
    return React.createClass({
        getInitialState: function () {
            return playlistStore.get();
        },

        componentWillMount: function () {
            playlistStore.addChangeListener(this.onSongStateChange);
        },

        componentWillUnmount: function () {
            playlistStore.removeChangeListener(this.onSongStateChange);
        },

        onSongStateChange: function () {
            this.setState(playlistStore.get());
        },

        createCards: function () {
            return this.state.songs.map(function (song, index) {
                return (
                    <Card
                        key={index}
                        song={song}
                        refKey={index}
                    />
                );
            });
        },

        refreshSongs: function () {
            return playlistStore.refresh();
        },

        render: function () {
            var cards = this.createCards();

            return (
                <div>
                    <div className="row">
                        <h6>&nbsp;</h6>
                    </div>
                    <div className="row">
                        <a onClick={this.refreshSongs} className="right waves-effect waves-light btn light-blue">
                            <i className="material-icons">refresh</i>
                        </a>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="collection">{ cards }</ul>
                        </div>
                    </div>
                </div>
            );
        }
    });
};
