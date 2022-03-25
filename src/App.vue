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
};
</script>
