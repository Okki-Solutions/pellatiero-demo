/* =========================================================
   PELLATIERO IMÓVEIS — script.js
   Protótipo estático: toda a "base de dados" vive em memória
   (js/data.js). Nada aqui é persistido — na versão real
   (pasta /pellatiero-real) esses dados vêm do Supabase.
   ========================================================= */

const money = (v, negociacao) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v) +
  (negociacao === "locacao" ? "<small>/mês</small>" : "");

const favoritos = new Set(); // apenas em memória, dura enquanto a página está aberta

/* ---------- Menu mobile ---------- */
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

/* ---------- Tabs da busca (Venda / Locação / Código) ---------- */
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

/* ---------- Painel de filtros avançados ---------- */
function initFiltersToggle() {
  const btn = document.querySelector(".filters-toggle");
  const panel = document.querySelector(".filters-panel");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    panel.classList.toggle("is-open");
    btn.querySelector("span").textContent = panel.classList.contains("is-open")
      ? "Ocultar filtros"
      : "Filtros avançados";
  });
}

/* ---------- Card de imóvel (HTML) ---------- */
function propertyCardHTML(imovel) {
  const isFav = favoritos.has(imovel.id);
  return `
  <article class="property-card" data-id="${imovel.id}" data-tipo="${imovel.tipo}" data-negociacao="${imovel.negociacao}"
    data-bairro="${imovel.bairro.toLowerCase()}" data-preco="${imovel.preco}" data-quartos="${imovel.quartos}">
    <div class="card-media">
      <img src="${imovel.imagem}" alt="${imovel.titulo}" loading="lazy">
      <span class="card-badge ${imovel.negociacao === "locacao" ? "locacao" : ""}">${
        imovel.negociacao === "locacao" ? "Locação" : "Venda"
      }</span>
      <button class="card-fav ${isFav ? "is-active" : ""}" title="Favoritar" data-fav="${imovel.id}" aria-label="Favoritar imóvel">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
      </button>
      ${
        imovel.tour3d
          ? `<span class="card-3d"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></svg> Tour 3D</span>`
          : ""
      }
    </div>
    <div class="card-body">
      <div class="card-price">${money(imovel.preco, imovel.negociacao)} <small style="font-family:var(--font-mono);color:var(--ink-soft)">${imovel.codigo}</small></div>
      <h3 class="card-title">${imovel.titulo}</h3>
      <div class="card-loc">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/></svg>
        ${imovel.bairro}, ${imovel.cidade}
      </div>
      <div class="card-specs">
        <span>${imovel.area} m²</span>
        ${imovel.quartos ? `<span>${imovel.quartos} dorm.</span>` : ""}
        ${imovel.suites ? `<span>${imovel.suites} suíte</span>` : ""}
        ${imovel.vagas ? `<span>${imovel.vagas} vaga(s)</span>` : ""}
      </div>
    </div>
    <div class="card-footer">
      <a class="btn btn-outline btn-block btn-sm" href="imovel.html?id=${imovel.id}">Ver detalhes</a>
    </div>
  </article>`;
}

/* ---------- Renderiza vitrines da home ---------- */
function renderHomeGrids() {
  const gridVenda = document.querySelector("#grid-venda");
  const gridLocacao = document.querySelector("#grid-locacao");
  if (gridVenda) {
    gridVenda.innerHTML = IMOVEIS.filter((i) => i.negociacao === "venda" && i.destaque)
      .map(propertyCardHTML)
      .join("");
  }
  if (gridLocacao) {
    gridLocacao.innerHTML = IMOVEIS.filter((i) => i.negociacao === "locacao" && i.destaque)
      .map(propertyCardHTML)
      .join("");
  }
  bindFavButtons();
}

/* ---------- Abas Destaque Venda / Locação (mobile-friendly, opcional) ---------- */
function initDestaqueTabs() {
  const tabs = document.querySelectorAll(".carousel-tabs button");
  if (!tabs.length) return;
  const panels = document.querySelectorAll("[data-panel]");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      panels.forEach((p) => (p.style.display = p.dataset.panel === tab.dataset.show ? "" : "none"));
    })
  );
}

