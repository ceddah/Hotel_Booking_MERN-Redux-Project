import React from "react";

const RegisterForm = ({
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={submitHandler} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label">Your Name</label>
      <input
        type="text"
        className="form-control"
        value={name}
        placeholder="Enter Name"
        onChange={({ target }) => setName(target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">E-Mail Address</label>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Enter E-Mail Address"
        onChange={({ target }) => setEmail(target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Enter Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>

    <button className="btn btn-primary">Submit</button>
  </form>
);

export default RegisterForm;
