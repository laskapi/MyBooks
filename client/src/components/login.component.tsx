import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import AuthService from "../services/auth.service"


export default function Login() {
  const [redirect, setRedirect] = useState<String | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigateHome()
    };
    return /*    window.location.reload(); */
  })



  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  function handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    setMessage(""),
      setLoading(true)


    AuthService.login(username, password).then(
      () => {
        navigateHome()
      }
      ,
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false)
        setMessage(resMessage)

      }
    );
  }

  function navigateHome() {
    navigate('/home', { replace: true })
  }

  const initialValues = {
    username: "",
    password: "",
  };



  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            </div>
          </Form>
        </Formik>
        <div>
          Not a member?{" "}
          <Link to={"/Register"}>
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
