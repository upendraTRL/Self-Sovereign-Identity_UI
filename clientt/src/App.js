import Login from './components/Login';
import Registration from './components/Registration';
import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
