import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

// App
import App from "./App";

// Redux Store
import { store } from "./redux/store";

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
