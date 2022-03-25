<template>
    <div class="display">
        <div
            v-for="(code, index) in codes"
            :key="code"
            class="code-card"
        >
            <mdicon name="shield-account" /> Neue Identität
            <div>
                Code:
                {{ code.part1 }}{{ code.part2 }}{{ code.part3 }}{{ code.part4 }}{{ code.part5 }}
            </div>

            <button
                class="remove-button"
                @click="removeCode(index)"
            >
                <mdicon name="close" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    codes: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeCode(index) {
      const copiedCodes = [...this.codes];
      copiedCodes.splice(index, 1);
      this.$emit('update:codes', copiedCodes);
    },
  },
};
</script>

<style lang="scss" src='./Display.scss' />
