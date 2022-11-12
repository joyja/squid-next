<template>
    <header class="px-4">
      <NuxtLink class="logo__link" to="/"><SquidLogo class="logo"></SquidLogo></NuxtLink>
      <nav class="header__nav space-x-4">
        <!-- <NuxtLink class="header__navlink" to="uses">Gear</NuxtLink> -->
      </nav>
    </header>
  </template>
  
  <style lang="scss" scoped>
  header {
    display: flex;
    flex-direction: row;
    position: sticky;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 12 * var(--spacing-unit));
    z-index: 1;
  }
  .logo {
    height: calc(12 * var(--spacing-unit));
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
  .header__nav {
    display: flex;
  }
  .header__navlink {
    color: var(--gray-500);
    font-weight: 600;
    transition: color 0.3s ease-out;
    display: flex;
    align-items: flex-start;
  }
  .header__navlink:hover {
    color: var(--emerald-800);
  }
  .offsite {
    height: 1rem;
    width: 1rem;
  }
  </style>