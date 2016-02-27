var React = require('react'),
    ReactDOM = require('react-dom'),
    ListOfPingStat = require('prod-components').ListOfPingStat;

ReactDOM.render(
    <ListOfPingStat pingStatPropsList={[
        {
            numRecentPings: 19,
            youtubeId: 'a',
            title: 'Lorem ipsum dolor',
            dateTimeLastPing: new Date().toString()
        },
        {
            numRecentPings: 5,
            youtubeId: 'b',
            title: 'sit amet, consectetur adipiscing elit',
            dateTimeLastPing: new Date().toString()
        }]}
        restEndpoint={''}
        sinceDateTime={''}
        numPingsUpperBound={21} />,
    document.getElementById('cmp1'));

var extraCss = 'body { background-color: #3f1255; }';
ReactDOM.render(<style>{extraCss}</style>, document.getElementById('css'));

// hello! Penny was here
// how are you today?
