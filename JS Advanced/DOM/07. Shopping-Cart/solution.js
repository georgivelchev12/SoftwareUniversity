function solve() {
   let total = 0;
   let productsAdded = [];
   const textarea = document.getElementsByTagName('textarea')[0];
  
   const add = e => {
     const price = e.parentElement.nextElementSibling.textContent;
     const name = e.parentElement.previousElementSibling.children[0].textContent;
     total += Number(price);
     print(name, price);
     productsAdded.push(name);
   };
  
   const print = (name, price) => {
     textarea.value += `Added ${name} for ${price} to the cart.\n`;
   };
  
   const checkout = () => {
     textarea.value += `You bought ${[...new Set(productsAdded)].join(', ')} for ${total.toFixed(2)}.`;
     document.removeEventListener('click', handler);
   };
   const map = {
     'add-product': add,
     checkout: checkout,
   };
   const handler = e => {
     const trg = e.target;
     const cls = trg.className;
     if (typeof map[cls] === 'function') {
       map[cls](trg);
     }
   };
   document.addEventListener('click', handler);
 }