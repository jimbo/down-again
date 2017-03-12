import { run } from '@cycle/run'
import { makeHTTPDriver } from '@cycle/http'
import { makeDOMDriver } from '@cycle/dom'

import ServiceList from 'src/view/ServiceList'
require('css')

const drivers = {
  dom: makeDOMDriver('main'),
  http: makeHTTPDriver(),
}

function render () {
  run(ServiceList, drivers)
}

document.addEventListener('DOMContentLoaded', render)
