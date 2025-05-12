<script>
   import { Router, Route, Link, navigate } from "svelte-routing";

   import Header from "./components/Header.svelte";
   import Footer from "./components/Footer.svelte"
   import Trading from "./components/Trading.svelte";
   import Home from "./components/Home.svelte";

   let url = $state("/");
</script>


<Router url={url}>
   <Route path='/trading' let:params>
      <Header isTrading={true} />
      <div class="content">
         <div class="container">
            <Trading />
         </div>
      </div>
   </Route>

   <Route path='/' let:params>
      <Header isTrading={false} />
      <div class="content">
         <div class="container">
            <Home />
         </div>
      </div>
   </Route>

   <Footer />
</Router>


<style>

   .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   .content {
      background-color: #1f3044; /* light gray */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80vh;
      width: 80vw;
      margin: 0 auto 10px auto;
      border-radius: 15px; /* Added to round the corners */
   }
</style>