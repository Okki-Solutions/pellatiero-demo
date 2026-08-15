/* =========================================================
   search.js — motor de busca client-side (usa Fuse.js via CDN)
   Na versão real, isso é substituído pela busca do Supabase
   (índice gin_trgm / full text search no Postgres).
   ========================================================= */
let fuseInstance = null;

function getFuse() {
  if (fuseInstance) return fuseInstance;
  if (typeof Fuse === "undefined") return null; // Fuse.js não carregado
  fuseInstance = new Fuse(IMOVEIS, {
    keys: ["titulo", "bairro", "cidade", "tipo", "codigo"],
    threshold: 0.35,
    ignoreLocation: true
  });
  return fuseInstance;
}

/** Busca textual "inteligente" (tolera pequenos erros de digitação). */
function buscarImoveis(termo) {
  if (!termo) return IMOVEIS;
  const fuse = getFuse();
  if (!fuse) {
    // fallback simples caso o Fuse.js não tenha carregado (ex.: sem internet)
    const alvo = termo.toLowerCase();
    return IMOVEIS.filter((i) =>
      `${i.titulo} ${i.bairro} ${i.cidade} ${i.tipo} ${i.codigo}`.toLowerCase().includes(alvo)
    );
  }
  return fuse.search(termo).map((r) => r.item);
}
