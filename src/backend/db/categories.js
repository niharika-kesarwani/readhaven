import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Academic",
    description:
      "Academic book is a long-form publication which is the result of in-depth academic research.",
    url: "",
  },
  {
    _id: uuid(),
    categoryName: "Adult",
    description:
      "Adult Book means any book or magazine appealing to or designed to appeal to sexual or erotic appetites or inclinations",
  },
  {
    _id: uuid(),
    categoryName: "Adventure",
    description:
      "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement.",
  },
  {
    _id: uuid(),
    categoryName: "Autobiography",
    description:
      "Autobiography is the biography of oneself narrated by oneself.",
  },
  {
    _id: uuid(),
    categoryName: "Biography",
    description: "A biography is simply the story of a real person's life.",
  },
  {
    _id: uuid(),
    categoryName: "Business",
    description:
      "Business books are about the management and running of a business, or in the financial aspects of a business.",
  },
  {
    _id: uuid(),
    categoryName: "Childrens",
    description:
      "Children's literature or juvenile literature includes stories, books, magazines, and poems that are created for children.",
  },
  {
    _id: uuid(),
    categoryName: "Classics",
    description:
      "A classic book can be simply defined as a book which has been recognized by critics and the public to be excellent, and a “must-read.”",
  },
  {
    _id: uuid(),
    categoryName: "Contemporary",
    description:
      "Realistic fiction creates imaginary characters and situations that depict our world and society.",
  },
  {
    _id: uuid(),
    categoryName: "Contemporary Romance",
    description:
      "Contemporary romance is the most popular of the romantic genres, and is loosely described as romance taking place in a setting after WWII",
  },
  {
    _id: uuid(),
    categoryName: "Crime",
    description:
      "Crime books are narratives that centre on criminal acts either by an amateur or a professional detective, of a crime",
  },
  {
    _id: uuid(),
    categoryName: "Cultural",
    description:
      "Cultural and social issues books are based on the conflict of morality, personal life, and societal order.",
  },
  {
    _id: uuid(),
    categoryName: "Dystopian",
    description:
      "Dystopian literature is a form of speculative fiction that offers a vision of the future.",
  },
  {
    _id: uuid(),
    categoryName: "Economics",
    description:
      "Economic books deal with the issues related to the production, consumption, and transfer of wealth in a country or the world.",
  },
  {
    _id: uuid(),
    categoryName: "Fantasy",
    description:
      "Fantasy books involve magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore.",
  },
  {
    _id: uuid(),
    categoryName: "Feminism",
    description:
      "Feminist literature supports the feminist goals of defining, establishing, and defending equal civil, political, economic, and social rights for women.",
  },
  {
    _id: uuid(),
    categoryName: "Fiction",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Finance",
    description:
      "Finance books are on how to balance one's finances or the processes of financing and financial institutions.",
  },
  {
    _id: uuid(),
    categoryName: "Health",
    description:
      "Health books are about the health and function of the human body.",
  },
  {
    _id: uuid(),
    categoryName: "History",
    description:
      "Historical fiction is a literary genre where the story takes place in the past.",
  },
  {
    _id: uuid(),
    categoryName: "Humor",
    description:
      "The comedy genre is made up of books about a series of funny or comical events or scenes that are intended to make the reader laugh.",
  },
  {
    _id: uuid(),
    categoryName: "Inspirational",
    description:
      "Inspirational Fiction is written to uplift and inspire the reader.",
  },
  {
    _id: uuid(),
    categoryName: "Leadership",
    description:
      "Leadership books are resources that teach leadership competencies, skills, and best practices.",
  },
  {
    _id: uuid(),
    categoryName: "Mental Health",
    description:
      "Mental health literacy are on mental health symptoms, interventions, and resources available, as well as positive attitudes and self-efficacy toward helping others in need.",
  },
  {
    _id: uuid(),
    categoryName: "Motivational",
    description:
      "Motivational books focus on problems that can prevent people from accomplishing their goals and dreams, and how to solve them.",
  },
  {
    _id: uuid(),
    categoryName: "Mystery",
    description:
      "Mystery is a fiction genre where the nature of an event, usually a murder or other crime, remains mysterious until the end of the story.",
  },
  {
    _id: uuid(),
    categoryName: "Mythology",
    description:
      "Mythic books are made up of stories that are rooted and inspired by myth, folklore, and fairy tales.",
  },
  {
    _id: uuid(),
    categoryName: "Neuroscience",
    description:
      "Neuroscience books are based on the scientific study of the nervous system",
  },
  {
    _id: uuid(),
    categoryName: "Non-Fiction",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
  {
    _id: uuid(),
    categoryName: "Novel",
    description:
      "A novel is a narrative work of fiction published in book form.",
  },
  {
    _id: uuid(),
    categoryName: "Paranomal",
    description:
      "Paranomal books are set in the real world, but they include experiences that defy scientific explanation.",
  },
  {
    _id: uuid(),
    categoryName: "Personal Development",
    description:
      "Personal development books contain lifelong processes that assess one's skills and qualities and consider their aim in life in order to set goals.",
  },
  {
    _id: uuid(),
    categoryName: "Philosophy",
    description:
      "Philosophy books are about the fundamental nature of knowledge, reality, and existence as an academic discipline.",
  },
  {
    _id: uuid(),
    categoryName: "Psychology",
    description:
      "Psychology books are made up of stories that place a large amount of emphasis on interior characterization, motives, circumstances, and action which come from external action.",
  },
  {
    _id: uuid(),
    categoryName: "Retellins",
    description: "Retellings are typically a new version of an old story. ",
  },
  {
    _id: uuid(),
    categoryName: "Romance",
    description:
      "Remonatic books places its primary focus on the relationship and romantic love between two people, and usually has an emotionally satisfying and optimistic ending.",
  },
  {
    _id: uuid(),
    categoryName: "Science",
    description:
      "Science books are about the systematic and organizing of knowledge in the form of testable explanations and predictions about the universe.",
  },
  {
    _id: uuid(),
    categoryName: "Self Help",
    description:
      "Self-help book is one that is written with the intention to instruct its readers on solving personal problems. ",
  },
  {
    _id: uuid(),
    categoryName: "Spirituality",
    description:
      "Spiritual book are about the belief and processes of personal transformation involved with believing in a power greater than one's self, over the universe.",
  },
  {
    _id: uuid(),
    categoryName: "Suspense",
    description:
      "Suspense books are made up of stories that stimulate pleasurable fascination and excitement, mixed with apprehension, in the reader. ",
  },
  {
    _id: uuid(),
    categoryName: "Thriller",
    description:
      "Thriller novels usually involve a protagonist who is working to fight a foreign power, criminal organization, or a ruthless villain.",
  },
  {
    _id: uuid(),
    categoryName: "Travel",
    description:
      "Travel books are about places and destinations one might want to visit during their travels.",
  },
  {
    _id: uuid(),
    categoryName: "War",
    description: "A war novel or military fiction is a novel about war.",
  },
  {
    _id: uuid(),
    categoryName: "Young Adult",
    description:
      "Young adult fiction is literature written primarily for an audience of adolescents.",
  },
];
