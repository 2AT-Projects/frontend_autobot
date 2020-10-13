<template>
  <div>
    <usersList />
  </div>
</template>

<script>
import UsersList from '../components/UsersList';
export default {
  name: 'admin-userboard',
  components: {
    UsersList,
  },
};
</script>