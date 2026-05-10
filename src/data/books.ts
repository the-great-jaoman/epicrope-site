export interface BookItem {
  name: string;
  slug: string;
  price: number;
  weight: number;
  description: string;
  listImage: string;
  detailImages: string[];
}

export const books: BookItem[] = [
  {
    name: "Rogue Hojojutsu",
    slug: "rogue_hojo",
    price: 60,
    weight: 0,
    description: `For hundreds of years, Japanese officers restrained criminals not with handcuffs, but with lengths of rope.
<br><br>
Hojojutsu remains a jealously guarded secret, known by only a select few... Until now.
<br><br>
Using simple, clear instructions and over 400 colorful images, author Douglas Kent details how to construct Hojojutsu ties.`,
    listImage: "/books/img/rogue_hojo_i.png",
    detailImages: ["01.png"],
  },
  {
    name: "Complete Shibari: Sky",
    slug: "cs_sky",
    price: 50,
    weight: 0.3,
    description: `Complete Shibari Volume 2: Sky builds on the material from Volume 1: Land and explores the spectacular techniques of erotic rope suspensions. With short, clear explanations and over 340 lavish, step-by-step illustrations and photographs, Douglas Kent takes the intimidating world of shibari suspensions and makes it practical and straightforward.
<br><br>
As with the previous volume, this is not a "knot book," but a straight-forward, hands-on guide for people interested in actually doing suspensions. This practical guide covers everything from scene safety, through establishing anchor points and selecting suspension hardware, to the physics and skills needed to suspend a human body safely and beautifully.`,
    listImage: "/books/img/cs_sky.png",
    detailImages: ["01.png", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg", "06.jpeg"],
  },
  {
    name: "Complete Shibari: Land",
    slug: "cs_land",
    price: 50,
    weight: 0.3,
    description: `Complete Shibari Volume 1: Land
<br><br>
This book explores the essential ground-based ties and forms of shibari. With short, clear explanations and over 440 lavish, step-by-step illustrations and photographs, you learn from the basic "building blocks," applying those basics to create beautiful and exciting ground-based shibari ties.`,
    listImage: "/books/img/cs_land.png",
    detailImages: ["01.png", "02.jpg", "03.jpeg", "04.jpeg", "05.jpeg", "06.jpeg", "06.jpg"],
  },
  {
    name: "The Little Guide to Getting Tied Up",
    slug: "getting_tied_up",
    price: 20,
    weight: 0,
    description: `The first and only book on getting tied up, from bedroom play to advanced suspensions. You'll learn all about finding the right rope partner, types of rope scenes, avoiding injuries, pain processing, and the 7 Helpful Skills of Rope Bottoming, including Mindfulness, Being Prepared, and Communicating With Your Rope Top.`,
    listImage: "/books/img/getting_tied_up.jpg",
    detailImages: ["01.jpg"],
  },
];
