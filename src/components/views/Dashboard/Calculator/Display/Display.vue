<template>
    <div class="display">
        <CodeCard
            v-for="(code, index) in codes"
            :key="index"
            :code="code"
            class="code-card"
            @remove-code="removeCode(index)"
            @change-name="changeName(index, $event)"
        />
    </div>
</template>

<script>
import CodeCard from './CodeCard.vue';

export default {
  name: 'Display',
  components: {
    CodeCard,
  },
  emits: [
    'update:codes',
  ],
  props: {
    codes: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeCode(index) {
      const clonedCodes = [...this.codes];
      clonedCodes.splice(index, 1);
      this.$emit('update:codes', clonedCodes);
    },
    changeName(index, e) {
      const { value } = e.target;
      const clonedCodes = [...this.codes];
      clonedCodes[index].name = value;
      this.$emit('update:codes', clonedCodes);
    },
  },
};
</script>

<style lang="scss" src='./Display.scss' />
