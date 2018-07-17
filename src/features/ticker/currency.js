import React from 'react';
import currencyFormatter from 'currency-formatter';

function formatCurrencyLabel(key) {
    const labels = {
        btcusd: 'BTC',
        ethusd: 'ETH'
    };

    return labels[key];
}

function formatCurrencyValue(value) {
    return currencyFormatter.format(value, {
        code: 'USD'
    });
}

export const Currency = (props) => {
    const currencyClassname = `currency-price delta-${props.delta}`;

    return <div className="box currency">
        {formatCurrencyLabel(props.currency)}
        <span className={currencyClassname}>{formatCurrencyValue(props.price)}</span>
    </div>;
};
