<script>
   import { Router, Route, Link, navigate } from "svelte-routing";
   let { isTrading } = $props();
</script>

<div class="header">
   <div class="header-content">

      <div class="button-container">
         {#if isTrading}
            <button onclick={() => {
               navigate("/");
            }}>Home</button>
         {/if}
      </div>

      <div class="title-container">
         <h1>Trading Simulation App</h1>
      </div>

  </div>
</div>



<style>


   .header {
      background-color: #414f5f; /* Dark blue-gray */
      padding: 1em 0;
      color: white;
      text-align: center;
      width: 100%;
      height: 5vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
   }

   .header-content {
      max-width: 1280px; /* Align with #app */
      margin: 0 auto;
      padding: 0 1em; /* Add some horizontal padding */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
   }

   .button-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1em;
   }

   .title-container {
      /* fixed center and center of header content */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }

   h1 {
      margin: 0; /* Remove default h1 margin for better alignment in header */
      font-size: 1.8em; /* Slightly smaller for header */
   }

   button {
      background-color: #414f5f;
      color: white;
      padding: 1em 2em;
   }
   
   
</style>
