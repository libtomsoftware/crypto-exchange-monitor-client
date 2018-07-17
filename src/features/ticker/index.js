import React, { Component } from 'react';
import Http from '../../services/http';
import Poller from '../../services/poller';
import Config from '../../services/config';

import { Currency } from './currency';
import Chart from '../chart';

import './ticker.css';

const CONFIG = Config.CONSTANTS;

class Ticker extends Component {
    constructor() {
        super();

        this.update = this.update.bind(this);
        this.init();
    }

    get tickerRequest() {
        return {
            id: 'ticker',
            url: CONFIG.URL.API + '/ticker',
            success: this.update,
            error: (error) => {
                console.warn('err', error);
            }
        };
    }

    determineDelta(latest, oneBeforeLatest) {
        if (!oneBeforeLatest) {
            return 'equals';
        }

        if (latest.price > oneBeforeLatest.price) {
            return 'more';
        }

        if (latest.price < oneBeforeLatest.price) {
            return 'less';
        }

        return null;
    }

    update(data) {
        Object.keys(data).forEach((key) => {
            const dataUpdate = {},
                values = data[key],
                length = values.length,
                latest = values[length - 1],
                oneBeforeLatest = values[length - 2];

            latest.delta = this.determineDelta(latest, oneBeforeLatest);

            dataUpdate[key] = {};
            dataUpdate[key].values = values;
            dataUpdate[key].latest = latest;
            this.setState(dataUpdate);
        });
    }

    init() {
        Http.get(this.tickerRequest).then(this.update);
        Poller.run(this.tickerRequest, 5000);
    }

    render() {
        const currencies = this.state ? Object.keys(this.state) : null;

        return (
            <div className="ticker-container">
                <section className="ticker">
                    {currencies && currencies.length && currencies.map((currency, index) => {
                        const latest = this.state[currency].latest;

                        return <Currency
                            key={index}
                            currency={currency}
                            datetime={latest.datetime}
                            price={latest.price}
                            delta={latest.delta}
                        />;
                    })}
                </section>
                <div className="charts-container">
                    {this.state && this.state.btcusd && <Chart
                        data={this.state.btcusd.values}
                        pair="BTC/USD"
                    />}
                    {this.state && this.state.ethusd && <Chart
                        data={this.state.ethusd.values}
                        pair="ETH/USD"
                    />}
                </div>
            </div>
        );
    }
}

export default Ticker;
