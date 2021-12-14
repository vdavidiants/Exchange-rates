<template>
  <div class="main-modal" v-if="value">
    <div class="main-modal_block">
      <p class="main-modal_block-header">{{ modalText.title }}</p>
      <p class="main-modal_block-info">{{ modalText.body }}</p>
      <div class="main-modal_block-buttons">
        <input
          v-if="modalWithNo"
          type="button"
          value="No"
          @click="$emit('input', false)"
        />
        <input type="button" value="OK" @click="confirmModal" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modalText: {
      type: Object,
      default: () => ({})
    },
    modalWithNo: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirmModal() {
      if (this.modalWithNo) {
        this.$emit('confirm-modal')
      }
      this.$emit('input', false)
    }
  }
}
</script>
