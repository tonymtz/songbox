'use strict';

module.exports = function (React, songStore) {
    // TODO - duplicating props
    return React.createClass({
        propTypes: {
            song: React.PropTypes.object.isRequired
        },

        onPlayClick: function () {
            songStore.play(this.props.song);
        },

        render: function () {
            var title = this.props.song.title;

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
