var g = Object.defineProperty;
var m = (s, e, t) => e in s ? g(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => m(s, typeof e != "symbol" ? e + "" : e, t);
class f {
  constructor(e, t) {
    c(this, "experiments", []);
    this.logger = e, this.widgets = t;
  }
  addOverrides(e) {
    this.experiments.push(e);
  }
  runExperiments(e) {
    let t = !1;
    for (const i of this.experiments)
      i.execute(e, this) && (t = !0);
    return t;
  }
  /**
   * Load the widget in the page
   *
   * @param widgetVersion Load the specific widgetVersion
   * @param from_version If the widget is already loaded, upgrade it
   */
  load(e, t) {
    t && this.upgrade(e, t);
    const i = this.widgets[e], a = document.getElementsByTagName("head")[0];
    i.scripts().forEach((d) => {
      a == null || a.appendChild(d);
    });
  }
  /**
   *
   * @param url Current uri of the page
   * @param version Default widget version to load, if not experiments are executed on this page
   */
  run(e, t) {
    this.logger.debug("Running loader on url: ", e == null ? void 0 : e.toString()), this.runExperiments(e) || (this.logger.debug(
      `No experiments found, loading widget (${t})`
    ), this.load(t));
  }
  upgrade(e, t) {
    t !== e && (this.logger.info(
      `Upgrading widget from ${t} to ${e}`
    ), this.widgets[e].upgrade_from[t]());
  }
}
class h {
  constructor() {
    c(this, "prefix", "Scalapay Widget");
  }
  error(e, ...t) {
    console.error(`${this.prefix}: ${e}`, t);
  }
  info(e, ...t) {
    console.info(`${this.prefix}: ${e}`, t);
  }
  warn(e, ...t) {
    console.warn(`${this.prefix}: ${e}`, t);
  }
  debug(e, ...t) {
    console.debug(`${this.prefix}: ${e}`, t);
  }
}
var r = /* @__PURE__ */ ((s) => (s.V1 = "v1", s.V3 = "v3", s.V5 = "v5", s))(r || {});
class w {
  constructor() {
    c(this, "version", r.V1);
    c(this, "upgrade_from", {
      [r.V1]: () => {
      },
      [r.V3]: () => {
      },
      [r.V5]: () => {
      }
    });
  }
  scripts() {
    const e = document.createElement("script");
    e.src = "https://cdn.scalapay.com/js/scalapay-widget/webcomponents-bundle.js", e.type = "module";
    const t = document.createElement("script");
    return t.src = "https://cdn.scalapay.com/js/scalapay-widget/scalapay-widget.js", t.type = "module", [e, t];
  }
}
class y {
  constructor() {
    c(this, "version", r.V3);
    c(this, "upgrade_from", {
      [r.V1]: () => {
        this.upgrade_from_v1();
      },
      [r.V3]: () => {
      },
      [r.V5]: () => {
      }
    });
  }
  scripts() {
    const e = document.createElement("script");
    e.src = "https://cdn.scalapay.com/widget/v3/js/scalapay-widget.esm.js", e.type = "module";
    const t = document.createElement("script");
    return t.src = "https://cdn.scalapay.com/widget/v3/js/scalapay-widget.js", t.type = "nomodule", [e, t];
  }
  upgrade_from_v1() {
    const e = {
      hideprice: "hide-price",
      amountselectorarray: "amount-selectors",
      numberofpayments: "number-of-installments",
      currencyposition: "currency-position",
      currencydisplay: "currency-display",
      logosize: "logo-size"
    }, t = [
      "size",
      "pricecolor",
      "logocolor",
      "logoalignment",
      "priceboxselector",
      "hidelogo"
    ], i = {
      min: "5",
      max: "1500"
    }, a = document.querySelectorAll(
      "scalapay-widget:not([v3])"
    );
    for (const o of a) {
      o.setAttribute("v3", "true");
      const d = o.getAttributeNames();
      t.forEach((n) => o.removeAttribute(n));
      for (const n of d) {
        const u = e[n] ?? null, l = o.getAttribute(n);
        u && l && (o.setAttribute(u, l), o.removeAttribute(n));
      }
      for (const n of Object.keys(i)) {
        if (o.getAttribute(n))
          continue;
        const u = i[n];
        u && o.setAttribute(n, u);
      }
    }
  }
}
class b {
  constructor() {
    c(this, "version", r.V5);
    c(this, "upgrade_from", {
      [r.V1]: () => {
      },
      [r.V3]: () => {
      },
      [r.V5]: () => {
      }
    });
  }
  scripts() {
    const e = document.createElement("script");
    return e.src = "https://cdn.scalapay.com/widget/v5/js/scalapay-widget.js", e.type = "module", [e];
  }
}
const p = new h(), V = new f(p, {
  [r.V1]: new w(),
  [r.V3]: new y(),
  [r.V5]: new b()
});
V.run(new URL(window.location.href), v(r.V3));
p.info("Loader completed.");
function v(s = r.V3) {
  var t;
  const e = (t = new URL(import.meta.url).searchParams.get("version")) == null ? void 0 : t.toLowerCase();
  return e && Object.values(r).includes(e) ? e : s;
}
