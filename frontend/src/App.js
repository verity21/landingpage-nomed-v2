import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoProvider } from "@/contexts/DemoContext";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import HomePage from "@/pages/HomePage";
import NosotrosPage from "@/pages/NosotrosPage";
import TecnologiaPage from "@/pages/TecnologiaPage";
import ProductosPage from "@/pages/ProductosPage";
import EstudiantesDigitalesPage from "@/pages/EstudiantesDigitalesPage";
import CuestionarioPage from "@/pages/CuestionarioPage";
import EquipoPage from "@/pages/EquipoPage";

function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/equipo" element={<EquipoPage />} />
              <Route path="/tecnologia" element={<TecnologiaPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/estudiantes-digitales" element={<EstudiantesDigitalesPage />} />
              <Route path="/que-producto-necesito" element={<CuestionarioPage />} />
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
