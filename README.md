# Mate Diamante

Sitio web estático comercial para `Mate Diamante`, construido con Astro + TypeScript y orientado a convertir visitas en conversaciones de WhatsApp.

## Principios del proyecto

- El sitio habla en español mexicano claro, cercano y sin faltas de ortografía.
- La navegación se mantiene simple para empujar a la acción principal: escribir por WhatsApp.
- No se publican precios ni fechas específicas; esos datos los confirma el equipo de ventas.
- El contenido editable vive centralizado en `src/datos/sitio.json`.
- El proyecto genera salida estática para desplegarse fácilmente.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Desarrollo local

```bash
npm run dev
```

También puedes usar el alias en español:

```bash
npm run inicio
```

## Construcción

```bash
npm run build
```

Alias en español:

```bash
npm run construir
```

## Verificación de tipos

```bash
npm run check
```

Alias en español:

```bash
npm run verificar
```

## Cómo editar el contenido

Abre `src/datos/sitio.json`. Desde ese archivo puedes actualizar:

- marca, logo, eslogan y descripción corta
- navegación principal
- textos de portada
- categorías de programas
- programas como UNAM, IPN, UAM y EXACER del Colegio de Bachilleres
- mensajes contextuales de WhatsApp
- metodología
- testimonios
- imágenes de testimonios mediante `imagen` y `textoAlternativo`
- preguntas frecuentes
- páginas internas
- configuración SEO
- medición y campañas

## Flujo recomendado para actualizar programas

1. Localiza el arreglo `programas`.
2. Agrega o edita un programa con su `id`, `titulo`, `categoria`, `descripcion`, `idealPara`, `puntosClave`, `etiquetaCta` y `mensajeWhatsApp`.
3. Ajusta el `estado`: `abierto`, `proximo`, `cerrado` u `oculto`.
4. Evita publicar precios o fechas específicas en el JSON público.
5. Ejecuta `npm run verificar`.
6. Genera la versión estática con `npm run construir`.

## Branding y favicon

El proyecto usa estos archivos:

- `public/marca/logotipo-circular.png`
- `public/marca/compartir-mate-diamante.png`
- `public/favicon.ico`
- `public/apple-touch-icon.png`

## Despliegue

Variables opcionales recomendadas:

- `URL_SITIO`: dominio canónico del proyecto. El valor por defecto actual es `https://matediamante.com`.
- `BASE_PATH`: ruta base en caso de publicar en una subcarpeta.
