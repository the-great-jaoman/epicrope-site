export interface EquipmentItem {
  name: string;
  slug: string;
  price: number;
  weight: number;
  description: string;
  listImage: string;
  detailImages: string[];
}

export const equipment: EquipmentItem[] = [
  {
    name: "Safety Shears",
    slug: "shears",
    price: 5,
    weight: 0.05,
    description: `Your safety shears are the most important item in your kit. They are the one item that you must have so you can do everything in your power never to use. Shit happens, we know it does, and we must be prepared if it comes our way.
<br><br>
These EMT Shears are used by emergency medical professionals. They cut rope like butter. The notch at the tip is designed to peel away cloths (or, in this case, rope) away from the skin, preventing you from accidentally cutting your partner along with your rope, if the worst happens.`,
    listImage: "/equipment/img/shears.png",
    detailImages: ["01.png"],
  },
  {
    name: "Blue Lock Carabiner",
    slug: "blue_lock_carabiner",
    price: 25,
    weight: 0,
    description: `The carabiner is a favorite tool of the Japanese Shibari artist and is quickly being taken up by many of the best rope bondage suspension riggers and enthusiasts in Europe and North America. It provides a lot of flexibility in organizing suspension lines, a quick release option for emergency situations, and a simple method for creating a pulley system for suspension.`,
    listImage: "/equipment/img/blue_lock_carabiner.png",
    detailImages: ["01.png"],
  },
  {
    name: "Twister Swivel",
    slug: "swivel",
    price: 50,
    weight: 0,
    description: `What can be more fun than suspending your partner and spinning them around and around? The swivel allows you to do so without tangling your rope or having to spin your partner back in order to put them down later on. No mess, no fuss, just fun. Rated for 30KN, this swivel spins smoothly and quietly.`,
    listImage: "/equipment/img/swivel.png",
    detailImages: ["01.png"],
  },
];
