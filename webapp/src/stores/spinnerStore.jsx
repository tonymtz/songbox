'use strict';

module.exports = function (fluxtore) {
    var _callstack = 0;

    return fluxtore.createStore({
        events: ['change'],

        hide: function () {
            _callstack -= _callstack > 0 ? 1 : 0;
            this.emitChange();
        },

        panic: function () {
            _callstack = 0;
            this.emitChange();
        },

        shouldDisplay: function () {
            return _callstack > 0;
        },

        show: function () {
            _callstack += 1;
            this.emitChange();
        }
    });
};
