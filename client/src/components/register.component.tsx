import { useState } from "react"
import {Link,} from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import AuthService from "../services/auth.service";
import { Appbar } from "./appbar.component";


export default function Register(){

const [successful, setSuccessful]=useState(false)
const [message, setMessage]=useState("")



  
  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  function handleRegister(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;

    setMessage("")
    setSuccessful(false)

    AuthService.register(
      username,
      email,
      password
    ).then(
      response => {
          
       
          setMessage(response.data.message)
          setSuccessful(true)
      },
      error => {
          setMessage(error.response.data.message)
          setSuccessful(false)

        });
      }
    

       const initialValues = {
      username: "",
      email: "",
      password: "",
    };
  

     return (
      <>
      <Appbar/>
      <div className="col-md-4 offset-4">
        <div className="card card-container">
         
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
              <div>
            <Link to={'/'}>
            Back to Login
            </Link>
            </div>
        </div>
      </div>
</>
    );
  
  }
