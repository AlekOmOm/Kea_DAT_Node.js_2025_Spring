<script>
   import { colorsList } from "../stores/colorsListStore";


</script>

{#each $colorsList as {color, nickname}}
   <div style={`background-color: ${color}`}>{nickname}: {color}</div>
{/each}
