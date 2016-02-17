var React = require('react'),
    ReactDOM = require('react-dom'),
    Hello = require('prod-components').Hello;

ReactDOM.render(<Hello what="World"/>, document.getElementById('cmp-goes-here'));
