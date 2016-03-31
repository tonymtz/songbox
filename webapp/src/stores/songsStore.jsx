'use strict';

var sampleData;

module.exports = function (fluxtore) {
    var store = fluxtore.createStore({
        events: ['change'],

        getSongs: function () {
            return sampleData;
        },

        actions: {}
    });

    return store;
};

sampleData = [
    {
        "bytes": 3822582,
        "client_mtime": "Thu, 31 Mar 2016 05:31:21 +0000",
        "icon": "page_white_sound",
        "mime_type": "audio/mpeg",
        "modified": "Thu, 31 Mar 2016 05:31:21 +0000",
        "path": "/songbox/Chevelle - The Red (Meytal Cover).mp3",
        "rev": "24670389c",
        "root": "app_folder",
        "size": "3.6 MB",
        "modifier": null
    },
    {
        "bytes": 4146285,
        "client_mtime": "Thu, 31 Mar 2016 05:31:50 +0000",
        "icon": "page_white_sound",
        "mime_type": "audio/mpeg",
        "modified": "Thu, 31 Mar 2016 05:31:50 +0000",
        "path": "/songbox/System Of A Down - Toxicity ft. Chino Moreno.mp3",
        "rev": "34670389c",
        "root": "app_folder",
        "size": "4 MB",
        "modifier": null
    },
    {
        "bytes": 10999533,
        "client_mtime": "Thu, 31 Mar 2016 05:32:58 +0000",
        "icon": "page_white_sound",
        "mime_type": "audio/mpeg",
        "modified": "Thu, 31 Mar 2016 05:32:58 +0000",
        "path": "/songbox/Tool - No Quarter.mp3",
        "rev": "44670389c",
        "root": "app_folder",
        "size": "10.5 MB",
        "modifier": null
    },
    {
        "bytes": 4955252,
        "client_mtime": "Thu, 31 Mar 2016 05:33:33 +0000",
        "icon": "page_white_sound",
        "mime_type": "audio/mpeg",
        "modified": "Thu, 31 Mar 2016 05:33:33 +0000",
        "path": "/songbox/Tool - Sober.mp3",
        "rev": "54670389c",
        "root": "app_folder",
        "size": "4.7 MB",
        "modifier": null
    }
];
