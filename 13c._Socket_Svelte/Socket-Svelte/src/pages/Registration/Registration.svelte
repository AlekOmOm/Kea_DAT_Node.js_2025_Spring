<script>

   let nickname;

   async function submitNickname() {
      if (!nickname) {
         return;
      }

      await fetch("http://localhost:8080/api/nicknames", {
         method: "POST",
         body: JSON.stringify({ nickname }),
         headers: {
            "Content-Type": "application/json"
         }

      })

      nickname.set(nickname);
   }

</script>

<input bind:value={nickname}>
<button on:click={submitNickname}>submit</button> 