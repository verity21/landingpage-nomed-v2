# PROMPT PARA CODEX — Animación del cohete en el Hero de Nomed

## CONTEXTO
Estoy trabajando en la landing page de Nomed (hecha con Emergent / stack web). El hero actual tiene:
- **Lado izquierdo**: título "Construimos tecnología con inteligencia artificial para empresas y educación", subtítulo, botones "Contáctanos" y "Ver servicios", y banderas de países. ESTO NO SE TOCA.
- **Lado derecho**: actualmente tiene 3 tarjetas/recuadros con "Sueña", "Aprende", "Hazlo realidad". ESTO SE REEMPLAZA con la nueva animación.

## QUÉ QUIERO EXACTAMENTE

Reemplazar los 3 recuadros del lado derecho del hero con una animación de un cohete que sube en diagonal, revelando las 3 frases del journey de Nomed.

## ESPECIFICACIONES TÉCNICAS

### 1. ESTRUCTURA DEL LAYOUT
- El hero es un grid de 2 columnas (50% / 50%) o flex equivalente.
- La columna izquierda queda INTACTA (no modificar nada).
- La columna derecha es el contenedor de la animación. Debe tener `position: relative; overflow: hidden;` y ocupar el 100% del alto del hero.

### 2. LA LÍNEA DIAGONAL (path)
- Dibujar una línea curva SVG que va de la esquina INFERIOR-IZQUIERDA a la esquina SUPERIOR-DERECHA del contenedor derecho.
- La línea debe ser discontinua (dashed), color gris claro (#E8EDF2), stroke-width: 2.
- Usar un `<path>` con curvas Bézier para que no sea una línea recta sino una curva suave tipo "S" leve.
- Ejemplo de path: `M 40 530 C 80 430, 140 350, 180 280 S 280 140, 340 40`
- Encima de esta línea dashed, hay OTRA línea idéntica con un gradiente de color (dorado → azul → verde) que se va rellenando conforme el cohete sube (usando stroke-dasharray animado).

### 3. EL COHETE (Lottie)
- Cargar la animación Lottie del archivo `ejemplouykgk.json` usando la librería lottie-web (bodymovin).
- El cohete debe moverse A LO LARGO del path SVG diagonal, de abajo hacia arriba.
- El cohete debe ROTAR para seguir la dirección de la curva (calcular el ángulo tangente del path en cada punto).
- Para obtener la posición del cohete en cada frame, usar `path.getPointAtLength(t * totalLength)` donde t va de 0 a 1.
- El movimiento debe tener easing ease-in-out (empieza lento, acelera, termina lento).
- Duración total del recorrido: ~4 segundos.
- El contenedor del Lottie debe ser ~80-100px de ancho/alto.
- Detrás del cohete, generar pequeñas partículas circulares que se desvanecen (trail effect). Color de las partículas según la fase: dorado al inicio, azul en el medio, verde al final.

### 4. LOS 3 HITOS EN EL CAMINO
Hay 3 puntos milestone sobre la línea diagonal:
- **Hito 1 (15% del recorrido)**: "Sueña"
- **Hito 2 (50% del recorrido)**: "Aprende"  
- **Hito 3 (88% del recorrido)**: "Hazlo realidad"

En cada hito:
- Aparece un **punto/dot** circular (12-14px) del color correspondiente con una animación de pulse ring.
- Aparece el **texto de la frase** AL LADO del punto (no encima del path).

### 5. LAS FRASES — SIN RECUADROS
Cada frase tiene 3 líneas de texto, SIN caja/recuadro/card alrededor. Solo texto flotante:
```
[ETIQUETA]     ← font-size: 10-11px, uppercase, letter-spacing: 2px, bold, color del hito
[PALABRA]      ← font-size: 28-36px, bold, color del hito, letter-spacing: -0.5px
[Descripción]  ← font-size: 12-13px, color gris (#6B7B8D), max-width: 200px
```

Contenido exacto:
- Hito 1: etiqueta="EL DESPEGUE", palabra="Sueña", desc="Visualiza el futuro que quieres construir."
- Hito 2: etiqueta="EL CAMINO", palabra="Aprende", desc="Convierte curiosidad en conocimiento aplicable."
- Hito 3: etiqueta="LA META", palabra="Hazlo realidad", desc="Lleva tus ideas a resultados concretos."

Colores:
- Hito 1 (Sueña): #E8A54B (dorado/ámbar)
- Hito 2 (Aprende): #378ADD (azul)
- Hito 3 (Hazlo realidad): #1D9E75 (verde/teal)

### 6. COMPORTAMIENTO DE APARICIÓN/DESAPARICIÓN DE FRASES
- Cuando el cohete se ACERCA al hito (t >= milestone - 0.03), la frase aparece con:
  - opacity: 0 → 1
  - transform: translateY(12px) → translateY(0)
  - transition: 0.5s ease
- Cuando el cohete SE ALEJA del hito (t >= milestone + 0.22), la frase DESAPARECE con:
  - opacity: 1 → 0
  - transform: translateY(0) → translateY(-10px)
- EXCEPCIÓN: La frase 3 ("Hazlo realidad") NO desaparece. Se queda visible permanentemente al llegar arriba.

### 7. POSICIONAMIENTO DE LAS FRASES
- Las frases de los hitos 1 y 2 se posicionan a la DERECHA del punto milestone (offset +24px en X, -20px en Y).
- La frase del hito 3 se posiciona a la IZQUIERDA del punto (-160px en X) porque está cerca del borde derecho.
- Usar position: absolute dentro del contenedor derecho.
- Asegurar que las frases no se salgan del contenedor (clamp con Math.min/Math.max).

### 8. SPARKLES DE FONDO
- En el contenedor derecho, agregar 15-20 pequeños puntos decorativos (2-4px).
- Colores aleatorios entre: #E8A54B, #378ADD, #1D9E75, #DDE1E8.
- Animación de fade in/out con diferentes delays y duraciones (2-5s).
- Posición aleatoria distribuida por todo el contenedor.
- Opacity máxima: 0.35. Son sutiles, no distraen.

### 9. BOTÓN REPLAY
- Al terminar la animación (después de 500ms), mostrar un botón pequeño en la esquina inferior-derecha del contenedor.
- Texto: "↻ Repetir"
- Estilo: background semi-transparente, border-radius: 16px, font-size: 11px.
- Al hacer click, resetea todo y corre la animación de nuevo.

### 10. INICIO DE LA ANIMACIÓN
- La animación debe iniciar cuando el hero es visible en el viewport (usar IntersectionObserver con threshold: 0.3).
- Delay inicial de 400ms antes de empezar.

## DEPENDENCIAS
- lottie-web (bodymovin): cargar desde CDN `https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js`
- El archivo Lottie del cohete: `ejemplouykgk.json` (ya está en el proyecto)

## CÓDIGO DE REFERENCIA PARA EL MOTOR DE ANIMACIÓN

```javascript
// Obtener punto en el path SVG en posición t (0 a 1)
function getPointOnPath(t) {
  const pathEl = document.getElementById('diagonalPath');
  const totalLen = pathEl.getTotalLength();
  const pt = pathEl.getPointAtLength(t * totalLen);
  const container = document.getElementById('rocketZone');
  const rect = container.getBoundingClientRect();
  // Convertir coordenadas SVG a coordenadas del contenedor
  return {
    x: (pt.x / SVG_VIEWBOX_WIDTH) * rect.width,
    y: (pt.y / SVG_VIEWBOX_HEIGHT) * rect.height
  };
}

// Calcular ángulo tangente para rotar el cohete
const ptCurrent = getPointOnPath(t);
const ptNext = getPointOnPath(Math.min(t + 0.01, 1));
const angle = Math.atan2(ptNext.y - ptCurrent.y, ptNext.x - ptCurrent.x) * (180 / Math.PI);
rocketElement.style.transform = `rotate(${angle - 90}deg)`;

// Easing ease-in-out
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Loop de animación
function animate() {
  const elapsed = performance.now() - startTime;
  const t = Math.min(elapsed / TOTAL_DURATION, 1);
  const eased = easeInOut(t);
  
  // Mover cohete
  const pos = getPointOnPath(eased);
  rocket.style.left = (pos.x - rocketSize/2) + 'px';
  rocket.style.top = (pos.y - rocketSize/2) + 'px';
  
  // Actualizar trail (línea de gradiente)
  trailPath.style.strokeDasharray = `${eased * totalLength} ${totalLength}`;
  
  // Verificar milestones y mostrar/ocultar frases
  milestones.forEach((mt, i) => {
    if (eased >= mt - 0.03 && eased < mt + 0.22) {
      showPhrase(i);
    } else if (eased >= mt + 0.22 && i < 2) {
      hidePhrase(i);
    }
  });
  
  if (t < 1) requestAnimationFrame(animate);
}
```

## LO QUE NO DEBES HACER
- NO tocar el contenido del lado izquierdo del hero (título, subtítulo, botones, países).
- NO poner las frases dentro de cajas, cards, o recuadros. Solo texto flotante.
- NO hacer que el cohete se mueva en línea recta. Debe seguir la curva del path SVG.
- NO usar setTimeout para la animación del cohete. Usar requestAnimationFrame.
- NO poner el cohete estático. Debe rotar siguiendo la tangente de la curva.
- NO hacer que todas las frases aparezcan al mismo tiempo. Van apareciendo una por una conforme pasa el cohete.
- NO eliminar la línea diagonal dashed. Es parte del diseño.

## RESUMEN VISUAL
```
┌──────────────────────────────────────────────────┐
│  NAVBAR: Logo Nomed | Links | Btn Contáctanos    │
├────────────────────┬─────────────────────────────┤
│                    │              ★  LA META      │
│  Construimos       │           ●───Hazlo realidad │
│  tecnología con    │          /                   │
│  inteligencia      │    EL CAMINO                 │
│  artificial        │      ●───Aprende             │
│  para empresas y   │     / ·  ·                   │
│  educación         │    /        ·                 │
│                    │  EL DESPEGUE                  │
│  [Contáctanos]     │  ●───Sueña                   │
│  [Ver servicios]   │ 🚀                           │
│                    │/                             │
│  🇨🇱🇲🇽🇵🇪🇦🇷          │  · · sparkles · ·           │
└────────────────────┴─────────────────────────────┘
```

El cohete (🚀) sube por la línea diagonal (/), pasando por cada ● milestone, y las frases aparecen y desaparecen conforme pasa.
