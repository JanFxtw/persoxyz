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

            <button
                class="footer-link theme-toggle"
                @click="changeTheme"
            >
                <mdicon
                    :class="{
                        darkmode
                    }"
                    name="theme-light-dark"
                />
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
      darkmode: false,
    };
  },
  methods: {
    toggleModal(type) {
      this.eventBus.emit('open-modal', { type });
    },
    changeTheme() {
      this.darkmode = !this.darkmode;
      this.eventBus.emit('change-theme', { darkmode: this.darkmode });
    },
  },
};
</script>

<style lang="scss" src='./Footer.scss' />
