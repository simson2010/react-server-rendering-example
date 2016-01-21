var express = require('express');
var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Timer = React.createFactory(require('./Timer'));

var PLACEHOLDER = 'If you see this then something is wrong.';
var BUNDLE = fs.readFileSync('./browser-bundle.js', {encoding: 'utf8'});
var TEMPLATE = fs.readFileSync('./index.html', {encoding: 'utf8'});

var app = express();

function index_html(req, res) {
    // You could use JSX here; doesn't matter.
    markup = ReactDOMServer.renderToString(Timer());
    res.send(TEMPLATE.replace(PLACEHOLDER, markup));
}

app.get('/', index_html);
app.get('/index.html', index_html);
app.get('/browser-bundle.js', function(req, res) {
  res.send(BUNDLE);
});

app.listen(4000);
