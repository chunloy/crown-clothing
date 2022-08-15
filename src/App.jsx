import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import Authenticate from "./routes/Authenticate";
import Checkout from "./routes/Checkout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authenticate />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
