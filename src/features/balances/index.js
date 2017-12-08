import React, { Component } from 'react';
import Http from '../../services/http';
import Poller from '../../services/poller';
import Config from '../../services/config';

import { Position } from './position';
import { BalancesModified } from './modified';

import './balances.css';

const CONFIG = Config.CONSTANTS;

class Balances extends Component {
  constructor() {
      super();
      
      this.state = {
        modified: null,
        positions: null
      };

      this.update = this.update.bind(this);
      this.init();
  }

  get balancesRequest() {
    return {
      id: 'balances',
      url: CONFIG.URL.API + '/balances',
      success: this.update,
      error: (error) => {
        console.warn('err', error)
      }
    }
  }

  update(data) {
    this.setState({
      modified: data.modified,
      positions: Object.keys(data.current).map((position) => {
        return {
          currency: data.current[position].currency,
          amount: data.current[position].amount
        }
      })
    })
  }

  init() {
    Http.get(this.balancesRequest).then(this.update);
    Poller.run(this.balancesRequest, 30000);
  }

  render() {
    const positions = this.state.positions;

    return (
      <section className="box balances">
        <div className="balances-positions">
          {positions && positions.length && positions.map((position, index) => {
            return <Position
                key={index}
                currency={position.currency}
                amount={position.amount}
              />
          })}
        </div>
        <BalancesModified modified={this.state.modified}/>
      </section>
    );
  }
}

export default Balances;
