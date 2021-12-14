<template>
  <div class="currency-values">
    <div
      class="current-currencies"
      v-for="currency of basicCurrency"
      :key="currency"
    >
      <span>{{ currency }}</span>
      <input
        type="text"
        class="readonly-input"
        readonly
        :value="getCurrencyValue(currency)"
      />
      <input
        class="delete-button"
        type="button"
        value="X"
        @click="
          showModal('confirm', 'deleteCurrency', {
            handler: deleteCurrentCurrency,
            value: currency
          })
        "
      />
    </div>
    <p>Add new currency:</p>
    <input
      type="text"
      v-model="newCurrency"
      placeholder="Enter currency"
      list="newList"
    />
    <datalist id="newList">
      <option v-for="item of exchangedRates" :key="item" :value="item"></option>
    </datalist>
    <input
      class="add-currency-button"
      type="button"
      value="add"
      @click="addNewCurrency()"
    />
    <MainModal
      v-model="mainModal"
      :modalHandler="modalHandler"
      :modalText="modalText"
      :modalWithNo="modalWithNo"
      @confirm-modal="confirmModal"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import modalWindow from '@/mixins/modalWindow'

export default {
  name: 'Converter',
  props: {
    customerValue: {
      type: String,
      default: '0'
    }
  },
  mixins: [modalWindow],
  data() {
    return {
      basicCurrency: ['EUR', 'USD', 'RUB'],
      newCurrency: ''
    }
  },
  computed: mapGetters(['getDefaultCurrency', 'exchangedRates']),
  methods: {
    getCurrencyValue(currency) {
      return (this.customerValue * this.$store.state.data[currency]).toFixed(2)
    },
    deleteCurrentCurrency(currency) {
      this.basicCurrency = this.basicCurrency.filter(val => val !== currency)
    },
    addNewCurrency() {
      let value = this.newCurrency.toUpperCase()
      if (!this.exchangedRates.find(el => el === value)) {
        return this.showModal('info', !value ? 'emptyValue' : 'addNewCurrency')
      }
      if (value && !this.basicCurrency.includes(value)) {
        this.basicCurrency.push(value)
        this.newCurrency = ''
      }
    }
  }
}
</script>
