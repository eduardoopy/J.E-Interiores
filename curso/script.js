// Constantes globais
const NUMERO_WHATSAPP = "5562981750460";

// Utilitários
function formatCurrency(value) {
  if (!value || value === 0) return "Consultar valor";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Gerenciamento do carrinho
let carrinho = [];
let produtoAtual = null;

function saveCarrinho() {
  try {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } catch (e) {
    console.error("Erro ao salvar carrinho:", e);
  }
}

function loadCarrinho() {
  try {
    const data = localStorage.getItem("carrinho");
    if (data) {
      carrinho = JSON.parse(data) || [];
    }
  } catch (e) {
    console.error("Erro ao carregar carrinho:", e);
    carrinho = [];
  }
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador");
  if (contador) contador.innerText = carrinho.length;
}

// Dados dos produtos
const produtos = [
  {
    nome: "Sofá Modelo Tradicional J.E - Bege",
    preco: 0,
    categoria: "sofa",
    imagens: [
      "imagens/sofa-tradicional-bege-1.jpeg",
      "imagens/sofa-tradicional-bege-2.jpeg",
      "imagens/sofa-tradicional-bege-3.jpeg"
    ],
    descricao: "Sofá modelo tradicional J.E com visual elegante, amplo e confortável para sua casa.",
    material: "Tecido de gramatura 250",
    espuma: "Soft ou Selada",
    garantia: "5 anos",
    detalhes: [
      "Tecido de gramatura 250 – resistente e elegante",
      "Espuma Soft – mais macia e fofinha",
      "Espuma Selada – mais firme e estruturada",
      "Produção com alto padrão de qualidade",
      "5 anos de garantia"
    ]
  },
  {
    nome: "Sofá Modelo Tradicional J.E - Azul Marinho",
    preco: 0,
    categoria: "sofa",
    imagens: [
      "imagens/sofa-tradicional-azul-1.jpeg"
    ],
    descricao: "Sofá modelo tradicional J.E em azul marinho, com design moderno e elegante.",
    material: "Tecido de gramatura 250",
    espuma: "Soft ou Selada",
    garantia: "5 anos",
    detalhes: [
      "Tecido de gramatura 250 – resistente e elegante",
      "Espuma Soft – mais macia e fofinha",
      "Espuma Selada – mais firme e estruturada",
      "Produção com alto padrão de qualidade",
      "5 anos de garantia"
    ]
  },
  {
    nome: "Sofá Modelo Tradicional J.E - Marrom",
    preco: 0,
    categoria: "sofa",
    imagens: [
      "imagens/sofa-tradicional-marrom-1.jpeg",
      "imagens/sofa-tradicional-marrom-2.jpeg"
    ],
    descricao: "Sofá modelo tradicional J.E em tom marrom, ideal para ambientes sofisticados.",
    material: "Tecido de gramatura 250",
    espuma: "Soft ou Selada",
    garantia: "5 anos",
    detalhes: [
      "Tecido de gramatura 250 – resistente e elegante",
      "Espuma Soft – mais macia e fofinha",
      "Espuma Selada – mais firme e estruturada",
      "Produção com alto padrão de qualidade",
      "5 anos de garantia"
    ]
  },
  {
    nome: "Sofá Modelo Tradicional J.E - Cinza",
    preco: 0,
    categoria: "sofa",
    imagens: [
      "imagens/sofa-tradicional-cinza-1.jpeg"
    ],
    descricao: "Sofá modelo tradicional J.E em tom cinza, combinando conforto e estilo.",
    material: "Tecido de gramatura 250",
    espuma: "Soft ou Selada",
    garantia: "5 anos",
    detalhes: [
      "Tecido de gramatura 250 – resistente e elegante",
      "Espuma Soft – mais macia e fofinha",
      "Espuma Selada – mais firme e estruturada",
      "Produção com alto padrão de qualidade",
      "5 anos de garantia"
    ]
  },


{
  nome: "Sofá Barcelona J.E - Bege Claro",
  preco: 0,
  categoria: "sofa",
  imagens: [
    "imagens2/barcelona-bege-claro-1.jpeg",
    "imagens2/barcelona-bege-claro-2.jpeg"
  ],
  descricao: "Sofá Barcelona J.E com design moderno, elegante e extremamente confortável.",
  material: "Tecido de gramatura 250",
  espuma: "Espuma revestida do assento até a frente",
  garantia: "5 anos",
  detalhes: [
    "Design moderno que valoriza qualquer ambiente",
    "Acabamento com espuma revestida do assento até a frente",
    "Tecido de gramatura 250 – resistente e de alta qualidade",
    "Assento amplo, ideal para relaxar com muito conforto",
    "Detalhes que fazem toda a diferença no visual",
    "5 anos de garantia"
  ]
},
{
  nome: "Sofá Barcelona J.E - Bege",
  preco: 0,
  categoria: "sofa",
  imagens: [
    "imagens2/barcelona-bege-1.jpeg",
    "imagens2/barcelona-bege-2.jpeg"
  ],
  descricao: "Sofá Barcelona J.E com visual sofisticado e assento amplo para máximo conforto.",
  material: "Tecido de gramatura 250",
  espuma: "Espuma revestida do assento até a frente",
  garantia: "5 anos",
  detalhes: [
    "Design moderno que valoriza qualquer ambiente",
    "Acabamento com espuma revestida do assento até a frente",
    "Tecido de gramatura 250 – resistente e de alta qualidade",
    "Assento amplo, ideal para relaxar com muito conforto",
    "Detalhes sofisticados no acabamento",
    "5 anos de garantia"
  ]
},
{
  nome: "Sofá Barcelona J.E - Cinza Claro",
  preco: 0,
  categoria: "sofa",
  imagens: [
    "imagens2/barcelona-cinza-claro-1.jpeg"
  ],
  descricao: "Sofá Barcelona J.E em cinza claro, perfeito para ambientes modernos e elegantes.",
  material: "Tecido de gramatura 250",
  espuma: "Espuma revestida do assento até a frente",
  garantia: "5 anos",
  detalhes: [
    "Design moderno que valoriza qualquer ambiente",
    "Acabamento com espuma revestida do assento até a frente",
    "Tecido de gramatura 250 – resistente e de alta qualidade",
    "Assento amplo e confortável",
    "Visual clean e sofisticado",
    "5 anos de garantia"
  ]
},
{
  nome: "Sofá Barcelona J.E - Verde",
  preco: 0,
  categoria: "sofa",
  imagens: [
    "imagens2/barcelona-verde-1.jpeg"
  ],
  descricao: "Sofá Barcelona J.E em verde, com presença marcante e acabamento sofisticado.",
  material: "Tecido de gramatura 250",
  espuma: "Espuma revestida do assento até a frente",
  garantia: "5 anos",
  detalhes: [
    "Design moderno que valoriza qualquer ambiente",
    "Acabamento com espuma revestida do assento até a frente",
    "Tecido de gramatura 250 – resistente e de alta qualidade",
    "Assento amplo, ideal para relaxar",
    "Cor elegante e diferenciada",
    "5 anos de garantia"
  ]
},
{
  nome: "Sofá Barcelona J.E - Grafite",
  preco: 0,
  categoria: "sofa",
  imagens: [
    "imagens2/barcelona-grafite-1.jpeg"
  ],
  descricao: "Sofá Barcelona J.E em tom grafite, combinando conforto, beleza e sofisticação.",
  material: "Tecido de gramatura 250",
  espuma: "Espuma revestida do assento até a frente",
  garantia: "5 anos",
  detalhes: [
    "Design moderno que valoriza qualquer ambiente",
    "Acabamento com espuma revestida do assento até a frente",
    "Tecido de gramatura 250 – resistente e de alta qualidade",
    "Assento amplo e muito confortável",
    "Detalhes que destacam o visual",
    "5 anos de garantia"
  ]
},

{
  nome: "Poltrona J.E - Verde",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-verde-1.jpeg"
  ],
  descricao: "Poltrona elegante e confortável com estrutura em madeira, perfeita para valorizar seu ambiente.",
  material: "Estrutura em madeira e tecido de alta qualidade",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design moderno com estrutura em madeira",
    "Assento confortável, ideal para relaxar no dia a dia",
    "Acabamento de alta qualidade em cada detalhe",
    "Perfeita para sala, quarto ou espaço de leitura",
    "Produzida com materiais resistentes e duráveis"
  ]
},
{
  nome: "Poltrona J.E - Caramelo",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-caramelo-1.jpeg"
  ],
  descricao: "Poltrona J.E em tom caramelo com visual sofisticado e estrutura marcante em madeira.",
  material: "Estrutura em madeira e revestimento premium",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design moderno com estrutura em madeira",
    "Visual sofisticado e aconchegante",
    "Acabamento de alta qualidade",
    "Ideal para compor ambientes elegantes"
  ]
},
{
  nome: "Poltrona J.E - Bege",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-bege-1.jpeg",
    "imagens3/poltrona-bege-2.jpeg"
  ],
  descricao: "Poltrona J.E em tom bege com estrutura em madeira e excelente conforto para o dia a dia.",
  material: "Estrutura em madeira e tecido resistente",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design moderno e elegante",
    "Estrutura em madeira que valoriza o ambiente",
    "Ideal para sala, quarto ou leitura",
    "Materiais resistentes e duráveis"
  ]
},
{
  nome: "Poltrona J.E - Azul",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-azul-1.jpeg"
  ],
  descricao: "Poltrona J.E azul com visual moderno, charmosa e confortável para diversos ambientes.",
  material: "Estrutura em madeira e tecido de alta qualidade",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design moderno com estrutura em madeira",
    "Conforto e estilo no mesmo produto",
    "Ótima para sala, quarto ou espaço de leitura",
    "Acabamento refinado"
  ]
},
{
  nome: "Poltrona J.E - Cinza Claro",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-cinza-claro-1.jpeg"
  ],
  descricao: "Poltrona J.E em cinza claro com design elegante e estrutura em madeira de destaque.",
  material: "Estrutura em madeira e tecido resistente",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design moderno com estrutura em madeira",
    "Acabamento de alta qualidade",
    "Ideal para ambientes sofisticados",
    "Conforto para o dia a dia"
  ]
},
{
  nome: "Poltrona J.E - Off White",
  preco: 0,
  categoria: "poltrona",
  imagens: [
    "imagens3/poltrona-offwhite-1.jpeg"
  ],
  descricao: "Poltrona J.E em off white com linhas suaves, elegante e perfeita para ambientes claros.",
  material: "Estrutura em madeira e tecido de alta qualidade",
  espuma: "Assento confortável",
  garantia: "Consultar",
  detalhes: [
    "Design elegante e moderno",
    "Estrutura em madeira sofisticada",
    "Ideal para ambientes clean",
    "Materiais resistentes e duráveis"
  ]
}

];

