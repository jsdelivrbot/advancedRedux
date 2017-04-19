import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Field, reduxForm} from 'redux-form';
import {validateSignup} from '../../validation/validate';


const renderField = ({input, label, type, placeholder, meta: {touched, error}}) => (
  <fieldset className="form-group">
      <label>{label}</label>
      <input {...input} type={type} placeholder={placeholder} className="form-control" />
              {touched && error && <span className="error text-danger">{error}</span>}
  </fieldset>
)

class Signup extends Component {

  componentWillMount() {
    this.props.resetErrors();
  }

  handleFormSubmit({email, password, confirmPassword}) {
    // Call action creator to sign up the user
    this.props.signupUser({email, password});
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

        <Field name="email" type="email" label="Email:" placeholder = "Enter your email" component={renderField}  />
        <Field name="password" type="password" label="Password:" placeholder = "Enter password" component={renderField}  />
        <Field name="confirmPassword" type="password" label="Confirm Password:" placeholder = "Confirm Password" component={renderField}  />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    );

  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

const signupForm = reduxForm({
  form: 'signup',
  validate: validateSignup
})(Signup);

export default connect(mapStateToProps, actions)(signupForm);
