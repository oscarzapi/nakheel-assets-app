import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout"
import Dashboard from "scenes/dashboard";
import Comments from "scenes/comments";
import SelfService from "scenes/selfservice";

function App() {
  const mode = useSelector((state) => state.global.mode)

  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline></CssBaseline>
        <Routes>
          <Route element={<Layout></Layout>}>
          <Route path="/" element={<Navigate to='/dashboard' replace></Navigate>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/comments" element={<Comments></Comments>}></Route>
          <Route path="/selfservice" element={<SelfService></SelfService>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