// Funções de produtos
function carregarProdutos(lista = produtos) {
  const container = document.getElementById("produtos");
  if (!container) return;

  container.innerHTML = "";

  lista.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => abrirModal(produto);

    card.innerHTML = `
      <img src="${produto.imagens[0]}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/300x200?text=Produto';">
      <div class="card-content">
        <h3>${produto.nome}</h3>
        <p>${formatCurrency(produto.preco)}</p>
        <div class="card-actions">
          <button class="btn btn-small" onclick="event.stopPropagation(); abrirModal(produtos[${index}]);">Visualizar</button>
          <button class="btn btn-add btn-small" onclick="event.stopPropagation(); adicionarCarrinho(produtos[${index}], this);">Adicionar</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function filtrarProdutos() {
  const buscaInput = document.getElementById("busca");
  const categoriaSelect = document.getElementById("categoria");

  if (!buscaInput || !categoriaSelect) return;

  const busca = buscaInput.value.toLowerCase().trim();
  const categoria = categoriaSelect.value;

  const filtrados = produtos.filter((p) => {
    const nomeMatch = p.nome.toLowerCase().includes(busca);
    const categoriaMatch = categoria === "todos" || p.categoria === categoria;
    return nomeMatch && categoriaMatch;
  });

  carregarProdutos(filtrados);
}

// Funções do modal
function abrirModal(produto) {
  if (!produto) return;

  produtoAtual = produto;
  const modal = document.getElementById("modal");
  if (!modal) return;

  modal.classList.add("open");

  const imgPrincipal = document.getElementById("modal-img");
  if (imgPrincipal) {
    imgPrincipal.src = produto.imagens[0];
    imgPrincipal.onerror = () => {
      imgPrincipal.src = "https://via.placeholder.com/600x400?text=Produto";
    };
  }

  const miniaturas = document.getElementById("miniaturas");
  if (miniaturas) {
    miniaturas.innerHTML = "";
    produto.imagens.forEach((img) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.className = "thumb";
      thumb.alt = `Miniatura de ${produto.nome}`;
      thumb.onerror = () => {
        thumb.src = "https://via.placeholder.com/150x100?text=Foto";
      };
      thumb.onclick = () => trocarImagem(img);
      miniaturas.appendChild(thumb);
    });
  }

  const nomeEl = document.getElementById("modal-nome");
  const precoEl = document.getElementById("modal-preco");
  const detalhesEl = document.getElementById("modal-detalhes");

  if (nomeEl) nomeEl.textContent = produto.nome;
  if (precoEl) precoEl.textContent = formatCurrency(produto.preco);

  if (detalhesEl) {
    const mensagem = produto.preco > 0
      ? `Olá! Tenho interesse no ${produto.nome} por ${formatCurrency(produto.preco)}.`
      : `Olá! Tenho interesse no ${produto.nome}. Poderia me passar o valor?`;

    const whatsappLink = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    detalhesEl.innerHTML = `
      <p><strong>Descrição:</strong> ${produto.descricao || "Não informado"}</p>
      <p><strong>Material:</strong> ${produto.material || "Não informado"}</p>
      <p><strong>Espuma:</strong> ${produto.espuma || "Não informado"}</p>
      <p><strong>Garantia:</strong> ${produto.garantia || "Não informado"}</p>
      ${
        produto.detalhes && produto.detalhes.length
          ? `<ul>${produto.detalhes.map((item) => `<li>${item}</li>`).join("")}</ul>`
          : ""
      }
      <button class="btn btn-whatsapp" onclick="event.stopPropagation(); window.open('${whatsappLink}', '_blank')">
        Consultar Vendedor
      </button>
      <button class="btn btn-add" onclick="event.stopPropagation(); adicionarCarrinho(produtoAtual, this)">
        Adicionar ao carrinho
      </button>
    `;
  }
}

function trocarImagem(img) {
  const imgPrincipal = document.getElementById("modal-img");
  if (imgPrincipal) imgPrincipal.src = img;
}

function fecharModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("open");
}

// Funções do carrinho
function adicionarCarrinho(produto = produtoAtual, button = null) {
  if (!produto) return;

  carrinho.push(produto);
  saveCarrinho();
  atualizarContadorCarrinho();
  showToast(`"${produto.nome}" adicionado ao carrinho`);

  if (button) {
    const originalText = button.textContent;
    button.textContent = "Adicionado!";
    button.classList.add("btn-added");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("btn-added");
    }, 1200);
  }

  fecharModal();
}

function abrirCarrinho() {
  renderCart();
  const carrinhoModal = document.getElementById("carrinhoModal");
  if (carrinhoModal) carrinhoModal.classList.add("open");
}

function renderCart() {
  const lista = document.getElementById("listaCarrinho");
  if (!lista) return;

  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${formatCurrency(item.preco)}`;
    lista.appendChild(li);
  });
}

function fecharCarrinho() {
  const carrinhoModal = document.getElementById("carrinhoModal");
  if (carrinhoModal) carrinhoModal.classList.remove("open");
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    showToast("Carrinho vazio!");
    return;
  }

  let mensagem = "Olá, quero informações sobre estes produtos:%0A";
  carrinho.forEach((item) => {
    mensagem += `- ${item.nome} (${formatCurrency(item.preco)})%0A`;
  });

  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
}

// Outras funções
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

// Event listeners com debounce
const filtrarProdutosDebounced = debounce(filtrarProdutos, 300);

document.addEventListener("DOMContentLoaded", () => {
  const buscaInput = document.getElementById("busca");
  const categoriaSelect = document.getElementById("categoria");

  if (buscaInput) buscaInput.addEventListener("input", filtrarProdutosDebounced);
  if (categoriaSelect) categoriaSelect.addEventListener("change", filtrarProdutos);

  carregarProdutos();
  loadCarrinho();
});