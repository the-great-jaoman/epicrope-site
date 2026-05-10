export interface Tutorial {
  title: string;
  slug: string;
  image: string;
  author?: string;
  authorBio?: string;
  authorUrl?: string;
  youtubeEmbedUrl: string;
}

export interface TutorialSubcategory {
  name: string;
  slug: string;
  tutorials: Tutorial[];
}

export interface TutorialCategory {
  name: string;
  slug: string;
  subcategories: TutorialSubcategory[];
}

export const tutorialCategories: TutorialCategory[] = [
  {
    name: "Basics",
    slug: "basics",
    subcategories: [
      {
        name: "Bondage Safety",
        slug: "bondage_safety",
        tutorials: [
          {
            title: "Bondage Safety 1 of 2",
            slug: "bondagesafetyI",
            image: "/tutorials/basics/bondage_safety/img/bondagesafetyI.png",
            author: "Esinem",
            authorBio: "Esinem should need no introduction. Rope teacher, rope performer, rope photographer, organizer, and all around high school quarterback of Britain's rope scene, Esinem is one of the pillars of the European rope community.",
            authorUrl: "http://esinem.com",
            youtubeEmbedUrl: "//www.youtube.com/embed/lr4EtgSS3qM",
          },
          {
            title: "Bondage Safety 2 of 2",
            slug: "bondagesafetyII",
            image: "/tutorials/basics/bondage_safety/img/bondagesafetyII.png",
            author: "Esinem",
            authorBio: "Esinem should need no introduction. Rope teacher, rope performer, rope photographer, organizer, and all around high school quarterback of Britain's rope scene, Esinem is one of the pillars of the European rope community.",
            authorUrl: "http://esinem.com",
            youtubeEmbedUrl: "",
          },
        ],
      },
      {
        name: "How To Get Tied Up",
        slug: "how_to_get_tied_up",
        tutorials: [
          {
            title: "How To Get Tied Up I: Finding a Rope Partner",
            slug: "how_to_get_tied_up_i",
            image: "/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_i.png",
            youtubeEmbedUrl: "",
          },
          {
            title: "How to Get Tied Up III: Preparing to Be Tied",
            slug: "how_to_get_tied_up_iii",
            image: "/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_iii.png",
            youtubeEmbedUrl: "",
          },
          {
            title: "How to Get Tied Up II: Evaluating a Rope Partner",
            slug: "how_to_get_tied_up_iv",
            image: "/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_iv.png",
            youtubeEmbedUrl: "",
          },
        ],
      },
      {
        name: "Misc",
        slug: "misc",
        tutorials: [
          {
            title: "Coiling Rope",
            slug: "coiling-rope",
            image: "/tutorials/basics/misc/img/coiling-rope.png",
            youtubeEmbedUrl: "",
          },
        ],
      },
    ],
  },
  {
    name: "Beginner Ties",
    slug: "beginner_ties",
    subcategories: [
      {
        name: "Column Ties",
        slug: "column_ties",
        tutorials: [
          { title: "Burlington Bowline", slug: "burlington_bowline", image: "/tutorials/beginner_ties/column_ties/img/burlington_bowline.png", youtubeEmbedUrl: "" },
          { title: "Fast Bowline", slug: "fast_bowline", image: "/tutorials/beginner_ties/column_ties/img/fast_bowline.png", youtubeEmbedUrl: "" },
          { title: "French Bowline", slug: "french_bowline", image: "/tutorials/beginner_ties/column_ties/img/french_bowline.png", youtubeEmbedUrl: "" },
          { title: "Somerville Bowline", slug: "somerville_bowline", image: "/tutorials/beginner_ties/column_ties/img/somerville_bowline.png", youtubeEmbedUrl: "" },
        ],
      },
      {
        name: "Patterns For Beginners",
        slug: "patterns_for_beginners",
        tutorials: [
          { title: "75% of All Shibari Bondage a.k.a. The Ladder Tie", slug: "75_percent", image: "/tutorials/beginner_ties/patterns_for_beginners/img/75_percent.png", youtubeEmbedUrl: "" },
          { title: "Basket Weave Pattern", slug: "basket_weave_pattern", image: "/tutorials/beginner_ties/patterns_for_beginners/img/basket_weave_pattern.png", youtubeEmbedUrl: "" },
          { title: "Diamond Pattern", slug: "broad_hishi_pattern", image: "/tutorials/beginner_ties/patterns_for_beginners/img/broad_hishi_pattern.png", youtubeEmbedUrl: "" },
          { title: "Karada Pattern", slug: "karada_pattern", image: "/tutorials/beginner_ties/patterns_for_beginners/img/karada_pattern.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
  {
    name: "Upper Body Ties",
    slug: "upper_body_ties",
    subcategories: [
      {
        name: "Box Ties",
        slug: "box_ties",
        tutorials: [
          { title: "Basic Box Tie", slug: "basic_box_tie", image: "/tutorials/upper_body_ties/box_ties/img/basic_box_tie.png", youtubeEmbedUrl: "" },
          { title: "Basic Broad Hishi Box Tie", slug: "basic_broad_hishi_box_tie", image: "/tutorials/upper_body_ties/box_ties/img/basic_broad_hishi_box_tie.png", youtubeEmbedUrl: "" },
          { title: "Basic Karada Box Tie", slug: "basic_karada_box_tie", image: "/tutorials/upper_body_ties/box_ties/img/basic_karada_box_tie.png", youtubeEmbedUrl: "" },
          { title: "Basic Osada Ryu 2 Rope Takate Kote", slug: "basic_takate_kote", image: "/tutorials/upper_body_ties/box_ties/img/basic_takate_kote.png", youtubeEmbedUrl: "" },
          { title: "Mishibari Karada Box Tie (German)", slug: "mishibari-karada-boxtie", image: "/tutorials/upper_body_ties/box_ties/img/mishibari-karada-boxtie.png", youtubeEmbedUrl: "" },
          { title: "Mishibari Lee Harrington Style Box Tie (German)", slug: "mishibari-lee-harrington-style-boxtie", image: "/tutorials/upper_body_ties/box_ties/img/mishibari-lee-harrington-style-boxtie.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Lochai Style Box Tie (German)", slug: "mishibari-lochai-style-boxtie", image: "/tutorials/upper_body_ties/box_ties/img/mishibari-lochai-style-boxtie.png", youtubeEmbedUrl: "" },
          { title: "No Cinches TK", slug: "no_cinch_tk", image: "/tutorials/upper_body_ties/box_ties/img/no_cinch_tk.png", youtubeEmbedUrl: "" },
        ],
      },
      {
        name: "Chest Harness",
        slug: "chest_harness",
        tutorials: [
          { title: "Basic Chest Harness", slug: "chest_harness", image: "/tutorials/upper_body_ties/chest_harness/img/chest_harness.png", youtubeEmbedUrl: "" },
          { title: "Karada Chest Harness", slug: "karada_chest_harness", image: "/tutorials/upper_body_ties/chest_harness/img/karada_chest_harness.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Chest Harness (German)", slug: "mishibari-chest-harness", image: "/tutorials/upper_body_ties/chest_harness/img/mishibari-chest-harness.png", youtubeEmbedUrl: "" },
          { title: "Spinal Harness", slug: "spinal_harness", image: "/tutorials/upper_body_ties/chest_harness/img/spinal_harness.png", youtubeEmbedUrl: "" },
        ],
      },
      {
        name: "Misc",
        slug: "misc",
        tutorials: [
          { title: "Back Web Tie", slug: "back_web", image: "/tutorials/upper_body_ties/misc/img/back_web.png", youtubeEmbedUrl: "" },
          { title: "Basic Pillow Tie", slug: "basic_pillow_tie", image: "/tutorials/upper_body_ties/misc/img/basic_pillow_tie.png", youtubeEmbedUrl: "" },
          { title: "Basic Rope Corset", slug: "basic_rope_corset", image: "/tutorials/upper_body_ties/misc/img/basic_rope_corset.png", youtubeEmbedUrl: "" },
          { title: "Tengu Shibari", slug: "osada_tengu", image: "/tutorials/upper_body_ties/misc/img/osada_tengu.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
  {
    name: "Hip Harnesses",
    slug: "hip_harnesses",
    subcategories: [
      {
        name: "Different Hip Harnesses",
        slug: "different_hip_harnesses",
        tutorials: [
          { title: "Basic Gunslinger", slug: "basic_gunslinger", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/basic_gunslinger.png", youtubeEmbedUrl: "" },
          { title: "Basket Seat Hip Harness", slug: "basket_seat_hip_harness", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/basket_seat_hip_harness.png", youtubeEmbedUrl: "" },
          { title: "Hip Holster", slug: "hip_holster", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/hip_holster.png", youtubeEmbedUrl: "" },
          { title: "Leto Hip Harness", slug: "leto_harness", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/leto_harness.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Drum Harness (German)", slug: "mishibari-drum-harness", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/mishibari-drum-harness.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Gunslinger (German)", slug: "mishibari-gunslinger", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/mishibari-gunslinger.png", youtubeEmbedUrl: "" },
          { title: "Mishibari Modified Gunslinger for Side Suspension (German)", slug: "mishibari-side-suspension-harness", image: "/tutorials/hip_harnesses/different_hip_harnesses/img/mishibari-side-suspension-harness.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
  {
    name: "Body Harnesses",
    slug: "body_harnesses",
    subcategories: [
      {
        name: "Various Diamond Patterns",
        slug: "various_daimond_patterns",
        tutorials: [
          { title: "Diamond Body Harness", slug: "hishi_daimond_body_harness", image: "/tutorials/body_harnesses/various_daimond_patterns/img/hishi_daimond_body_harness.png", youtubeEmbedUrl: "" },
          { title: "Karada", slug: "karada_body_harness", image: "/tutorials/body_harnesses/various_daimond_patterns/img/karada_body_harness.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Box Tie Diamond Harness (German)", slug: "mishibari-boxtie-diamond-harness", image: "/tutorials/body_harnesses/various_daimond_patterns/img/mishibari-boxtie-diamond-harness.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Generic Hip Harness Karada (German)", slug: "mishibari-hip-harness-karada", image: "/tutorials/body_harnesses/various_daimond_patterns/img/mishibari-hip-harness-karada.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Japanese Pearl Tie (German)", slug: "mishibari-japanese-pearl-tie", image: "/tutorials/body_harnesses/various_daimond_patterns/img/mishibari-japanese-pearl-tie.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Karada (German)", slug: "mishibari-karada", image: "/tutorials/body_harnesses/various_daimond_patterns/img/mishibari-karada.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
  {
    name: "Lower Body Ties",
    slug: "lower_body_ties",
    subcategories: [
      {
        name: "Misc",
        slug: "misc",
        tutorials: [
          { title: "Diamond Pattern Leg Tie", slug: "basic_broad_hishi_leg_tie", image: "/tutorials/lower_body_ties/misc/img/basic_broad_hishi_leg_tie.png", youtubeEmbedUrl: "" },
          { title: "Gravity Boot", slug: "gravity_boot", image: "/tutorials/lower_body_ties/misc/img/gravity_boot.png", youtubeEmbedUrl: "" },
          { title: "Karada Leg Tie", slug: "karada_leg_tie", image: "/tutorials/lower_body_ties/misc/img/karada_leg_tie.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
  {
    name: "Full Body Ties",
    slug: "full_body_ties",
    subcategories: [
      {
        name: "Misc",
        slug: "misc",
        tutorials: [
          { title: "MiShibari Ebi Tie (German)", slug: "mishibari-ebi", image: "/tutorials/full_body_ties/misc/img/mishibari-ebi.png", youtubeEmbedUrl: "" },
          { title: "MiShibari Hogtie (German)", slug: "mishibari-hogtie", image: "/tutorials/full_body_ties/misc/img/mishibari-hogtie.png", youtubeEmbedUrl: "" },
        ],
      },
    ],
  },
];
