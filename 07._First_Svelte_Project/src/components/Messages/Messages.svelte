<script>
  import FirstMessage from "./FirstMessage.svelte";
  const messages = $state([
   ]);
   const messagesexample = $state([
      "Hello, World!",
      "This is a message",
      "This is another message"
   ]);

   let messageInput = $state("");

   function addMessage() {
      messages.push(messageInput);
      messageInput = "";

      console.log(messages);
   }

</script>

<h1>Messages</h1>


{#if messages.length > 0}
   <div class="messages">
      {#each messages as message}
         <p>{ message }</p>
      {/each}
   </div>
{:else}
   <p>No messages to display</p>
{/if}



<p>{ messageInput }</p>

<input bind:value={messageInput} placeholder="Type a message..." />

<button onclick={ addMessage }>Submit message</button>

<FirstMessage firstMessage={ messages[0] }>

</FirstMessage>



<style>
  h1 {
    color: green;
  }

   .messages {
      color: gray;
      p {
         margin: 0;
         padding: 0;
      }
      border: 1px solid gray;
      padding: 10px;
   }
</style>
