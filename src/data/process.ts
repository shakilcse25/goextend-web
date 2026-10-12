/**
 * How GoExtend works with a client, start to finish.
 *
 * Written as what actually happens rather than as consultancy theatre:
 * a prospect reading this should be able to tell what their first two
 * weeks look like and what they are expected to provide. Vague process
 * copy ("Discovery → Synergy → Delivery") tells them nothing and reads
 * the same as every other agency they are evaluating.
 */
export type ProcessStep = {
  /** Display number — "01", "02"… kept as a string so the UI never has
   *  to pad it, and so a step can be inserted without renumbering code. */
  step: string;
  title: string;
  /** What happens, in plain language. */
  description: string;
  /** What the client has at the end of this step. */
  deliverable: string;
  /** Honest range. Clients plan around these, so they are deliberately
   *  conservative rather than flattering. */
  duration: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Understand the work",
    description:
      "We sit with the actual workflow before writing anything — what gets counted, who touches it, where the current system fails at 9pm on a busy evening. For GoExtend Pharma that meant standing behind the counter in real shops.",
    deliverable: "A written scope with the parts we recommend cutting",
    duration: "3–7 days",
  },
  {
    step: "02",
    title: "Shape and quote",
    description:
      "A concrete plan: screens, data model, integrations, and a fixed phase-one price. We say plainly which requests belong in phase two, because a first release that tries to do everything ships late and teaches you nothing.",
    deliverable: "Fixed-price proposal and timeline",
    duration: "2–5 days",
  },
  {
    step: "03",
    title: "Build in the open",
    description:
      "You get a working build you can open on your own phone from the first week, updated as we go. Feedback on something real beats sign-off on a mockup — nobody spots a broken flow in a static design.",
    deliverable: "Installable builds, updated continuously",
    duration: "4–12 weeks, scope-dependent",
  },
  {
    step: "04",
    title: "Ship it properly",
    description:
      "Store submission, payment gateway onboarding, legal pages, domains, monitoring. The unglamorous checklist between 'it works on my machine' and 'customers are paying through it'.",
    deliverable: "Live on the store and your own domain",
    duration: "1–3 weeks",
  },
  {
    step: "05",
    title: "Stay on it",
    description:
      "Software that touches money needs someone watching it. We handle updates, OS and store policy changes, and the occasional 2am problem — on a support arrangement agreed up front, not improvised after launch.",
    deliverable: "Agreed support window and response times",
    duration: "Ongoing",
  },
];
