import React, { useState } from "react";
import {
  ShoppingCart, Search, User, Plus, Minus, Trash2,
  CheckCircle, ArrowLeft, Menu, X
} from "lucide-react";
import "./App.css";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;

const products = [
  ["Samsung Galaxy S24","Phones",219999,"photo-1511707171634-5f897ff02aa9"],
  ["iPhone 15","Phones",249999,"photo-1592899677977-9c10ca588bbd"],
  ["Google Pixel","Phones",189999,"photo-1598327105666-5b89351aff97"],
  ["Dell XPS Laptop","Laptops",329999,"photo-1496181133206-80ce9b88a853"],
  ["MacBook Pro","Laptops",499999,"photo-1517336714731-489689fd1ca8"],
  ["HP Pavilion","Laptops",219999,"photo-1588872657578-7efd1f1555ed"],
  ["iPad Tablet","Tablets",139999,"photo-1544244015-0df4b3ffc6b0"],
  ["Android Tablet","Tablets",79999,"photo-1561159877-2b3b1f4f1f9d"],
  ["Sony Headphones","Audio",54999,"photo-1505740420928-5e560c06d30e"],
  ["Studio Headphones","Audio",32999,"photo-1546435770-a3e426bf472b"],
  ["Wireless Earbuds","Audio",18999,"photo-1606220945770-b5b6c2c55bf1"],
  ["Bluetooth Speaker","Audio",14999,"photo-1608043152269-423dbba4e7e1"],
  ["Apple Watch","Wearables",89999,"photo-1546868871-7041f2a55e12"],
  ["Smart Fitness Band","Wearables",12999,"photo-1575311373937-040b8e1fd5b6"],
  ["Canon DSLR Camera","Cameras",189999,"photo-1516035069371-29a1b244cc32"],
  ["Mirrorless Camera","Cameras",279999,"photo-1510127034890-1e5aa5a3f7c4"],
  ["Action Camera","Cameras",69999,"photo-1526170375885-4d8ecf77b99f"],
  ["Gaming Console","Gaming",169999,"photo-1486401899868-0e435ed85128"],
  ["Gaming Controller","Gaming",19999,"photo-1600080972464-8e5f35f63d08"],
  ["Gaming Headset","Gaming",24999,"photo-1599669454699-248893623440"],
  ["Mechanical Keyboard","Computers",15999,"photo-1587829741301-dc798b83add3"],
  ["Wireless Mouse","Computers",6999,"photo-1527814050087-3793815479db"],
  ["4K Monitor","Computers",89999,"photo-1527443224154-c4a3942d3acf"],
  ["Desktop Computer","Computers",199999,"photo-1587831990711-23ca6441447b"],
  ["Portable SSD","Accessories",18999,"photo-1597872250969-2b65d7c7f1c1"],
  ["Power Bank","Accessories",8999,"photo-1609592806596-b43bada0f8c1"],
  ["Wi-Fi Router","Accessories",12999,"photo-1498049794561-7780e7231661"],
  ["Projector","Accessories",64999,"photo-1524368535928-5b5e00ddc76b"],
  ["Web Camera","Accessories",14999,"photo-1527443154391-507e9dc6c5cc"],
  ["USB Microphone","Audio",21999,"photo-1590602847861-f357a9332bbc"]
].map((p,i)=>({
  id:i+1,
  name:p[0],
  category:p[1],
  price:p[2],
  image:img(p[3])
}));

const money = n => "Rs. " + n.toLocaleString("en-PK");

