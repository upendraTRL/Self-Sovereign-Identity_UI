import Login from './components/Login';
import Registration from './components/Registration';
import Holder from './components/Holder';
import Verifier from './components/Verifier';
import Issuer from './components/Issuer';
import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/holder" element={<Holder />} />
      <Route path="/verifier" element={<Verifier />} />
      <Route path="/issuer" element={<Issuer />} />
    </Routes>
  );
}

export default App;
