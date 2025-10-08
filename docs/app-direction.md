# Quadratics Lesson — Modern Pedagogy Micro‑App (Design Spec)

**Version:** 1.0
**Focus:** Instructional design, pedagogy, content, style, and interaction blueprint (no deployment/security).
**Note (i18n):** All instructional text is translatable to Chinese (zh). Functional UI copy (e.g., generic button labels) is not required to translate. Clicking any instructional text surfaces a tooltip with the Chinese translation.

---

## 1) Executive Summary

A learner‑centered, mastery‑oriented micro‑app that teaches quadratic functions through multiple representations, guided discovery, and authentic modeling tasks. Students move from intuition (transformations and features) → tools (solving methods) → applications (modeling and optimization) → reasoning (inequalities, intersections, data fit). Teachers get hinge questions, misconception probes, rubrics, and analytics hooks.

**Core pillars**

* **Modern pedagogy:** UDL, 5E/GI inquiry arc, formative checks, explicit success criteria, retrieval practice.
* **Multiple representations:** Algebra ↔ Graph ↔ Table ↔ Verbal context.
* **Tool choice:** Structured decision tree for solving.
* **Modeling:** Projectile motion, revenue optimization, fencing with/without a wall, and intersections.
* **i18n:** On‑click Chinese tooltips for every instructional text node.

---

## 2) Audience & Modes

* **Student Mode:** Guided lessons, interactive graphs (D3), equation rendering (KaTeX), instant feedback, reflection.
* **Teacher Mode:** Scope & sequence, hinge items, misconception probes, printable packets, rubric & exemplar bank.

---

## 3) Learning Outcomes (Success Criteria)

By the end, students can:

1. Identify features of a quadratic from **standard** (ax^2+bx+c), **vertex** (a(x-h)^2+k), and **intercept** (a(x-r_1)(x-r_2)) forms.
2. Convert between forms using completing the square and factoring.
3. Choose an appropriate solving method and justify the choice.
4. Interpret and model real contexts with a quadratic; state units, domain, and constraints.
5. Use the discriminant to predict root type and connect to graph shape.
6. Solve quadratic inequalities via sign charts and interval reasoning.
7. Analyze line–parabola intersections and explain solution multiplicity.
8. Reflect on strategy (metacognition) and avoid common misconceptions.

---

## 4) Pedagogical Framework

* **Inquiry arc (Engage → Explore → Explain → Elaborate → Evaluate):** Start with a phenomenon (ball flight or revenue curve), let students manipulate parameters, then formalize definitions and methods.
* **UDL:** Multiple modalities (visuals, narration text, manipulatives), dyslexia‑friendly typography, captioned animations, keyboard navigation.
* **Formative assessment:** Hinge questions every ~8–10 minutes; instant feedback with error notes.
* **Spaced retrieval & interleaving:** Cumulative warm‑ups; mini‑quizzes on Day 1/3/7.
* **Metacognition:** “Why this tool?” prompts; strategy journals; error logs.

---

## 5) Scope & Sequence (Lesson Map)

**L1. Transformations & Features → L2. Forms & Conversions → L3. Solving I (square‑root, factoring)**
**L4. Solving II (complete square, formula) → L5. Discriminant & Graph Meaning**
**L6. Modeling I (projectile) → L7. Modeling II (revenue, fencing)**
**L8. Inequalities & Intersections → L9. Data fit, Review, Performance Task**

Time estimates: 9 short sessions (30–45 min) or 5 extended blocks.

---

## 6) Lesson Blueprints (Teacher‑Facing)

### L1 — Transformations & Features

**Phenomenon:** Start with (y=x^2). Let students drag a vertex handle to form (y=a(x-h)^2+k).
**Key ideas:** Vertex ((h,k)), axis (x=h), opening via (a), range from vertex and (a).
**Interactive (D3):** {Graph with draggable point at vertex; slider for (a); live range annotation.}
**Sample prompts:** “What changes if (k) increases?” “Where is the lowest point now?”
**Exit ticket:** Identify vertex, axis, range for (y=-\tfrac12(x+3)^2+8).

