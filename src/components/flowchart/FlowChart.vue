<script>
import * as d3 from 'd3'

export default {
  name: 'flowchart-comp',
  data () {
    return {
      svgLayer: '',
      etapas: []
    }
  },
  methods: {
    chunkArr (arr, chunkSize, cache = []) {
      const tmp = [...arr]
      while (tmp.length) cache.push(tmp.splice(0, chunkSize))
      return cache
    },
    changeWidth () {
      if (this.svgLayer) {
        this.svgLayer.attr('width', this.$refs.flowContainer.offsetWidth)
      }
    },
    initFlow () {
      let self = this
      self.svgLayer = d3.select(self.$refs.flowContainer).append('svg')
        .attr('id', 'svgLayer')
        .attr('width', '100%')
        .attr('height', self.$refs.flowContainer.offsetHeight)
      self.drawEtapa()
    },
    drawEtapa () {
      let self = this
      let texts = []

      self.fluxo.etapas.map((flx, idx) => {
        
        let txt = self.svgLayer.append('text')
          .attr('x', self.svgLayer.node().width.baseVal.value * 0.3)
          .attr('y', (self.svgLayer.node().height.baseVal.value * 0.2) * (idx + 1))
          .attr('dy', '0em')
          .attr('text-anchor', 'middle')
          .style('font', '300 16px arial')
          .text(flx.nome)
        if ((self.svgLayer.node().height.baseVal.value * 0.17) * (idx + 1) > self.svgLayer.node().height.baseVal.value) {
          self.svgLayer.attr('height', (self.svgLayer.node().height.baseVal.value * 0.2) * (idx + 2))
        }
        texts.push(txt);
      })

      texts.map((txt)=>{
        let bbox = txt.node().getBBox()
        let etapa = self.svgLayer.append('rect')
          .attr('x', bbox.x - 15)
          .attr('y', bbox.y - 15)
          .attr('width', bbox.width + 30)
          .attr('height', bbox.height + 30)
          .style('fill', '#ccc')
          .style('fill-opacity', '.3')
          .style('stroke', '#666')
          .style('stroke-width', '1.5px')
        self.etapas.push(etapa)
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
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      background-color: rgba(#706f6f, .5);
      border-radius: .25rem;
      width: .625rem;
    }
    &::-webkit-scrollbar-track {
      border-radius: .25rem;
      width: .625rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(#000, .3);
      border-radius: .25rem;
    }
  }

  #svgLayer {
    width: 100%;
  }
</style>
