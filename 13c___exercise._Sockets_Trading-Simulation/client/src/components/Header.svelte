<script>

   let { isTrading, onToggleTrading } = $props();
</script>

<div class="header">
   <div class="header-content">
      <h1>Trading Simulation App</h1>

      {#if isTrading}
         <button onclick={onToggleTrading}>Stop Trading</button>
      {/if}

  </div>
</div>






<style>
   /* Minimal component-specific styles if needed */
   /* h1 styles will be inherited from app.css */
   h1 {
      margin: 0; /* Remove default h1 margin for better alignment in header */
      font-size: 1.8em; /* Slightly smaller for header */
   }

   .header {
      background-color: #414f5f; /* Dark blue-gray */
      padding: 1em 0;
      color: white;
      text-align: center;
      width: 100%;
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
   }
</style>
