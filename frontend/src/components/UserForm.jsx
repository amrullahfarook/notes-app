import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/users/userSlice";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    mobile: "",
    password: "",
    accountType: "",
  });

  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    password,
    accountType,
  } = formData;

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createUser({
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        password,
        accountType,
      })
    );

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      mobile: "",
      password: "",
      accountType: "",
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={mobile}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            value={status}
            onChange={onChange}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="accountType">accountType</label>
          <input
            type="text"
            name="accountType"
            id="accountType"
            value={accountType}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
export default UserForm;
