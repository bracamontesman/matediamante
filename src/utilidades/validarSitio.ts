import datosSitio from "@datos/sitio.json";
import type { ConfiguracionSitio, Curso, EstadoCurso } from "@utilidades/tipos";

const estadosValidos: EstadoCurso[] = ["activo", "proximo", "cerrado", "archivado"];

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function asegurarTexto(valor: unknown, ruta: string): string {
  if (typeof valor !== "string" || valor.trim().length === 0) {
    throw new Error(`El campo "${ruta}" debe ser un texto no vacio.`);
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

function asegurarCurso(valor: unknown, indice: number): Curso {
  if (!esObjeto(valor)) {
    throw new Error(`El curso en la posicion ${indice} debe ser un objeto.`);
  }

  const estado = asegurarTexto(valor.estado, `cursos[${indice}].estado`) as EstadoCurso;

  if (!estadosValidos.includes(estado)) {
    throw new Error(
      `El estado del curso "${indice}" debe ser uno de: ${estadosValidos.join(", ")}.`
    );
  }

  return {
    id: asegurarTexto(valor.id, `cursos[${indice}].id`),
    titulo: asegurarTexto(valor.titulo, `cursos[${indice}].titulo`),
    ruta: asegurarTexto(valor.ruta, `cursos[${indice}].ruta`),
    examenOMeta: asegurarTexto(valor.examenOMeta, `cursos[${indice}].examenOMeta`),
    temporada: asegurarTexto(valor.temporada, `cursos[${indice}].temporada`),
    estado,
    fechaInicio: asegurarTexto(valor.fechaInicio, `cursos[${indice}].fechaInicio`),
    fechaFin: asegurarTexto(valor.fechaFin, `cursos[${indice}].fechaFin`),
    resumenHorario: asegurarTexto(valor.resumenHorario, `cursos[${indice}].resumenHorario`),
    modalidad: asegurarTexto(valor.modalidad, `cursos[${indice}].modalidad`),
    precioTexto: asegurarTexto(valor.precioTexto, `cursos[${indice}].precioTexto`),
    resumen: asegurarTexto(valor.resumen, `cursos[${indice}].resumen`),
    destacado: asegurarBooleano(valor.destacado, `cursos[${indice}].destacado`),
    etiquetaCta: asegurarTexto(valor.etiquetaCta, `cursos[${indice}].etiquetaCta`),
    mensajeWhatsApp: asegurarTexto(valor.mensajeWhatsApp, `cursos[${indice}].mensajeWhatsApp`)
  };
}

export function validarSitio(origen: unknown = datosSitio): ConfiguracionSitio {
  if (!esObjeto(origen)) {
    throw new Error("La configuracion del sitio debe ser un objeto.");
  }

  const cursos = asegurarArreglo(origen.cursos, "cursos").map((curso, indice) =>
    asegurarCurso(curso, indice)
  );

  return {
    marca: {
      nombre: asegurarTexto(origen.marca && esObjeto(origen.marca) ? origen.marca.nombre : null, "marca.nombre"),
      eslogan: asegurarTexto(origen.marca && esObjeto(origen.marca) ? origen.marca.eslogan : null, "marca.eslogan"),
      descripcionCorta: asegurarTexto(
        origen.marca && esObjeto(origen.marca) ? origen.marca.descripcionCorta : null,
        "marca.descripcionCorta"
      ),
      logotipo: asegurarTexto(origen.marca && esObjeto(origen.marca) ? origen.marca.logotipo : null, "marca.logotipo"),
      avisoLogotipo: asegurarTexto(
        origen.marca && esObjeto(origen.marca) ? origen.marca.avisoLogotipo : null,
        "marca.avisoLogotipo"
      )
    },
    contacto: {
      telefono: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.telefono : null,
        "contacto.telefono"
      ),
      telefonoVisible: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.telefonoVisible : null,
        "contacto.telefonoVisible"
      ),
      correo: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.correo : null,
        "contacto.correo"
      ),
      horarioAtencion: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.horarioAtencion : null,
        "contacto.horarioAtencion"
      ),
      mensajeGeneralWhatsApp: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.mensajeGeneralWhatsApp : null,
        "contacto.mensajeGeneralWhatsApp"
      ),
      direccionTexto: asegurarTexto(
        origen.contacto && esObjeto(origen.contacto) ? origen.contacto.direccionTexto : null,
        "contacto.direccionTexto"
      )
    },
    portada: {
      insignia: asegurarTexto(
        origen.portada && esObjeto(origen.portada) ? origen.portada.insignia : null,
        "portada.insignia"
      ),
      titulo: asegurarTexto(
        origen.portada && esObjeto(origen.portada) ? origen.portada.titulo : null,
        "portada.titulo"
      ),
      descripcion: asegurarTexto(
        origen.portada && esObjeto(origen.portada) ? origen.portada.descripcion : null,
        "portada.descripcion"
      ),
      ctaPrincipal: {
        etiqueta: asegurarTexto(
          origen.portada &&
            esObjeto(origen.portada) &&
            esObjeto(origen.portada.ctaPrincipal)
            ? origen.portada.ctaPrincipal.etiqueta
            : null,
          "portada.ctaPrincipal.etiqueta"
        ),
        mensaje: asegurarTexto(
          origen.portada &&
            esObjeto(origen.portada) &&
            esObjeto(origen.portada.ctaPrincipal)
            ? origen.portada.ctaPrincipal.mensaje
            : null,
          "portada.ctaPrincipal.mensaje"
        )
      },
      ctaSecundario: {
        etiqueta: asegurarTexto(
          origen.portada &&
            esObjeto(origen.portada) &&
            esObjeto(origen.portada.ctaSecundario)
            ? origen.portada.ctaSecundario.etiqueta
            : null,
          "portada.ctaSecundario.etiqueta"
        ),
        enlace: asegurarTexto(
          origen.portada &&
            esObjeto(origen.portada) &&
            esObjeto(origen.portada.ctaSecundario)
            ? origen.portada.ctaSecundario.enlace
            : null,
          "portada.ctaSecundario.enlace"
        )
      },
      estadisticas: asegurarArreglo(
        origen.portada && esObjeto(origen.portada) ? origen.portada.estadisticas : null,
        "portada.estadisticas"
      ).map((estadistica, indice) => {
        if (!esObjeto(estadistica)) {
          throw new Error(`La estadistica ${indice} debe ser un objeto.`);
        }

        return {
          valor: asegurarTexto(estadistica.valor, `portada.estadisticas[${indice}].valor`),
          etiqueta: asegurarTexto(estadistica.etiqueta, `portada.estadisticas[${indice}].etiqueta`)
        };
      })
    },
    rutasAcademicas: asegurarArreglo(origen.rutasAcademicas, "rutasAcademicas").map((ruta, indice) => {
      if (!esObjeto(ruta)) {
        throw new Error(`La ruta academica ${indice} debe ser un objeto.`);
      }

      return {
        clave: asegurarTexto(ruta.clave, `rutasAcademicas[${indice}].clave`),
        titulo: asegurarTexto(ruta.titulo, `rutasAcademicas[${indice}].titulo`),
        descripcion: asegurarTexto(ruta.descripcion, `rutasAcademicas[${indice}].descripcion`)
      };
    }),
    metodologia: {
      titulo: asegurarTexto(
        origen.metodologia && esObjeto(origen.metodologia) ? origen.metodologia.titulo : null,
        "metodologia.titulo"
      ),
      descripcion: asegurarTexto(
        origen.metodologia && esObjeto(origen.metodologia) ? origen.metodologia.descripcion : null,
        "metodologia.descripcion"
      ),
      pasos: asegurarArreglo(
        origen.metodologia && esObjeto(origen.metodologia) ? origen.metodologia.pasos : null,
        "metodologia.pasos"
      ).map((paso, indice) => {
        if (!esObjeto(paso)) {
          throw new Error(`El paso de metodologia ${indice} debe ser un objeto.`);
        }

        return {
          titulo: asegurarTexto(paso.titulo, `metodologia.pasos[${indice}].titulo`),
          descripcion: asegurarTexto(paso.descripcion, `metodologia.pasos[${indice}].descripcion`)
        };
      })
    },
    nosotros: {
      titulo: asegurarTexto(
        origen.nosotros && esObjeto(origen.nosotros) ? origen.nosotros.titulo : null,
        "nosotros.titulo"
      ),
      descripcion: asegurarTexto(
        origen.nosotros && esObjeto(origen.nosotros) ? origen.nosotros.descripcion : null,
        "nosotros.descripcion"
      ),
      pilares: asegurarArreglo(
        origen.nosotros && esObjeto(origen.nosotros) ? origen.nosotros.pilares : null,
        "nosotros.pilares"
      ).map((pilar, indice) => asegurarTexto(pilar, `nosotros.pilares[${indice}]`))
    },
    pruebasConfianza: {
      titulo: asegurarTexto(
        origen.pruebasConfianza && esObjeto(origen.pruebasConfianza)
          ? origen.pruebasConfianza.titulo
          : null,
        "pruebasConfianza.titulo"
      ),
      descripcion: asegurarTexto(
        origen.pruebasConfianza && esObjeto(origen.pruebasConfianza)
          ? origen.pruebasConfianza.descripcion
          : null,
        "pruebasConfianza.descripcion"
      ),
      elementos: asegurarArreglo(
        origen.pruebasConfianza && esObjeto(origen.pruebasConfianza)
          ? origen.pruebasConfianza.elementos
          : null,
        "pruebasConfianza.elementos"
      ).map((elemento, indice) => asegurarTexto(elemento, `pruebasConfianza.elementos[${indice}]`))
    },
    cursos,
    preguntasFrecuentes: asegurarArreglo(origen.preguntasFrecuentes, "preguntasFrecuentes").map(
      (pregunta, indice) => {
        if (!esObjeto(pregunta)) {
          throw new Error(`La pregunta frecuente ${indice} debe ser un objeto.`);
        }

        return {
          pregunta: asegurarTexto(pregunta.pregunta, `preguntasFrecuentes[${indice}].pregunta`),
          respuesta: asegurarTexto(pregunta.respuesta, `preguntasFrecuentes[${indice}].respuesta`)
        };
      }
    ),
    apoyoAlumnos: {
      titulo: asegurarTexto(
        origen.apoyoAlumnos && esObjeto(origen.apoyoAlumnos) ? origen.apoyoAlumnos.titulo : null,
        "apoyoAlumnos.titulo"
      ),
      descripcion: asegurarTexto(
        origen.apoyoAlumnos && esObjeto(origen.apoyoAlumnos) ? origen.apoyoAlumnos.descripcion : null,
        "apoyoAlumnos.descripcion"
      ),
      avisos: asegurarArreglo(
        origen.apoyoAlumnos && esObjeto(origen.apoyoAlumnos) ? origen.apoyoAlumnos.avisos : null,
        "apoyoAlumnos.avisos"
      ).map((aviso, indice) => asegurarTexto(aviso, `apoyoAlumnos.avisos[${indice}]`)),
      pasosAcceso: asegurarArreglo(
        origen.apoyoAlumnos && esObjeto(origen.apoyoAlumnos) ? origen.apoyoAlumnos.pasosAcceso : null,
        "apoyoAlumnos.pasosAcceso"
      ).map((paso, indice) => asegurarTexto(paso, `apoyoAlumnos.pasosAcceso[${indice}]`)),
      calendarioGeneral: asegurarTexto(
        origen.apoyoAlumnos && esObjeto(origen.apoyoAlumnos)
          ? origen.apoyoAlumnos.calendarioGeneral
          : null,
        "apoyoAlumnos.calendarioGeneral"
      )
    },
    seo: {
      tituloBase: asegurarTexto(
        origen.seo && esObjeto(origen.seo) ? origen.seo.tituloBase : null,
        "seo.tituloBase"
      ),
      descripcionBase: asegurarTexto(
        origen.seo && esObjeto(origen.seo) ? origen.seo.descripcionBase : null,
        "seo.descripcionBase"
      ),
      imagenCompartir: asegurarTexto(
        origen.seo && esObjeto(origen.seo) ? origen.seo.imagenCompartir : null,
        "seo.imagenCompartir"
      )
    },
    medicion: {
      idGoogleTagManager: typeof origen.medicion === "object" && origen.medicion && "idGoogleTagManager" in origen.medicion
        ? String(origen.medicion.idGoogleTagManager ?? "")
        : "",
      idPixelMeta: typeof origen.medicion === "object" && origen.medicion && "idPixelMeta" in origen.medicion
        ? String(origen.medicion.idPixelMeta ?? "")
        : "",
      habilitarSeguimiento: asegurarBooleano(
        origen.medicion && esObjeto(origen.medicion) ? origen.medicion.habilitarSeguimiento : null,
        "medicion.habilitarSeguimiento"
      )
    }
  };
}
