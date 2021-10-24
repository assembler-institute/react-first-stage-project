import React, { useContext } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";

export default function SignUp() {
  //? ¿Lo podemos desestructurar más? => const {signUp, logIn} = useContext(CryptoWebContext);
  const state = useContext(CryptoWebContext);
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (!values.username) {
          errors.username = "Username required";
        } else if (values.username.length < 6) {
          errors.username = "Your username must be at least 5 characters long";
        } else if (!values.password) {
          errors.password = "Required";
        } else if (!values.repeatPassword) {
          errors.repeatPassword = "Required";
        } else if (values.password !== values.repeatPassword) {
          errors.password = "Both passwords must match";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          state.signUp(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="username" name="username" placeholder="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="email" name="email" placeholder="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="password" />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
          />
          <ErrorMessage name="repeatPassword" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
}
