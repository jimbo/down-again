import { h } from '@cycle/dom'

function AvailabilityGraph (values = [], range = '720') {
  const count = +range
  const height = 120
  const width = 1440
  const step = width / count

  const points = values
    .slice(-(1 + count))
    .reduce((r, v, i) => `${r} ${i * step},${height - v * height}`, '')

  const attrs = {
    class: 'service-graph',
    viewBox: `0 0 ${width} ${height}`,
  }

  const lineAttrs = {
    fill: 'none',
    stroke: '#757575',
    'stroke-width': 1,
    points,
  }

  return h('svg', { attrs }, [
    h('polyline', { attrs: lineAttrs })
  ]);
}

export default AvailabilityGraph
