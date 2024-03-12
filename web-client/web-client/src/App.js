import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import NoPage from "./pages/NoPage";
import Join from "./pages/Join"
import './App.css';

export default function App() {

  const { id } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="survey/:id" element={<Survey />} />
          <Route path="join/:id" element={<Join id={id}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
