import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DemoProvider } from "@/contexts/DemoContext";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import HomePage from "@/pages/HomePage";
import TecnologiaPage from "@/pages/TecnologiaPage";
import ProductosPage from "@/pages/ProductosPage";
import EstudiantesDigitalesPage from "@/pages/EstudiantesDigitalesPage";
import EquipoPage from "@/pages/EquipoPage";
import BotbeePage from "@/pages/BotbeePage";
import CertPage from "@/pages/CertPage";
import BlogIAPage from "@/pages/BlogIAPage";
import EDMasterPage from "@/pages/EDMasterPage";
import EDTeachPage from "@/pages/EDTeachPage";
import EDMathPage from "@/pages/EDMathPage";

const PRODUCT_DETAIL_PATHS = [
  "/productos/botbee", "/productos/cert", "/productos/blog-ia",
  "/estudiantes-digitales/ed-master", "/estudiantes-digitales/ed-teach", "/estudiantes-digitales/ed-math",
];

function NavbarWrapper() {
  const location = useLocation();
  const isDetail = PRODUCT_DETAIL_PATHS.some((p) => location.pathname === p);
  if (isDetail) return null;
  return <Navbar />;
}

function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App min-h-screen flex flex-col">
          <NavbarWrapper />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/equipo" element={<EquipoPage />} />
              <Route path="/tecnologia" element={<Navigate to="/#servicios" replace />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/productos/botbee" element={<BotbeePage />} />
              <Route path="/productos/cert" element={<CertPage />} />
              <Route path="/productos/blog-ia" element={<BlogIAPage />} />
              <Route path="/estudiantes-digitales" element={<EstudiantesDigitalesPage />} />
              <Route path="/estudiantes-digitales/ed-master" element={<EDMasterPage />} />
              <Route path="/estudiantes-digitales/ed-teach" element={<EDTeachPage />} />
              <Route path="/estudiantes-digitales/ed-math" element={<EDMathPage />} />
              <Route path="/nosotros" element={<Navigate to="/equipo" replace />} />
              <Route path="/que-producto-necesito" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <DemoModal />
        </div>
      </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
