import "semantic-ui-css/semantic.min.css";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Writing } from "./components/Writing";
import UserEdit from "./components/UserEdit";

function App() {
  return (
    <Router>
      <div className="ui raised very padded text container segment">
        <Routes>
          {/* React Router v6 ile birlikte "Route" componentlerini sıralamak için "Routes" kullanımı zorunlu hale getirildi.
          "component" probu yerine de "element" probu getirildi. (3 Kasım 2021)  */}
          <Route path="/" element={<Users />} />
          <Route path="/users/:id" exact element={<UserDetails />} />
          <Route path="/addwriting" element={<Writing />}></Route>
          <Route path="/users/:id/edit" element={<UserEdit />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
