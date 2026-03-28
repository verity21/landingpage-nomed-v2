# PRD — Nomed Website

**Fecha de inicio:** Feb 2026  
**Stack:** React + FastAPI + MongoDB + TailwindCSS

---

## Problema Statement Original
Diseño web completo para Nomed, empresa de tecnología con IA con sede en Santiago, Chile (presencia en México, Perú, Argentina). Dos líneas de negocio: desarrollo de software a medida con IA + productos propios (corporativos y educativos en alianza con Estudiantes Digitales).

## Arquitectura
- **Frontend:** React 18, TailwindCSS (colores custom: nomed-coral, nomed-orange, nomed-blue, nomed-dark), Framer Motion, React Router
- **Backend:** FastAPI con Motor (async MongoDB), endpoint POST/GET /api/demo para gestión de contactos
- **DB:** MongoDB — colección `demo_bookings`
- **Fuentes:** Outfit (headings), IBM Plex Sans (body) via Google Fonts

## Colores de Marca
- Rojo Coral: `#fc5e5f`
- Naranja: `#e8902f`  
- Azul Claro: `#009ee7`
- Azul Oscuro: `#003b72`
- ED Background: `#fffbf7`

---

## Páginas Implementadas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage completa (ver secciones) |
| `/nosotros` | Misión, visión, presencia, proceso (SIN equipo) |
| `/equipo` | Felipe Robinet + Federica Morici + placeholder |
| `/tecnologia` | Capacidades, servicios complementarios |
| `/productos` | Botbee, Cert, Blog IA (detalle completo) |
| `/estudiantes-digitales` | Alianza ED, reconocimientos, ED Master/Teach/Math |
| `/que-producto-necesito` | Quiz 3 preguntas con recomendación |

## Secciones Homepage (/)
1. **Hero** — Headline gradient + 3 CTAs + floating product cards
2. **Partners** — Marquee animado (SPDA, DICAPI, Estudiantes Digitales)
3. **Nosotros** — Misión/Visión + Presencia 4 países + Proceso 4 pasos
4. **Tecnología** — Dark blue section, 4 capacidades, link a /tecnologia
5. **Productos** — Tabs (Corporativos | Alianza ED) con tarjetas clickeables
6. **Quiz** — ProductQuiz embebido (opcional) con resultado y CTA Contáctanos
7. **Contacto** — Form izq/dcha estilo SaaS, guarda en MongoDB

## Componentes Clave
- `Navbar.jsx` — Sticky glassmorphism, 6 links + CTA "Contáctanos"
- `Footer.jsx` — Dark blue, 4 columnas, "Contáctanos"
- `DemoModal.jsx` — Modal Calendly-style 3 pasos (calendario → hora → formulario → confirmación)
- `ProductQuiz.jsx` — Quiz reutilizable (usado en homepage Y /que-producto-necesito)

## API Backend
- `POST /api/demo` — Guarda contacto/booking en MongoDB
- `GET /api/demo` — Lista todos los contactos

---

## Historial de Iteraciones

### Iteración 1 (Feb 2026) — MVP completo
- Sitio completo construido desde cero
- 6 páginas, navbar, footer, demo modal Calendly
- Tests: Backend 100%, Frontend 100%

### Iteración 2 (Feb 2026) — Reestructuración homepage
- Homepage ampliada con nosotros+tech+productos+quiz
- Team movido a `/equipo` (pestaña separada)
- Todos los botones renombrados a "Contáctanos"
- ProductQuiz.jsx como componente reutilizable
- Tests: Backend 100%, Frontend 100% (14/14)

### Iteración 3 (Feb 2026) — Paleta ED + Anclas + Limpieza routing
- EstudiantesDigitalesPage: paleta exacta (#2B7F87, #65B4B8, #CEE5D1, #F3EEEC, #FF7878), badge "Nuestras ED Tech", H1 sin "Nomed &"
- Anclas id="ed-master/ed-teach/ed-math" y id="botbee/cert/blog" funcionales
- Navbar: "Equipo" en lugar de "Nosotros" ✓ | Timeline "Cómo trabajamos" ✓ | Banderas de países ✓
- App.js: rutas /nosotros → redirect a /equipo, /que-producto-necesito → /, catch-all → /
- Footer: links "Nosotros" → "Inicio", "¿Qué producto necesito?" → /#quiz
- Tests: Frontend 93% → 100% después de fix de redirects

---

## Backlog Priorizado

### P0 — Pendiente
- [ ] Imagen de Federica Morici (actualmente usa avatar FM)
- [ ] Logos de partners SPDA y DICAPI para el marquee

### P1 — Próximas mejoras
- [ ] SEO: meta tags, Open Graph, sitemap
- [ ] Formulario de contacto: envío de email de notificación (SendGrid/Resend)
- [ ] Blog/Recursos: sección de artículos o casos de éxito
- [ ] Analytics: Google Analytics o similar

### P2 — Futuro
- [ ] Multiidioma (español/inglés)
- [ ] Modo oscuro
- [ ] Panel admin para ver contactos recibidos
- [ ] Video en hero section
- [ ] Integración real de Calendly (webhook)

---

## User Personas
- **Empresa tech/corporativa** buscando automatizar procesos con IA
- **Institución educativa** que necesita herramientas EdTech
- **Docente** buscando crear materiales interactivos
- **Decisor empresarial** en LATAM (Chile, México, Perú, Argentina)
