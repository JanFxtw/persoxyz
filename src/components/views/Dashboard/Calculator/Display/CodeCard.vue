<template>
    <div class="code-card">
        <span class="card-id">
            <mdicon name="account-edit" />
            <input
                class="identity-name"
                :value="code.name"
                @change="$emit('change-name', $event.target.value)"
            />
        </span>

        <span class="card-id">
            <mdicon name="clock-outline" />
            {{ code.date }}
        </span>

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
};
</script>
