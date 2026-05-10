export interface RopeColor {
  name: string;
  slug: string;
  images: string[];
  colorDescription: string;
}

export interface RopeFiber {
  name: string;
  slug: string;
  pricePerFoot: number;
  weightPerFoot: number;
  diameter: string;
  fiberDescription: string;
  colors: RopeColor[];
}

export interface KitItem {
  length: number;
  uom: string;
  quantity: number;
  diameter: string;
}

export interface Kit {
  name: string;
  slug: string;
  items: KitItem[];
  description: string;
  totalPrice: number;
}

export const kits: Kit[] = [
  {
    name: "Taste Test Kit",
    slug: "taste_test",
    items: [{ length: 30, uom: "ft", quantity: 2, diameter: "6mm" }],
    description: "2 x 30 ft. 6mm length. 60 feet total. Though not versatile, the kit will give you enough rope to do most chest or leg harness designs.",
    totalPrice: 60,
  },
  {
    name: "Starter Floor Kit",
    slug: "starter_floor",
    items: [
      { length: 30, uom: "ft", quantity: 3, diameter: "6mm" },
      { length: 15, uom: "ft", quantity: 2, diameter: "6mm" },
    ],
    description: "3 x 30 ft. + 2 x 15 ft. 6mm. 120 feet total. The kit gives the basic tools you need to do most floor bondage patterns.",
    totalPrice: 120,
  },
  {
    name: "Rigger's Basics Kit",
    slug: "riggers_basics",
    items: [
      { length: 30, uom: "ft", quantity: 5, diameter: "6mm" },
      { length: 15, uom: "ft", quantity: 2, diameter: "6mm" },
    ],
    description: "5 x 30 ft. + 2 x 15 ft. 6mm. 180 feet total. If you just want to do bondage, this kit will give you most of the tools you need.",
    totalPrice: 180,
  },
  {
    name: "Suspension Kit",
    slug: "suspension",
    items: [
      { length: 30, uom: "ft", quantity: 8, diameter: "6mm" },
      { length: 15, uom: "ft", quantity: 4, diameter: "6mm" },
    ],
    description: "8 x 30 ft. + 4 x 15 ft. 6mm. 300 feet total. This kit should give you all the rope you need to safely suspend a variety of body types.",
    totalPrice: 300,
  },
  {
    name: "Shibari Floor Kit",
    slug: "shibari_floor",
    items: [{ length: 8, uom: "m", quantity: 7, diameter: "6mm" }],
    description: "7 x 8 m. 6mm. Recommended by many world famous Japanese instructors, this kit is for the aficionados.",
    totalPrice: 184,
  },
  {
    name: "Shibari Unlimited",
    slug: "shibari_unlimited",
    items: [{ length: 8, uom: "m", quantity: 12, diameter: "6mm" }],
    description: "12 x 8 m. 6mm. Congratulations! You are set. This kit will see you through every challenge ahead!",
    totalPrice: 315,
  },
];

function galleryImages(fiber: string, color: string): string[] {
  return [
    `1-single-${color}-${fiber}.png`,
    `2-double-${color}-${fiber}.png`,
    `3-starter-${color}-${fiber}.png`,
    `4-riggers-${color}-${fiber}.png`,
    `5-suspension-${color}-${fiber}.png`,
  ];
}

