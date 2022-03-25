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

    this.eventBus.on('change-theme', this.setTheme);
  },
  beforeUnmount() {
    this.eventBus.off('changetheme', this.setTheme);
  },
  methods: {
    checkTheme() {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (!prefersDarkScheme.matches) { return; }

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

<style lang="scss" src='@/components/styles/App.scss' />