/* ---------- Favoritar (em memória) ---------- */
function bindFavButtons() {
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(btn.dataset.fav);
      if (favoritos.has(id)) favoritos.delete(id);
      else favoritos.add(id);
      btn.classList.toggle("is-active");
      btn.querySelector("path")?.setAttribute("fill", favoritos.has(id) ? "currentColor" : "none");
    });
  });
}

/* ---------- Busca por texto (home) ---------- */
function initHeroSearchForm() {
  const form = document.querySelector("#hero-search-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = form.querySelector('[name="termo"]').value.trim();
    const activeTab = document.querySelector(".search-tab.is-active")?.dataset.tab || "venda";
    const params = new URLSearchParams();
    if (termo) params.set("q", termo);
    params.set("negociacao", activeTab === "codigo" ? "" : activeTab);
    if (activeTab === "codigo") params.set("codigo", termo);
    window.location.href = "imoveis.html?" + params.toString();
  });
}

/* ---------- Página de listagem (imoveis.html) com filtro ao vivo ---------- */
function initListPage() {
  const grid = document.querySelector("#grid-listagem");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    q: params.get("q") || "",
    negociacao: params.get("negociacao") || "",
    tipo: "",
    precoMax: "",
    quartos: ""
  };

  function apply() {
    const termo = state.q.toLowerCase();
    const resultado = IMOVEIS.filter((i) => {
      if (state.negociacao && i.negociacao !== state.negociacao) return false;
      if (state.tipo && i.tipo !== state.tipo) return false;
      if (state.quartos && i.quartos < Number(state.quartos)) return false;
      if (state.precoMax && i.preco > Number(state.precoMax)) return false;
      if (termo) {
        const alvo = `${i.titulo} ${i.bairro} ${i.cidade} ${i.tipo} ${i.codigo}`.toLowerCase();
        if (!alvo.includes(termo)) return false;
      }
      return true;
    });
    grid.innerHTML = resultado.length
      ? resultado.map(propertyCardHTML).join("")
      : `<p style="grid-column:1/-1;color:var(--ink-soft)">Nenhum imóvel encontrado com esses filtros. Tente ampliar a busca.</p>`;
    document.querySelector("#result-count").textContent = resultado.length;
    bindFavButtons();
  }

  const inputBusca = document.querySelector("#filtro-busca");
  const selNegociacao = document.querySelector("#filtro-negociacao");
  const selTipo = document.querySelector("#filtro-tipo");
  const inputPreco = document.querySelector("#filtro-preco");
  const selQuartos = document.querySelector("#filtro-quartos");

  if (inputBusca) inputBusca.value = state.q;
  if (selNegociacao) selNegociacao.value = state.negociacao;

  inputBusca?.addEventListener("input", (e) => { state.q = e.target.value; apply(); });
  selNegociacao?.addEventListener("change", (e) => { state.negociacao = e.target.value; apply(); });
  selTipo?.addEventListener("change", (e) => { state.tipo = e.target.value; apply(); });
  inputPreco?.addEventListener("input", (e) => { state.precoMax = e.target.value; apply(); });
  selQuartos?.addEventListener("change", (e) => { state.quartos = e.target.value; apply(); });

  apply();
}

/* ---------- Categorias na home ---------- */
function renderCategorias() {
  const wrap = document.querySelector("#cat-grid");
  if (!wrap) return;
  wrap.innerHTML = CATEGORIAS.map(
    (c) => `<a class="cat-card" href="imoveis.html?tipo=${encodeURIComponent(c.tipo)}">
      <div class="cat-icon">${iconSvg(c.icone)}</div>
      <span>${c.nome}</span>
    </a>`
  ).join("");
}

