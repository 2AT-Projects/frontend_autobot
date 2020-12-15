<template>
  <div class="mt-4">
    <card-admin
      :title="detailTransection.title"
      :subtitle="detailTransection.subtitle"
    />
  </div>
</template>

<script>
import CardAdmin from "../components/Card.vue";
export default {
  name: "CardContainer",
  components: {
    CardAdmin,
  },
  data() {
    return {
      detailTransection: [
        {
          title: "test",
          subtitle: "test",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
