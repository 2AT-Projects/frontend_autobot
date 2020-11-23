<template>
  <div>
    <line-chart-container />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import LineChartContainer from '../components/Chart/LineChartContainer.vue';

export default {
  name: "Dashboard",
  extends: Line,
  components: {
    LineChartContainer,
  },
  mounted() {},
};
</script>

<style scoped>
</style>