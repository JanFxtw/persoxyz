<template>
    <div class="footer">
        <div class="social logos">
            <a
                v-for="(logo, index) in social"
                :key="index"
                :href="logo.link"
                target="_blank"
                class="footer-link"
                :title="logo.title"
            >
                <mdicon :name="logo.name" />
            </a>
        </div>

        <div class="imprint logos">
            <span class="footer-link">Impressum</span>
            <span class="footer-link">Datenschutz</span>
            <span class="footer-link">Hilfe</span>
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
    };
  },
};
</script>

<style lang="scss" src='./Footer.scss' />
