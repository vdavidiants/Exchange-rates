<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <CurrencyConverter v-if="converter" @changePage="converter = false" />
        <CurrentExchangeRates v-else @backToConverter="converter = true" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      converter: true
    }
  },
  components: {
    CurrencyConverter: () => import('@/views/CurrencyConverter.vue'),
    CurrentExchangeRates: () => import('@/views/CurrentExchangeRates.vue')
  },
  computed: {
    isReadyToUpdate() {
      return (
        new Date().toDateString() !==
        new Date(this.$store.state.apiData?.timestamp * 1000).toDateString()
      )
    }
  },
  created() {
    if (this.$store.state.apiData && !this.isReadyToUpdate)
      return this.setChangedData()
    this.getCurrencyRate()
  },
  methods: {
    ...mapActions(['getCurrencyRate', 'setChangedData'])
  }
}
</script>

