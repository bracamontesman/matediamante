export type EstadoCurso = "activo" | "proximo" | "cerrado" | "archivado";

export interface EstadisticaPortada {
  valor: string;
  etiqueta: string;
}

export interface CtaPortada {
  etiqueta: string;
  mensaje?: string;
  enlace?: string;
}

export interface RutaAcademica {
  clave: string;
  titulo: string;
  descripcion: string;
}

export interface PasoMetodologia {
  titulo: string;
  descripcion: string;
}

export interface Curso {
  id: string;
  titulo: string;
  ruta: string;
  examenOMeta: string;
  temporada: string;
  estado: EstadoCurso;
  fechaInicio: string;
  fechaFin: string;
  resumenHorario: string;
  modalidad: string;
  precioTexto: string;
  resumen: string;
  destacado: boolean;
  etiquetaCta: string;
  mensajeWhatsApp: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface ConfiguracionSitio {
  marca: {
    nombre: string;
    eslogan: string;
    descripcionCorta: string;
    logotipo: string;
    avisoLogotipo: string;
  };
  contacto: {
    telefono: string;
    telefonoVisible: string;
    correo: string;
    horarioAtencion: string;
    mensajeGeneralWhatsApp: string;
    direccionTexto: string;
  };
  portada: {
    insignia: string;
    titulo: string;
    descripcion: string;
    ctaPrincipal: CtaPortada;
    ctaSecundario: CtaPortada;
    estadisticas: EstadisticaPortada[];
  };
  rutasAcademicas: RutaAcademica[];
  metodologia: {
    titulo: string;
    descripcion: string;
    pasos: PasoMetodologia[];
  };
  nosotros: {
    titulo: string;
    descripcion: string;
    pilares: string[];
  };
  pruebasConfianza: {
    titulo: string;
    descripcion: string;
    elementos: string[];
  };
  cursos: Curso[];
  preguntasFrecuentes: PreguntaFrecuente[];
  apoyoAlumnos: {
    titulo: string;
    descripcion: string;
    avisos: string[];
    pasosAcceso: string[];
    calendarioGeneral: string;
  };
  seo: {
    tituloBase: string;
    descripcionBase: string;
    imagenCompartir: string;
  };
  medicion: {
    idGoogleTagManager: string;
    idPixelMeta: string;
    habilitarSeguimiento: boolean;
  };
}
