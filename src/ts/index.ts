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
    return products;
    
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
}

function showProducts(){
  products.forEach((product: any) => {
    const container = document.querySelector('.products');
    const prod = document.createElement('div');
    prod.className = "product-container";
    const name = document.createElement('p');
    const image = document.createElement('img');
    const price = document.createElement('p');
    name.textContent = `${product.name}` ;
    price.textContent = `${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    image.src = `${product.image}`;
    container.appendChild(prod);
    prod.appendChild(image);
    prod.appendChild(name);
    prod.appendChild(price);
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

function updateProducts(){
  const container = document.querySelector('.products');
  container.innerHTML = '';
}

function setColors(){
  let prevColor = ''
  products.forEach((product: any) => {
    console.log(product.color,"ruan")
    const color = product.color
    
    const colorSelect = document.querySelector('.colors-select')
    if(color != prevColor){
      prevColor = color
      const colContainer = document.createElement('div')
      colContainer.className = "color"
      const colorButton = document.createElement('input')
      colorButton.type = "radio"
      colorButton.checked = false
      colorButton.onclick = function(ev: MouseEvent){
        const element = ev.target as HTMLInputElement;
        ev.preventDefault(); 
        setTimeout(() => {
          if (element.checked === false) {
             updateProducts()
              element.checked = true;
              const selected = element.id
              const colors = document.querySelectorAll('.color input')
              const allSelectedColors =  document.querySelectorAll('.color input id')
              colors.forEach(function(color:any){
                if(color.checked){
                  const thisColor = color.id
                  filterColors(thisColor)
                }
              })
          } else {
            element.checked = false;
            updateProducts()
            showProducts()
          }
        },0)

      }
      colorButton.id = `${color}`
      const colorName = document.createElement('label')
      colorName.innerHTML = `${color}`
      colContainer.appendChild(colorButton)
      colContainer.appendChild(colorName)
      colorSelect.appendChild(colContainer)
    }
    
  })
} 

function filterColors(selected:string){
  
  products.forEach((product: any) => {
    if (product.color === selected){
        const container = document.querySelector('.products');
        const prod = document.createElement('div');
        prod.className = "product-container";
        const name = document.createElement('p');
        const image = document.createElement('img');
        const price = document.createElement('p');
        name.textContent = `${product.name}` ;
        price.textContent = `${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
        image.src = `${product.image}`;
        container.appendChild(prod);
        prod.appendChild(image);
        prod.appendChild(name);
        prod.appendChild(price);
    }
  })
}