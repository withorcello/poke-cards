<template>
  <div class="fluid flex-row justify-center">
    <div class="cols-8 rows-fluid flex-column justify-start row-gap-4 pa-7">
      <Search />
      <DataIterator />
    </div>
  </div>
</template>

<script>
import DataIterator from "./components/DataIterator.vue";
import Search from "./components/Search.vue";

export default {
  components: {
    DataIterator,
    Search,
  },
};
</script>