### L2 — Forms & Conversions

**Goal:** Recognize strengths of forms; convert fluently.
**Anchor example:** (y=3x^2-12x+7 = 3(x-2)^2-5).
**Explain:** Completing the square recipe; intercept form from given roots.
**Interactive:** {Step‑through algebra with highlight on each manipulation; toggle to show vertex/y‑intercept instantly.}

### L3 — Solving I (Square‑Root, Factoring)

**Tool choice intro:** Decision tree: pure squares → square‑root; easy integers → factoring.
**Examples:**

* Square‑root: (5x^2=80\Rightarrow x=\pm 4)
* Factoring: (x^2-5x-14=(x-7)(x+2))
  **Hinge question:** Which method is fastest for (9(x-2)^2=45)? Why?

### L4 — Solving II (Complete Square, Formula)

**Bridge:** Completing the square leads to the quadratic formula.
**Example:** (x^2+6x+5=0\Rightarrow(x+3)^2=4\Rightarrow x=-3\pm2).
**Always‑works tool:** (x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}).
**Metacog:** Students justify their tool choice on two novel problems.

### L5 — Discriminant & Graph Meaning

**Key:** (D=b^2-4ac) controls root type; vertex value (f(x_v)=\tfrac{4ac-b^2}{4a}).
**Triad visuals:** {Three mini‑graphs: (D>0), (D=0), (D<0), each with labels for roots/vertex/axis.}
**Quick practice:** Classify given equations by (D) and sketch qualitatively.

### L6 — Modeling I (Projectile Motion)

**Model:** (h(t)=-\tfrac12gt^2+v_0t+h_0).
**Case:** (h(t)=-4.9t^2+19.6t+1.5). Find peak time, peak height, landing time (positive root).
**Interactive:** {D3 time‑height graph with playhead; sliders for (v_0), (h_0); automatic vertex marker.}

### L7 — Modeling II (Revenue, Fencing)

**Revenue:** (q(p)=A-Bp\Rightarrow R(p)=Ap-Bp^2); maximize at (p=\tfrac{-b}{2a}). Example: (q=500-10p\Rightarrow p^*=25).
**Fencing against a wall:** Area (A(x)=-\tfrac12x^2+\tfrac{P}{2}x); maximum at (x=\tfrac{P}{4}).
**Emphasis:** Units, admissible solutions, interpretation.

### L8 — Inequalities & Intersections

**Inequalities by sign charts:** Solve (x^2-5x+6\le0\Rightarrow x\in[2,3]).
**Line–parabola:** Solve intersections of (y=mx+b) and (y=ax^2+bx+c).
**Interactive:** {Number line with test intervals synced to the parabola; click to test a point.}

### L9 — Data Fit & Performance Task

**Fit from vertex+point:** (y=a(x-h)^2+k\Rightarrow a=\frac{y_1-k}{(x_1-h)^2}).
**Three‑point fit:** Solve for (a,b,c) (scaffolded).
**Performance task:** Choose a context (projectile/revenue/fencing), build a model, justify tool choice, and communicate findings.

---

## 7) Misconceptions & Probes

* “(b) sets the axis” → Probe with (x_v=-\tfrac{b}{2a}) counterexamples.
* Dropping the (\pm) in square roots → Quick check with ((x+3)^2=4).
* Treating a double root as two different solutions → Contrast ((x-2)^2=0) vs ((x-2)(x-5)=0).
* Ignoring units/domains → Modeling exit tickets require units and feasibility.

---

## 8) Assessment & Feedback

* **Formative:** Do‑Nows, 3–4 hinge items per lesson (MC with strong distractors), mini‑whiteboard shares.
* **Summative:** Mixed‑method quiz + performance task with analytic rubric (Concepts, Methods, Reasoning, Communication; 4 levels).
* **Feedback loops:** Instant correctness + targeted “fix‑it” micro‑lessons; reflective prompts (Why this tool? Where did I err?).

---

## 9) Practice & Retrieval Plan

