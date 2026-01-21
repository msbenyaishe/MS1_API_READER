import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FilComp from "./components/FilComp";
import AddComp from "./components/AddComp";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
        
          <Route path="/" element={<Navigate to="/FilComp" />} />
        
          <Route path="/FilComp" element={<FilComp />} />
          
          <Route path="/addComp" element={<AddComp />} />
          
          <Route path="*" element={
            <h1>
              Page Not Found
            </h1>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;