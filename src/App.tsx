import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
