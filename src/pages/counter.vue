<template>
  <div>
    <h1>Counter</h1>
    <p>Count: {{ count }}</p>
    <p>{{ syobon }}</p>
    <button @click="onClickPlus">+</button>
    <button @click="onClickMinus">-</button>
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

  get syobon() {
    return this.count > 0 && this.count % 3 === 0 ? '(`･ω･´)' : '(´･ω･`)';
  }

  onClickPlus(): void {
    this.count++;
  }

  onClickMinus(): void {
    this.count--;
  }
}
</script>

<style lang="scss"></style>
