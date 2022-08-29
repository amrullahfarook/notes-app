import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";
import { getNotes, reset } from "../features/notes/noteSlice";

function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (user === null) {
      navigate("/");
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // if (user) {
  //   const API_URL = "/api/notes/";
  //   const token = user.token;

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const response = axios.get(API_URL, config);

  //   setNotes(response);

  // const callback = (msg) => {
  //   toast.success(msg);
  // };

  // useEffect(() => {
  //   axios.get(API_URL, config).then((res) => {
  //     setNotes(res.data);
  //   });
  // }, [callback]);
  // }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.firstName}</h1>
        <p>Notes Dashboard</p>
      </section>

      <NoteForm />

      <section className="content">
        {notes.length > 0 ? (
          <div className="notes">
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <h3>You have not set any notes</h3>
        )}
      </section>
    </>
  );
}
export default UserDashboard;
