/* =========================================================
   PELLATIERO IMÓVEIS — Base de dados de demonstração
   Estes dados são fictícios e servem apenas para o protótipo
   estático. Na versão real, esses registros virão do Supabase
   (tabela "imoveis"), permitindo que o administrador cadastre,
   edite e posicione cada imóvel pelo painel /admin.
   ========================================================= */

const IMOVEIS = [
  {
    id: 1,
    codigo: "PT-1042",
    titulo: "Casa alto padrão no Boqueirão",
    tipo: "Casa",
    negociacao: "venda",
    destaque: true,
    posicao: "destaque-venda-1",
    preco: 1250000,
    bairro: "Boqueirão",
    cidade: "Passo Fundo - RS",
    area: 320,
    quartos: 4,
    suites: 2,
    banheiros: 3,
    vagas: 4,
    descricao:
      "Residência ampla e arejada, com acabamento de alto padrão, área gourmet integrada e paisagismo assinado. Próxima aos principais colégios e ao centro da cidade.",
    imagem:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: "https://my.matterport.com/show/?m=exemplo-demo-1"
  },
  {
    id: 2,
    codigo: "PT-1088",
    titulo: "Apartamento 3 dormitórios no Centro",
    tipo: "Apartamento",
    negociacao: "venda",
    destaque: true,
    posicao: "destaque-venda-2",
    preco: 620000,
    bairro: "Centro",
    cidade: "Passo Fundo - RS",
    area: 118,
    quartos: 3,
    suites: 1,
    banheiros: 2,
    vagas: 2,
    descricao:
      "Unidade com vista panorâmica da cidade, sacada gourmet e condomínio completo (piscina, salão de festas e academia).",
    imagem:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: null
  },
  {
    id: 3,
    codigo: "PT-1103",
    titulo: "Sobrado em condomínio fechado",
    tipo: "Casa em condomínio",
    negociacao: "venda",
    destaque: true,
    posicao: "destaque-venda-3",
    preco: 980000,
    bairro: "Vila Rodrigues",
    cidade: "Passo Fundo - RS",
    area: 210,
    quartos: 3,
    suites: 1,
    banheiros: 3,
    vagas: 3,
    descricao:
      "Condomínio com segurança 24h, área de lazer completa e sobrado com living amplo integrado à cozinha.",
    imagem:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: "https://my.matterport.com/show/?m=exemplo-demo-3"
  },
  {
    id: 4,
    codigo: "PT-2011",
    titulo: "Apartamento mobiliado próximo à UPF",
    tipo: "Apartamento",
    negociacao: "locacao",
    destaque: true,
    posicao: "destaque-locacao-1",
    preco: 1900,
    bairro: "Petrópolis",
    cidade: "Passo Fundo - RS",
    area: 62,
    quartos: 2,
    suites: 0,
    banheiros: 1,
    vagas: 1,
    descricao:
      "Ótimo para estudantes e profissionais, totalmente mobiliado, a poucos minutos da Universidade de Passo Fundo.",
    imagem:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: null
  },
  {
    id: 5,
    codigo: "PT-2077",
    titulo: "Casa térrea com quintal amplo",
    tipo: "Casa",
    negociacao: "locacao",
    destaque: true,
    posicao: "destaque-locacao-2",
    preco: 2600,
    bairro: "São Cristóvão",
    cidade: "Passo Fundo - RS",
    area: 145,
    quartos: 3,
    suites: 1,
    banheiros: 2,
    vagas: 2,
    descricao:
      "Casa térrea, silenciosa, com quintal amplo e churrasqueira. Ideal para famílias com pets.",
    imagem:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: "https://my.matterport.com/show/?m=exemplo-demo-5"
  },
  {
    id: 6,
    codigo: "PT-2140",
    titulo: "Sala comercial no Centro",
    tipo: "Comercial",
    negociacao: "locacao",
    destaque: true,
    posicao: "destaque-locacao-3",
    preco: 1500,
    bairro: "Centro",
    cidade: "Passo Fundo - RS",
    area: 48,
    quartos: 0,
    suites: 0,
    banheiros: 1,
    vagas: 0,
    descricao:
      "Sala comercial pronta para uso, em prédio com portaria e localização estratégica no centro comercial.",
    imagem:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    tour3d: null
  }
];

const CATEGORIAS = [
  { nome: "Apartamentos", tipo: "Apartamento", icone: "building" },
  { nome: "Apartamentos na planta", tipo: "Apartamento na planta", icone: "crane" },
  { nome: "Casas", tipo: "Casa", icone: "home" },
  { nome: "Casas em condomínio", tipo: "Casa em condomínio", icone: "gate" },
  { nome: "Chácaras / Sítios", tipo: "Chácara", icone: "tree" },
  { nome: "Comercial", tipo: "Comercial", icone: "store" },
  { nome: "Terrenos", tipo: "Terreno", icone: "map" },
  { nome: "Terrenos em condomínio", tipo: "Terreno em condomínio", icone: "map-gate" }
];
