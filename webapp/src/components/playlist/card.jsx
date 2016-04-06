'use strict';

module.exports = function (React, playlistStore) {
    return React.createClass({
        propTypes: {
            refKey: React.PropTypes.number.isRequired,
            song: React.PropTypes.object.isRequired
        },

        onPlayClick: function () {
            playlistStore.play(this.props.refKey);
        },

        render: function () {
            var name = this.props.song.name;
            var isPlayingClass = playlistStore.getCurrentIndex() === this.props.refKey ? ' blue lighten-5' : '';
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
};
