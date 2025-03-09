import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Import User type
import { auth } from "./firebaseConfig";
import Layout from "./components/Layout";
import StoreManagement from "./pages/StoreManagement";
import SKUManagement from "./pages/SKUManagement";
import Planning from "./pages/Planning";
import ChartPage from "./pages/ChartPage";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState<User | null>(null); // ✅ Fix: Explicitly set type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // ✅ No more type error
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {user ? (
        <Layout>
          <Routes>
            <Route path="/" element={<StoreManagement />} />
            <Route path="/sku" element={<SKUManagement />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
