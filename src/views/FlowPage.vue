<script>
import FlowChart from '@/components/flowchart/FlowChart'

export default {
  name: 'flow-container',
  components: {
    FlowChart
  }
}
</script>
<template>
  <div class="container">
    <div class="columns">
      <div class="column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <flow-chart></flow-chart>
      </div>
    </div>
  </div>
</template>
