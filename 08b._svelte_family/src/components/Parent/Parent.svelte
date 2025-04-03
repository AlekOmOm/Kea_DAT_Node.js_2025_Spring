<script>

    import Child from "../Child/Child.svelte";
    import { fridgeMessages } from "../../stores/fridgeMessagesStore.js";

    const { name: parentName, children } = $props();

    function handleShowLove(childName) {
        console.log(`${childName}, I love you!`);
    }

    const cookieJar = $state(["🍪", "🍪", "🍪", "🍪"]);

    function handleEatCookie(childName) {
      if (cookieJar.length > 0) {
        cookieJar.pop();
        console.log(`${childName} ate a cookie! ${cookieJar.length} left.`);
      } else {
        console.log("No more cookies left!");
      }
    }

    function cleanFridgeMessages() {
        fridgeMessages.set([]);
        console.log("Fridge messages cleaned!");
    }

</script>

<h1>{parentName}</h1>

<!-- <button onclick={cleanFridgeMessages}> cleean fridge messages</button>
-->
<button onclick={fridgeMessages.wipe}></button>

<p> </p>

{#each children as child (child.name)}
    <Child {...child} onShowLove={handleShowLove}/>
{/each}
