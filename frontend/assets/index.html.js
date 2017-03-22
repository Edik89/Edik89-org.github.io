module.exports = function(templateParams) {
    var manifestSource = templateParams.compilation.assets['manifest.json'].source();

    // remove manifest.json from assets so it won't be written to disk
    delete templateParams.compilation.assets['manifest.json'];

    return `<!DOCTYPE html>
<html lang="en">
    <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity=" sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <meta charset="utf-8">
    </head>
    <body>
        <div id="root"></div>
        <script type="text/javascript">window.webpackManifest=${manifestSource};</script>
    </body>
</html>`;
};
