<script lang="ts">
  export let asset = { name: 'btc/usd', price: 65_000 };

  const buy  = () => console.log('buy',  asset.name);
  const sell = () => console.log('sell', asset.name);
</script>

<h1 class="title">trading</h1>

<section class="panel">
  <div class="asset">
    <span class="asset-name">{asset.name}</span>
    <span class="asset-price">${asset.price}</span>
  </div>

  <div class="actions">
    <button on:click={buy}>buy</button>
    <button on:click={sell}>sell</button>
  </div>
</section>

<style>
  /* sits at the very top of the component */
  .title{
    position:sticky;   /* remove if you don’t want it fixed while scrolling */
    top:0;
    margin:0;
    padding:1rem 0;
    text-align:center;
    text-transform:capitalize;
    z-index:1;
  }

  .panel{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
    padding-top:2rem;        /* space below sticky header */
  }

  .asset{
    font-size:1.25rem;
    display:flex;
    gap:.5rem;
  }

  .actions{
    display:flex;
    gap:1rem;
  }

  button{
    min-width:6rem;
    padding:.5rem 1rem;
    cursor:pointer;
  }
</style>
