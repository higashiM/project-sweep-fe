import React, { Component } from 'react';

export class QuantityChanger extends Component {
  state = {
    quantityChange: 0,
  };

  render() {
    const { quantityChange } = this.state;
    return (
      <section className="quantity-changer-container">
        <button
          name=""
          className="increment-up-button"
          onClick={() => {
            this.incrementQuantity(1);
          }}
        >
          More
        </button>
        <p>{this.props.quantity + quantityChange}</p>
        <button
          className="increment-down-button"
          onClick={() => {
            this.incrementQuantity(-1);
          }}
        >
          Less
        </button>
      </section>
    );
  }

  incrementQuantity = (number) => {
    const { quantity, foodName } = this.props;
    if (number === -1 && quantity === 1) {
      this.props.deleteListItem(foodName);
    }
    this.setState((currentState) => {
      return { quantityChange: currentState.quantityChange + number };
    });
    // this.setState(
    //   (currentState) => {
    //     return { quantityChange: currentState.quantityChange + number };
    //   },
    //   () => {
    //     console.log(this.state.quantityChange);
    //   }
    // );
    // this.setState(
    //   (currentState) => {
    //     currentState.item.quantity += currentState.quantityChange;
    //     return { item: { ...currentState.item } };
    //   },
    //   () => {
    //     console.log(this.state.item);
    //   }
    // );
  };
}

export default QuantityChanger;
