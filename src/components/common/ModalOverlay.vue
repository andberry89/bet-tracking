<template>
  <div
    class="modal-overlay"
    v-if="showModal"
  >
    <div class="slot-container">
      <slot></slot>
    </div>
    <div
      class="background-overlay"
      @click.self="closeModal"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'ModalOverlay',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('update')
    },
  },
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 4;
}
.background-overlay {
  position: absolute;
  background-color: var(--black);
  opacity: 0.75;
  width: 100%;
  height: 100%;
}
.slot-container {
  display: inline-block;
  z-index: 5;
  max-height: 90%;
  overflow-y: auto;
  max-width: 95%;
}
</style>
