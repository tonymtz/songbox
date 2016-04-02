'use strict';

module.exports = function (React, Card, songsStore) {
    return React.createClass({
        getInitialState: function () {
            return songsStore.getList();
        },

        componentWillMount: function () {
            songsStore.addChangeListener(this.onSongsStateChange);
        },

        componentWillUnmount: function () {
            songsStore.removeChangeListener(this.onSongsStateChange);
        },

        onSongsStateChange: function () {
            this.setState(songsStore.getList());
        },

        createCards: function () {
            return this.state.songs.map(function (song, index) {
                return (
                    <Card
                        key={index}
                        song={song}
                        title={song.title}
                        path={song.path}
                    />
                );
            });
        },

        refreshSongs: function () {
            return songsStore.refresh();
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
