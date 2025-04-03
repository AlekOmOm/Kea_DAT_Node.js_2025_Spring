<script>
    const { name, isGirl, familySheep, onShowLove, onEatCookie } = $props();

    import { fridgeMessages } from "../../stores/fridgeMessagesStore.js";

    let fridgeMessageInput = $state("");

    function writeMessageOnFridgeWithSet() {
        
        fridgeMessages.set(
            [...$fridgeMessages, // spread the current messages, 
                {
                    creator: name,
                    message: fridgeMessageInput,
                    date: new Date().toLocaleString()
                } // add message as object
            ]
        )

        fridgeMessageInput = ""; // Clear the input after writing the message
    }

    function writeMessageOnFridge() {

        const newFridgeMessage = {
            creator: name,
            message: fridgeMessageInput,
            date: new Date().toLocaleString()
        }
        
        fridgeMessages.update((fridgeMessagesValue) => {
            fridgeMessagesValue.push(newFridgeMessage); // push the new message to the array
            return fridgeMessagesValue; // return the updated array
        })

        fridgeMessageInput = ""; // Clear the input after writing the message
    }

</script>

<div
    class:is-girl={isGirl}
    class:is-boy={!isGirl}
    class={familySheep || "not-a-sheep"}
>
    <h2> {name} </h2>
</div>


<button onclick={() => onShowLove(name)}>Show Love</button>
<button onclick={onEatCookie}>eat cookiie</button>

<br>
    <input bind:value={fridgeMessageInput}>
    <button onclick={writeMessageOnFridge}>Write message</button>
    <button onclick={fridgeMessages.addMessage}>Write message</button>

<style>
    .is-girl {
        background-color: chartreuse;
    }
    .is-boy {
        background-color: blue;
    }
    .not-a-sheep {
        border: 0.5em solid goldenrod;
    }
    .grey-sheep {
        border: 0.5em solid grey;
    }
    .black-sheep {
        border: 0.5em solid black;
    }
</style>
