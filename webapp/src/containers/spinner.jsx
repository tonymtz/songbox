export default function(React, spinnerStore) {
    let spinnerProxy;

    spinnerProxy = React.createClass({
        getInitialState: () => getState(),

        componentWillMount: componentWillMount,

        componentWillUnmount: componentWillUnmount,

        onStoreChange: onStoreChange,

        render: render
    });

    return spinnerProxy;

    function getState() {
        return {
            loading: spinnerStore.shouldDisplay()
        };
    }

    function componentWillMount() {
        spinnerStore.addChangeListener(this.onStoreChange);
    }

    function componentWillUnmount() {
        spinnerStore.removeChangeListener(this.onStoreChange);
    }

    function onStoreChange() {
        this.setState(getState());
    }

    function render() {
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
};
