# Flosh Cents Fragrance

design Flosh Cents as a premium perfume e-commerce website inspired by the references:

Brand details

Business Name: Flosh Cents

Owner: Flosh

Location: Kampala, Uganda

Style: Luxury fragrance brand (dark elegant theme, premium visuals, smooth animations)

Technology: HTML5 + CSS3 + JavaScript + modern UI/UX principles


Features included:

Luxury hero section

Product showcase

Customer favourites

About brand section

Shopping buttons

Responsive mobile design

Smooth animations

Premium perfume cards

Kampala Uganda branding

Navigation menu

Modern typography


Create a file named index.html and paste this code:

<!DOCTYPE html>
<html>
<head>
<title>Flosh Cents | Luxury Fragrances Kampala</title>

<style>
*{
 margin:0;
 padding:0;
 box-sizing:border-box;
 font-family:'Poppins',sans-serif;
}

body{
 background:#080b09;
 color:white;
}

header{
 display:flex;
 justify-content:space-between;
 align-items:center;
 padding:25px 8%;
 background:#101713;
}

.logo{
 font-size:28px;
 font-weight:bold;
 color:#d8b56a;
}

nav a{
 color:white;
 margin:0 15px;
 text-decoration:none;
}

.hero{
 height:90vh;
 display:flex;
 align-items:center;
 padding:8%;
 background:
 linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.7)),
 url("https://images.unsplash.com/photo-1541643600914-78b084683601");
 background-size:cover;
 background-position:center;
}

.hero h1{
 font-size:60px;
 max-width:600px;
}

.hero span{
 color:#d8b56a;
}

.hero button{
 margin-top:30px;
 padding:15px 35px;
 border:none;
 background:#d8b56a;
 color:black;
 border-radius:30px;
 cursor:pointer;
}


section{
 padding:70px 8%;
}

.title{
 text-align:center;
 font-size:35px;
 margin-bottom:40px;
 color:#d8b56a;
}


.products{
 display:grid;
 grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
 gap:30px;
}


.card{
 background:#121815;
 border-radius:20px;
 padding:20px;
 transition:.4s;
}

.card:hover{
 transform:translateY(-10px);
}

.card img{
 width:100%;
 height:280px;
 object-fit:cover;
 border-radius:15px;
}

.card h3{
 margin-top:15px;
}

.price{
 color:#d8b56a;
 margin:10px 0;
}


.about{
 display:flex;
 gap:40px;
 align-items:center;
}

.about img{
 width:40%;
 border-radius:20px;
}


.features{
 display:flex;
 justify-content:space-around;
 background:#18231d;
 padding:30px;
 border-radius:20px;
}

.feature{
 text-align:center;
}

footer{
 text-align:center;
 padding:30px;
 background:#050706;
 color:#aaa;
}


@media(max-width:700px){
.hero h1{
font-size:40px;
}

.about{
flex-direction:column;
}

.about img{
width:100%;
}

nav{
display:none;
}

}

</style>

</head>


<body>


<header>

<div class="logo">
Flosh Cents
</div>

<nav>
<a href="#">Home</a>
<a href="#">Shop</a>
<a href="#">About</a>
<a href="#">Contact</a>
</nav>

</header>



<div class="hero">

<div>

<h1>
Fragrance That Tells <span>Your Story</span>
</h1>

<p>
Premium perfumes crafted for elegance, confidence and unforgettable moments.
</p>


<button onclick="shop()">
Shop Collection
</button>


</div>

</div>



<section>

<h2 class="title">
Customer Favourites
</h2>


<div class="products">


<div class="card">

<img src="https://images.unsplash.com/photo-1594035910387-fea47794261f">

<h3>Royal Bloom</h3>

<p>
Luxury floral fragrance
</p>

<div class="price">
UGX 150,000
</div>

</div>



<div class="card">

<img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6b">

<h3>Midnight Essence</h3>

<p>
Deep masculine scent
</p>

<div class="price">
UGX 180,000
</div>

</div>




<div class="card">

<img src="https://images.unsplash.com/photo-1600612253971-422e7f7faeb6">

<h3>Nature Spirit</h3>

<p>
Fresh natural fragrance
</p>

<div class="price">
UGX 120,000
</div>

</div>


</div>

</section>




<section>


<div class="about">


<img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b">


<div>

<h2 class="title">
About Flosh Cents
</h2>


<p>
Flosh Cents is a luxury fragrance brand based in Kampala, Uganda.
Founded by Flosh, our mission is to create unique scents that express
personality, confidence and unforgettable memories.
</p>


</div>


</div>


</section>




<section>


<div class="features">


<div class="feature">
<h2>⏳</h2>
<p>Long Lasting</p>
</div>


<div class="feature">
<h2>🌿</h2>
<p>Inspired By Nature</p>
</div>


<div class="feature">
<h2>✨</h2>
<p>Premium Quality</p>
</div>


</div>


</section>



<footer>

© 2026 Flosh Cents  
<br>
Luxury Perfumes | Kampala Uganda

</footer>



<script>

function shop(){

alert("Welcome to Flosh Cents perfume collection!");

}

</script>


</body>
</html>

Possible upgrades for a full business website:

1. Add shopping cart and checkout.


2. Connect payments (MTN Mobile Money / Airtel Money).


3. Add WhatsApp ordering.


4. Add admin dashboard to manage perfumes.


5. Deploy on Netlify with a custom domain.



This design can be developed further into a complete Flosh Cents online perfume store.
https://images.unsplash.com/photo-1541643600914-78b084683601

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f1029a9c-80b4-4da8-9851-fdc713cbd364).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
