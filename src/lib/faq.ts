// FAQ content — edit here. Used on the FAQ page AND for FAQPage JSON-LD schema
// (which can earn rich results in Google and is frequently cited by AI assistants).
export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "How much does a garage cleanout cost?",
    answer:
      "Pricing is based on the amount of stuff and the size of your space, so you only pay for the job you have — there are no flat fees. Our rates are low and we'll beat any written quote. We're always happy to provide a free, no-obligation quote, and we never begin work without your approval.",
  },
  {
    question: "How long does a typical garage cleanout take?",
    answer:
      "Most single-car garages take 3–5 hours and two-car garages take 4–8 hours. We complete most projects in a single day.",
  },
  {
    question: "Where do we begin?",
    answer:
      "We start with a free consultation to determine your design and improvement needs. We assess the space and discuss options for improvement.",
  },
  {
    question: "Do I need to be present?",
    answer:
      "We prefer you're there for the initial walkthrough, but you don't need to stay during the work.",
  },
  {
    question: "What happens to my stuff?",
    answer:
      "Usable items go to donation centers such as Goodwill and Habitat for Humanity ReStore. Everything else is disposed of responsibly and legally.",
  },
  {
    question: "Do you work weekends?",
    answer:
      "Yes! We offer flexible scheduling including evenings and weekends.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve all of Washington D.C., Maryland, and Virginia — the greater DMV area.",
  },
  {
    question: "Are you insured?",
    answer: "Yes — we are fully insured for your protection.",
  },
];
