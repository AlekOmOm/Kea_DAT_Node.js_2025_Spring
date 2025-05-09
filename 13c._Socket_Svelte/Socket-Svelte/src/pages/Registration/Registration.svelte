<script>
   import { nickname } from "../../stores/nicknameStore";
   
   let nicknameValue = "";

   async function submitNickname() {
      if (!nicknameValue) {
         return;
      }

      await fetch("http://localhost:8080/api/nicknames", {
         method: "POST",
         body: JSON.stringify({ nickname: nicknameValue }),
         headers: {
            "Content-Type": "application/json"
         }
      });

      localStorage.setItem("nickname", nicknameValue);

      // Update the store with the new value
      nickname.set(nicknameValue);
   }

</script>

<input bind:value={nicknameValue}>
<button onclick={submitNickname}>submit</button> 