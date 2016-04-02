'use strict';

module.exports = function (React, songsStore) {
    return React.createClass({
        propTypes: {
            song: React.PropTypes.object.isRequired,
            title: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired
        },

        onPlayClick: function () {
            songsStore.play(this.props.song);
        },

        render: function () {
            var title = this.props.title;

            return (
                <li className="collection-item">
                    <div>
                        <span>{ title }</span>

                        <a onClick={this.onPlayClick} className="secondary-content">
                            <i className="material-icons">play_circle_outline</i>
                        </a>
                    </div>
                </li>
            );
        }
    });
};
