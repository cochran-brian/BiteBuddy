import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import NoPage from "./pages/NoPage";
import Join from "./pages/Join"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="survey/:id" 
            element={<Survey />}
            // loader={async ({ params }) => {
            //   return fetch(
            //     `localhost`
            //   );
            // }} 
            />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
