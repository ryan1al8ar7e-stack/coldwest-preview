document.documentElement.classList.add("js");

const WA = "966550197070";
const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

/* ---------- Symptom picker ---------- */
const SYMPTOMS = {
  cool: {
    title: "المكيف شغّال بس ما يبرد زين",
    causes: [
      "نقص في الفريون، وغالبًا وراه تسريب لازم ينصلح قبل التعبئة",
      "فلاتر وشبكة المبخر متسخة وتخنق الهواء",
      "ضعف في الكمبروسر أو الكباستر",
    ],
    todo: "نقيس ضغط الفريون، ننظف الفلاتر، ونحدد القطعة الخربانة قبل ما نغيّر أي شي.",
    msg: "السلام عليكم، المكيف شغّال بس ما يبرد زين. أبغى فني يكشف عليه.",
  },
  drip: {
    title: "المكيف يقطّر ماي من الوحدة الداخلية",
    causes: [
      "مجرى التصريف مسدود بالغبار أو الطحالب",
      "الوحدة الداخلية مركّبة بميلان غلط",
      "تجمّد على المبخر بسبب نقص فريون أو فلتر متسخ",
    ],
    todo: "نفتح مجرى التصريف ونغسله، نضبط ميلان الوحدة، ونتأكد إن الفريون مضبوط عشان ما يرجع التجمّد.",
    msg: "السلام عليكم، المكيف يقطّر ماي من الوحدة الداخلية. أبغى فني يشوفه.",
  },
  noise: {
    title: "المكيف صوته عالي أو فيه طقطقة",
    causes: [
      "مروحة متسخة أو مو متزنة",
      "براغي التثبيت مرتخية في الوحدة الداخلية أو الخارجية",
      "الكمبروسر يشتغل تحت ضغط عالي",
    ],
    todo: "نحدد مصدر الصوت بالضبط، نشد التثبيت وننظف المروحة، ونقيس ضغط التشغيل.",
    msg: "السلام عليكم، المكيف صوته عالي وفيه طقطقة. أبغى فني يكشف عليه.",
  },
  trip: {
    title: "المكيف يفصل ويرجع يشتغل",
    causes: [
      "كباستر ضعيف ما يشغّل الكمبروسر صح",
      "الوحدة الخارجية حارة زيادة: مكثف متسخ أو مكان مكتوم",
      "حساس حرارة أو لوحة تحكم فيها خلل",
    ],
    todo: "نفحص الكباستر والكهرباء الواصلة، ننظف المكثف، ونراقب تشغيل المكيف لين يستقر.",
    msg: "السلام عليكم، المكيف يفصل ويرجع يشتغل. أبغى فني يكشف عليه.",
  },
  smell: {
    title: "تطلع من المكيف ريحة غريبة",
    causes: [
      "رطوبة وعفن على المبخر وفي مجرى التصريف",
      "غبار متراكم داخل الوحدة",
      "ريحة احتراق من الكهرباء أو المروحة",
    ],
    alert: "لو الريحة ريحة احتراق: افصل المكيف من الكهرباء الحين واتصل علينا مباشرة.",
    todo: "نغسل الوحدة الداخلية والمبخر بالكامل، نعقّم مجرى التصريف، ونفحص التوصيلات الكهربائية.",
    msg: "السلام عليكم، تطلع من المكيف ريحة غريبة. أبغى فني يشوفه.",
  },
  fridge: {
    title: "الثلاجة أو غرفة التبريد ما تبرد",
    causes: [
      "تسريب أو نقص في الفريون",
      "مروحة المبخر أو المكثف واقفة",
      "خلل في الثرموستات أو في دورة إذابة الثلج",
    ],
    todo: "نقيس الضغط، نشيك المراوح والثرموستات، ونقول لك إذا البضاعة تحتاج تنتقل لين نخلص.",
    msg: "السلام عليكم، الثلاجة ما تبرد زين. أبغى فني يكشف عليها.",
  },
};

const chips = document.querySelectorAll(".chip");
const panel = document.querySelector(".diag-panel");
const heading = document.getElementById("diag-heading");
const causes = document.getElementById("diag-causes");
const alertBox = document.getElementById("diag-alert");
const todo = document.getElementById("diag-do");
const diagCta = document.getElementById("diag-cta");

function renderSymptom(key, animate) {
  const s = SYMPTOMS[key];
  const apply = () => {
    heading.textContent = s.title;
    causes.replaceChildren(...s.causes.map((c) => Object.assign(document.createElement("li"), { textContent: c })));
    alertBox.hidden = !s.alert;
    alertBox.textContent = s.alert || "";
    todo.textContent = s.todo;
    diagCta.href = waLink(s.msg);
    diagCta.dataset.symptom = key;
    panel.classList.remove("is-swapping");
  };
  if (!animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
  panel.classList.add("is-swapping");
  setTimeout(apply, 180);
}

chips.forEach((chip, idx) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-selected", String(c === chip)));
    renderSymptom(chip.dataset.sym, true);
  });
  chip.addEventListener("keydown", (e) => {
    const step = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0;
    if (!step) return;
    const next = chips[(idx + step + chips.length) % chips.length];
    next.focus();
    next.click();
  });
});
renderSymptom("cool", false);

/* ---------- Parts origin ---------- */
const NOTES = {
  cn: "الصيني يرجّع المكيف يشتغل بأقل تكلفة. نقول لك بصراحة كم نتوقع يعيش.",
  in: "الهندي خيار كثير من عملائنا: سعر معقول وعمر أطول من الأرخص.",
  us: "الأمريكي أغلى، بس لو المكيف جديد وتبي تريّح راسك سنين، هو الخيار.",
  used: "المستعمل نفحصه قبل التركيب، ونقترحه بس لما يكون منطقي لعمر مكيفك.",
};
const origins = document.querySelectorAll(".origin");
const originNote = document.getElementById("origin-note");
origins.forEach((o, idx) => {
  o.addEventListener("click", () => {
    origins.forEach((x) => x.setAttribute("aria-checked", String(x === o)));
    originNote.textContent = NOTES[o.dataset.o] + " قبل التركيب نوريك القطعة وعلبتها.";
  });
  o.addEventListener("keydown", (e) => {
    const step = ["ArrowLeft", "ArrowDown"].includes(e.key) ? 1 : ["ArrowRight", "ArrowUp"].includes(e.key) ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = origins[(idx + step + origins.length) % origins.length];
    next.focus();
    next.click();
  });
});

/* ---------- Hero reading: one count-down on load ---------- */
const counter = document.querySelector("[data-count-from]");
if (counter && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const from = +counter.dataset.countFrom;
  const to = +counter.dataset.countTo;
  const dur = 1600;
  counter.textContent = from;
  setTimeout(() => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      counter.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, 550);
}

/* ---------- Measurement hooks (whatsapp_click / call_click) ---------- */
window.dataLayer = window.dataLayer || [];
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-track]");
  if (!a) return;
  window.dataLayer.push({ event: a.dataset.track, place: a.dataset.place || "", symptom: a.dataset.symptom || "" });
});
