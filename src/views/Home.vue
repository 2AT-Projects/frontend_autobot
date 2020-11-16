<template>
  <div class="container">
    <br>
    <header class="fix">
          <h3 class="font-color centerhead">ยินดีต้อนรับเข้าสู่ระบบฝาก-ถอน Auto UFAVIP789</h3>    
    </header>

  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>


<style lang="scss">


.fix{
  top: 0; 
  left: 0; 

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}

.font-color{
  color: #ccccff;  
}

.centerhead{
  max-width: 600px;
  margin: auto;
}

$grey: #111111
$white: #fff
$deep: #000223
$blue: #01185B
$mint: #42D6CA
$black: #000


</style>