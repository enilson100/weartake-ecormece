const ul = document.querySelector(".container__list-cards");

const todos = document.querySelector("#todos");
todos.addEventListener("click", function () {
  listarProdutos(data);
});

const acessorios = document.querySelector("#acessorios");
acessorios.addEventListener("click", function () {
  const arrAcessorios = data.filter((item) => item.tag == "Acessórios");
  listarProdutos(arrAcessorios);
});

const cal = document.querySelector("#cal");
cal.addEventListener("click", function () {
  const arrCal = data.filter((item) => item.tag == "Calçados");
  listarProdutos(arrCal);
});

const camisetas = document.querySelector("#camisetas");
camisetas.addEventListener("click", function () {
  const arrCamisetas = data.filter((item) => item.tag == "Camisetas");
  listarProdutos(arrCamisetas);
});

const pesquisar = document.querySelector("#pesquisa__desktop");

pesquisar.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.querySelector("#nome");
  const value = name.value;

  if (value === "") {
    listarProdutos(data);
  } else {
    const newArr = data.filter(
      (item) =>
        item.tag[0].toLowerCase().includes(value.toLowerCase()) ||
        item.nameItem.toLowerCase().includes(value.toLowerCase())
    );
    listarProdutos(newArr);
  }
});

const pesquisarMobile = document.querySelector("#pesquise__mobile");

pesquisarMobile.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.querySelector("#nome__mobile");
  const value = name.value;

  if (value === "") {
    listarProdutos(data);
  } else {
    const newArr = data.filter(
      (item) =>
        item.tag[0].toLowerCase().includes(value.toLowerCase()) ||
        item.nameItem.toLowerCase().includes(value.toLowerCase())
    );

    listarProdutos(newArr);
  }
});

function listarProdutos(produtos) {
  ul.innerHTML = "";
  for (let i = 0; i < produtos.length; i++) {
    const produtoLoja = produtos[i];
    const card = cardProduto(produtoLoja);
    ul.appendChild(card);
  }
}
listarProdutos(data);

function cardProduto(produto) {
  const li = document.createElement("li");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const section = document.createElement("section");

  const p1 = document.createElement("p");
  const h2 = document.createElement("h2");
  const p2 = document.createElement("p");
  const h3 = document.createElement("h3");

  const button = document.createElement("button");

  li.classList.add("list__cards");
  figure.classList.add("image");
  section.classList.add("info-produto");
  p1.classList.add("tipo-produto");
  h2.classList.add("nome");
  h3.classList.add("preco");
  button.classList.add("addBtn");

  button.addEventListener("click", function () {
    listCart.push(produto);
    cart(listCart);
    contador(listCart);
    hidden();
  });

  img.src = `../img/${produto.img}`;
  p1.innerHTML = `${produto.tag}`;
  h2.innerHTML = `${produto.nameItem}`;
  p2.innerHTML = `${produto.description}`;
  h3.innerHTML = `R$ ${produto.value},00`;
  button.innerHTML = `${produto.addCart}`;

  li.append(figure, section, button);
  figure.appendChild(img);
  section.append(p1, h2, p2, h3, button);

  return li;
}

const listCart = [];

function cart(item) {
  const cartElement = document.querySelector("#addProduto");
  cartElement.innerHTML = "";

  for (let i = 0; i < item.length; i++) {
    const produ = item[i];

    const liCart = document.createElement("li");
    const figureCart = document.createElement("figure");
    const imgCart = document.createElement("img");
    const divCart = document.createElement("div");
    const nomeH4 = document.createElement("h4");
    const valorH4 = document.createElement("h4");
    const buttonCart = document.createElement("button");

    liCart.classList.add("cardCart");
    figureCart.classList.add("imgCart");
    divCart.classList.add("info-cart");
    nomeH4.classList.add("nomeCart");
    valorH4.classList.add("precoCart");
    buttonCart.classList.add("remove");

    buttonCart.addEventListener("click", function () {
      listCart.splice(i, 1);
      cart(listCart);
      contador(listCart);
      hidden();
    });

    imgCart.src = `../img/${produ.img}`;
    nomeH4.innerHTML = `${produ.nameItem}`;
    valorH4.innerHTML = `R$ ${produ.value},00`;
    buttonCart.innerHTML = "Remover produto";

    liCart.append(figureCart, divCart);
    figureCart.appendChild(imgCart);
    divCart.append(nomeH4, valorH4, buttonCart);
    cartElement.appendChild(liCart);
  }
}

function contador(list) {
  const total = document.querySelector("#total");
  const quant = document.querySelector("#quant");
  let cont = 0;
  for (let i = 0; i < list.length; i++) {
    cont += list[i].value;
  }
  total.innerHTML = ` R$${cont},00`;
  quant.innerHTML = `${listCart.length}`;
}
function hidden() {
  const sectionCart = document.querySelector("#final");
  const carrinhoVazio = document.querySelector("#carrinho-vazio");

  if (listCart.length > 0) {
    sectionCart.classList.remove("hidden");
    carrinhoVazio.classList.add("hidden");
  } else {
    sectionCart.classList.add("hidden");
    carrinhoVazio.classList.remove("hidden");
  }
}

hidden();