export default function App() {
  const [page,setPage] = useState("home");
  const [cart,setCart] = useState([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [selected,setSelected] = useState(null);
  const [order,setOrder] = useState(null);
  const [customer,setCustomer] = useState({
    name:"",email:"",phone:"",address:""
  });
  const [newProduct,setNewProduct] = useState({
    name:"",category:"Accessories",price:"",image:""
  });

  const categories = ["All",...new Set(products.map(p=>p.category))];

  const filtered = products.filter(p =>
    (category==="All" || p.category===category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = cart.reduce((s,p)=>s+p.price*p.qty,0);
  const cartCount = cart.reduce((s,p)=>s+p.qty,0);

  function addToCart(product) {
    setCart(old => {
      const found=old.find(p=>p.id===product.id);
      return found
        ? old.map(p=>p.id===product.id?{...p,qty:p.qty+1}:p)
        : [...old,{...product,qty:1}];
    });
    alert("Product added to cart!");
  }

  function quantity(id,change) {
    setCart(old=>old.map(p=>
      p.id===id?{...p,qty:p.qty+change}:p
    ).filter(p=>p.qty>0));
  }

  function placeOrder(e) {
    e.preventDefault();
    if(!cart.length) return alert("Your cart is empty!");
    setOrder({
      number:"SE"+Date.now().toString().slice(-7),
      name:customer.name,
      total,
      date:new Date().toLocaleDateString()
    });
    setCart([]);
    setPage("order");
    window.scrollTo(0,0);
  }

  function addNewProduct(e) {
    e.preventDefault();
    const p={
      id:Date.now(),
      name:newProduct.name,
      category:newProduct.category,
      price:Number(newProduct.price),
      image:newProduct.image || img("photo-1498049794561-7780e7231661")
    };
    products.unshift(p);
    setNewProduct({name:"",category:"Accessories",price:"",image:""});
    setPage("home");
    alert("Product added successfully!");
  }

  const go = p => {
    setPage(p);
    window.scrollTo(0,0);
  };

  return (
    <div className="app">

      <div className="topbar">
        FREE DELIVERY ON ORDERS ABOVE RS. 20,000
      </div>

      <header className="header">
        <button className="logo" onClick={()=>go("home")}>
          <span>S</span> ShopEase
        </button>

        <nav>
          <button onClick={()=>go("home")}>Home</button>
          <button onClick={()=>go("add")}>Add Product</button>
          <button onClick={()=>go("order")}>Demo Order</button>
          <button onClick={()=>go("login")}>Login</button>
        </nav>

        <button className="cart-btn" onClick={()=>go("cart")}>
          <ShoppingCart size={19}/> Cart ({cartCount})
        </button>
      </header>

      {page==="home" && <>
        <section className="hero">
          <div className="hero-content">
            <span>WELCOME TO SHOPEASE</span>
            <h1>Technology for<br/>Modern Living.</h1>
            <p>Discover quality electronics, smart devices and accessories.</p>
            <button className="main-btn"
              onClick={()=>document.getElementById("products").scrollIntoView()}>
              Explore Products →
            </button>
          </div>
        </section>

        <main className="container" id="products">
          <div className="heading">
            <span>OUR COLLECTION</span>
            <h2>Explore Electronics</h2>
            <p>30 carefully selected products.</p>
          </div>

          <div className="filters">
            <div className="search">
              <Search size={18}/>
              <input value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search products..."/>
            </div>
            <div className="categories">
              {categories.map(c=>
                <button key={c}
                  className={category===c?"chosen":""}
                  onClick={()=>setCategory(c)}>{c}</button>
              )}
            </div>
          </div>

          <div className="product-grid">
            {filtered.map(p=>
              <article className="product-card" key={p.id}>
                <button className="product-image"
                  onClick={()=>{setSelected(p);go("detail");}}>
                  <img src={p.image} alt={p.name}
                    onError={e=>{
                      e.currentTarget.src=img("photo-1498049794561-7780e7231661");
                    }}/>
                  <span>View Product ↗</span>
                </button>
                <div className="product-info">
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <strong>{money(p.price)}</strong>
                  <button className="add-btn" onClick={()=>addToCart(p)}>
                    <Plus size={16}/> Add to Cart
                  </button>
                </div>
              </article>
            )}
          </div>
          {filtered.length===0 && <p>No products found.</p>}
        </main>
      </>}

      {page==="detail" && selected && (
        <main className="container">
          <button className="back" onClick={()=>go("home")}>
            <ArrowLeft size={17}/> Back to shop
          </button>
          <div className="detail">
            <img src={selected.image} alt={selected.name}/>
            <div>
              <small>{selected.category}</small>
              <h1>{selected.name}</h1>
              <h2>{money(selected.price)}</h2>
              <p>Quality electronics product available at ShopEase.</p>
              <button className="main-btn" onClick={()=>addToCart(selected)}>
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      )}

      {page==="cart" && (
        <main className="container">
          <div className="heading"><h2>Shopping Cart</h2></div>
          {cart.length===0 ? <div className="empty">
            <ShoppingCart size={40}/>
            <h2>Your cart is empty</h2>
            <button className="main-btn" onClick={()=>go("home")}>
              Continue Shopping
            </button>
          </div> : <div className="cart-layout">
            <div className="cart-items">
              {cart.map(p=><div className="cart-item" key={p.id}>
                <img src={p.image} alt={p.name}/>
                <div><h3>{p.name}</h3><b>{money(p.price)}</b>
                  <div className="quantity">
                    <button onClick={()=>quantity(p.id,-1)}><Minus size={14}/></button>
                    {p.qty}
                    <button onClick={()=>quantity(p.id,1)}><Plus size={14}/></button>
                  </div>
                </div>
                <button className="remove"
                  onClick={()=>setCart(old=>old.filter(x=>x.id!==p.id))}>
                  <Trash2/>
                </button>
              </div>)}
            </div>
            <aside className="summary">
              <h2>Order Summary</h2>
              <p>Subtotal <b>{money(total)}</b></p>
              <p>Delivery <b>Free</b></p>
              <hr/>
              <h3>Total <b>{money(total)}</b></h3>
              <button className="main-btn" onClick={()=>go("checkout")}>
                Checkout
              </button>
            </aside>
          </div>}
        </main>
      )}

      {page==="checkout" && (
        <main className="container">
          <div className="heading"><h2>Checkout</h2>
            <p>Enter your details to create a demo order.</p></div>
          <form className="form" onSubmit={placeOrder}>
            <label>Full Name
              <input required value={customer.name}
                onChange={e=>setCustomer({...customer,name:e.target.value})}/>
            </label>
            <label>Email
              <input type="email" required value={customer.email}
                onChange={e=>setCustomer({...customer,email:e.target.value})}/>
            </label>
            <label>Phone Number
              <input required value={customer.phone}
                onChange={e=>setCustomer({...customer,phone:e.target.value})}/>
            </label>
            <label>Address
              <textarea required value={customer.address}
                onChange={e=>setCustomer({...customer,address:e.target.value})}/>
            </label>
            <h3>Total: {money(total)}</h3>
            <button className="main-btn">Place Demo Order</button>
            <small>Demo checkout only. No real payment is collected.</small>
          </form>
        </main>
      )}

      {page==="login" && (
        <section className="login-page">
          <form className="form login-form"
            onSubmit={e=>{e.preventDefault();alert("Demo login successful!");go("home");}}>
            <span>WELCOME BACK</span>
            <h1>Login to ShopEase</h1>
            <label>Email
              <input type="email" required placeholder="Enter email"/>
            </label>
            <label>Password
              <input type="password" required placeholder="Enter password"/>
            </label>
            <button className="main-btn">Login</button>
          </form>
        </section>
      )}

      {page==="add" && (
        <main className="container">
          <div className="heading"><h2>Add New Product</h2></div>
          <form className="form" onSubmit={addNewProduct}>
            <label>Product Name
              <input required value={newProduct.name}
                onChange={e=>setNewProduct({...newProduct,name:e.target.value})}/>
            </label>
            <label>Category
              <select value={newProduct.category}
                onChange={e=>setNewProduct({...newProduct,category:e.target.value})}>
                {["Phones","Laptops","Tablets","Audio","Wearables","Cameras","Gaming","Computers","Accessories"].map(c=><option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Price
              <input type="number" min="1" required value={newProduct.price}
                onChange={e=>setNewProduct({...newProduct,price:e.target.value})}/>
            </label>
            <label>Image URL
              <input value={newProduct.image}
                onChange={e=>setNewProduct({...newProduct,image:e.target.value})}
                placeholder="Paste direct image URL (optional)"/>
            </label>
            <button className="main-btn">Add Product</button>
          </form>
        </main>
      )}

      {page==="order" && (
        <section className="order-page">
          <div className="order-card">
            {order ? <>
              <CheckCircle size={55} color="#6d50ce"/>
              <h1>Order Confirmed!</h1>
              <p>Thank you, {order.name}. Your demo order is ready.</p>
              <h3>Order: {order.number}</h3>
              <h2>{money(order.total)}</h2>
              <p>Date: {order.date}</p>
              <small>This is a demo order. No real delivery or payment.</small>
            </> : <>
              <h1>Demo Order Page</h1>
              <p>Your order confirmation will appear here after checkout.</p>
            </>}
            <button className="main-btn" onClick={()=>go("home")}>
              Continue Shopping
            </button>
          </div>
        </section>
      )}

      <footer>
        <h2>ShopEase</h2>
        <p>Technology for Modern Living.</p>
        <p>© 2026 ShopEase | Student E-Commerce Project</p>
      </footer>
    </div>
  );
}