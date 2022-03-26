<template>
    <div class="display">
        <CodeCard
            v-for="(code, index) in reversedCodes"
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
  computed: {
    reversedCodes() {
      const clonedCode = [...this.codes];
      return clonedCode.reverse();
    },
  },
  methods: {
    removeCode(index) {
      const clonedCodes = [...this.reversedCodes];
      clonedCodes.splice(index, 1);
      clonedCodes.reverse();
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
