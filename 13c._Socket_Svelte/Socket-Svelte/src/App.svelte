
<script>
   import { nickname } from "./stores/nicknameStore";

   import Registration from "./pages/Registration/Registration.svelte";
   import Colors from "./pages/Colors/Colors.svelte";

</script>

{#if !$nickname}
   <Registration />
{:else}
   <Colors />
{/if}

