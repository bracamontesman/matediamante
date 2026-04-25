import { obtenerConfiguracionSitio } from "@utilidades/sitio";

export function obtenerScriptsMedicion() {
  const { medicion } = obtenerConfiguracionSitio();

  return {
    habilitarSeguimiento: medicion.habilitarSeguimiento,
    idGoogleTagManager: medicion.idGoogleTagManager.trim(),
    idPixelMeta: medicion.idPixelMeta.trim()
  };
}
