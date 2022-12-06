import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

//on the browser this will be a div with id root
const root = ReactDOM.createRoot(document.getElementById("root"));

//Redux Thunk is a middleware that lets you call action creators that return a
//function instead of an action object
//you need this middleware to dispatch action as functions
const store = createStore(reducers, compose(applyMiddleware(thunk)));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
/**middleware) Middleware is the suggested
 * way to extend Redux with custom functionality.
 *  Middleware lets you wrap the store's dispatch method for fun and profit.
 * The key feature of middleware is that it is composable. */
