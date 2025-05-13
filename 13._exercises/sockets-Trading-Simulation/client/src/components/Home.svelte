<script>
   import { onMount } from 'svelte';
   import { navigate } from "svelte-routing";


   function startTrading() {
      navigate("/trading");
   }

   // sockets 
   import io from 'socket.io-client';
   import { config } from '../../config/index.js';

   let socket;

   onMount( () => {
      homeSocket = io(config.SERVER.URL.HOME);

      socket.emit('connect', { message: 'Client connected' });

   })


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
