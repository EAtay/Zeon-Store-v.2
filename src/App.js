import "./App.css";
import Header from "./page/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./page/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Collection from "./page/Collection/Collection";
import SaleCard from "./page/SaleCard/SaleCard";
import News from "./page/News/News";
import Help from "./page/Help/Help";
import Basket from "./page/Basket/Basket";
import Public from "./page/Public/Public";
import Favorites from "./page/Favorites/Favorites";
import Search from "./page/Search/Search";
import CollectionProducts from "./page/CollectionProducts/CollectionProducts";
import { useEffect } from "react";

function App() { 
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />{" "}
        <Route path="/about" element={<About />} />{" "}
        <Route path="/collection" element={<Collection />} />{" "}
        <Route
          path="/collectionProducts/:id"
          element={<CollectionProducts />}
        />{" "}
        <Route path="/card/:id" element={<SaleCard />} />{" "}
        <Route path="/news" element={<News />} />{" "}
        <Route path="/help" element={<Help />} />{" "}
        <Route path="/basket" element={<Basket />} />{" "}
        <Route path="/public" element={<Public />} />{" "}
        <Route path="/favorites" element={<Favorites />} />{" "}
        <Route path="/search" element={<Search />} />{" "}
      </Routes>{" "}
      <Footer />
    </div>
  );
}

export default App;
