/* =========================================================
   tour3d.js — Tour 3D / 360° usando Pannellum (open-source)
   https://pannellum.org
   Cada imóvel pode ter uma foto panorâmica equiretangular
   (campo "pano360" em data.js). Se não houver, mostramos o
   vídeo simples ou um aviso.
   ========================================================= */
function initTour3D(imovel) {
  const container = document.querySelector("#tour3d-viewer");
  if (!container) return;

  if (imovel.pano360) {
    if (typeof pannellum === "undefined") {
      container.innerHTML = `<p style="color:#fff;padding:20px">Biblioteca Pannellum não carregou (verifique sua conexão).</p>`;
      return;
    }
    pannellum.viewer(container.id, {
      type: "equirectangular",
      panorama: imovel.pano360,
      autoLoad: true,
      autoRotate: -2,
      compass: false,
      title: imovel.titulo,
      hotSpotDebug: false
    });
  } else if (imovel.tour3d) {
    container.innerHTML = `
      <a href="${imovel.tour3d}" target="_blank" rel="noopener"
         style="display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;height:100%;color:#fff">
        <span>Abrir tour virtual 3D (Matterport) ↗</span>
      </a>`;
  } else {
    container.innerHTML = `<p style="color:rgba(255,255,255,.7);padding:20px;text-align:center">
      Este imóvel ainda não possui tour 3D cadastrado.</p>`;
  }
}
