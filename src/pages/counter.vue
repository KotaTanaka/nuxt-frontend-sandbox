<template>
  <div>
    <h1>Counter</h1>
    <p>Count: {{ count }}</p>
    <p>{{ syobon }}</p>
    <button @click="countPlus">+</button>
    <button @click="countMinus">-</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';

/** カウンター */
export default defineComponent({
  setup() {
    const count = ref<number>(0);

    const syobon = computed<string>(() => {
      return count.value > 0 && count.value % 3 === 0 ? '(`･ω･´)' : '(´･ω･`)';
    });

    const countPlus = () => count.value++;
    const countMinus = () => count.value--;

    return {
      count,
      syobon,
      countPlus,
      countMinus,
    };
  },
});
</script>

<style lang="scss"></style>
