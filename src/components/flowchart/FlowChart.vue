<script>
import * as d3 from 'd3'

export default {
  name: 'flowchart-comp',
  data () {
    return {
      svgLayer: '',
      texts: []
    }
  },
  methods: {
    chunkArr (arr, chunkSize, cache = []) {
      const tmp = [...arr]
      while (tmp.length) cache.push(tmp.splice(0, chunkSize))
      return cache
    },
    initFlow () {
      let self = this
      self.svgLayer = d3.select(self.$refs.flowContainer).append('svg')
        .attr('id', 'svgLayer')
        .attr('width', self.$refs.flowContainer.offsetWidth)
        .attr('height', self.$refs.flowContainer.offsetHeight)
      self.drawEtapa()
      /* let txt = svg.append('text')
        .attr('x', svg.node().width.baseVal.value * 0.3)
        .attr('y', svg.node().height.baseVal.value * 0.12)
        .attr('dy', '0em')
        .attr('text-anchor', 'middle')
        .style('font', '300 20px arial')
      arr.map(a => txt.append('tspan').attr('x', svg.node().width.baseVal.value * 0.3).attr('dy', '1.2em').text(a))
      let bbox = txt.node().getBBox()
      let rect = svg.append('rect')
        .attr('x', bbox.x - 10)
        .attr('y', bbox.y - 10)
        .attr('width', bbox.width + 20)
        .attr('height', bbox.height + 20)
        .style('fill', '#ccc')
        .style('fill-opacity', '.3')
        .style('stroke', '#666')
        .style('stroke-width', '1.5px')
      console.log(rect) */
    },
    drawEtapa () {
      let self = this

      self.fluxo.etapas.map((flx, idx) => {
        let txt = ''
        let str = []

        if (flx.nome.length > 25) {
          flx.nome = self.chunkArr(flx.nome.split(' '), 3)
          flx.nome.map(arr => str.push(arr.join(' ')))
          flx.nome = str
          txt = self.svgLayer.append('text')
            .attr('x', self.svgLayer.node().width.baseVal.value * 0.3)
            .attr('y', (self.svgLayer.node().height.baseVal.value * 0.12) * (idx + 1))
            .attr('dy', '0em')
            .attr('text-anchor', 'middle')
            .style('font', '300 20px arial')
          flx.nome.map(a => txt.append('tspan').attr('x', self.svgLayer.node().width.baseVal.value * 0.3).attr('dy', '1.2em').text(a))
        } else {
          txt = self.svgLayer.append('text')
            .attr('x', self.svgLayer.node().width.baseVal.value * 0.3)
            .attr('y', (self.svgLayer.node().height.baseVal.value * 0.12) * (idx + 1))
            .attr('dy', '0em')
            .attr('text-anchor', 'middle')
            .style('font', '300 20px arial')
            .text(flx.nome)
        }
      })
    }
  },
  computed: {
    fluxo () {
      return this.$store.getters.getFlow
    }
  },
  mounted () {
    this.$store.dispatch('listFlow').then(() => {
      this.initFlow()
    })
  }
}
</script>
<template>
  <div class='flowContainer' id='flowContainer' ref='flowContainer'>
  </div>
</template>
<style lang='scss' scoped>
  .flowContainer {
    height: 68vh;
  }
</style>
