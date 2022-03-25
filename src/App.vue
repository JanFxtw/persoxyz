<template>
    <Header />
    <Dashboard />
    <Footer />
</template>

<script>
import Header from './components/app/Header';
import Dashboard from './components/app/Dashboard';
import Footer from './components/app/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Dashboard,
    Footer,
  },
  mounted() {
    this.checkTheme();
    this.watchThemeChange();

    this.eventBus.on('change-theme', this.setTheme);
  },
  beforeUnmount() {
    this.eventBus.off('changetheme', this.setTheme);
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.checkTheme);
  },
  methods: {
    watchThemeChange() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.checkTheme);
    },
    checkTheme() {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (!prefersDarkScheme.matches) {
        this.setTheme({ darkmode: false });
        return;
      }

      this.setTheme({ darkmode: true });
    },
    setTheme(config) {
      const { darkmode } = config;

      if (darkmode) {
        document.body.classList.add('dark-theme');
        return;
      }

      document.body.classList.remove('dark-theme');
    },
  },
};
</script>

<style lang="scss" src='@/styles/App.scss' />
