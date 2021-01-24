import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

class FormikForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isValid: false,
  };

  handleChange = (values) => {
    this.setState({
      userName: values.userName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(6, "Username should be between 6 and 15 characters")
      .max(15, "Username should be between 6 and 15 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password don't match"
    ),
  });

  render() {
    return (
      <div>
        <h5>Formik form with yup</h5>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isSubmitting: true,
          }}
          validationSchema={this.validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              console.log(values);
              //setSubmitting(true);
              resetForm();
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleReset,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="userName"
                    value={values.userName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="help-block text-danger">
                    {errors.userName && touched.userName && errors.userName}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="help-block text-danger">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="help-block text-danger">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="help-block text-danger">
                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  </span>
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
                    <button className="btn btn-danger" disabled={!dirty} onClick={handleReset} type="button">Reset</button> 
                </div>
              </form>
            );
          }}
        </Formik>
        <p>username: {this.state.userName}</p>
        <p>email: {this.state.email}</p>
        <p>password: {this.state.password}</p>
        <p>confirmPassword: {this.state.confirmPassword}</p>
      </div>
    );
  }
}

export default FormikForm;
