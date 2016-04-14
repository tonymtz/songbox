'use strict';

module.exports = function (React, playerStore) {
    var cardComponent = React.createClass({
        propTypes: {
            refKey: React.PropTypes.number.isRequired,
            song: React.PropTypes.object.isRequired
        },

        // getInitialState: function () {
        //     return _getCardState();
        // },
        //
        // componentWillMount: function () {
        //     playlistStore.addChangeListener(this.onPlaylistStateChange);
        // },
        //
        // componentWillUnmount: function () {
        //     playlistStore.removeChangeListener(this.onPlaylistStateChange);
        // },

        onPlaylistStateChange: function () {
            this.setState(_getCardState());
        },

        onPlayClick: function () {
            playerStore.loadSong(this.props.refKey);
        },

        render: function () {
            var name = this.props.song.name;
            // var isPlayingClass = this.state.currentIndex === this.props.refKey ? ' blue lighten-5' : '';
            var isPlayingClass = '';
            var collectionItemClass = 'collection-item' + isPlayingClass;

            return (
                <li className={ collectionItemClass }>
                    <a onClick={this.onPlayClick} className="pointer">
                        { name }
                    </a>

                    <a onClick={this.onPlayClick} className="secondary-content pointer">
                        <i className="material-icons custom">play_circle_outline</i>
                    </a>
                </li>
            );
        }
    });

    return cardComponent;

    // function _getCardState() {
    //     return {
    //         currentIndex: playlistStore.getCurrentIndex()
    //     };
    // }
};
