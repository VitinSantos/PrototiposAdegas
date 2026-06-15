document.addEventListener("DOMContentLoaded", ()=>{

// 🔥 URL Padrão de Imagem para Demonstração
const imgPlaceholder = "https://placehold.co/200x200/222/FFF?text=Sua+Imagem";

// 🔥 TODOS OS PRODUTOS
const todosProdutos = [

  // Produtos em Destaque //
  {nome:"Jack Daniels", categoria:"destaque", preco:120, img: imgPlaceholder},
  {nome:"Dose de Passport", categoria:"destaque", preco:30, img: imgPlaceholder},
  {nome:"Dose de Red label", categoria:"destaque", preco:35, img: imgPlaceholder},
  {nome:"Jack Daniels Fire", categoria:"destaque", preco:135, img: imgPlaceholder},
  {nome:"Sex On The Beach", categoria:"destaque", preco:20, img: imgPlaceholder},
  {nome:"Batida de Morango", categoria:"destaque", preco:20, img: imgPlaceholder},
  {nome:"Batida de Maracujá", categoria:"destaque", preco:20, img: imgPlaceholder},
  {nome:"Copão de Caipirinha", categoria:"destaque", preco:15, img: imgPlaceholder},

  // WHISKY
  {nome:"Jack Daniels", categoria:"destilados", preco:120, img: imgPlaceholder},
  {nome:"Jack Daniels Honey", categoria:"destilados", preco:130, img: imgPlaceholder},
  {nome:"Jack Daniels Apple", categoria:"destilados", preco:135, img: imgPlaceholder},
  {nome:"Jack Daniels Fire", categoria:"destilados", preco:135, img: imgPlaceholder},
  {nome:"Red Label", categoria:"destilados", preco:90, img: imgPlaceholder},
  {nome:"Black Label", categoria:"destilados", preco:120, img: imgPlaceholder},
  {nome:"Gold Label", categoria:"destilados", preco:180, img: imgPlaceholder},
  {nome:"Old Parr", categoria:"destilados", preco:140, img: imgPlaceholder},
  {nome:"Chivas Regal", categoria:"destilados", preco:150, img: imgPlaceholder},
  {nome:"Cavalo Branco", categoria:"destilados", preco:85, img: imgPlaceholder},
  {nome:"PassPort", categoria:"destilados", preco:85, img: imgPlaceholder},

  // CERVEJA
  {nome:"Heineken", categoria:"cerveja", preco:6, img: imgPlaceholder},
  {nome:"Corona", categoria:"cerveja", preco:8, img: imgPlaceholder},
  {nome:"Budweiser", categoria:"cerveja", preco:6, img: imgPlaceholder},
  {nome:"Skol", categoria:"cerveja", preco:5, img: imgPlaceholder},
  {nome:"Brahma", categoria:"cerveja", preco:5, img: imgPlaceholder},
  {nome:"Stella Artois", categoria:"cerveja", preco:7, img: imgPlaceholder},

  // VINHO
  {nome:"Pérgola Tinto", categoria:"vinho", preco:20, img: imgPlaceholder},
  {nome:"Cantinho do Vale", categoria:"vinho", preco:5, img: imgPlaceholder},
  {nome:"Draft", categoria:"vinho", preco:10, img: imgPlaceholder},

  // REFRI
  {nome:"Coca-Cola", categoria:"zeroalcol", preco:6, img: imgPlaceholder},
  {nome:"Coca-Cola-Zero", categoria:"zeroalcol", preco:6, img: imgPlaceholder},
  {nome:"Guaraná", categoria:"zeroalcol", preco:5, img: imgPlaceholder},
  {nome:"Fanta Uva", categoria:"zeroalcol", preco:5, img: imgPlaceholder},

  // Suco
  {nome:"Dell Valle Lata", categoria:"zeroalcol", preco:5, img: imgPlaceholder},
  {nome:"Dell Valle Garrafa", categoria:"zeroalcol", preco:8, img: imgPlaceholder},
  {nome:"Suco Kapo", categoria:"zeroalcol", preco:4, img: imgPlaceholder},

  // Licor
  {nome:"Licor Baianinha", categoria:"destilados", preco:15, img: imgPlaceholder},

  // Combos
  {nome:"Combo Gin Rock's Tradicional", categoria:"combos", preco:52, img: imgPlaceholder},
  {nome:"Combo Gin Rock's Morango", categoria:"combos", preco:52, img: imgPlaceholder},
];

// 🔥 HOME (8 PRODUTOS)
const produtos = todosProdutos.slice(0,8);

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let nomeSalvo = localStorage.getItem("nomeCliente") || "";

// ================= ADD / REMOVE =================
window.add = function(nome){
  carrinho[nome] = (carrinho[nome] || 0) + 1;
  salvar();
  atualizar();
};

window.remove = function(nome){
  carrinho[nome]--;
  if(carrinho[nome] <= 0) delete carrinho[nome];
  salvar();
  atualizar();
};

// ================= SALVAR =================
function salvar(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ================= RENDER =================
function render(lista,id){
  const el = document.getElementById(id);
  if(!el) return;

  el.innerHTML = "";

  lista.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <h4>${p.nome}</h4>
      <p>R$ ${p.preco}</p>
      <button class="btn-add">Adicionar</button>
    `;

    card.querySelector("button").onclick = () => window.add(p.nome);

    el.appendChild(card);
  });
}

// ================= ATUALIZAR =================
function atualizar(){
  const lista = document.getElementById("cart-items");
  if(!lista) return;

  lista.innerHTML="";
  let total=0;
  let count=0;

  for(let item in carrinho){
    let p = todosProdutos.find(x=>x.nome===item);
    if(!p) continue;

    let qtd = carrinho[item];
    let sub = p.preco * qtd;

    total += sub;
    count += qtd;

    lista.innerHTML += `
      <li>
        <strong>${item}</strong><br>
        ${qtd}x R$ ${p.preco} = <b>R$ ${sub}</b>
        <div class="controls">
          <button onclick="remove('${item}')">-</button>
          <span>${qtd}</span>
          <button onclick="add('${item}')">+</button>
        </div>
      </li>
    `;
  }

  document.getElementById("total").innerText = "Total: R$ " + total;
  document.getElementById("cart-count").innerText = count;
}

// ================= FINALIZAR =================
window.finalizar = function(){

  const nome = document.getElementById("nome").value;
  const pagamento = document.getElementById("pagamento").value;
  const horario = document.getElementById("horario").value;

  if(!nome){
    alert("Preencha seu nome!");
    return;
  }

  localStorage.setItem("nomeCliente", nome);

  let total = 0;
  let texto = `Pedido:%0ACliente: ${nome}%0A%0A`;

  for(let item in carrinho){
    let p = todosProdutos.find(x=>x.nome===item);
    let qtd = carrinho[item];
    let sub = p.preco * qtd;

    total += sub;

    texto += `${item} - ${qtd}x R$ ${p.preco} = R$ ${sub}%0A`;
  }

  texto += `%0ATotal: R$ ${total}%0A`;
  texto += `%0AForma de pagamento: ${pagamento}%0AHorário: ${horario}`;

  // Substitua 00000000000 pelo seu número com DDD (ex: 5511999999999)
  window.open(`https://wa.me/5500000000000?text=${texto}`);

  carrinho = {};
  salvar();
  atualizar();

  document.getElementById("horario").value = "";
};

// ================= FILTRO =================
window.filtrar = function(cat){
  if(cat==="todos") return render(todosProdutos,"catalogo");
  render(todosProdutos.filter(p=>p.categoria===cat),"catalogo");
};

// ================= UI =================
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const overlay = document.getElementById("overlay");

cartBtn?.addEventListener("click", ()=>{
  cart.classList.add("active");
  overlay.classList.add("active");

  document.getElementById("nome").value = nomeSalvo;
});

overlay.addEventListener("click", (e)=>{
  if(e.target === overlay){
    cart.classList.remove("active");
    overlay.classList.remove("active");
  }
});

document.getElementById("close-cart").addEventListener("click", ()=>{
  cart.classList.remove("active");
  overlay.classList.remove("active");
});

// 🔥 ATIVAR BOTÃO DE FILTRO (NOVO)
const botoesFiltro = document.querySelectorAll(".filtros-centro button");

botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {

    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

  });
});

// 🔥 DEFINE "TODOS" COMO ATIVO AO CARREGAR
const botaoTodos = [...botoesFiltro].find(b => b.textContent.toLowerCase() === "todos");

if(botaoTodos){
  botaoTodos.classList.add("ativo");
}

// ================= INIT =================
render(produtos,"produtos");
render(todosProdutos,"catalogo");
atualizar();

});