import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../components/UserForm";
import UserItem from "../components/UserItem";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/users/userSlice";
import { useState } from "react";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (user === null) {
      navigate("/");
    }

    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(getUsers(search));

    setSearch("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.firstName}</h1>
        <p>Users Dashboard</p>
      </section>

      <UserForm />

      <h2 className="userListHeading">Users</h2>
      <hr />

      <form className="search">
        <div className="form-group">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Search
          </button>
        </div>
      </form>

      <section className="content">
        {users.length > 0 ? (
          <div className="notes">
            {users.map((user) => (
              <UserItem key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <h3>You have not set any users</h3>
        )}
      </section>
    </>
  );
}
export default AdminDashboard;
