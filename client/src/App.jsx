import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import BasicsPage from "./pages/BasicsPage";
import ProtocolBb84 from "./pages/ProtocolBb84";
import ProtocolE91 from "./pages/ProtocolE91";



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />  

        <Route path='/' element={<Layout />}>
          <Route path='home' element={<HomePage/>} />
          <Route path='quantum-basics' element={<BasicsPage/>} />
          <Route path='bb84' element={<ProtocolBb84/>} />
          <Route path='e91' element={<ProtocolE91/>} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