function iconSvg(name) {
  const icons = {
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h6v18M14 21V9h6v12M8 7h.01M8 11h.01M8 15h.01" stroke="currentColor" stroke-width="2" fill="none"/>',
    home: '<path d="M3 11.5 12 4l9 7.5M5 10v10h14V10" stroke="currentColor" stroke-width="2" fill="none"/>',
    gate: '<path d="M4 21V8l8-4 8 4v13M9 21v-6h6v6" stroke="currentColor" stroke-width="2" fill="none"/>',
    tree: '<path d="M12 2 6 12h3l-4 8h14l-4-8h3L12 2ZM12 22v-4" stroke="currentColor" stroke-width="2" fill="none"/>',
    store: '<path d="M4 9 5 4h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" stroke="currentColor" stroke-width="2" fill="none"/>',
    map: '<path d="m9 3-6 2v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 0v16m6-16v16" stroke="currentColor" stroke-width="2" fill="none"/>',
    crane: '<path d="M4 21h9M6 21V9l9-5v9M15 4v5h5M9 21V13" stroke="currentColor" stroke-width="2" fill="none"/>',
    "map-gate": '<path d="m9 3-6 2v16l6-2 6 2 6-2V3l-6 2-6-2Z" stroke="currentColor" stroke-width="2" fill="none"/>'
  };
  return `<svg width="20" height="20" viewBox="0 0 24 24">${icons[name] || icons.home}</svg>`;
}

/* ---------- Página de detalhe (imovel.html) ---------- */
function renderDetailPage() {
  const wrap = document.querySelector("#detalhe-imovel");
  if (!wrap) return;
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const imovel = IMOVEIS.find((i) => i.id === id) || IMOVEIS[0];

  document.title = `${imovel.titulo} · Pellatiero Imóveis`;

  wrap.innerHTML = `
    <div class="detail-gallery" style="display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:36px;">
      <img src="${imovel.galeria[0]}" style="width:100%;height:420px;object-fit:cover;border-radius:var(--radius-m)" alt="${imovel.titulo}">
      <div style="display:grid;grid-template-rows:1fr 1fr;gap:14px;">
        ${(imovel.galeria[1] ? `<img src="${imovel.galeria[1]}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-m)">` : `<div style="background:var(--moss-100);border-radius:var(--radius-m)"></div>`)}
        ${
          imovel.tour3d
            ? `<a href="${imovel.tour3d}" target="_blank" rel="noopener" style="background:var(--moss-950);color:#fff;border-radius:var(--radius-m);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
                 <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></svg>
                 <span style="font-size:13px;font-weight:600">Abrir tour virtual 3D</span>
               </a>`
            : `<div style="background:var(--moss-100);border-radius:var(--radius-m)"></div>`
        }
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;">
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
        ${
          imovel.tour3d
            ? `<h3 style="font-family:var(--font-display);color:var(--moss-950)">Vídeo / Tour virtual 3D</h3>
               <div style="aspect-ratio:16/9;background:var(--moss-950);border-radius:var(--radius-m);display:flex;align-items:center;justify-content:center;color:#fff;font-size:13.5px">
                 Player de vídeo 3D (demonstração) — na versão real, o arquivo fica hospedado no Supabase Storage.
               </div>`
            : ""
        }
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
}

/* ---------- Admin demo: tabela + seletor de posição ---------- */
function renderAdminTable() {
  const tbody = document.querySelector("#admin-table-body");
  if (!tbody) return;
  tbody.innerHTML = IMOVEIS.map(
    (i) => `<tr>
      <td><img class="mini-thumb" src="${i.imagem}" alt=""></td>
      <td><strong>${i.titulo}</strong><br><span style="color:var(--ink-soft);font-size:12.5px">${i.codigo}</span></td>
      <td><span class="tag ${i.negociacao}">${i.negociacao === "venda" ? "Venda" : "Locação"}</span></td>
      <td>${money(i.preco, i.negociacao).replace(/<small.*?<\/small>/, "")}</td>
      <td>${i.posicao || "—"}</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" title="Editar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
          <button class="icon-btn" title="Remover"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg></button>
        </div>
      </td>
    </tr>`
  ).join("");
}

function initPlacementSelector() {
  const slots = document.querySelectorAll(".placement-slot");
  if (!slots.length) return;
  slots.forEach((slot) =>
    slot.addEventListener("click", () => {
      slots.forEach((s) => s.classList.remove("is-selected"));
      slot.classList.add("is-selected");
    })
  );
}

/* ---------- init geral ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSearchTabs();
  initFiltersToggle();
  initDestaqueTabs();
  renderHomeGrids();
  renderCategorias();
  initHeroSearchForm();
  initListPage();
  renderDetailPage();
  renderAdminTable();
  initPlacementSelector();

  // ano dinâmico no rodapé
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
