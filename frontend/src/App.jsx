import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, WelcomePage } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
