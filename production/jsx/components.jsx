var React = require('react');

class Hello extends React.Component {
    render() {
        return <span>Hello {this.props.what}!</span>
    }
}

module.exports = {
    Hello: Hello
};
