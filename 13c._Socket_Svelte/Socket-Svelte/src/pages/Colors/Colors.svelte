<script>
   /**order of declarations
    * 
    * hierarchy of order, dependending on type of 
    * 1. onMount is a component lifecycle function
    * 2. io is a library
    * 3. colorsList is a store
    * 4. socket is a variable
    * 5. color is a variable
    * 
    * 6. onMount()
    * 7. socket = io("http://localhost:8080");
    * 8. socket.on("server-sends-color", (data) => {
    * 9. document.body.style.backgroundColor = data.color;
    * 10. colorsList.update((colorsListArray) => {
    * 11. colorsListArray.push({ color: data.color })
    * 12. return colorsListArray;
    * 13. })
    * 
    * 
    * */ 
   

   import { onMount } from 'svelte';
   
   import io from 'socket.io-client'

   import { colorsList } from '../../stores/colorsListStore';
   import { nickname } from '../../stores/nicknameStore';
   import ColorsList from '../../components/ColorsList.svelte';

   let socket;
   let color = "#0e3249"

   onMount(() => {
      socket = io("http://localhost:8080");

      socket.on("server-sends-data", (data) => {
         document.body.style.backgroundColor = data.color;

         colorsList.update((colorsListArray) => {
            colorsListArray.push({ color: data.color, nickname: $nickname });
            return colorsListArray;
         });
      })
   })








   function submitColor() {
      console.log(color)
      socket.emit("client-sends-color", {color})
   }

</script>

<h2>Welcome, {$nickname}!</h2>
<input type="color" bind:value={color}>
<button on:click={submitColor}>Submit Color</button>
<ColorsList />
