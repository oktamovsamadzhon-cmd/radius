// STROY.KZ — каталог, навигация ва сават
const WHATSAPP_NUMBER = "77000000000"; // Бу ерга ўзингизнинг WhatsApp рақамингизни киритинг (давлат коди билан, + белгисиз).
const products = [
 {id:1,name:"Цемент М400",category:"Қуруқ аралашмалар",price:2600,oldPrice:3000,unit:"50 кг қоп",desc:"Мустаҳкам бетон ва қоришма учун.",img:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=700&q=80",sale:true},
 {id:2,name:"Қизил ғишт",category:"Девор материаллари",price:95,unit:"дона",desc:"Девор териш учун пишиқ ғишт.",img:"https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Арматура 12 мм",category:"Металл маҳсулотлар",price:1850,unit:"метр",desc:"Темир-бетон конструкциялар учун.",img:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Ювилган қум",category:"Тўлдирувчилар",price:8500,unit:"м³",desc:"Қурилиш қоришмалари учун тоза қум.",img:"https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Шағал 5–20",category:"Тўлдирувчилар",price:9200,unit:"м³",desc:"Пойдевор ва бетон ишлари учун.",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Гипсокартон",category:"Пардозлаш",price:2800,unit:"варақа",desc:"Ички девор ва шифт қопламаси.",img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Шпаклёвка",category:"Қуруқ аралашмалар",price:3400,unit:"25 кг қоп",desc:"Текис ва силлиқ юза тайёрлаш учун.",img:"https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Интерьер бўёғи",category:"Бўёқ ва қопламалар",price:6900,oldPrice:7900,unit:"10 л",desc:"Девор ва шифт учун сифатли бўёқ.",img:"https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=80",sale:true},
 {id:9,name:"Ламинат",category:"Пол қопламалари",price:5200,unit:"м²",desc:"Замонавий ва чидамли пол қопламаси.",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80"},
 {id:10,name:"Кафель",category:"Пол ва девор",price:6800,oldPrice:8200,unit:"м²",desc:"Ошхона ва ҳаммом учун керамик кафель.",img:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80",sale:true},
 {id:11,name:"Утеплитель",category:"Иссиқлик изоляцияси",price:4100,unit:"пачка",desc:"Иссиқликни сақлаш учун изоляция.",img:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80"},
 {id:12,name:"Қурилиш асбоблари",category:"Асбоб-ускуналар",price:12500,unit:"тўплам",desc:"Кундалик қурилиш ишлари учун тўплам.",img:"https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=700&q=80"}
];
let cart = [];
const money = n => new Intl.NumberFormat("ru-RU").format(n) + " ₸";
const productGrid = document.getElementById("productGrid");
const discountGrid = document.getElementById("discountGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

function productCard(p){
 const discount = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : 0;
 return `<article class="product-card">
  <div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80'">
  ${p.sale?`<span class="product-tag sale">-${discount}% СКИДКА</span>`:""}</div>
  <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>
  <div class="price-row"><strong class="price">${money(p.price)}</strong>${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div>
  <div class="product-actions"><button class="add-btn" data-add="${p.id}">САВАТГА ҚЎШИШ</button><button class="buy-btn" data-buy="${p.id}">СОТИБ ОЛИШ</button></div></div>
 </article>`;
}
function renderProducts(){
 const term=(searchInput?.value||"").trim().toLocaleLowerCase();
 const category=categoryFilter?.value||"all";
 const filtered=products.filter(p=>(category==="all"||p.category===category)&&(`${p.name} ${p.category} ${p.desc}`).toLocaleLowerCase().includes(term));
 productGrid.innerHTML=filtered.length?filtered.map(productCard).join(""):'<div class="empty-results">Бу сўров бўйича товар топилмади.</div>';
}
function renderDiscounts(){discountGrid.innerHTML=products.filter(p=>p.sale).map(productCard).join("")}
[...new Set(products.map(p=>p.category))].sort().forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;categoryFilter.appendChild(o)});
renderProducts();renderDiscounts();document.getElementById("year").textContent=new Date().getFullYear();
searchInput.addEventListener("input",renderProducts);categoryFilter.addEventListener("change",renderProducts);

function addToCart(id,open=false){
 const p=products.find(x=>x.id===id);if(!p)return;
 const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});
 updateCart();showToast(`${p.name} саватга қўшилди`);if(open)openCart();
}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0));
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><small>${money(p.price)} / ${p.unit}</small><div class="qty"><button data-qty="-1" data-id="${p.id}">−</button><b>${p.qty}</b><button data-qty="1" data-id="${p.id}">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Товарни ўчириш">×</button></div>`).join(""):'<div class="empty-cart">Сават ҳозирча бўш.</div>';
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
 const buy=e.target.closest("[data-buy]");if(buy)addToCart(Number(buy.dataset.buy),true);
 const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(p=>p.id===Number(qty.dataset.id));if(item){item.qty+=Number(qty.dataset.qty);if(item.qty<=0)cart=cart.filter(p=>p.id!==item.id);updateCart()}}
 const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(p=>p.id!==Number(remove.dataset.remove));updateCart()}
});
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2400)}

function sendWhatsApp(message){const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;window.open(url,"_blank","noopener")}
document.getElementById("checkoutBtn").addEventListener("click",()=>{
 if(!cart.length){showToast("Аввал саватга товар қўшинг");return}
 const lines=cart.map(p=>`• ${p.name} — ${p.qty} × ${money(p.price)} = ${money(p.qty*p.price)}`).join("\n");
 const total=cart.reduce((s,p)=>s+p.qty*p.price,0);
 sendWhatsApp(`Ассалому алайкум! STROY.KZ сайтидан буюртма:\n${lines}\n\nЖами: ${money(total)}\nИлтимос, буюртмани тасдиқланг.`);
});
document.getElementById("contactForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 sendWhatsApp(`Ассалому алайкум! STROY.KZ сайтидан мурожаат:\nИсм: ${f.get("name")}\nТелефон: ${f.get("phone")}\nХабар: ${f.get("message")}`);
});
document.getElementById("deliveryForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 sendWhatsApp(`Ассалому алайкум! Доставка бўйича сўров:\nИсм: ${f.get("name")}\nТелефон: ${f.get("phone")}\nМанзил: ${f.get("address")}\nИлтимос, доставка нархи ва муддатини айтинг.`);
});
document.querySelectorAll(".whatsapp-float").forEach(a=>a.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Ассалому алайкум! STROY.KZ сайтидан ёзяпман.")}`);

// Битта HTML ичида 4 та бўлимли саҳифа-навигацияси
function showPage(hash){
 const id=(hash||"#home").slice(1);
 const target=document.getElementById(id);
 if(!target||!target.classList.contains("page"))return;
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 target.classList.add("active");
 document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${id}`));
 document.getElementById("mainNav").classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const hash=a.getAttribute("href");
 if(["#home","#products","#discounts","#contact"].includes(hash)){e.preventDefault();history.pushState(null,"",hash);showPage(hash)}
 else if(hash==="#about"){if(location.hash!=="#home"){history.pushState(null,"","#home");showPage("#home")}setTimeout(()=>document.getElementById("about").scrollIntoView({behavior:"smooth"}),80)}
}));
window.addEventListener("popstate",()=>showPage(location.hash));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
showPage(location.hash||"#home");
window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),450));
