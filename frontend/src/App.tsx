import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import "./App.css"
// ------------------------ LAZY LOADING ----------------------------------------

const Home = lazy(() => import("./Components/Home/Home"));
const About = lazy(() => import("./Components/About/About"));
const Contact = lazy(() => import("./Components/Contact/Contact"));

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Suspense fallback={<>Loading</>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
