<script setup>
const navlinks = [
  {
    'text': 'Containers',
    'path': 'M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z',
    'to': '/',
    'fill': 'currentColor',
    'strokeWidth': '0',
    'stroke': "transparent"
  },{
    'text': 'Profiles',
    'path': 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    'to': '/',
    'fill': 'transparent',
    'strokeWidth': '1.5',
    'stroke': "currentColor"
  }
]
</script>

<template>
  <div class="menu">
    <NuxtLink class="logo__navlink" to="/"><SquidLogo class="logo"></SquidLogo></NuxtLink>
    <nav class="menu__nav">
      <NuxtLink v-for="navlink in navlinks" class="menu__navlink" :to="navlink.to">
        <svg xmlns="http://www.w3.org/2000/svg" class="menu__navlink__icon" :fill="navlink.fill" viewBox="0 0 24 24"  :stroke-width="navlink.strokeWidth" :stroke="navlink.stroke">
          <path stroke-linecap="round" stroke-linejoin="round" :d="navlink.path" />
        </svg>{{ navlink.text }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/assets/css/textSizes.scss';
.menu {
  display: flex;
  flex-direction: column;
  z-index:2;
  background-color: white;
  padding-top: calc(var(--spacing-unit) * 2); 
  padding-bottom: calc(var(--spacing-unit) * 2);
  border-right: solid 1px var(--gray-200);
}
.menu__nav {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--spacing-unit) * 2); 
  padding-left: calc(var(--spacing-unit) * 2);
  padding-right: calc(var(--spacing-unit) * 2);
}
.logo__navlink {
  padding-right: calc(var(--spacing-unit) * 2);
  padding-left: calc(var(--spacing-unit) * 2);
}
.menu__navlink {
  color: var(--gray-600);
  display: flex;
  align-items: center;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--spacing-unit);
  font-weight: var(--font-medium);
  @extend .text-sm;
}
.menu__navlink:hover {
  color: var(--gray-900);
  background-color: var(--gray-100);
}
.menu__navlink__icon {
  flex-shrink: 0;
  flex-grow: 0;
  height: 24px;
  width: 24px;
  margin-right: calc(var(--spacing-unit) * 3);
}
</style>