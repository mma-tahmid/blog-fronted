import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ReadPage from "./pages/ReadPage.jsx";


//bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

//bootstrap js import
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SinglePage from "./pages/SinglePage.jsx";

import { Toaster } from "react-hot-toast";
import UpdatePage from "./pages/UpdatePage.jsx";
// import Registration from "./pages/auth/Registration.jsx";
// import Login from "./pages/auth/Login.jsx";

const App = () => {
  return (
    <div>


      <BrowserRouter>
        <Routes>

          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/" element={<ReadPage />}></Route>
          <Route path="/post/:postId" element={<SinglePage />}></Route>
          <Route path={"/update/:postId"} element={<UpdatePage />}></Route>
          {/* <Route path={"/register"} element={<Registration />}></Route>
          <Route path={"/login"} element={<Login />}></Route> */}



        </Routes>
      </BrowserRouter>


      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default App;