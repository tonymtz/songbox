'use strict';

module.exports = function (React, Playlist, Player) {
    return React.createClass({
        render: function () {
            return (
                <div>
                    <div className="row">
                        <div className="col s12">
                            <Playlist/>
                        </div>
                    </div>
                    <Player/>
                </div>
            );
        }
    });
};
