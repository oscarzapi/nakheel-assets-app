import { CssBaseline } from "@mui/material";
import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
/* import Comments from "scenes/comments";
import SelfService from "scenes/selfservice"; */
const Layout = lazy(() => import('scenes/layout'))
const Overall = lazy(() => import('scenes/overall'))
const TotalSalesDetails = lazy(() => import('scenes/totalSalesDetails'))




function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline></CssBaseline>
        <Routes>
          <Route element={<Layout></Layout>}>
          <Route path="/" element={<Navigate to='/overall' replace></Navigate>}></Route>
          <Route path="/overall" element={<Overall></Overall>}></Route>
          <Route path="/total_sales_details" element={<TotalSalesDetails></TotalSalesDetails>}></Route>
          {/* <Route path="/comments" element={<Comments></Comments>}></Route>
          <Route path="/selfservice" element={<SelfService></SelfService>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
