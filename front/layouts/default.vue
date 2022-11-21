<script setup>
import { useUiStore } from '~/store/ui'
import { storeToRefs } from 'pinia'
const store = useUiStore()
const { menuOpen } = storeToRefs(store)
</script>

<template>
  <div class="app">
    <SquidMenu :class="{ menu: true, 'menu--open': menuOpen, 'menu--close': !menuOpen }"/>
    <div class="content">
      <SquidHeader class="content__header"/>
      <main>
        <div class="content__row">
          <div class="content__column mx-2">
            <slot />
          </div>
        </div>
      </main>
      <SquidFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/breakpoints.scss';

@media (min-width: 768px) {
  .content__row {
    min-height: calc(100vh - 87.19px - 48.78px) !important;
  }
}
.menu {
  flex-basis: 0px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-x: hidden;
  transition: all .3s ease-out;
}
.menu--close {
  width: 0px;
  flex-basis: 0px;
  @include bpmd {
    flex-basis: calc(var(--spacing-unit) * 48);
    width: unset;
  }
}
.menu--open {
  width: unset;
  flex-basis: calc(var(--spacing-unit) * 48);
  @include bpmd {
    flex-basis: calc(var(--spacing-unit) * 48);
    width: unset;
  }
}
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
}
.content__header {
  flex-basis: 60px;
  flex-grow: 0;
  flex-shrink: 0;
}
.content__row {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 87.19px - 87.58px);
}
.content__column {
  display: flex;
  flex-direction: column;
  flex-basis: 768px;
  flex-shrink: 1;
  flex-grow: 0;
}
.app {
  display: flex;
}
</style>