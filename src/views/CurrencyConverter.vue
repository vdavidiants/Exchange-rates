<template>
  <div class="currency-block">
    <h2 class="currency-block_header">Exchange rates Converter</h2>
    <div class="currency-block_container">
      <change-currency infoText="Enter the sum:">
        <input type="number" v-model="enteredSum" />
      </change-currency>
      <hr />
      <Converter :customerValue="enteredSum" />
      <hr />
      <input
        value="go to exchange rates"
        type="button"
        class="transition-button"
        @click="$emit('changePage')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  data() {
    return {
      enteredSum: '0'
    }
  },
  components: {
    ChangeCurrency: () => import('@/components/ChangeCurrency.vue'),
    Converter: () => import('@/components/Converter.vue')
  }
}
</script>

