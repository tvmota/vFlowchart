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
      <div class="column col-12">
        <flow-chart></flow-chart>
      </div>
    </div>
  </div>
</template>
