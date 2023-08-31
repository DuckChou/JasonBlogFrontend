import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/view/Header";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoScreen from "./screens/InfoScreen";
import PostScreen from "./screens/PostScreen";
import PostGalleryScreen from "./screens/PostGalleryScreen";
import Footer from "./components/view/Footer";

function App() {
  return (
    <Router className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postGallery/:classId" element={<PostGalleryScreen />} />
        <Route path="/post/:id" element={<PostScreen />} />
        <Route path="/info" element={<InfoScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
