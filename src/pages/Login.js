import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { v4 as uuid } from "uuid";
import ValidationSchema from "../components/ValidationSchema";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router";
import Layout from "../components/Layout";
export default function Login() {
  const { users, isLogged, login, addUser } = useContext(AuthContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("users"))) {
      addUser(JSON.parse(localStorage.getItem("users")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <>
      <Layout>
        <div className="container-fluid row m-0 p-5 text-light">
          {isLogged && <Redirect to="/home" />}
          <div className="col col-12 col-lg-6 p-0">
            <Formik
              initialValues={{
                id: "",
                username: "",
                password: "",
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values, { resetForm }) => {
                users.map((user) => {
                  if (
                    values.username === user.username &&
                    values.password === user.password
                  ) {
                    login();
                  }
                  resetForm();
                  return user;
                });
              }}
            >
              {({ errors, values, touched }) => (
                <Form className="col col-12 ">
                  <div className="row justify-content-center align-items-center gap-3">
                    <h1 className="text-center">Log In</h1>
                    <div className="row align-items-center">
                      <label className="col col-3 fw-bold" htmlFor="username">
                        Username
                      </label>
                      <Field
                        className="col col-9 form-control w-50"
                        type="text"
                        label="Username"
                        name="username"
                        value={values.username}
                        placeholder="Game username"
                      />
                    </div>

                    {errors.username && touched.username ? (
                      <div className="text-center text-danger fw-bold">
                        {errors.username}
                      </div>
                    ) : null}
                    <div className="row align-items-center">
                      <label className="col col-3 fw-bold" htmlFor="password">
                        Password
                      </label>
                      <Field
                        className="col col-9 form-control w-50"
                        type="password"
                        label="Password"
                        name="password"
                        value={values.password}
                        placeholder="Game password"
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-center text-danger fw-bold">
                        {errors.password}
                      </div>
                    ) : null}
                    <div className="w-50">
                      <button className="btn btn-primary w-100 " type="submit">
                        Log In
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col col-12 col-lg-6 p-0">
            <Formik
              initialValues={{
                id: "",
                username: "",
                password: "",
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values, { resetForm }) => {
                values.id = uuid();
                addUser([...users, values]);
                resetForm();
              }}
            >
              {({ errors, values, touched }) => (
                <Form className="col col-12 pt-5 p-lg-0 ">
                  <div className="row justify-content-center align-items-center gap-3">
                    <h1 className="text-center">Register</h1>
                    <div className="row align-items-center">
                      <label className="col col-3 fw-bold" htmlFor="username">
                        Username
                      </label>
                      <Field
                        className="col col-9 form-control w-50"
                        type="text"
                        label="Username"
                        name="username"
                        value={values.username}
                        placeholder="Game username"
                      />
                    </div>
                    {errors.username && touched.username ? (
                      <div className="text-center text-danger fw-bold">
                        {errors.username}
                      </div>
                    ) : null}
                    <div className="row align-items-center">
                      <label className="col col-3  fw-bold" htmlFor="password">
                        Password
                      </label>
                      <Field
                        className="col col-9 form-control w-50"
                        type="password"
                        label="Password"
                        name="password"
                        value={values.password}
                        placeholder="Game password"
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-center text-danger fw-bold">
                        {errors.password}
                      </div>
                    ) : null}
                    <div className="w-50">
                      <button className="btn btn-primary w-100 " type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
}