* **Interleaving:** Mix new quadratic tools with prior linear/absolute value skills.
* **Spaced:** Mini‑quizzes on Day 1/3/7; cumulative warm‑ups.
* **Error logs:** Students track recurring slips and corrections.

---

## 10) Accessibility & Inclusion (UDL)

* WCAG‑AA color contrast; dyslexia‑friendly toggle; keyboard navigation; alt text for visuals.
* Bilingual glossary cards (en/zh); sentence frames for reasoning; audio captions for any animations.
* Low‑floor/high‑ceiling tasks with optional challenges.

---

## 11) Content & Example Bank (Curated)

* **Transformations:** (y=(x-4)^2+3), (y=-\tfrac12(x+3)^2+8).
* **Factoring:** (9x^2-25=(3x-5)(3x+5)), (6x^2+11x-10=(3x-2)(2x+5)).
* **Formula:** (2x^2-3x-5=0\Rightarrow x=\tfrac{3\pm7}{4}).
* **Discriminant trio:** (x^2-6x+5) ((D>0)), (x^2-6x+9) ((D=0)), (x^2-6x+10) ((D<0)).
* **Inequalities:** (x^2-5x+6\le0); (-2x^2+8x-6>0).
* **Modeling:** Projectile (h(t)=-4.9t^2+19.6t+1.5); Revenue (R(p)=500p-10p^2); Fencing (A(x)=-\tfrac12x^2+\tfrac{P}{2}x).
* **Data fit:** Vertex ((1,3)) through ((3,11)) → (y=2(x-1)^2+3).

---

## 12) Interaction Design (Instructional)

* **Decision Tree Widget:** Students answer quick structural questions to route to a solving method; shows “Why this tool?” micro‑explanations.
* **Graph–Algebra Sync:** Selecting a feature highlights its algebraic counterpart and the matching point/line on the graph.
* **Step Revealer:** Each algebra step appears on click; wrong paths can be explored and corrected with notes.
* **Interval Tester:** For inequalities, clicking an interval auto‑tests a representative value and shades the solution.

---

## 13) Graphs & Equations: Technical Choices

* **Graphs:** **D3.js (v7+)** for scales, axes, interaction, and animations.

  * Formats: SVG for typical lesson graphs (≤ a few hundred marks); Canvas fallback for dense plots.
  * Interactions: Drag vertex/roots, sliders for (a,b,c), hover tooltips, keyboard nudge.
* **Equations:** Default **KaTeX** via `react-katex` (fast render, great typography).

  * Alternative: `better-react-mathjax` if dynamic inline editing with MathJax is preferred (slower, but flexible).
  * Style: Legible size hierarchy; math in context with minimal cognitive load.

---

## 14) Internationalization (en ↔ zh) with Tooltip

**Principles**

* Translate all instructional copy (headings, paragraphs, prompts, examples, error notes).
* Functional UI (“Next”, “Back”, icon alt text) **may** remain in English unless a full locale toggle is enabled.
* Clicking any instructional text shows a zh tooltip; long‑press on touch.

**Content tagging**

* Each text node has a stable `data-l10n-key`.
* A global translations object stores **English** and **Chinese** values.

**Example translation object (conceptual)**

```json
{
  "en": {
    "l1.title": "Transformations & Features",
    "l1.prompt1": "What changes when k increases?",
    "rev.model": "Revenue model: R(p) = Ap - Bp^2"
  },
  "zh": {
    "l1.title": "变换与特征",
    "l1.prompt1": "当 k 增大时会发生什么变化？",
    "rev.model": "收益模型：R(p) = Ap - Bp^2"
  }
}
```

**Tooltip behavior (spec)**

* On click/keypress, find `data-l10n-key` → read zh string → show positioned tooltip with arrow; ESC or blur to dismiss.
* Accessibility: Tooltip content is aria‑live polite; focus trapped only when open via keyboard.

**Editorial style**

* Keep translations concept‑accurate, math‑faithful, and grade‑appropriate.
* Maintain term consistency: “vertex 顶点”, “axis of symmetry 对称轴”, “discriminant 判别式”.

---

