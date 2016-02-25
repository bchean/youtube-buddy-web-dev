var React = require('react'),
    ReactDOM = require('react-dom'),
    ListOfPingStat = require('prod-components').ListOfPingStat;

var numPingsUpperBenchmark = 21;

ReactDOM.render(
    <ListOfPingStat pingStatPropsList={[
        {
            numPings: 19,
            numPingsUpperBenchmark: numPingsUpperBenchmark,
            youtubeId: 'a',
            title: 'Lorem ipsum dolor',
            dateTimeLastPing: Date.now()
        },
        {
            numPings: 5,
            numPingsUpperBenchmark: numPingsUpperBenchmark,
            youtubeId: 'b',
            title: 'sit amet, consectetur adipiscing elit',
            dateTimeLastPing: Date.now()
        }]} />,
    document.getElementById('cmp1'));

var extraCss = 'body { background-color: #3f1255; }';
ReactDOM.render(<style>{extraCss}</style>, document.getElementById('css'));

// hello! Penny was here
// how are you today?
