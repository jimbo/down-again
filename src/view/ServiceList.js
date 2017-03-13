import xs from "xstream";
import { h } from "@cycle/dom";
import isolate from "@cycle/isolate";

import Service from "src/view/Service";

function main(sources) {
  const history$ = sources.http
    .select("history")
    .flatten()
    .map(res => res.body)
    .startWith(null);

  const dom = history$
    .map(snapshot => (snapshot || {}).services || [])
    .map(services =>
      services.map(props =>
        isolate(Service)({ dom: sources.dom, props: xs.of(props) })))
    .map(services =>
      xs
        .combine(...services.map(({ dom }) => dom))
        .map(children => h("div.services", children)))
    .flatten();

  const http = xs.of({
    url: "history.json",
    category: "history",
    method: "GET"
  });

  return { dom, http };
}

export default main;
