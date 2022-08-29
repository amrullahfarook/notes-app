import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../features/notes/noteSlice";

function NoteItem({ note }) {
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  const { title, description } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNote({ ...note, title: title, description: description }));
    setUpdating(false);
    setFormData({
      title: "",
      description: "",
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {updating ? (
        <section className="form editNote">
          <button
            onClick={() => setUpdating(!updating)}
            className="btn btn-block"
          >
            back
          </button>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Update title"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="Update description"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update Note</button>
            </div>
          </form>
        </section>
      ) : (
        <div className="note">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <button
            onClick={() => dispatch(deleteNote(note._id))}
            className="close"
          >
            X
          </button>
          <button onClick={() => setUpdating(!updating)} className="edit">
            edit
          </button>
        </div>
      )}
    </>
  );
}
export default NoteItem;
