<template>
    <div class="code-card">
        <div class="base information">
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

        <div class="specific information">
            <span
                class="element"
                title="Geburtsdatum"
            >
                <mdicon name="cake-variant-outline" />
                {{ realBirthday[2] }}.{{ realBirthday[1] }} {{ realBirthday[0] }}
            </span>
            <span
                class="element"
                title="Land"
            >
                <mdicon name="map-marker-outline" />
                Deutschland
            </span>
        </div>

        <div class="code information">
            <div class="element">
                Code:
                {{ code.part1 }} {{ code.part2 }} {{ code.part3 }} {{ code.part4 }} {{ code.part5 }}
            </div>
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
    realBirthday() {
      let raw = this.code.part3;
      raw = raw.slice(0, -1);
      const birthday = raw.match(/.{1,2}/g);

      const currentYear = new Date().getFullYear().toString().substr(-2);

      if (birthday[0] < currentYear) {
        birthday[0] = `20${birthday[0]}`;
      } else {
        birthday[0] = `19${birthday[0]}`;
      }

      return birthday;
    },
  },
};
</script>

<style lang="scss" src='./CodeCard.scss' />
