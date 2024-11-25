import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersPage from "./components/OrdersPage";
// import FormPage from "./FormPage"; // الصفحة التي ترسل البيانات

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
