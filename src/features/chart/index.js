import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import moment from 'moment';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.chartContainerId = `${props.pair}-chart-container`;
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        if (this.props.data) {
            this.chart.update({
                subtitle: {
                    text: 'chart data since ' + moment(this.props.data[0].datetime).fromNow()
                }
            });
            this.chart.series[0].update({
                data: this.props.data.map(entry => {
                    return {
                        name: moment(entry.datetime).format('HH:mm:ss'),
                        y: parseFloat(entry.price, 10)
                    };
                })
            });
        }
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    createChart() {
        this.chart = new Highcharts.Chart(this.chartContainerId, {
            title: {
                text: this.props.pair,
                style: {
                    fontSize: 14
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dashStyle: 'shortdot',
                    turboThreshold: 20000
                }
            },
            chart: {
                backgroundColor: '#111111',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 3,
                height: 200,
                maxWidth: 500
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                showInLegend: false,
                name: this.props.pair,
                data: []
            }]
        });
    }

    render() {
        return (<div className="chart">
            <div id={this.chartContainerId}></div>
        </div>);
    }
}

Chart.propTypes = {
    data: PropTypes.array,
    pair: PropTypes.string.isRequired
};

export default Chart;
