'use strict';

module.exports = function (React, playlistStore) {
    // TODO - duplicating props
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

            return (
                <li className="collection-item">
                    <div>
                        <span>{ name }</span>

                        <a onClick={this.onPlayClick} className="secondary-content">
                            <i className="material-icons custom">play_circle_outline</i>
                        </a>
                    </div>
                </li>
            );
        }
    });
};
