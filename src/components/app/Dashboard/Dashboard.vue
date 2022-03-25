<template>
    <div class="dashboard">
        <Calculator />
    </div>
</template>

<script>
import Calculator from '@/components/views/Dashboard/Calculator';

export default {
  name: 'Dashboard',
  components: {
    Calculator,
  },
};
</script>

<style lang="scss" src='./Dashboard.scss' />
