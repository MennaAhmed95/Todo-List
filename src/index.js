import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "ol/ol.css";
import reportWebVitals from "./reportWebVitals";
import { OlMap, SimpleMap } from "./components/SimpleMap/index";
import MyApp from "./myApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
