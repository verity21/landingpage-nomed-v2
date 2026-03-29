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
import IAPage from "@/pages/IAPage";
import AutomatizacionPage from "@/pages/AutomatizacionPage";
import IntegracionesPage from "@/pages/IntegracionesPage";
import WebMobilePage from "@/pages/WebMobilePage";
import DataPage from "@/pages/DataPage";
import TransformacionPage from "@/pages/TransformacionPage";

import ResponsabilidadSocialPage from "@/pages/ResponsabilidadSocialPage";

const DETAIL_PATHS = [
  "/productos/botbee", "/productos/cert", "/productos/blog-ia",
  "/estudiantes-digitales/ed-master", "/estudiantes-digitales/ed-teach", "/estudiantes-digitales/ed-math",
  "/servicios/ia-aplicada", "/servicios/automatizacion", "/servicios/integraciones",
  "/servicios/web-mobile", "/servicios/data-analytics", "/servicios/transformacion-digital",
];

function NavbarWrapper() {
  const location = useLocation();
  const isDetail = DETAIL_PATHS.some((p) => location.pathname === p);
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
              <Route path="/servicios/ia-aplicada" element={<IAPage />} />
              <Route path="/servicios/automatizacion" element={<AutomatizacionPage />} />
              <Route path="/servicios/integraciones" element={<IntegracionesPage />} />
              <Route path="/servicios/web-mobile" element={<WebMobilePage />} />
              <Route path="/servicios/data-analytics" element={<DataPage />} />
              <Route path="/servicios/transformacion-digital" element={<TransformacionPage />} />
              <Route path="/responsabilidad-social" element={<ResponsabilidadSocialPage />} />
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
