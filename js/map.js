/* =========================================================
   map.js — mapas com Leaflet.js + OpenStreetMap (gratuito)
   ========================================================= */
function renderMapaImovel(imovel) {
  const el = document.querySelector("#mapa-imovel");
  if (!el || typeof L === "undefined" || !imovel.lat) return;
  const mapa = L.map(el.id, { scrollWheelZoom: false }).setView([imovel.lat, imovel.lng], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);
  L.marker([imovel.lat, imovel.lng]).addTo(mapa).bindPopup(imovel.titulo);
}

function renderMapaListagem(lista) {
  const el = document.querySelector("#mapa-listagem");
  if (!el || typeof L === "undefined") return;
  el.innerHTML = "";
  const comCoordenadas = lista.filter((i) => i.lat && i.lng);
  const mapa = L.map(el.id).setView([-28.2636, -52.4066], 12); // centro: Passo Fundo - RS
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  const marcadores = [];
  comCoordenadas.forEach((imovel) => {
    const m = L.marker([imovel.lat, imovel.lng])
      .addTo(mapa)
      .bindPopup(`<strong>${imovel.titulo}</strong><br>${money(imovel.preco, imovel.negociacao)}<br><a href="imovel-detalhe.html?id=${imovel.id}">Ver detalhes</a>`);
    marcadores.push(m);
  });
  if (marcadores.length) {
    const grupo = L.featureGroup(marcadores);
    mapa.fitBounds(grupo.getBounds().pad(0.2));
  }
}