## 15) Rubrics & Exemplars (Assessment Alignment)

**Analytic rubric (4 levels)**

* **Concepts:** Identifies features, forms, and graph–algebra links accurately.
* **Methods:** Chooses and executes appropriate solving tools with justification.
* **Reasoning:** Interprets models with units, domain, and feasibility.
* **Communication:** Clear math writing, labeled graphs, correct notation.

**Exemplar snapshots**

* **Strong:** Uses decision tree, shows work, checks with Vieta, states units/domain, brief reflection.
* **Typical:** Correct answer, some steps missing, minimal interpretation; feedback points noted.

---

## 16) Hinge Questions (Samples)

1. Which equation has exactly one real root?
   A) (x^2-4x+5) B) (x^2-4x+4) C) (x^2-4x+1) D) (x^2-4x-5)
   **Target:** Recognize (D=0) → B.
2. Best first step for (9(x-2)^2=45)?
   A) Expand B) Factor by grouping C) Take square roots D) Use formula → **C**.
3. If roots are 1 and 7, the axis is: **x=4** (average of roots).

---

## 17) Differentiation & Supports

* **Scaffolds:** Worked examples with faded steps; sentence frames for justifications.
* **Extensions:** Derive vertex value formula; explore focus–directrix (optional).
* **Language:** Frayer models, bilingual glossary, symbol–word–picture cards.

---

## 18) Style Guide (Voice & Visuals)

* **Voice:** Clear, concise, invitational. Avoid jargon unless introduced.
* **Typography:** Large headings, math‑friendly body, 1.6 line height.
* **Color:** Calm neutrals + single accent; success/warn/error consistency.
* **Microcopy:** Prompts start with actions (“Drag the vertex…”, “Test an interval…”).
* **Icons:** Minimal; tooltips on hover/focus; alt text concise.

---

## 19) Content Inventory (Translatable)

* Lesson titles, intros, prompts, explanations.
* Step revealers, error messages, feedback notes.
* Hinge items, exit tickets, rubrics, exemplars.
* Modeling contexts and instructions.
* (Buttons like Next/Back can remain English unless full locale switch is desired.)

---

## 20) Data & Structure (Conceptual)

```ts
// Pseudo‑types for content authoring
Lesson {
  id: string; titleKey: string; introKey: string; goals: string[]; steps: Step[];
}
Step {
  id: string; titleKey: string; bodyKey: string; graph?: GraphSpec; checks?: HingeItem[];
}
GraphSpec {
  type: 'parabola'|'projectile'|'revenue'|'inequality'; params: Record<string, number|string>;
}
HingeItem { stemKey: string; options: string[]; answerIndex: number; rationaleKeys: string[]; }
```

---

## 21) Performance Task (Student‑Facing)

**Prompt:** Choose a context (projectile / revenue / fencing). Build a quadratic model, identify the vertex and roots, justify your solving strategy, report an optimal value (time/price/width) with units and domain, and write a 3–4 sentence interpretation.
**Deliverables:** Labeled graph (D3), written explanation (KaTeX for math), reflection on tool choice.

---

## 22) Teacher Materials

* Slide skeletons for each lesson (high contrast).
* Printable packets with QR to interactive graphs.
* Answer keys, rubrics, and exemplar annotations.
* Misconception probes and re‑teach mini‑lessons (5–7 min).

---

## 23) Roadmap (Optional Enhancements)

* Full locale switch (UI + content) with time/date/number formatting.
* Focus–directrix view and satellite dish designer.
* Student portfolio export (PDF of graphs + math + reflections).

---

## 24) Quick Reference (Equations & Identities)

* Vertex: (x_v=-\frac{b}{2a}), (y_v=\frac{4ac-b^2}{4a}).
* Discriminant: (D=b^2-4ac).
* Vieta: (r_1+r_2=-\tfrac{b}{a}), (r_1r_2=\tfrac{c}{a}).
* Difference of squares: (a^2-b^2=(a-b)(a+b)).
* Perfect square: (a^2\pm2ab+b^2=(a\pm b)^2).

---

**End of Document**
