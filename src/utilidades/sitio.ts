import { validarSitio } from "@utilidades/validarSitio";
import type { ConfiguracionSitio, EstadoPrograma, ProgramaAcademico } from "@utilidades/tipos";

const configuracionSitio = validarSitio();

const ordenEstados: Record<EstadoPrograma, number> = {
  abierto: 0,
  proximo: 1,
  cerrado: 2,
  oculto: 3
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

export function obtenerProgramasVisibles(): ProgramaAcademico[] {
  return [...configuracionSitio.programas]
    .filter((programa) => programa.estado !== "oculto")
    .sort((programaA, programaB) => {
      const ordenA = ordenEstados[programaA.estado];
      const ordenB = ordenEstados[programaB.estado];

      if (ordenA !== ordenB) {
        return ordenA - ordenB;
      }

      return programaA.titulo.localeCompare(programaB.titulo, "es-MX");
    });
}

export function obtenerProgramasDestacados(): ProgramaAcademico[] {
  return obtenerProgramasVisibles().filter(
    (programa) => programa.destacado && programa.estado !== "cerrado"
  );
}

export function obtenerProgramasPorCategoria(categoria: string): ProgramaAcademico[] {
  return obtenerProgramasVisibles().filter((programa) => programa.categoria === categoria);
}

export function obtenerEtiquetaEstado(estado: EstadoPrograma): string {
  const etiquetas: Record<EstadoPrograma, string> = {
    abierto: "Informes abiertos",
    proximo: "Próximo grupo",
    cerrado: "Grupo cerrado",
    oculto: "Oculto"
  };

  return etiquetas[estado];
}
