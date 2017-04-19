import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {validateSignin} from '../../validation/validate';

import {AUTH_USER, UNAUTH_USER} from '../../actions/types';

const renderField = ({input, label, type, placeholder, meta: {touched, error}}) => (
  <fieldset className="form-group">
      <label>{label}</label>
      <input {...input} type={type} placeholder={placeholder} className="form-control" />
              {touched && error && <span className="error text-danger">{error}</span>}
  </fieldset>
)

class Signin extends Component {
  componentWillMount() {
    // Reset error messages in redux state
    this.props.resetErrors();
  }
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit} = this.props;

    return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <Field label="Email:" name="email" type="email"
        placeholder="Enter your email" component={renderField} />
      <Field label="Password:" name="password" type="password"
        placeholder="Password" component={renderField} />
      {this.renderAlert()}
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

const signinForm = reduxForm({
  form: 'signin',
  validate: validateSignin
})(Signin);

export default connect(mapStateToProps, actions)(signinForm);
