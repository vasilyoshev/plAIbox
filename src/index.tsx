import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ColorProvider } from "utils";
import { App } from "App";
import { store } from "store";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ColorProvider>
        <App />
      </ColorProvider>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
