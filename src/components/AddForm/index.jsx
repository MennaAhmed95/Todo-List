import { useState } from "react";

const AddForm = ({ handleAdd, text, setText }) => {
  return (
    <>
      <h2>Todo List</h2>
      <form onSubmit={(e) => handleAdd(e, text)}>
        <input
          type="text"
          value={text}
          className="todo_text"
          placeholder="Enter Items..."
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-Add">Add</button>
      </form>
    </>
  );
};

export default AddForm;
