import { RECIPE_IMAGES } from "@/lib/images"

export type Recipe = {
  slug: string
  name: string
  category: string
  description: string
  time: string
  servings: string
  image: string
  ingredients: string[]
  steps: string[]
}

export const recipes: Recipe[] = [
  {
    slug: "gnocchi-burro-e-salvia",
    name: "Gnocchi di patate al burro e salvia",
    category: "Piatti classici",
    description:
      "Gnocchi di patate morbidi e delicati, conditi con burro fuso, salvia fresca e una generosa spolverata di parmigiano.",
    time: "20 min",
    servings: "4 persone",
    image: RECIPE_IMAGES["gnocchi-burro-e-salvia"],
    ingredients: [
      "500 g di gnocchi di patate freschi",
      "80 g di burro",
      "8 foglie di salvia fresca",
      "60 g di parmigiano grattugiato",
      "Sale e pepe nero macinato fresco",
    ],
    steps: [
      "Porta a bollore abbondante acqua salata e versa gli gnocchi.",
      "Sciogli il burro in una padella larga a fiamma dolce insieme alla salvia fino a farlo dorare leggermente.",
      "Scola gli gnocchi appena vengono a galla e trasferiscili direttamente nella padella con il burro.",
      "Salta velocemente per amalgamare, aggiusta di sale e pepe.",
      "Servi caldo con una generosa spolverata di parmigiano.",
    ],
  },
  {
    slug: "tortellini-in-brodo",
    name: "Tortellini in brodo",
    category: "Tradizione emiliana",
    description:
      "Il piatto della domenica per eccellenza: tortellini ripieni cotti lentamente in un brodo di carne limpido e profumato.",
    time: "35 min",
    servings: "4 persone",
    image: RECIPE_IMAGES["tortellini-in-brodo"],
    ingredients: [
      "400 g di tortellini freschi",
      "1,5 l di brodo di carne fatto in casa",
      "Parmigiano grattugiato",
      "Prezzemolo fresco tritato",
      "Sale q.b.",
    ],
    steps: [
      "Porta il brodo a bollore in una pentola capiente.",
      "Versa i tortellini e cuoci a fuoco medio per il tempo indicato sulla confezione.",
      "Assaggia e aggiusta di sale se necessario.",
      "Impiatta versando abbondante brodo caldo su ogni porzione.",
      "Completa con parmigiano grattugiato e una spolverata di prezzemolo fresco.",
    ],
  },
  {
    slug: "lasagne-alla-bolognese",
    name: "Lasagne alla bolognese",
    category: "Piatti al forno",
    description:
      "Strati sottili di pasta fresca all'uovo, ragù di carne cotto a lungo e besciamella cremosa, gratinati al forno fino a doratura.",
    time: "1 h 15 min",
    servings: "6 persone",
    image: RECIPE_IMAGES["lasagne-alla-bolognese"],
    ingredients: [
      "12 sfoglie di lasagne fresche",
      "800 g di ragù di carne",
      "500 ml di besciamella",
      "150 g di parmigiano grattugiato",
      "Burro q.b. per la teglia",
    ],
    steps: [
      "Scalda il forno a 190°C.",
      "Sbollenta brevemente le sfoglie di lasagna se necessario e scolale bene.",
      "Componi gli strati alternando pasta, ragù, besciamella e parmigiano.",
      "Termina con uno strato abbondante di besciamella e parmigiano.",
      "Cuoci in forno per circa 35-40 minuti, finché la superficie non sarà dorata e gratinata.",
      "Lascia riposare 10 minuti prima di servire.",
    ],
  },
  {
    slug: "ravioli-ricotta-e-spinaci",
    name: "Ravioli ricotta e spinaci",
    category: "Piatti ripieni",
    description:
      "Ravioli dal cuore morbido di ricotta e spinaci, conditi con burro fuso, salvia croccante e scaglie di parmigiano.",
    time: "15 min",
    servings: "4 persone",
    image: RECIPE_IMAGES["ravioli-ricotta-e-spinaci"],
    ingredients: [
      "500 g di ravioli ricotta e spinaci freschi",
      "70 g di burro",
      "6 foglie di salvia fresca",
      "Scaglie di parmigiano q.b.",
      "Pepe nero macinato fresco",
    ],
    steps: [
      "Cuoci i ravioli in abbondante acqua salata seguendo i tempi indicati.",
      "Nel frattempo sciogli il burro con la salvia in una padella ampia.",
      "Scola delicatamente i ravioli e trasferiscili nella padella.",
      "Fai insaporire con movimenti delicati per non romperli.",
      "Servi con scaglie di parmigiano e una macinata di pepe fresco.",
    ],
  },
  {
    slug: "tagliatelle-al-ragu",
    name: "Tagliatelle al ragù",
    category: "Tradizione emiliana",
    description:
      "Tagliatelle all'uovo ruvide e porose, perfette per trattenere un ragù di carne cotto lentamente per ore.",
    time: "25 min",
    servings: "4 persone",
    image: RECIPE_IMAGES["tagliatelle-al-ragu"],
    ingredients: [
      "400 g di tagliatelle fresche all'uovo",
      "500 g di ragù di carne",
      "Parmigiano grattugiato",
      "Olio extravergine d'oliva",
      "Sale q.b.",
    ],
    steps: [
      "Porta a bollore abbondante acqua salata.",
      "Scalda il ragù in una padella larga a fuoco dolce.",
      "Cuoci le tagliatelle per pochi minuti, scolandole molto al dente.",
      "Trasferiscile nella padella con il ragù e amalgama con un filo d'olio.",
      "Servi immediatamente con abbondante parmigiano.",
    ],
  },
  {
    slug: "cappelletti-burro-e-parmigiano",
    name: "Cappelletti burro e parmigiano",
    category: "Piatti ripieni",
    description:
      "Piccoli cappelletti ripieni di carne e parmigiano, conditi in modo semplice per esaltarne il ripieno saporito.",
    time: "15 min",
    servings: "4 persone",
    image: RECIPE_IMAGES["cappelletti-burro-e-parmigiano"],
    ingredients: [
      "450 g di cappelletti freschi",
      "60 g di burro",
      "50 g di parmigiano grattugiato",
      "Salvia fresca a piacere",
      "Pepe nero macinato fresco",
    ],
    steps: [
      "Cuoci i cappelletti in acqua bollente salata seguendo i tempi di cottura.",
      "Sciogli il burro con la salvia in una padella ampia.",
      "Scola i cappelletti e uniscili al burro fuso.",
      "Mescola con delicatezza per non romperli.",
      "Servi con parmigiano grattugiato e pepe fresco.",
    ],
  },
]

export function getRecipeBySlug(slug: string) {
  return recipes.find((r) => r.slug === slug)
}
