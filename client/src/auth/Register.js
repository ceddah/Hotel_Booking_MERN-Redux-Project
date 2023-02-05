import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOGIN } from "../constants/routes";
import { register } from "../actions/auth";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      register({ name, email, password });
      toast.success("Register Success. Try Logging In.");
      setEmail("");
      setPassword("");
      setName("");
      history.push(LOGIN);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              submitHandler={submitHandler}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
