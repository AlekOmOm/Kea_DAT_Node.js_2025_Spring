<script>
    import { fridgeMessages } from "../../stores/fridgeMessagesStore.js";

    console.log($fridgeMessages);
</script>

{#each $fridgeMessages as fridgeMessage }
    <p>{fridgeMessage.creator || ""}, message: {fridgeMessage.message} , at ( {fridgeMessage.date || ""} )</p>
{/each}

<slot></slot>

<h1>Home</h1>

<p id="Welcome=mat">Welcome to the home page!</p>


<style> 
    #Welcome-mat {
        background-color: rgba(255,135,155,0.5);
        padding: 10px;
        border-radius: 0 0 12px 12px;
    }
</style>
