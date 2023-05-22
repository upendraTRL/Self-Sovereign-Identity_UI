import Login from './components/Login';
import Registration from './components/Registration';
import Holder from './components/Holder';
import Verifier from './components/Verifier';
import Issuer from './components/Issuer';
import { Routes, Route, Router } from "react-router-dom";

const user_types = {
  holder: 'holder',
  verifier: 'verifier',
  issuer: 'issuer'
}

const current_user = user_types.verifier;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      {/* We want to protect these routes */}
      <Route path="/holder" element={<Holder />} />
      <Route path="/verifier" element={<Verifier />} />
      <Route path="/issuer" element={<Issuer />} />
      {/* <Route path="/holder" element={<HolderElement><Holder /></HolderElement>} /> */}
    </Routes>
  );
}

// function HolderElement({ children }) {
//   if (current_user === user_types.holder) {
//     return <> {children}</>;
//   } else {
//     return <div>Not Authorized</div>;
//   }
// }


export default App;
