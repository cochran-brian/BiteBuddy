import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import NoPage from "./pages/NoPage";
import Join from "./pages/Join"
import './App.css';
import Result from "./pages/Result";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="survey/:id" element={<Survey />} />
          <Route path="join/:id" element={<Join />} />
          <Route path="result" element={<Result />} />
          <Route path="*" element={<NoPage />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
