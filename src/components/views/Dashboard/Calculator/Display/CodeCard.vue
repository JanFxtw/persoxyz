<template>
    <div class="code-card">
        <div class="information-wrapper">
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
                    {{ currentDate }}
                </span>
            </div>

            <div class="specific information">
                <span
                    class="element"
                    title="Geburtsdatum"
                >
                    <mdicon name="cake-variant-outline" />
                    {{ birthdayDate.day }}.{{ birthdayDate.month }}.{{ birthdayDate.year }}
                </span>
                <span
                    class="element"
                    title="Land"
                >
                    <mdicon name="map-marker-outline" />
                    {{ cityName.plz }} {{ cityName.city }}
                </span>
                <span
                    class="element"
                    title="Ablaufdatum"
                >
                    <mdicon name="alarm" />
                    {{ expirationDate.day }}.{{ expirationDate.month }}.{{ expirationDate.year }}
                </span>
            </div>
        </div>

        <div
            class="code"
            title="Alte Personalausweisnummer"
        >
            <button
                class="copy-button"
                @click="copyText('old-output')"
            >
                <mdicon name="content-copy" />
            </button>
            <input
                ref="old-output"
                class="code-output"
                :value="generateOldCode"
            />
        </div>

        <div
            class="code"
            title="Neue Personalausweisnummer"
        >
            <button
                class="copy-button"
                @click="copyText('new-output')"
            >
                <mdicon name="content-copy" />
            </button>
            <input
                ref="new-output"
                class="code-output"
                :value="generateNewCode"
            />
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
import citys from '@/assets/json/citys.json';

export default {
  name: 'CodeCard',
  emits: [
    'change-name',
    'remove-code',
  ],
  data() {
    return {
      citys,
    };
  },
  props: {
    code: {
      type: Object,
      required: true,
    },
  },
  computed: {
    generateOldCode() {
      const {
        residence, nationality, birthday, expiration, checkSum,
      } = this.card;

      return `${residence}${nationality} ${birthday} ${expiration} ${checkSum}`;
    },
    generateNewCode() {
      const {
        residence, nationality, birthday, expiration, checkSum,
      } = this.card;

      return `IDD ${residence} ${birthday} ${expiration}${nationality} ${checkSum} NACHNAME VORNAME ZWEITNAME`;
    },
    cityName() {
      const { residence } = this.code;
      const cit = citys.find((city) => city.bkz === residence) ?? { city: 'Keine Stadt gefunden.' };
      return cit;
    },
    currentDate() {
      const date = new Date(this.code.date);
      return date.toLocaleString('de-DE');
    },
    birthdayDate() {
      return this.calculateDate(this.code.birthday);
    },
    expirationDate() {
      return this.calculateDate(this.code.expiration, true);
    },
    card() {
      const {
        residence, sequential, nationality, birthday, expiration,
      } = this.code;

      const residenceCode = residence + sequential + this.checksum(residence + sequential);
      const nationalityCode = nationality;
      const birthdayCode = birthday + this.checksum(birthday);
      const expirationCode = expiration + this.checksum(expiration);
      const checkSum = this.checksum(residenceCode + birthdayCode + expirationCode);

      return {
        residence: residenceCode,
        nationality: nationalityCode,
        birthday: birthdayCode,
        expiration: expirationCode,
        checkSum,
      };
    },
  },
  methods: {
    copyText(type) {
      const output = this.$refs[type];
      output.select();
      output.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(this.generateOldCode);
    },
    calculateDate(date, future) {
      const calculatedDate = date.match(/.{1,2}/g);
      const currentYear = new Date().getFullYear().toString().substr(-2);

      if (calculatedDate[0] < currentYear || future) {
        calculatedDate[0] = `20${calculatedDate[0]}`;
      } else {
        calculatedDate[0] = `19${calculatedDate[0]}`;
      }

      return {
        day: calculatedDate[2],
        month: calculatedDate[1],
        year: calculatedDate[0],
      };
    },
    checksum(inp) {
      let i = 1;
      let cs = 0;

      for (let j = 0; j < inp.length; j += 1) {
        switch (i) {
          case 2:
            cs += inp.substring(j, j + 1) * 3; i += 1;
            break;
          case 3:
            cs += inp.substring(j, j + 1) * 1; i = 1;
            break;
          default:
            cs += inp.substring(j, j + 1) * 7; i += 1;
            break;
        }
      }

      cs %= 10;

      if (Number.isNaN(cs)) {
        this.$emit('remove-code', { reload: true });
      }

      return cs;
    },
  },
};
</script>

<style lang="scss" src='./CodeCard.scss' />
