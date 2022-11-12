<template>
    <div>
      <SquidHeader />
      <main>
        <div class="content__row">
          <div class="content__column mx-2">
            <slot />
          </div>
        </div>
      </main>
      <SquidFooter />
    </div>
  </template>
  
  <style lang="scss" scoped>
  @media (min-width: 768px) {
    .content__row {
      min-height: calc(100vh - 87.19px - 48.78px) !important;
    }
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
  </style>