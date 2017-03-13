import { h } from "@cycle/dom";

import AvailabilityGraph from "src/view/AvailabilityGraph";

function main(sources) {
  const range$ = sources.dom
    .select(".service-range")
    .events("change")
    .map(ev => ev.target.value);

  const state$ = sources.props
    .map(props =>
      range$.map(range => Object.assign({ range }, props)).startWith(props))
    .flatten()
    .remember();

  const dom = state$.map(state => {
    const { message, name, range, status, values } = state;
    const attrs = { "data-status": getStatusCode(status) };
    const title = name.split(" - ").shift();
    const value = values[values.length - 1];

    return h("div.service", { key: title, attrs }, [
      h("div.service-header", [
        h("h2.service-name", title),
        h("div.service-status", `${status} (${value * 100}%)`),
        h("select.service-range", [
          h("option", { key: "720", attrs: { value: "720" } }, "Last 30 Days"),
          h("option", { key: "168", attrs: { value: "168" } }, "Last 7 Days"),
          h("option", { key: "24", attrs: { value: "24" } }, "Last 24 Hours")
        ])
      ]),
      h("p.service-message", message),
      AvailabilityGraph(values, range)
    ]);
  });

  return { dom };
}

function getStatusCode(status) {
  return ["Unavailable", "Available"].indexOf(status);
}

export default main;
