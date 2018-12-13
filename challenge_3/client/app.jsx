class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formView: 1,
      forms: props.props

    };
  }

  changeToNext() {
    this.setState({
      formView: this.state.formView < 3 ? this.state.formView + 1 : this.state.formView
    });
  }

  changeToPrevious() {
    this.setState({
      formView: this.state.formView > 1 ? this.state.formView - 1 : this.state.formView
    });
  }

  render() {
    return (
      <div>
        <h3>Customer Checkout App</h3>
          <form method="POST">
            {this.state.forms[this.state.formView].map(formText => {
              return (
                <div>
                  <label htmlFor={formText}>{formText}</label>
                  <input type="text"  id={formText}></input>
                </div>
              );
            })}
          </form>
          <button id="previous" onClick={this.changeToPrevious.bind(this)}>Previous</button>
          <button id="next" onClick={this.changeToNext.bind(this)}>Next</button>
      </div>
    );
  }
}

let forms = {
  1: ['Name: ', 'Email: ', 'Password: '],
  2: ['Line 1: ', 'Line 2: ', 'City: ', 'State: ', 'Zipcode: '],
  3: ['Credit Card Number: ', 'Expiration Data: ', 'CVV: ', 'Billing Zipcode: ']
};


ReactDOM.render(
  <App props={forms} />,
  document.getElementById('app')
);