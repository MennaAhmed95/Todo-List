import logo from "./logo.svg";
import "./App.css";
import AddForm from "./components/AddForm";
import ItemList from "./components/ItemList";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([{ id: 0, text: "list1", checked: true }]);
  const [text, setText] = useState("");

  const handleAdd = (e, text) => {
    e.preventDefault();
    console.log(text);
    if (text) setItems([...items, { id: Date.now(), text, checked: false }]);
    setText("");
  };

  const onchange = (event, index) => {
    const Completed = items.filter((itm) => {
      if (itm.id === index) {
        itm.checked = event.target.checked;
      }
      return itm;
    });
    setItems([...items]);
  };
  return (
    <div className="App">
      <AddForm handleAdd={handleAdd} text={text} setText={setText} />
      <ul>
        {items.map((itm) => (
          <ItemList key={itm.id} item={itm} onchange={onchange} />
        ))}
      </ul>
    </div>
  );
}

export default App;
