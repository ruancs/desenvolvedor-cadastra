import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

let products: Product[] = []

function main() {
  console.log(serverUrl);
  getProducts()

}

document.addEventListener("DOMContentLoaded", main);

async function getProducts() {
  try {
    const response = await fetch('http://localhost:5000/products');
    products = await response.json();

    console.log('Produtos:', products);
    showProducts()
    setColors()
    setSizes()
    return products;

  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
}

function showProducts() {
  products.forEach((product: Product) => {
    const container = document.querySelector('.products');
    const prod = document.createElement('div');
    prod.className = "product-container";
    const name = document.createElement('p');
    const image = document.createElement('img');
    const price = document.createElement('p');
    const instalmentValue = document.createElement('p');
    price.className = "price"
    instalmentValue.textContent =` até ${product.parcelamento[0]} x de ${product.parcelamento[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    name.textContent = `${product.name}`;
    price.textContent = `${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    image.src = `${product.image}`;
    container.appendChild(prod);
    prod.appendChild(image);
    prod.appendChild(name);
    prod.appendChild(price);
    prod.appendChild(instalmentValue);
  });

}

const ordinationSelect = document.querySelector('[name="ordination"]');
ordinationSelect.addEventListener('change', ordinationOpt);

function ordinationOpt(event: Event) {
  const ordinationSelect = event.target as HTMLSelectElement;
  const ordination = ordinationSelect.value;
  if (ordination === 'menorpreço') {
    products.sort((a, b) => a.price - b.price);
  }
  if (ordination === 'maiorpreço') {
    products.sort((a, b) => b.price - a.price);
  }
  updateProducts()
  showProducts()
}

function updateProducts() {
  const container = document.querySelector('.products');
  container.innerHTML = '';
}


function setColors() {
  let prevColor: any[] = []
  products.forEach((product: any) => {
    console.log(product.color, "ruan")
    const color = product.color

    const colorSelect = document.querySelector('.colors-select')
    
    if (!prevColor.includes(color)) {
      prevColor.push(color);
      const colContainer = document.createElement('div')
      colContainer.className = "color"
      const colorButton = document.createElement('input')
      colorButton.type = "radio"
      colorButton.checked = false
      colorButton.onclick = function (e: MouseEvent) {
        const element = e.target as HTMLInputElement;
        e.preventDefault();
        setTimeout(() => {
          if (element.checked === false) {
            updateProducts()
            element.checked = true;
            const selected = element.id
            const colors = document.querySelectorAll('.color input')
            const allSelectedColors = document.querySelectorAll('.color input id')
            colors.forEach(function (color: any) {
              if (color.checked) {
                const thisColor = color.id
                filterColors(thisColor)
              }
            })
          } else {
            element.checked = false;
            updateProducts()
            showProducts()
          }
        }, 0)
      }
      colorButton.id = `${color}`
      const colorName = document.createElement('label')
      colorName.innerHTML = `${color}`
      colorName.htmlFor = `${color}`
      colContainer.appendChild(colorButton)
      colContainer.appendChild(colorName)
      colorSelect.appendChild(colContainer)
    }
  })
}

function filterColors(selected: string) {

  products.forEach((product: Product) => {
    if (product.color === selected) {
      const container = document.querySelector('.products');
    const prod = document.createElement('div');
    prod.className = "product-container";
    const name = document.createElement('p');
    const image = document.createElement('img');
    const price = document.createElement('p');
    const instalmentValue = document.createElement('p');
    price.className = "price"
    instalmentValue.textContent =` até ${product.parcelamento[0]} x de ${product.parcelamento[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    name.textContent = `${product.name}`;
    price.textContent = `${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    image.src = `${product.image}`;
    container.appendChild(prod);
    prod.appendChild(image);
    prod.appendChild(name);
    prod.appendChild(price);
    prod.appendChild(instalmentValue);
    }
  })
}

function setSizes(){
  let sizes :any[] = []
  products.forEach((product: Product) => {
    console.log(product?.size, "porrra")
    for (let i = 0; i < product?.size.length; i++) {
      for (let j = 0; j < product?.size.length; j++) {
        sizes.push(product?.size[i]);
      }
    }  
  })
  const allSizes = sizes.filter((item, index) => sizes.indexOf(item) === index);
  const order:any = ["P", "M", "G", "GG", "U", "36","38","40","44","46"];
  function sortCustom(a:string, b:string){
    return order.indexOf(a) - order.indexOf(b)
  }
  allSizes.sort(sortCustom)

  const sizesSection = document.querySelector('.sizes')
  const sizeContainer = document.createElement('ul')
  sizeContainer.className = "size-container"
  
  allSizes.forEach(function(size){
    const sizeItem = document.createElement('li')

    sizeItem.innerHTML = `${size}`
    sizeContainer.appendChild(sizeItem)
    
  })
  sizesSection.appendChild(sizeContainer)
  
}