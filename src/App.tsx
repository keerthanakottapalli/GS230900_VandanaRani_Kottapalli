import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StoreManagement from "./pages/StoreManagement";
import SKUManagement from "./pages/SKUManagement";
import Planning from "./pages/Planning";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<StoreManagement />} />
        <Route path="/sku" element={<SKUManagement />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
