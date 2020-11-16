<template>
  <div class="container">
    <withdrawList />
  </div>
</template>

<script>
import WithdrawList from "../components/AdminWithdrawList";

export default {
  name: "admin-withdraw",
  components: {
    WithdrawList,
  },
};
</script>
