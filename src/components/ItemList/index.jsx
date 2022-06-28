import { useState } from "react";

const ItemList = ({ item, onchange }) => {
  console.log(item);
  return (
    <li>
      <input
        type="checkbox"
        value={item?.text}
        checked={item?.checked}
        onChange={(e) => onchange(e, item?.id)}
      />
      <span className={item?.checked ? "checked" : ""}>{item?.text}</span>
    </li>
  );
};

export default ItemList;
