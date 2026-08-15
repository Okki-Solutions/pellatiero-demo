/* =========================================================
   storage-safe.js
   Wrapper simples em volta do localStorage.
   Por que existe: dentro da pré-visualização do Claude.ai o
   localStorage é bloqueado pelo sandbox do navegador. Este
   arquivo tenta usar localStorage normalmente (é o que vai
   acontecer quando você publicar no Netlify) e, se não
   conseguir, cai automaticamente para um objeto em memória —
   assim a demonstração nunca quebra, em nenhum ambiente.
   ========================================================= */
const storageSafe = (() => {
  let memoria = {};
  let disponivel = false;
  try {
    const teste = "__teste__";
    window.localStorage.setItem(teste, "1");
    window.localStorage.removeItem(teste);
    disponivel = true;
  } catch (e) {
    disponivel = false;
  }

  return {
    get(chave) {
      if (disponivel) return window.localStorage.getItem(chave);
      return Object.prototype.hasOwnProperty.call(memoria, chave) ? memoria[chave] : null;
    },
    set(chave, valor) {
      if (disponivel) return window.localStorage.setItem(chave, valor);
      memoria[chave] = valor;
    },
    remove(chave) {
      if (disponivel) return window.localStorage.removeItem(chave);
      delete memoria[chave];
    }
  };
})();
