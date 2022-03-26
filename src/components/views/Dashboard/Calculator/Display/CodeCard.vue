<template>
    <div class="code-card">
        <div class="base-information">
            <span
                class="element card-id"
                title="Identitätsname"
            >
                <mdicon name="account-edit" />
                <input
                    class="identity-name"
                    :value="code.name"
                    @change="$emit('change-name', $event.target.value)"
                />
            </span>

            <span
                class="element card-time"
                title="Uhrzeit der Generierung"
            >
                <mdicon name="clock-outline" />
                {{ realDate }}
            </span>
        </div>

        <div>
            Code:
            {{ code.part1 }} {{ code.part2 }} {{ code.part3 }} {{ code.part4 }} {{ code.part5 }}
        </div>

        <button
            class="remove-button"
            @click="$emit('remove-code')"
        >
            <mdicon name="close" />
        </button>
    </div>
</template>

<script>
export default {
  name: 'CodeCard',
  emits: [
    'change-name',
    'remove-code',
  ],
  props: {
    code: {
      type: Object,
      required: true,
    },
  },
  computed: {
    realDate() {
      const date = new Date(this.code.date);
      return date.toLocaleString('de-DE');
    },
  },
};
</script>

<style lang="scss" src='./CodeCard.scss' />
