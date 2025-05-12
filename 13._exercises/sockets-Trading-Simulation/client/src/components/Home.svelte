<script>
   import { navigate } from "svelte-routing";
   
   function startTrading() {
      navigate("/trading");
   }
</script>

<h1>Welcome to <br> the Trading Simulation!</h1>
<button on:click={startTrading}>Start Trading</button>

<style>
   h1 {
      font-size: 2em;
      text-align: center;
   }

   button {
      background-color: #414f5f;
      color: white;
      padding: 1em 2em;
   }
</style>