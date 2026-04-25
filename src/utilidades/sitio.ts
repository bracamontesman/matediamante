import { validarSitio } from "@utilidades/validarSitio";
import type { ConfiguracionSitio, Curso, EstadoCurso } from "@utilidades/tipos";

const configuracionSitio = validarSitio();

const ordenEstados: Record<EstadoCurso, number> = {
  activo: 0,
  proximo: 1,
  cerrado: 2,
  archivado: 3
};

export function obtenerConfiguracionSitio(): ConfiguracionSitio {
  return configuracionSitio;
}

export function conRutaBase(ruta: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  const rutaNormalizada = ruta.startsWith("/") ? ruta.slice(1) : ruta;

  if (rutaNormalizada.length === 0) {
    return base;
  }

  return `${base}${rutaNormalizada}`;
}

export function obtenerEnlaceWhatsApp(mensaje: string, telefono = configuracionSitio.contacto.telefono): string {
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${telefono}?text=${mensajeCodificado}`;
}

export function obtenerCursosVisibles(): Curso[] {
  return [...configuracionSitio.cursos]
    .filter((curso) => curso.estado !== "archivado")
    .sort((cursoA, cursoB) => {
      const ordenA = ordenEstados[cursoA.estado];
      const ordenB = ordenEstados[cursoB.estado];

      if (ordenA !== ordenB) {
        return ordenA - ordenB;
      }

      return cursoA.fechaInicio.localeCompare(cursoB.fechaInicio);
    });
}

export function obtenerCursosActivos(): Curso[] {
  return obtenerCursosVisibles().filter((curso) => curso.estado === "activo");
}

export function obtenerCursosDestacados(): Curso[] {
  return obtenerCursosVisibles().filter((curso) => curso.destacado && curso.estado !== "cerrado");
}

export function obtenerCursosPorRuta(claveRuta: string): Curso[] {
  return obtenerCursosVisibles().filter((curso) => curso.ruta === claveRuta);
}

export function obtenerEtiquetaEstado(estado: EstadoCurso): string {
  const etiquetas: Record<EstadoCurso, string> = {
    activo: "Inscripciones abiertas",
    proximo: "Proximo grupo",
    cerrado: "Grupo cerrado",
    archivado: "Archivado"
  };

  return etiquetas[estado];
}

export function formatearFecha(fechaIso: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${fechaIso}T12:00:00`));
}
