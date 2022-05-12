<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal" @click.stop="">
        <header class="modal-header">
          <slot name="header">
            This is a default header.
          </slot>
          <button class="btn-close-topright"
                  type="button"
                  @click="$emit('close')">
            &times;
          </button>
        </header>
        <section class="modal-body">
          <slot name="body">
            This is a default body.
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "Modal",
}
</script>

<style
    lang="scss"
    scoped
    src="@/styles/componentStyles/modal/Modal.scss"
/>