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
import { Component, Vue } from 'nuxt-property-decorator';

/**
 * カウンターページ
 * @author kotatanaka
 */
@Component
export default class CounterPage extends Vue {
  count = 0;

  get syobon(): string {
    return this.count > 0 && this.count % 3 === 0 ? '(`･ω･´)' : '(´･ω･`)';
  }

  countPlus(): void {
    this.count++;
  }

  countMinus(): void {
    this.count--;
  }
}
</script>

<style lang="scss"></style>
