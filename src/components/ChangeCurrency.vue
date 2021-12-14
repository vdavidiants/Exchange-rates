<template>
  <div>
    <p>{{ infoText }}</p>
    <label for="currency">{{ getDefaultCurrency }}</label>
    <slot></slot>
    <div>
      <p>Change currency:</p>
      <input
        v-model="temporaryCurrency"
        type="text"
        id="currency"
        list="exchangedRates"
        placeholder="Enter currency"
      />
      <datalist id="exchangedRates">
        <option
          v-for="item of exchangedRates"
          :key="item"
          :value="item"
        ></option>
      </datalist>
      <input
        class="change-rate-button"
        type="button"
        value="change"
        @click="selectCurrency"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import modalWindow from '@/mixins/modalWindow'

export default {
  name: 'ChangeCurrency',
  props: {
    infoText: {
      type: String,
      default: ''
    }
  },
  mixins: [modalWindow],
  data() {
    return {
      temporaryCurrency: ''
    }
  },
  computed: mapGetters(['getDefaultCurrency', 'exchangedRates']),
  methods: {
    ...mapMutations(['changeState']),
    ...mapActions(['setChangedData']),
    selectCurrency() {
      let value = this.temporaryCurrency.toUpperCase()
      if (!this.exchangedRates.find(el => el === value)) {
        console.log('select')
        return this.showModal('info', !value ? 'emptyValue' : 'addNewCurrency')
      }
      if (value && value !== this.getDefaultCurrency) {
        this.setChangedData(value)
        this.temporaryCurrency = ''
      }
    }
  }
}
</script>

