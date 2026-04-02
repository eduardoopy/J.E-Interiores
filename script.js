// Constantes globais
const NUMERO_WHATSAPP = "5562981823353";

// Utilitários
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
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
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  } catch (e) {
    console.error('Erro ao salvar carrinho:', e);
  }
}

function loadCarrinho() {
  try {
    const data = localStorage.getItem('carrinho');
    if (data) {
      carrinho = JSON.parse(data) || [];
    }
  } catch (e) {
    console.error('Erro ao carregar carrinho:', e);
    carrinho = [];
  }
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById('contador');
  if (contador) contador.innerText = carrinho.length;
}

// Dados dos produtos
const produtos = [
  {
    nome: "Sofá Confort Prime",
    preco: 2499,
    categoria: "sofa",
    imagens: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7"]
  },
  {
    nome: "Sofá Luxo Soft",
    preco: 3199,
    categoria: "sofa",
    imagens: ["https://images.unsplash.com/photo-1616628182506-0c4f9a64b6e1", "https://images.unsplash.com/photo-1582582429416-7d1f2a3bca6b?w=800"]
  },
  {
    nome: "Mesa de Centro",
    preco: 799,
    categoria: "mesa",
    imagens: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800"]
  },
  {
    nome: "Poltrona Elegance",
    preco: 1299,
    categoria: "poltrona",
    imagens: ["https://images.unsplash.com/photo-1598300053653-d0a2b1cb1b07", "https://images.unsplash.com/photo-1585559604883-4c6b1b2c6f0f?w=800"]
  }
];

// Funções de produtos
function carregarProdutos(lista = produtos) {
  const container = document.getElementById("produtos");
  if (!container) return;

  container.innerHTML = "";

  lista.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => abrirModal(produto);

    card.innerHTML = `
      <img src="${produto.imagens[0]}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/300x200';">
      <div class="card-content">
        <h3>${produto.nome}</h3>
        <p>${formatCurrency(produto.preco)}</p>
        <div class="card-actions">
          <button class="btn btn-small" onclick="event.stopPropagation(); abrirModal(produto);">Visualizar</button>
          <button class="btn btn-add btn-small" onclick="event.stopPropagation(); adicionarCarrinho(produto, this);">Adicionar</button>
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

  const busca = buscaInput.value.toLowerCase();
  const categoria = categoriaSelect.value;

  const filtrados = produtos.filter(p =>
    (categoria === "todos" || p.categoria === categoria) &&
    p.nome.toLowerCase().includes(busca)
  );

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
    imgPrincipal.onerror = () => imgPrincipal.src = 'https://via.placeholder.com/600x400';
  }

  const miniaturas = document.getElementById("miniaturas");
  if (miniaturas) {
    miniaturas.innerHTML = "";
    produto.imagens.forEach(img => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.className = 'thumb';
      thumb.alt = `Miniatura de ${produto.nome}`;
      thumb.onerror = () => thumb.src = 'https://via.placeholder.com/150x100';
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
    const whatsappLink = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no ${produto.nome} por ${formatCurrency(produto.preco)}.`)}`;
    detalhesEl.innerHTML = `
      <p>Entrega em até 7 dias úteis | Garantia de 30 dias</p>
      <button class="btn btn-whatsapp" onclick="event.stopPropagation(); window.open('${whatsappLink}', '_blank')">Comprar no WhatsApp</button>
      <button class="btn btn-add" onclick="event.stopPropagation(); adicionarCarrinho(null, this)">Adicionar ao carrinho</button>
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
  carrinho.forEach(item => {
    const li = document.createElement('li');
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

  let mensagem = "Olá, quero comprar:\n";
  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (${formatCurrency(item.preco)})\n`;
  });
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`);
}

// Outras funções
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => toast.classList.remove("show"), 2400);
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

// Event listeners com debounce
const filtrarProdutosDebounced = debounce(filtrarProdutos, 300);

document.addEventListener('DOMContentLoaded', () => {
  const buscaInput = document.getElementById("busca");
  const categoriaSelect = document.getElementById("categoria");

  if (buscaInput) buscaInput.addEventListener("input", filtrarProdutosDebounced);
  if (categoriaSelect) categoriaSelect.addEventListener("change", filtrarProdutos);

  // Inicialização
  carregarProdutos();
  loadCarrinho();
});