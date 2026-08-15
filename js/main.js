/* =========================================================
   main.js — bootstrap: navegação, cards, páginas e eventos globais
   ========================================================= */

const money = (v, negociacao) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v) +
  (negociacao === "locacao" ? "<small>/mês</small>" : "");

const favoritos = new Set();

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open-mobile");
    nav.style.cssText = open
      ? "display:flex;position:absolute;top:76px;left:0;right:0;flex-direction:column;background:#101a0c;padding:14px 24px;gap:4px;"
      : "";
  });
}

function initSearchTabs() {
  const tabs = document.querySelectorAll(".search-tab");
  const bodies = document.querySelectorAll("[data-search-mode]");
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const mode = tab.dataset.tab;
      bodies.forEach((b) => (b.style.display = b.dataset.searchMode === mode ? "" : "none"));
    });
  });
}

function initFiltersToggle() {
  const btn = document.querySelector(".filters-toggle");
  const panel = document.querySelector(".filters-panel");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    panel.classList.toggle("is-open");
    btn.querySelector("span").textContent = panel.classList.contains("is-open") ? "Ocultar filtros" : "Filtros avançados";
  });
}

function propertyCardHTML(imovel) {
  const isFav = favoritos.has(imovel.id);
  return `
  <article class="property-card" data-id="${imovel.id}">
    <div class="card-media">
      <img src="${imovel.imagem}" alt="${imovel.titulo}" loading="lazy">
      <span class="card-badge ${imovel.negociacao === "locacao" ? "locacao" : ""}">${imovel.negociacao === "locacao" ? "Locação" : "Venda"}</span>
      <button class="card-fav ${isFav ? "is-active" : ""}" data-fav="${imovel.id}" aria-label="Favoritar imóvel">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
      </button>
      ${imovel.tour3d || imovel.pano360 ? `<span class="card-3d">Tour 3D</span>` : ""}
    </div>
    <div class="card-body">
      <div class="card-price">${money(imovel.preco, imovel.negociacao)} <small style="font-family:var(--font-mono);color:var(--ink-soft)">${imovel.codigo}</small></div>
      <h3 class="card-title">${imovel.titulo}</h3>
      <div class="card-loc">${imovel.bairro}, ${imovel.cidade}</div>
      <div class="card-specs">
        <span>${imovel.area} m²</span>
        ${imovel.quartos ? `<span>${imovel.quartos} dorm.</span>` : ""}
        ${imovel.vagas ? `<span>${imovel.vagas} vaga(s)</span>` : ""}
      </div>
    </div>
    <div class="card-footer">
      <a class="btn btn-outline btn-block btn-sm" href="imovel-detalhe.html?id=${imovel.id}">Ver detalhes</a>
    </div>
  </article>`;
}

function bindFavButtons() {
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(btn.dataset.fav);
      favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
      btn.classList.toggle("is-active");
      btn.querySelector("path")?.setAttribute("fill", favoritos.has(id) ? "currentColor" : "none");
    });
  });
}

function renderHomeGrids() {
  const gridVenda = document.querySelector("#grid-venda");
  const gridLocacao = document.querySelector("#grid-locacao");
  if (gridVenda) gridVenda.innerHTML = IMOVEIS.filter((i) => i.negociacao === "venda" && i.destaque).map(propertyCardHTML).join("");
  if (gridLocacao) gridLocacao.innerHTML = IMOVEIS.filter((i) => i.negociacao === "locacao" && i.destaque).map(propertyCardHTML).join("");
  bindFavButtons();
}

function renderCategorias() {
  const wrap = document.querySelector("#cat-grid");
  if (!wrap) return;
  const icones = { building: "🏢", home: "🏠", gate: "🏡", tree: "🌳", store: "🏬", map: "🗺️", crane: "🏗️", "map-gate": "📍" };
  wrap.innerHTML = CATEGORIAS.map(
    (c) => `<a class="cat-card" href="imoveis.html?tipo=${encodeURIComponent(c.tipo)}">
      <div class="cat-icon">${icones[c.icone] || "🏠"}</div><span>${c.nome}</span>
    </a>`
  ).join("");
}

function initHeroSearchForm() {
  const form = document.querySelector("#hero-search-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = form.querySelector('[name="termo"]').value.trim();
    const activeTab = document.querySelector(".search-tab.is-active")?.dataset.tab || "venda";
    const params = new URLSearchParams();
    if (termo) params.set("q", termo);
    if (activeTab !== "codigo") params.set("negociacao", activeTab);
    window.location.href = "imoveis.html?" + params.toString();
  });
}

function renderDetailPage() {
  const wrap = document.querySelector("#detalhe-imovel");
  if (!wrap) return;
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const imovel = IMOVEIS.find((i) => i.id === id) || IMOVEIS[0];
  document.title = `${imovel.titulo} · Pellatiero Imóveis`;

  wrap.innerHTML = `
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:20px">
      <img src="${imovel.galeria[0]}" style="width:100%;height:420px;object-fit:cover;border-radius:var(--radius-m)" alt="${imovel.titulo}">
      <div id="tour3d-viewer" style="background:var(--moss-950);border-radius:var(--radius-m);position:relative;overflow:hidden"></div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px">
      <div>
        <span class="eyebrow">${imovel.codigo} · ${imovel.tipo}</span>
        <h1 style="font-family:var(--font-display);font-size:32px;margin:8px 0 6px;color:var(--moss-950)">${imovel.titulo}</h1>
        <p style="color:var(--ink-soft);margin:0 0 24px">${imovel.bairro}, ${imovel.cidade}</p>
        <div class="card-specs" style="border:1px solid var(--line);border-radius:var(--radius-m);padding:16px 18px;margin-bottom:26px">
          <span>${imovel.area} m²</span><span>${imovel.quartos} dormitórios</span>
          <span>${imovel.suites} suíte(s)</span><span>${imovel.banheiros} banheiro(s)</span><span>${imovel.vagas} vaga(s)</span>
        </div>
        <h3 style="font-family:var(--font-display);color:var(--moss-950)">Sobre o imóvel</h3>
        <p style="color:var(--ink-soft);line-height:1.75">${imovel.descricao}</p>
        <h3 style="font-family:var(--font-display);color:var(--moss-950)">Localização</h3>
        <div class="map-wrap"><div id="mapa-imovel"></div></div>
      </div>
      <aside>
        <div class="form-card">
          <div class="card-price" style="margin-bottom:14px">${money(imovel.preco, imovel.negociacao)}</div>
          <form onsubmit="event.preventDefault(); this.querySelector('button').textContent='Mensagem enviada ✓';">
            <div class="form-group"><label>Nome</label><input required placeholder="Seu nome"></div>
            <div class="form-group"><label>Telefone / WhatsApp</label><input required placeholder="(54) 9 0000-0000"></div>
            <div class="form-group"><label>Mensagem</label><textarea rows="3">Olá, tenho interesse no imóvel ${imovel.codigo}.</textarea></div>
            <button class="btn btn-primary btn-block" type="submit">Falar com um corretor</button>
          </form>
        </div>
      </aside>
    </div>
  `;

  initTour3D(imovel);
  renderMapaImovel(imovel);
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSearchTabs();
  initFiltersToggle();
  renderHomeGrids();
  renderCategorias();
  initHeroSearchForm();
  initListPageComFiltros();
  renderDetailPage();
  renderAdminTable();
  initPlacementSelector();
  initFormsMock();

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
