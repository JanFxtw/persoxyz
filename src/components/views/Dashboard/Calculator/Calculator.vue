<template>
    <div class="calculator">
        <Display
            v-model:codes="codes"
            @add-new-code="generateNewCode"
        />
        <Generator @generate-new-code="generateNewCode" />
    </div>
</template>

<script>
import citys from '@/assets/json/citys.json';
import Display from './Display';
import Generator from './Generator.vue';

export default {
  name: 'Calculator',
  components: {
    Display,
    Generator,
  },
  data() {
    return {
      codes: [],
      codeId: 0,
      citys,
    };
  },
  mounted() {
    this.generateNewCode();
  },
  methods: {
    generateNewCode() {
      const residence = this.citys[Math.floor(Math.random() * this.citys.length)].bkz;
      const sequential = this.randomNumber(5);
      const nationality = 'D';
      const birthday = this.generateBirthday();
      const expiration = this.generateExpiration();

      this.codeId += 1;

      this.codes.push({
        name: `Identität-${this.codeId}`,
        date: Date.now(),
        residence,
        sequential,
        nationality,
        birthday,
        expiration,
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
      let xCD = new Date();
      const xCY = xCD.getYear();
      const xCM = xCD.getMonth();
      xCD = xCD.getDate();
      const xYrs = 2025;
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
  },
};
</script>

<style lang="scss" src='./Calculator.scss' />
