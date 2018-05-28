<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FlowHeader from '@/components/header/FlowHeader'
import FlowFooter from '@/components/footer/FlowFooter'

export default {
  name: 'home',
  components: {
    HelloWorld,
    FlowHeader,
    FlowFooter
  }
}
</script>
<template>
  <div class="grid-main">
    <header role="reader">
      <flow-header></flow-header>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer class="navbar bg-secondary p-2">
      <flow-footer></flow-footer>
    </footer>
    <!--img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/-->
  </div>
</template>
