// Testimonials — edit here. Feeds the Reviews page and Review/AggregateRating schema.
// Only use real reviews. Keep `ratingValue` honest; update `reviewCount`/`ratingValue`
// as you collect Google reviews.
export type Review = {
  author: string;
  location: string;
  rating: number; // 1–5
  text: string;
};

export const aggregateRating = {
  ratingValue: 5.0, // TODO: update to your true average once you have Google reviews
  reviewCount: 2, // TODO: update as reviews grow
};

export const reviews: Review[] = [
  {
    author: "Howard Grant",
    location: "Burke, Virginia",
    rating: 5,
    text: "Over 30 years of clutter gone in one day!",
  },
  {
    author: "Barbara Young",
    location: "Gaithersburg, Maryland",
    rating: 5,
    text: "Hired TGS for a garage refresh. Received a next-day appointment and by the end of the week, I had a brand-new garage!",
  },
];
