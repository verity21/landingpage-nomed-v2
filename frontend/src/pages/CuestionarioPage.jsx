import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CuestionarioPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage quiz section
    navigate("/", { replace: true });
    setTimeout(() => {
      const el = document.getElementById("quiz");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }, []); // eslint-disable-line

  return null;
}
