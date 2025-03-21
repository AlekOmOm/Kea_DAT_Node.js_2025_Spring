
<script>
   let counter = 0;

   function incrementCounter() {
      counter++;
   }

   function decrementCounter() {
      counter--;
   }

   function incrementByAmount(amount) {
      counter += amount;
   }


</script>

<h3 id="counter">{ counter }</h3>

<button onclick={ decrementCounter }>Decrement</button>
<button onclick={ incrementCounter }>Increment</button>

<button onclick={ () => incrementByAmount(10) }>Increment by Amount</button>




<style>
   #counter {
      color: blue;
   }
</style>



