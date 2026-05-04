import datosSitio from "@datos/sitio.json";
import type {
  ConfiguracionSitio,
  EstadoPrograma,
  ProgramaAcademico
} from "@utilidades/tipos";

const estadosValidos: EstadoPrograma[] = ["abierto", "proximo", "cerrado", "oculto"];

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function asegurarTexto(valor: unknown, ruta: string, permitirVacio = false): string {
  if (typeof valor !== "string") {
    throw new Error(`El campo "${ruta}" debe ser texto.`);
  }

  if (!permitirVacio && valor.trim().length === 0) {
    throw new Error(`El campo "${ruta}" no puede estar vacío.`);
  }

  return valor;
}

function asegurarBooleano(valor: unknown, ruta: string): boolean {
  if (typeof valor !== "boolean") {
    throw new Error(`El campo "${ruta}" debe ser booleano.`);
  }

  return valor;
}

function asegurarArreglo(valor: unknown, ruta: string): unknown[] {
  if (!Array.isArray(valor)) {
    throw new Error(`El campo "${ruta}" debe ser un arreglo.`);
  }

  return valor;
}

function asegurarArregloTexto(valor: unknown, ruta: string): string[] {
  return asegurarArreglo(valor, ruta).map((item, indice) => asegurarTexto(item, `${ruta}[${indice}]`));
}

function asegurarPrograma(valor: unknown, indice: number): ProgramaAcademico {
  if (!esObjeto(valor)) {
    throw new Error(`El programa en la posición ${indice} debe ser un objeto.`);
  }

  const estado = asegurarTexto(valor.estado, `programas[${indice}].estado`) as EstadoPrograma;

  if (!estadosValidos.includes(estado)) {
    throw new Error(`El estado de programas[${indice}] debe ser: ${estadosValidos.join(", ")}.`);
  }

  return {
    id: asegurarTexto(valor.id, `programas[${indice}].id`),
    titulo: asegurarTexto(valor.titulo, `programas[${indice}].titulo`),
    nombreCorto: asegurarTexto(valor.nombreCorto, `programas[${indice}].nombreCorto`),
    categoria: asegurarTexto(valor.categoria, `programas[${indice}].categoria`),
    estado,
    destacado: asegurarBooleano(valor.destacado, `programas[${indice}].destacado`),
    enfoque: asegurarTexto(valor.enfoque, `programas[${indice}].enfoque`),
    descripcion: asegurarTexto(valor.descripcion, `programas[${indice}].descripcion`),
    idealPara: asegurarArregloTexto(valor.idealPara, `programas[${indice}].idealPara`),
    puntosClave: asegurarArregloTexto(valor.puntosClave, `programas[${indice}].puntosClave`),
    etiquetaCta: asegurarTexto(valor.etiquetaCta, `programas[${indice}].etiquetaCta`),
    mensajeWhatsApp: asegurarTexto(valor.mensajeWhatsApp, `programas[${indice}].mensajeWhatsApp`)
  };
}

export function validarSitio(origen: unknown = datosSitio): ConfiguracionSitio {
  if (!esObjeto(origen)) {
    throw new Error("La configuración del sitio debe ser un objeto.");
  }

  const configuracion = origen as unknown as ConfiguracionSitio;
  const programas = asegurarArreglo(origen.programas, "programas").map((programa, indice) =>
    asegurarPrograma(programa, indice)
  );

  asegurarTexto(configuracion.marca?.nombre, "marca.nombre");
  asegurarTexto(configuracion.marca?.eslogan, "marca.eslogan");
  asegurarTexto(configuracion.contacto?.telefono, "contacto.telefono");
  asegurarTexto(configuracion.contacto?.mensajeGeneralWhatsApp, "contacto.mensajeGeneralWhatsApp");
  asegurarArreglo(configuracion.navegacionPrincipal, "navegacionPrincipal");
  asegurarArreglo(configuracion.categoriasProgramas, "categoriasProgramas");
  asegurarArreglo(configuracion.metodologia?.pasos, "metodologia.pasos");
  asegurarArreglo(configuracion.pruebasConfianza?.elementos, "pruebasConfianza.elementos");
  asegurarArreglo(configuracion.testimonios?.elementos, "testimonios.elementos");
  asegurarArreglo(configuracion.preguntasFrecuentes, "preguntasFrecuentes");
  asegurarTexto(configuracion.seo?.tituloBase, "seo.tituloBase");
  asegurarBooleano(configuracion.medicion?.habilitarSeguimiento, "medicion.habilitarSeguimiento");

  return {
    ...configuracion,
    programas
  };
}
