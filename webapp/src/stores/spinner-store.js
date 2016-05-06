export default function(fluxtore) {
    let callstack = 0;
    let spinnerProxy;

    return spinnerProxy = fluxtore.createStore({
        events: ['change'],

        shouldDisplay: shouldDisplay,

        actions: {
            hide: hide,

            panic: panic,

            show: show
        }
    });

    function shouldDisplay() {
        return callstack > 0;
    }

    function hide() {
        callstack -= callstack > 0 ? 1 : 0;

        spinnerProxy.emitChange();
    }

    function panic() {
        callstack = 0;

        spinnerProxy.emitChange();
    }

    function show() {
        callstack += 1;

        spinnerProxy.emitChange();
    }
}
