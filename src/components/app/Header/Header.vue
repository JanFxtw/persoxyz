<template>
    <div class="header">
        <span> Personalausweis Generator </span>
        <button
            class="delete-history"
            title="Historie löschen"
            @click="deleteHistory"
        >
            <mdicon name="delete-outline" />
        </button>
    </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    deleteHistory() {
      this.eventBus.emit('delete-history');
    },
  },
};
</script>

<style lang="scss" src='./Header.scss' />
