'use strict';

module.exports = function (React, spinnerStore) {
    return React.createClass({
        getInitialState: function getInitialState() {
            return _getState();
        },

        componentWillMount: function componentWillMount() {
            spinnerStore.addChangeListener(this.onPlaylistStateChange);
        },

        componentWillUnmount: function componentWillUnmount() {
            spinnerStore.removeChangeListener(this.onPlaylistStateChange);
        },

        onPlaylistStateChange: function onLoaderStateChange() {
            this.setState(_getState());
        },

        render: function () {
            var hideClass = this.state.loading ? '' : ' hide';
            var preloaderClass = 'preloader-wrapper small active' + hideClass;

            return (
                <div className={ preloaderClass }>
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    function _getState() {
        return {
            loading: spinnerStore.shouldDisplay()
        };
    }
};
