<script>
   import Header from "./Header.svelte";
   import Footer from "./Footer.svelte";

   import { onMount } from "svelte";

   let isTrading = $state(true);

   onMount(() => {
   });
</script>

<Header isTrading={isTrading} onToggleTrading={() => {}} />

<div class="trading-container">
   <h1>Trading</h1>
</div>

<Footer />

<style>
</style>