export const fibers: RopeFiber[] = [
  {
    name: "Hemp",
    slug: "hemp",
    pricePerFoot: 1.00,
    weightPerFoot: 0.0080,
    diameter: "6mm",
    fiberDescription: "Hemp bondage rope is soft, strong, and supple. Its earthy smell further enhances the sensuality of this rope, resulting in a perfect rope for the ideal rope bondage experience.",
    colors: [
      { name: "Amethyst", slug: "amethyst", images: galleryImages("hemp", "amethyst"), colorDescription: "" },
      { name: "Black", slug: "black", images: galleryImages("hemp", "black"), colorDescription: "" },
      { name: "Blue", slug: "blue", images: galleryImages("hemp", "blue"), colorDescription: "" },
      { name: "Gold", slug: "gold", images: galleryImages("hemp", "gold"), colorDescription: "" },
      { name: "Green", slug: "green", images: galleryImages("hemp", "green"), colorDescription: "" },
      { name: "Natural", slug: "natural", images: galleryImages("hemp", "natural"), colorDescription: "Natural fiber ropes are often preferred in their natural color. Powerful yet never clashing, these ropes draw the eye to the intricacies of the rope bondage, showing the rigger's confidence in their Shibari." },
      { name: "Orange", slug: "orange", images: galleryImages("hemp", "orange"), colorDescription: "" },
      { name: "Pink", slug: "pink", images: galleryImages("hemp", "pink"), colorDescription: "" },
      { name: "Purple", slug: "purple", images: galleryImages("hemp", "purple"), colorDescription: "" },
      { name: "Scarlet", slug: "scarlet", images: galleryImages("hemp", "scarlet"), colorDescription: "" },
      { name: "Turquoise", slug: "turquoise", images: galleryImages("hemp", "turquoise"), colorDescription: "" },
      { name: "Yellow", slug: "yellow", images: galleryImages("hemp", "yellow"), colorDescription: "" },
    ],
  },
  {
    name: "Jute",
    slug: "jute",
    pricePerFoot: 1.00,
    weightPerFoot: 0.0080,
    diameter: "6mm",
    fiberDescription: "Our premium Tossa jute rope is selected as the best by Shibari enthusiasts. It's unique 3-ply twist makes it among the strongest and most durable jute for its diameter, able to stand up to long periods of regular use with no sign of deterioration.",
    colors: [
      { name: "Amethyst", slug: "amethyst", images: galleryImages("jute", "amethyst"), colorDescription: "" },
      { name: "Black", slug: "black", images: galleryImages("jute", "black"), colorDescription: "" },
      { name: "Blue", slug: "blue", images: galleryImages("jute", "blue"), colorDescription: "" },
      { name: "Burgundy", slug: "burgundy", images: galleryImages("jute", "burgundy"), colorDescription: "" },
      { name: "Emerald", slug: "emerald", images: galleryImages("jute", "emerald"), colorDescription: "" },
      { name: "Lavender", slug: "lavender", images: galleryImages("jute", "lavender"), colorDescription: "" },
      { name: "Natural", slug: "natural", images: galleryImages("jute", "natural"), colorDescription: "" },
      { name: "Purple", slug: "purple", images: galleryImages("jute", "purple"), colorDescription: "" },
      { name: "Scarlet", slug: "scarlet", images: galleryImages("jute", "scarlet"), colorDescription: "" },
    ],
  },
  {
    name: "Shibari Jute",
    slug: "shibari_jute",
    pricePerFoot: 1.20,
    weightPerFoot: 0.0080,
    diameter: "6mm",
    fiberDescription: "Our Shibari Jute is the creme de la creme of Japanese jute rope. With a brilliant sheen and a smooth finish, recommended by many famous Tokyo bondage dojos, this rope flies and feels like none other.",
    colors: [
      { name: "Amethyst", slug: "amethyst", images: galleryImages("shibari_jute", "amethyst"), colorDescription: "" },
      { name: "Black", slug: "black", images: galleryImages("shibari_jute", "black"), colorDescription: "" },
      { name: "Blue", slug: "blue", images: galleryImages("shibari_jute", "blue"), colorDescription: "" },
      { name: "Burgundy", slug: "burgundy", images: galleryImages("shibari_jute", "burgundy"), colorDescription: "" },
      { name: "Emerald", slug: "emerald", images: galleryImages("shibari_jute", "emerald"), colorDescription: "" },
      { name: "Gold", slug: "gold", images: galleryImages("shibari_jute", "gold"), colorDescription: "" },
      { name: "Natural", slug: "natural", images: galleryImages("shibari_jute", "natural"), colorDescription: "" },
      { name: "Pink", slug: "pink", images: galleryImages("shibari_jute", "pink"), colorDescription: "" },
      { name: "Purple", slug: "purple", images: galleryImages("shibari_jute", "purple"), colorDescription: "" },
      { name: "Scarlet", slug: "scarlet", images: galleryImages("shibari_jute", "scarlet"), colorDescription: "" },
    ],
  },
];
