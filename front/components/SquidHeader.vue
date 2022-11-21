<script setup>
import { useSquidStore } from '~/store/squid'
import { useUiStore } from '~/store/ui'
import { storeToRefs } from 'pinia' 
const store = useSquidStore()
const { username } = store
const uiStore = useUiStore()
const { menuOpen } = storeToRefs(uiStore)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const logout = () => {
  store.logout()
}
</script>

<template>
  <header class="px-4">
    <button @click="toggleMenu" class="button--icon menu__button">
      <svg class="header__navlink__icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path :class="{'sandwich__top':true,'sandwich__top--close': menuOpen,'sandwich__top--open': !menuOpen}" d="M3.75 17.25h16.5" style="stroke-linecap:round"/>
        <path :class="{'sandwich__mid':true,'sandwich__mid--close': menuOpen,'sandwich__mid--open': !menuOpen}" d="M3.75 12h16.5" style="stroke-linecap:round"/>
        <path :class="{'sandwich__bot':true,'sandwich__bot--close': menuOpen,'sandwich__bot--open': !menuOpen}" d="M3.75 6.75h16.5" style="stroke-linecap:round"/>
      </svg>
    </button>
    <nav class="header__nav space-x-4">
      <NuxtLink @click.native="logout" class="header__navlink" to="login">
        <svg class="header__navlink__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>{{ username }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '~/assets/css/textSizes.scss';
@import '~/assets/css/breakpoints.scss';
header {
  display: flex;
  flex-direction: row;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
}
.header__nav {
  display: flex;
  align-items: center;
}
.header__navlink {
  color: var(--gray-500);
  transition: color 0.3s ease-out;
  display: flex;
  align-items: center;
  @extend .text-md;
  font-weight: var(--font-medium);
}
.header__navlink:hover {
  color: var(--ocean-800);
}
.header__navlink__icon {
  margin-right: calc(var(--spacing-unit) * 1);
  height: 24px;
  width: 24px;
}
.offsite {
  height: 1rem;
  width: 1rem;
}
.button--icon {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.sandwich__top--close {
  transform: translateX(4px)translateY(-3.5px)rotate(45deg);
}
.sandwich__mid--close {
  transform: translateX(-24px);
}
.sandwich__bot--close {
  transform: translateX(4px)translateY(3.5px)rotate(-45deg);
}
.sandwich__top--open {
  transform: translateX(0px)translateY(0px)rotate(0deg);
}
.sandwich__mid--open {
  transform: translateX(0px);
}
.sandwich__bot--open {
  transform: translateX(0px)translateY(0px)rotate(0deg);
}
.sandwich__top {
  transform-origin: center;
  transition: transform .3s ease-out;
}
.sandwich__mid {
  transition: transform .3s ease-out;
}
.sandwich__bot {
  transform-origin: center;
  transition: transform .3s ease-out;
}
.menu__button {
  @include bpmd {
    visibility: hidden;
  }
}
</style>