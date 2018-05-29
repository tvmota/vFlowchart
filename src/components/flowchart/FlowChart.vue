<script>
import * as d3 from 'd3'

export default {
  name: 'flowchart-comp',
  data () {
    return {
      svgLayer: '',
      etapas: [],
      defs: '',
      etapaSelecionada: ''
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
      self.defs = self.svgLayer.append('defs')
      self.defs.append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 5)
        .attr('refY', 0)
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .attr('orient', 'auto')
        .append('path')
        .attr('class', 'arrowHead')
        .attr('d', 'M0,-5L10,0L0,5')
      self.drawEtapa()
    },
    drawEtapa () {
      let self = this
      let texts = []
      let etapas = self.fluxo.etapas.filter(etapa => etapa.tipo < 3)

      etapas.map((flx, idx) => {
        let txt = self.svgLayer.append('text')
          .attr('id', flx.id)
          .attr('x', self.svgLayer.node().width.baseVal.value * 0.2)
          .attr('y', (self.svgLayer.node().height.baseVal.value * 0.25) * (idx + 1))
          .attr('dy', '0em')
          .attr('text-anchor', 'middle')
          .attr('data-tipo', flx.tipo)
          .attr('data-id', flx.id)
          .style('font', '300 16px arial')
          .text(flx.nome)
        if ((self.svgLayer.node().height.baseVal.value * 0.15) * (idx + 1) > self.svgLayer.node().height.baseVal.value) {
          self.svgLayer.attr('height', (self.svgLayer.node().height.baseVal.value * 0.25) * (idx + 2))
        }
        texts.push(txt)
      })

      texts.map((txt) => {
        let bbox = txt.node().getBBox()
        let etapa = self.svgLayer.append('rect')
          .attr('id', `box${txt.node().getAttribute('id')}`)
          .attr('x', bbox.x - 15)
          .attr('y', bbox.y - 15)
          .attr('data-tipo', Number(txt.node().getAttribute('data-tipo')))
          .attr('data-id', Number(txt.node().getAttribute('data-id')))
          .attr('width', bbox.width + 30)
          .attr('height', bbox.height + 30)
        switch (Number(txt.node().getAttribute('data-tipo'))) {
          case -1:
            etapa.attr('class', 'diagrama_fim')
            etapa.attr('ry', 25)
            break
          case 1:
            etapa.attr('class', 'diagrama_inicio')
            etapa.attr('ry', 25)
            document.getElementById(etapa.node().getAttribute('id')).addEventListener('click', (evt) => {
              self.selectEtapa(evt.srcElement)
            })
            break
          case 2:
            etapa.attr('class', 'diagrama_etapa')
            etapa.attr('ry', 10)
            document.getElementById(etapa.node().getAttribute('id')).addEventListener('click', (evt) => {
              self.selectEtapa(evt.srcElement)
            })
            break
        }
        self.etapas.push(etapa)
      })

      self.etapas.map((etapa, idx) => {
        let proxEtapa = self.etapas[idx + 1]
        let bbox = etapa.node().getBBox()
        if (Number(etapa.node().getAttribute('data-tipo')) > 0) {
          self.svgLayer.append('line')
            .attr('class', 'diagrama_arrow')
            .attr('marker-end', 'url(#arrow)')
            .attr('x1', bbox.x + (bbox.width / 2))
            .attr('x2', bbox.x + (bbox.width / 2))
            .attr('y1', bbox.y + bbox.height)
            .attr('y2', proxEtapa.node().getAttribute('y') - 5)
        }
      })

      self.drawServico()
    },
    drawServico () {
      let self = this
      let servico = self.fluxo.etapas.filter(etapa => etapa.tipo > 2)
      console.log(servico)

      servico.map((serv) => {
        let idEtapa = self.fluxo.links.filter(etapa => etapa.to === serv.id)[0]
        let etapa = document.getElementById(idEtapa.from)

        let txtSvg = self.svgLayer.append('text')
          .attr('id', serv.id)
          .attr('x', self.svgLayer.node().width.baseVal.value * 0.8)
          .attr('y', etapa.getBBox().y + 15)
          .attr('dy', '0em')
          .attr('text-anchor', 'middle')
          .attr('data-tipo', serv.tipo)
          .style('font', '300 16px arial')
          .text(serv.nome)

        let boxServ = self.svgLayer.append('rect')
          .attr('id', txtSvg.node().getAttribute('id'))
          .attr('x', txtSvg.node().getBBox().x - 15)
          .attr('y', txtSvg.node().getBBox().y - 15)
          .attr('ry', 10)
          .attr('data-tipo', Number(txtSvg.node().getAttribute('data-tipo')))
          .attr('width', txtSvg.node().getBBox().width + 30)
          .attr('height', txtSvg.node().getBBox().height + 30)

        switch (serv.tipo) {
          case 3:
            boxServ.attr('class', 'diagrama_servico')
            break
          case 4:
            boxServ.attr('class', 'diagrama_fluxo')
            break
          case 5:
            boxServ.attr('class', 'diagrama_form')
            break
        }

        etapa = document.getElementById(`box${idEtapa.from}`)
        self.svgLayer.append('line')
          .attr('class', 'diagrama_arrow')
          .attr('x1', etapa.getBBox().x + etapa.getBBox().width)
          .attr('x2', boxServ.node().getBBox().x)
          .attr('y1', 25 + etapa.getBBox().y)
          .attr('y2', 25 + etapa.getBBox().y)
      })
    },
    selectEtapa (elm) {
      let self = this
      let classe = ''
      if(self.etapaSelecionada){
        classe = self.etapaSelecionada.getAttribute('class')
        self.etapaSelecionada.setAttribute('class', classe.replace(/--.*/g, ''))
      }
      self.etapaSelecionada = elm
      classe = self.etapaSelecionada.getAttribute('class')
      self.etapaSelecionada.setAttribute('class', `${classe}--selecionado`)
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
