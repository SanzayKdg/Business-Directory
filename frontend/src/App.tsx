import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header/Header.js";
import Footer from "./Layout/Footer/Footer.js";
import "./App.css";
// ------------------------ LAZY LOADING ----------------------------------------

const Home = lazy(() => import("./Components/Home/Home"));
const About = lazy(() => import("./Components/About/About"));
const Contact = lazy(() => import("./Components/Contact/Contact"));
const Listings = lazy(() => import("./Components/Listings/Listings"));
const ListingDetails = lazy(()=> import("./Components/Listings/ListingDetails"))
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
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:slug" element={<ListingDetails />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
