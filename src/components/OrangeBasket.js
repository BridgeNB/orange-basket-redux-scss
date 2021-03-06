import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Orange from './Orange';
import actions from '../actions/orangeActions';

class OrangeBasket extends Component {
  findStatusNow(){
    let stats = {
        orangeNow: {
            quantity: 0,
            weight: 0
        },
        orangeEaten: {
            quantity: 0,
            weight: 0
        }
    };
    this.props.orangeBasket.oranges.forEach((orange) => {
        let selector = orange.isEaten? 'orangeEaten': 'orangeNow';
        stats[selector].quantity += 1;
        stats[selector].weight += orange.weight;
    });
    return stats;
  }

  getOrangeIndividuals(oranges) {
    let data = [];

    oranges.forEach((orange) => {
      if (!orange.isEaten) {
        data.push(<Orange
          state={orange}
          eatOrange={this.props.actions.eatOrange}
          key={orange.id}/>)
      }
    });

    if (!data.length)
      data.push(<div className="empty-basket" key="empty">This is an empty basket</div>);

    return data;
  }

  render() {
    let { orangeBasket, actions } = this.props;
    let { oranges, isPicking } = orangeBasket;

    let status  = this.findStatusNow();

    let {
      orangeNow: {quantity: notEatenQuantity, weight: notEatenWeight},
      orangeEaten: {quantity: eatenQuantity, weight: eatenWeight}
    } = status;

    return (
      <div className="orangeBasket">
        <div className="title">The Orange Basket</div>
        <div className="stats">
          <div className="section">
            <div className="head">Current</div>
            <div className="content">
              {notEatenQuantity} Oranges,
              {' ' + notEatenWeight.toFixed(2)} ounce
            </div>
          </div>
          <div className="section">
            <div className="head">Have consumed</div>
            <div className="content">
              {eatenQuantity} Oranges,
              {' ' + eatenWeight.toFixed(2)} ounce
            </div>
          </div>
        </div>
        <div className="orangeList">
          { this.getOrangeIndividuals(oranges) }
        </div>
        <div className="btn-div">
          <button onClick={ actions.pickOrange }>
            <strong>Pick Orange</strong>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
      orangeBasket: state.orangeBasket
});

const mapDispatchToProps = dispatch => ({
      actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrangeBasket);
