<template>
    <div class="footer">
        <div class="social logos">
            <a
                v-for="logo in social"
                :key="logo"
                :href="logo.link"
                target="_blank"
                class="footer-link"
                :title="logo.title"
            >
                <mdicon :name="logo.name" />
            </a>
        </div>

        <div class="imprint logos">
            <button
                v-for="imprintSlot in imprintData"
                :key="imprintSlot"
                class="footer-link"
                @click="toggleModal('imprint')"
            >
                Impressum
            </button>
        </div>
    </div>
</template>

<script>
import social from '@/assets/json/social.json';

export default {
  name: 'Footer',
  data() {
    return {
      social,
      imprintData: [
        { name: 'Impressum', event: 'imprint' },
        { name: 'Datenschutz', event: 'privacy' },
        { name: 'Hilfe', event: 'help' },
      ],
    };
  },
  methods: {
    toggleModal(type) {
      switch (type) {
        case 'imprint':
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" src='./Footer.scss' />
