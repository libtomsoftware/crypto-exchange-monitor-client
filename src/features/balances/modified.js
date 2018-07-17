import React, { Component } from 'react';
import moment from 'moment';

export class BalancesModified extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modifiedFriendlyDateTime: null
        };

        this.setModifiedDatetime = this.setModifiedDatetime.bind(this);
    }

    componentDidMount() {
        window.setInterval(this.setModifiedDatetime, 1000);
    }

    setModifiedDatetime() {
        if (this.props.modified) {
            this.setState({
                modifiedFriendlyDateTime: moment(this.props.modified).fromNow()
            });
        }
    }

    render() {
        const modified = this.state.modifiedFriendlyDateTime;

        return (
            <span className="balances-modified">
                {modified && `updated ${modified}`}
            </span>
        );
    }
}
