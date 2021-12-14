export default {
  data() {
    return {
      mainModal: false,
      modalHandler: { handler: null, value: null },
      modalText: {
        title: '',
        body: ''
      },
      modalWithNo: false,
      modalMessages: {
        deleteCurrency: {
          title: 'Delete currency',
          body: 'Do you want to delete this currency?'
        },
        addNewCurrency: {
          title: 'Currency is not found',
          body: 'There is not entered currency'
        },
        emptyValue: {
          title: 'Empty value',
          body: 'Please, enter text'
        }
      }
    }
  },
  methods: {
    confirmModal() {
      this.modalHandler.handler(this.modalHandler.value)
      this.modalHandler = { handler: null, value: null }
    },
    showModalWithHandler({ handler, value }) {
      this.modalHandler = { handler, value }
    },
    showModal(type, message, data) {
      this.mainModal = true
      this.modalText = this.modalMessages[message]
      this.modalWithNo = false
      if (type !== 'info') {
        this.showModalWithHandler(data)
        this.modalWithNo = true
      }
    }
  }
}
