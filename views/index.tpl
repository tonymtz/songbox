<!DOCTYPE html>

<html>
<head>
    <title>Songbox</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <!-- favicon -->

    <link rel="stylesheet" href="static/components/Materialize/dist/css/materialize.min.css"/>
    <link rel="stylesheet" href="static/css/main.css"/>

    <script src="static/components/jquery/dist/jquery.min.js"></script>
    <script src="static/components/Materialize/dist/js/materialize.min.js"></script>
</head>
<body class="valign-wrapper">

<svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <symbol id="icon-dropbox" viewBox="0 0 16 16">
            <title>dropbox</title>
            <path class="path1" d="M11.5 0.5l-3.5 3 4.5 3 3.5-3z"></path>
            <path class="path2" d="M8 3.5l-3.5-3-4.5 3 3.5 3z"></path>
            <path class="path3" d="M12.5 6.5l3.5 3-4.5 2.5-3.5-3z"></path>
            <path class="path4" d="M8 9l-4.5-2.5-3.5 3 4.5 2.5z"></path>
            <path class="path5"
                  d="M11.377 13.212l-3.377-2.895-3.377 2.895-2.123-1.179v1.467l5.5 2.5 5.5-2.5v-1.467z"></path>
        </symbol>
    </defs>
</svg>

<div class="container white">
    <div class="row">
        <header class="center-align">
            <h1>This is you Songbox :)</h1>

            <a href="/login" class="waves-effect waves-light btn-large light-blue">
                <svg class="icon icon-dropbox">
                    <use xlink:href="#icon-dropbox"></use>
                </svg>
                <span class="mls"> Login with Dropbox</span>
            </a>
        </header>
        <div class="col s12 center-align">
            <p>Soundbox is an audio player that lets you listen your favorite music directly from your Dropbox.</p>
        </div>
    </div>
</div>
</body>
</html>
