<template>
    <div class="calculator">
        <Display
            v-model:codes="codes"
        />
        <Input />
        <Generator @generate-new-code="generateNewCode" />
    </div>
</template>

<script>
import Display from './Display';
import Input from './Input.vue';
import Generator from './Generator.vue';

export default {
  name: 'Calculator',
  components: {
    Display,
    Input,
    Generator,
  },
  data() {
    return {
      codes: [],
    };
  },
  mounted() {
    this.generateNewCode();
  },
  methods: {
    generateNewCode() {
      const residence = this.randomNumber(4);
      const sequential = this.randomNumber(5);
      const nationality = 'D';
      const birtday = this.generateBirthday();
      const expiration = this.generateExpiration();

      const part1 = residence + sequential + this.checksum(residence + sequential);
      const part2 = nationality;
      const part3 = birtday + this.checksum(birtday);
      const part4 = expiration + this.checksum(expiration);
      const part5 = this.checksum(part1 + part3 + part4);

      this.codes.push({
        name: 'Identitätsname',
        date: Date.now(),
        part1,
        part2,
        part3,
        part4,
        part5,
      });
    },
    randomNumber(length) {
      let value = '';

      for (let i = 1; i <= length; i += 1) {
        value += Math.floor(Math.random() * 10);
      }

      return value;
    },
    generateBirthday() {
      let xCD = new Date();
      const xCY = xCD.getYear();
      const xCM = xCD.getMonth();
      xCD = xCD.getDate();
      const xYrs = 25;
      if (xYrs == null) { return false; }
      let xNY = xCY - xYrs;
      const xCDT = new Date(xNY, xCM, xCD, 0, 0, 0);
      const xNM = Math.floor(Math.random() * 12) + 1;
      const xND = this.getLeapYear(xNY, xNM);
      const xNDT = new Date(xNY, xNM - 1, xND, 0, 0, 0);
      if (xNDT > xCDT) { xNY -= 1; }
      xNY %= 100;
      return ((xNY < 10) ? '0' : '') + xNY + ((xNM < 10) ? '0' : '') + xNM + ((xND < 10) ? '0' : '') + xND;
    },
    generateExpiration() {
      // const currentYear = new Date().getFullYear();

      let xCD = new Date();
      const xCY = xCD.getYear();
      const xCM = xCD.getMonth();
      xCD = xCD.getDate();
      const xYrs = 2025; // Ablaufdatum
      if (xYrs == null) { return false; }
      let xNY = xCY + xYrs;
      const xCDT = new Date(xNY, xCM, xCD, 0, 0, 0);
      const xNM = Math.floor(Math.random() * 12) + 1;
      const xND = this.getLeapYear(xNY, xNM);
      const xNDT = new Date(xNY, xNM - 1, xND, 0, 0, 0);
      if (xNDT < xCDT) { xNY += 1; }
      xNY %= 100;
      return ((xNY < 10) ? '0' : '') + xNY + ((xNM < 10) ? '0' : '') + xNM + ((xND < 10) ? '0' : '') + xND;
    },
    getLeapYear(year, month) {
      if (month === 2) {
        if (year % 4 === 0) {
          return Math.floor(Math.random() * 29) + 1;
        }

        return Math.floor(Math.random() * 28) + 1;
      }

      if (month % 2 === 1) {
        return Math.floor(Math.random() * 31) + 1;
      }

      return Math.floor(Math.random() * 30) + 1;
    },
    checksum(inp) {
      let i = 1;
      let cs = 0;
      for (let j = 0; j < inp.length; j += 1) {
        switch (i) {
          case 1:
            cs += inp.substring(j, j + 1) * 7; i += 1;
            break;
          case 2:
            cs += inp.substring(j, j + 1) * 3; i += 1;
            break;
          case 3:
            cs += inp.substring(j, j + 1) * 1; i = 1;
            break;
          default:
            break;
        }
      }

      cs %= 10;
      return cs;
    },
  },
};
</script>

<style lang="scss" src='./Calculator.scss' />
