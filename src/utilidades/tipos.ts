export type EstadoPrograma = "abierto" | "proximo" | "cerrado" | "oculto";

export interface EnlaceNavegacion {
  href: string;
  etiqueta: string;
}

export interface CtaWhatsApp {
  etiqueta: string;
  mensaje: string;
}

export interface CtaEnlace {
  etiqueta: string;
  enlace: string;
}

export interface MetricaPortada {
  valor: string;
  etiqueta: string;
}

export interface ProgramaAcademico {
  id: string;
  titulo: string;
  nombreCorto: string;
  categoria: string;
  estado: EstadoPrograma;
  destacado: boolean;
  enfoque: string;
  descripcion: string;
  idealPara: string[];
  puntosClave: string[];
  etiquetaCta: string;
  mensajeWhatsApp: string;
}

export interface CategoriaPrograma {
  id: string;
  titulo: string;
  descripcion: string;
}

export interface PasoMetodologia {
  titulo: string;
  descripcion: string;
}

export interface Testimonio {
  cita: string;
  autor: string;
  contexto: string;
  imagen?: string;
  textoAlternativo?: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface PaginaSimple {
  tituloSeo: string;
  descripcionSeo: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
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
  navegacionPrincipal: EnlaceNavegacion[];
  portada: {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    ctaPrincipal: CtaWhatsApp;
    ctaSecundario: CtaEnlace;
    metricas: MetricaPortada[];
    panel: {
      titulo: string;
      descripcion: string;
      puntos: string[];
    };
  };
  categoriasProgramas: CategoriaPrograma[];
  programas: ProgramaAcademico[];
  metodologia: {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    pasos: PasoMetodologia[];
  };
  pruebasConfianza: {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    elementos: string[];
  };
  testimonios: {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    elementos: Testimonio[];
  };
  preguntasFrecuentes: PreguntaFrecuente[];
  paginas: {
    cursos: PaginaSimple;
    metodologia: PaginaSimple;
    nosotros: PaginaSimple & {
      pilares: string[];
      manifiesto: {
        titulo: string;
        descripcion: string;
        puntos: string[];
      };
    };
    contacto: PaginaSimple & {
      opciones: Array<{
        titulo: string;
        descripcion: string;
        cta: CtaWhatsApp;
      }>;
    };
    preguntasFrecuentes: PaginaSimple;
    accesoAlumnos: PaginaSimple & {
      avisos: string[];
      pasosAcceso: string[];
      calendarioGeneral: string;
      apoyo: {
        titulo: string;
        descripcion: string;
        cta: CtaWhatsApp;
      };
    };
  };
  llamadas: {
    cursosNoPublicados: {
      titulo: string;
      descripcion: string;
      cta: CtaWhatsApp;
    };
    cierreGeneral: {
      titulo: string;
      descripcion: string;
      cta: CtaWhatsApp;
    };
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
