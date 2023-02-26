import { CssBaseline } from "@mui/material";
import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
/* import Comments from "scenes/comments";
import SelfService from "scenes/selfservice"; */
const Layout = lazy(() => import('scenes/layout'))
const Dashboard = lazy(() => import('scenes/dashboard'))




function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline></CssBaseline>
        <Routes>
          <Route element={<Layout></Layout>}>
          <Route path="/" element={<Navigate to='/dashboard' replace></Navigate>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          {/* <Route path="/comments" element={<Comments></Comments>}></Route>
          <Route path="/selfservice" element={<SelfService></SelfService>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
