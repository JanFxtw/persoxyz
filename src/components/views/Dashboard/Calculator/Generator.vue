<template>
    <div class="generator">
        <button
            class="code-generator"
            @click="$emit('generate-new-code')"
        >
            Neuen Code Generieren
        </button>
    </div>
</template>

<script>
export default {
  name: 'Generator',
  emits: [
    'generate-new-code',
  ],
};
</script>

<style lang="scss" src='./Generator.scss' />
