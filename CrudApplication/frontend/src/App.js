import "./App.css";
import NavBar from "./components/NavBar";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import { Routes, Route } from "react-router-dom";
import EditUser from "./components/EditUser";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
