/* =========================================================
   filters.js — filtros dinâmicos combinados com a busca textual
   ========================================================= */
function aplicarFiltros(lista, filtros) {
  return lista.filter((i) => {
    if (filtros.negociacao && i.negociacao !== filtros.negociacao) return false;
    if (filtros.tipo && i.tipo !== filtros.tipo) return false;
    if (filtros.quartos && i.quartos < Number(filtros.quartos)) return false;
    if (filtros.precoMax && i.preco > Number(filtros.precoMax)) return false;
    return true;
  });
}

function initListPageComFiltros() {
  const grid = document.querySelector("#grid-listagem");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    q: params.get("q") || "",
    negociacao: params.get("negociacao") || "",
    tipo: params.get("tipo") || "",
    precoMax: "",
    quartos: ""
  };

  function apply() {
    const base = buscarImoveis(state.q);
    const resultado = aplicarFiltros(base, state);
    grid.innerHTML = resultado.length
      ? resultado.map(propertyCardHTML).join("")
      : `<p style="grid-column:1/-1;color:var(--ink-soft)">Nenhum imóvel encontrado com esses filtros. Tente ampliar a busca.</p>`;
    document.querySelector("#result-count").textContent = resultado.length;
    bindFavButtons();
    if (typeof renderMapaListagem === "function") renderMapaListagem(resultado);
  }

  const inputBusca = document.querySelector("#filtro-busca");
  const selNegociacao = document.querySelector("#filtro-negociacao");
  const selTipo = document.querySelector("#filtro-tipo");
  const inputPreco = document.querySelector("#filtro-preco");
  const selQuartos = document.querySelector("#filtro-quartos");

  if (inputBusca) inputBusca.value = state.q;
  if (selNegociacao) selNegociacao.value = state.negociacao;
  if (selTipo) selTipo.value = state.tipo;

  inputBusca?.addEventListener("input", (e) => { state.q = e.target.value; apply(); });
  selNegociacao?.addEventListener("change", (e) => { state.negociacao = e.target.value; apply(); });
  selTipo?.addEventListener("change", (e) => { state.tipo = e.target.value; apply(); });
  inputPreco?.addEventListener("input", (e) => { state.precoMax = e.target.value; apply(); });
  selQuartos?.addEventListener("change", (e) => { state.quartos = e.target.value; apply(); });

  apply();
}
