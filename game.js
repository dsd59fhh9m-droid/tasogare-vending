const products=[
{name:'夕焼けソーダ',price:120,color:'#d45e45',text:'甘い炭酸。缶は少しぬるい。'},
{name:'山の水',price:100,color:'#4f89aa',text:'冷たい水。遠くでヒグラシが鳴いている。'},
{name:'ミルク珈琲',price:130,color:'#8b6549',text:'懐かしい甘さ。帰り道を思い出す。'},
{name:'レモン炭酸',price:110,color:'#c8b748',text:'少し酸っぱい。夕暮れにちょうどいい。'},
{name:'おしるこ',price:140,color:'#8d4b4b',text:'季節外れのおしるこ。なぜか一本だけ冷たい。'},
{name:'謎の缶',price:150,color:'#5b536b',text:'ラベルが剥がれている。中身は飲むまで分からない。'}
];
let money=500,count=0,selected=null;
const productsEl=document.getElementById('products');
const wallet=document.getElementById('wallet');
const countEl=document.getElementById('count');
const statusEl=document.getElementById('status');
const message=document.getElementById('message');
const pickup=document.getElementById('pickup');
const pickupText=document.getElementById('pickupText');
const toast=document.getElementById('toast');

function renderProducts(){
 productsEl.innerHTML='';
 products.forEach((p,i)=>{
  const b=document.createElement('button');
  b.className='product';
  b.type='button';
  b.innerHTML=`<div class="can" style="--can:${p.color}"></div><div class="product-name">${p.name}</div><div class="product-price">¥${p.price}</div>`;
  b.addEventListener('click',()=>buy(i));
  productsEl.appendChild(b);
 });
}

function buy(i){
 const p=products[i];
 if(selected){showToast('先に取り出し口を確認して');return;}
 if(money<p.price){statusEl.textContent='お金が足りません';showToast('所持金が足りない');return;}
 money-=p.price;count++;selected=p;
 wallet.textContent=`¥${money}`;countEl.textContent=count;
 statusEl.textContent=`${p.name} 購入`;pickup.classList.add('ready');pickupText.textContent='PUSH';
 message.textContent='ガコン、と古い機械の奥で音がした。';
}

pickup.addEventListener('click',()=>{
 if(!selected){showToast('取り出し口は空っぽ');return;}
 let extra='';
 if(selected.name==='謎の缶'){
  const mystery=['中身はラムネ味だった。','無糖の黒い炭酸だった。','なぜか桃の香りがする。'][Math.floor(Math.random()*3)];
  extra=' '+mystery;
 }
 message.textContent=selected.text+extra;
 statusEl.textContent='商品を選んでください';pickup.classList.remove('ready');pickupText.textContent='EMPTY';selected=null;
});

document.getElementById('resetBtn').addEventListener('click',()=>{
 money=500;count=0;selected=null;wallet.textContent='¥500';countEl.textContent='0';statusEl.textContent='商品を選んでください';pickup.classList.remove('ready');pickupText.textContent='EMPTY';message.textContent='夕暮れの帰り道。錆びた自販機だけが、まだ明かりを灯している。';showToast('最初からやり直しました');
});

function showToast(text){
 toast.textContent=text;toast.classList.add('show');
 clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1200);
}

renderProducts();
