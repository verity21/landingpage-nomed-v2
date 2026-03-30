# PROMPT PARA CODEX — CORRECCIONES Animación del cohete Hero Nomed

## PROBLEMA ACTUAL
1. El cohete Lottie NO es el correcto. Debe usar EXACTAMENTE el archivo `ejemplouykgk.json` que ya está en el proyecto.
2. Las frases (Sueña, Aprende, Hazlo realidad) están mal posicionadas. Deben estar a la DERECHA de cada punto milestone, porque a la IZQUIERDA de cada punto habrá una imagen circular.

## CAMBIOS REQUERIDOS

---

### CAMBIO 1: ARCHIVO LOTTIE CORRECTO

Busca en el código donde se carga la animación Lottie y asegúrate de que usa EXACTAMENTE este archivo:

```javascript
lottie.loadAnimation({
  container: document.getElementById('lottieRocket'), // o el id que sea
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './ejemplouykgk.json'  // ← ESTE ARCHIVO, NO OTRO
});
```

NO uses ningún otro archivo JSON, ni URL externa, ni CDN. El archivo se llama `ejemplouykgk.json` y está en el proyecto. Si el path relativo no funciona, prueba con la ruta absoluta desde la raíz del proyecto donde esté ubicado.

---

### CAMBIO 2: LÍNEA DIAGONAL MÁS VERTICAL

La línea diagonal actual es demasiado inclinada. Necesito que sea MÁS VERTICAL (más recta, menos diagonal) para que haya espacio suficiente a ambos lados del path.

Cambiar el path SVG de la curva. La línea debe ir de abajo-centro-izquierda hacia arriba-centro-derecha, pero con una inclinación más suave (más vertical que diagonal):

```
ANTES (muy diagonal):
M 40 530 C 80 430, 140 350, 180 280 S 280 140, 340 40

DESPUÉS (más vertical, leve inclinación):
M 140 560 C 160 440, 180 350, 200 270 S 240 140, 280 30
```

La idea es que la línea quede más centrada en el contenedor derecho, con suficiente espacio a la izquierda Y a la derecha para colocar contenido.

Ajusta el viewBox del SVG si es necesario para que calce.

---

### CAMBIO 3: FRASES SIEMPRE A LA DERECHA DEL PUNTO

TODAS las frases (las 3) deben posicionarse a la DERECHA del punto milestone. No importa si es el hito 1, 2 o 3.

Posicionamiento de cada frase:
```
[imagen circular]  ●  [ETIQUETA]
                      [Palabra grande]
                      [Descripción]
```

En código:
```javascript
// PARA LOS 3 HITOS — frase siempre a la derecha
const phraseX = puntoMilestone.x + 28;  // 28px a la derecha del punto
const phraseY = puntoMilestone.y - 10;  // ligeramente arriba del centro del punto

// Asegurar que no se sale del contenedor
phraseX = Math.min(phraseX, containerWidth - 220);
phraseY = Math.max(10, phraseY);
```

NO pongas ninguna frase a la izquierda del punto. Las 3 van a la derecha.

---

### CAMBIO 4: ESPACIO PARA IMÁGENES CIRCULARES A LA IZQUIERDA

A la IZQUIERDA de cada punto milestone, habrá una imagen circular (la implementaré después, por ahora solo deja el espacio). Para preparar esto:

- Agrega 3 contenedores circulares vacíos (placeholder) a la izquierda de cada punto:
```html
<div class="milestone-image" id="img1" style="
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #E8A54B;
  background: rgba(232, 165, 75, 0.08);
  z-index: 6;
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s ease;
"></div>

<div class="milestone-image" id="img2" style="
  /* igual pero con border: 2px solid #378ADD y background: rgba(55, 138, 221, 0.08) */
"></div>

<div class="milestone-image" id="img3" style="
  /* igual pero con border: 2px solid #1D9E75 y background: rgba(29, 158, 117, 0.08) */
"></div>
```

Posicionamiento de las imágenes:
```javascript
// Imagen circular a la IZQUIERDA del punto
const imgX = puntoMilestone.x - 28 - 60;  // 28px gap + 60px ancho de la imagen
const imgY = puntoMilestone.y - 30;        // centrada verticalmente con el punto
```

Las imágenes deben aparecer al mismo tiempo que las frases (misma lógica de visibility).

---

### CAMBIO 5: TAMAÑO DEL COHETE LOTTIE

El contenedor del cohete Lottie debe ser:
- width: 80px
- height: 80px

Y debe estar rotado siguiendo la tangente de la curva (ya implementado). Solo verifica que el tamaño sea 80x80.

---

## RESUMEN VISUAL DEL LAYOUT CORRECTO

```
LADO DERECHO DEL HERO:
─────────────────────────────────────
                          🚀 (cohete llega aquí)
                         /
               (img3) ● ── LA META
                     /     Hazlo realidad
                    /      Lleva tus ideas...
                   /
          (img2) ● ── EL CAMINO
                /     Aprende
               /      Convierte curiosidad...
              /
     (img1) ● ── EL DESPEGUE
            /     Sueña
           /      Visualiza el futuro...
          🚀 (cohete empieza aquí)
─────────────────────────────────────

Leyenda:
●     = punto milestone sobre la línea
(imgN) = imagen circular placeholder (IZQUIERDA del punto)
──    = frase con etiqueta + palabra + descripción (DERECHA del punto)
/     = línea diagonal (más vertical que antes)
🚀    = cohete Lottie moviéndose hacia arriba
```

## LO QUE NO DEBES CAMBIAR
- El lado izquierdo del hero (título, subtítulo, botones, países) — NO TOCAR.
- La lógica de animación con requestAnimationFrame — ya funciona bien.
- Los colores de cada hito (#E8A54B dorado, #378ADD azul, #1D9E75 verde) — no cambiar.
- El trail de gradiente sobre la línea — ya funciona bien.
- Las sparkles de fondo — ya funcionan bien.
- El botón "Repetir" — ya funciona bien.

## CHECKLIST ANTES DE DAR POR TERMINADO
- [ ] El cohete usa el Lottie de `ejemplouykgk.json` (NO otro archivo)
- [ ] La línea diagonal es más vertical (no tan inclinada)
- [ ] Las 3 frases están a la DERECHA de sus puntos milestone
- [ ] Hay 3 placeholders circulares a la IZQUIERDA de cada punto
- [ ] El cohete tiene tamaño 80x80px
- [ ] Las frases NO tienen cajas/recuadros/cards alrededor
- [ ] "Hazlo realidad" se queda visible al final (no desaparece)
- [ ] La animación empieza al scroll con IntersectionObserver
