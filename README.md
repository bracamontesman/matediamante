# Mate Diamante

Sitio web estatico comercial para `Mate Diamante`, construido con Astro + TypeScript y orientado a captar prospectos y cerrar inscripciones por WhatsApp.

## Principios del proyecto

- Todo el contenido visible del sitio se escribe en espanol.
- Todo identificador propio del proyecto se escribe en espanol en la mayor medida posible.
- El contenido editable vive centralizado en `src/datos/sitio.json`.
- El proyecto genera salida estatica para desplegarse facilmente en GitHub Pages.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Tambien puedes usar el alias en espanol:

```bash
npm run inicio
```

## Construccion

```bash
npm run build
```

Alias en espanol:

```bash
npm run construir
```

## Verificacion de tipos

```bash
npm run check
```

Alias en espanol:

```bash
npm run verificar
```

## Como editar el contenido

Abre `src/datos/sitio.json`. Desde ese archivo puedes actualizar:

- informacion de marca
- textos de portada
- rutas academicas
- cursos de temporada
- preguntas frecuentes
- informacion de contacto
- apoyo para alumnos
- configuracion SEO
- configuracion de medicion y campanas

## Flujo recomendado para actualizar cursos

1. Localiza el arreglo `cursos`.
2. Ajusta el `estado` de cada curso: `activo`, `proximo`, `cerrado` o `archivado`.
3. Actualiza fechas, precio, horarios, descripcion corta y mensaje de WhatsApp.
4. Guarda el archivo y ejecuta `npm run verificar`.
5. Genera la version estatica con `npm run construir`.

## Despliegue en GitHub Pages

El repositorio incluye el flujo `.github/workflows/desplegar.yml`, basado en la accion oficial de Astro para GitHub Pages.

Variables opcionales recomendadas:

- `URL_SITIO`: dominio canonico del proyecto. El valor por defecto actual es `https://matediamante.com`
- `BASE_PATH`: ruta base en caso de publicar en `usuario.github.io/repositorio`

Si no se define `BASE_PATH`, el proyecto usara `/` para dominio propio y solo intentara inferir la ruta del repositorio cuando el sitio se publique bajo una URL `github.io`.
