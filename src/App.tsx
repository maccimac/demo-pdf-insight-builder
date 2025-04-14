// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"

function App() {
  return (
    <div className="pdf-insight-builder">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
