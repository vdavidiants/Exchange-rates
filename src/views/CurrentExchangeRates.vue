<template>
  <div class="currency-block">
    <h2 class="currency-block_header">Current Exchange rates</h2>
    <div class="currency-block_container">
      <input
        type="button"
        value="Back"
        class="transition-button"
        @click="$emit('backToConverter')"
      />
      <hr />
      <ChangeCurrency infoText="Current currency:" />
      <hr />
      <div v-for="curr in basicCurrencies" :key="curr.value">
        <span>{{ curr.value }}</span>
        <input
          type="text"
          readonly
          class="readonly-input"
          :value="isValueCurrency(curr.value)"
        />
        <input
          type="button"
          value="favorites"
          class="favourite-button"
          :class="{ 'favourite-button-active': curr.favourite }"
          @click="setFavourite(curr.value)"
        />
        <input
          type="button"
          value="X"
          class="delete-button"
          @click="
            showModal('confirm', 'deleteCurrency', {
              handler: deleteCurrency,
              value: curr.value
            })
          "
        />
      </div>
      <p>Add new currency:</p>
      <input
        v-model="newCurrency"
        placeholder="Enter currency"
        type="text"
        list="newValue"
      />
      <datalist id="newValue">
        <option
          v-for="item of exchangedRates"
          :key="item"
          :value="item"
        ></option>
      </datalist>
      <input
        type="button"
        value="add currency"
        class="add-currency-button"
        @click="addNewCurrency"
      />
    </div>
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
import { mapState, mapGetters } from 'vuex'
import modalWindow from '@/mixins/modalWindow'

export default {
  name: 'CurrentExchangeRates',
  components: {
    ChangeCurrency: () => import('@/components/ChangeCurrency.vue')
  },
  mixins: [modalWindow],
  data() {
    return {
      basicCurrencies: [
        { value: 'EUR', favourite: false },
        { value: 'USD', favourite: false },
        { value: 'RUB', favourite: false }
      ],
      newCurrency: ''
    }
  },
  computed: {
    ...mapState(['defaultCurrency', 'data']),
    ...mapGetters(['exchangedRates'])
  },
  created() {
    console.log(this.data)
  },
  methods: {
    isValueCurrency(value) {
      return (1 / this.data[value]).toFixed(2)
    },
    deleteCurrency(value) {
      this.basicCurrencies = this.basicCurrencies.filter(
        curr => curr.value !== value
      )
    },
    addNewCurrency() {
      let value = this.newCurrency.toUpperCase()
      if (!this.exchangedRates.find(el => el === value)) {
        return this.showModal('info', !value ? 'emptyValue' : 'addNewCurrency')
      }
      if (value && !this.basicCurrencies.some(el => el.value === value)) {
        this.basicCurrencies.push({ value, favourite: false })
        this.newCurrency = ''
      }
    },
    setFavourite(value) {
      this.basicCurrencies = this.basicCurrencies
        .map(el => {
          if (el.value === value) {
            return { ...el, favourite: !el.favourite }
          } else {
            return el
          }
        })
        .sort(function(a, b) {
          if (a.favourite < b.favourite) {
            return 1
          }
          if (a.favourite > b.favourite) {
            return -1
          }
          return 0
        })
    }
  }
}
</script>
