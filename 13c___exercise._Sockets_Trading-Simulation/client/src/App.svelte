<script>
   import Header from "./components/Header.svelte";
   import Footer from "./components/Footer.svelte"
   import Trading from "./components/Trading.svelte";

let isTrading = $state(false);

function toggleTrading() {
   isTrading = !isTrading;
   console.log("isTrading state changed to:", isTrading);
}

</script>

<Header isTrading={isTrading} onToggleTrading={toggleTrading} />

<div class="content">
   <div class="container">
      {#if isTrading}
         <Trading />
      {/if}
      {#if !isTrading}
         <h1>Welcome to the Trading Simulation !</h1>
         <button onclick={toggleTrading}>Start Trading</button>
      {/if}

   </div>
</div>

<div class="footer">
   <Footer />
</div>


<style>

   .container {
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