/**
 * School content for parents and local visitors.
 * Programmes and contact facts are carried over from the existing website.
 */

/** Photo library. `src` is the 960px version; `srcSmall` is 560px. */
function photo(name, alt, { identifiable = false } = {}) {
  return {
    src: `/images/school/${name}-960.webp`,
    srcSmall: `/images/school/${name}-560.webp`,
    width: 960,
    height: 1280,
    alt,
    // REVIEW: identifiable children — confirm parental publication permission.
    identifiable,
  };
}

export const PHOTOS = {
  smartClassroom: photo("smart-classroom", "A Play Place classroom with a teacher at the smart board and children seated at desks"),
  classroomMural: photo("classroom-mural", "Children at their desks in a brightly painted Play Place classroom"),
  classroomTables: photo("classroom-tables", "Children sharing a meal at classroom tables beneath a colourful school mural"),
  lunchTime: photo("lunch-time", "Children eating together in a Play Place classroom"),
  corridorPlayArea: photo("corridor-play-area", "A Play Place corridor with soft play mats and ride-on toys"),
  playCorridor: photo("play-corridor", "A long, bright play corridor with green flooring and ride-on toys"),
  activityCorner: photo("activity-corner", "Children working on activities at small tables in a colourful learning room"),
  curiosityRoom: photo("curiosity-room", "A learning room with child-sized tables and educational wall displays"),
  holiHandprints: photo("holi-handprints", "Children adding colourful handprints to a Holi celebration display"),
  ramadanCelebration: photo("ramadan-celebration", "Children and teachers with a hand-made Ramadan Mubarak display"),
  friendsCorridor: photo("friends-corridor", "Two Play Place students smiling in the school corridor", { identifiable: true }),
  readingActivity: photo("reading-activity", "A young student exploring a picture book on the classroom floor", { identifiable: true }),
  studentSmile: photo("student-smile", "A smiling Play Place student in school uniform", { identifiable: true }),
};

/**
 * Landscape banner images for page heroes (1920px + 960px WebP).
 * NOTE: these are AI-generated illustrative images (Google Flow), not photos of
 * Play Place — see docs/MANAGEMENT_REVIEW.md.
 */
/**
 * Landscape banner images for page heroes (1376px + 800px WebP).
 * NOTE: AI-generated illustrative images (Google Flow) — not photos of Play Place.
 * See docs/MANAGEMENT_REVIEW.md.
 */
function hero(name, alt, position = "75% center") {
  return {
    src: `/images/hero/${name}-1376.webp`,
    srcSmall: `/images/hero/${name}-800.webp`,
    srcSet: `/images/hero/${name}-800.webp 800w, /images/hero/${name}-1376.webp 1376w`,
    width: 1376,
    height: 768,
    alt,
    position,
  };
}

export const HEROES = {
  home: hero("home", "A smiling young girl holding up a paper airplane against a bright blue sky", "68% center"),
  about: hero("about", "Two young children painting together in a bright, colourful preschool classroom", "82% center"),
  academics: hero("academics", "A child's hands stacking colourful wooden alphabet blocks", "72% center"),
  admissions: hero("admissions", "A mother hugging her son, who is wearing a school backpack, at a preschool entrance", "80% center"),
  franchise: hero("franchise", "A bright, newly designed preschool interior with colourful child-sized furniture", "80% center"),
  ecosystem: hero("ecosystem", "A flat-lay of preschool learning materials: books, crayons, puzzles and blocks", "85% center"),
  quality: hero("quality", "A teacher kneeling beside a young child, guiding their drawing", "62% center"),
};

export const GALLERY = [
  { ...PHOTOS.smartClassroom, title: "Our classrooms" },
  { ...PHOTOS.holiHandprints, title: "Celebrating Holi" },
  { ...PHOTOS.corridorPlayArea, title: "Indoor play area" },
  { ...PHOTOS.readingActivity, title: "Learning through exploration" },
  { ...PHOTOS.classroomMural, title: "A bright place to learn" },
  { ...PHOTOS.ramadanCelebration, title: "Ramadan celebration" },
  { ...PHOTOS.activityCorner, title: "Activity time" },
  { ...PHOTOS.friendsCorridor, title: "Friends at school" },
  { ...PHOTOS.playCorridor, title: "Play corridor" },
  { ...PHOTOS.lunchTime, title: "Eating together" },
  { ...PHOTOS.curiosityRoom, title: "Learning room" },
  { ...PHOTOS.studentSmile, title: "Happy learners" },
  { ...PHOTOS.classroomTables, title: "Classroom life" },
];

/** Photos for the scrolling strip on the homepage (no close-up portraits). */
export const MARQUEE_PHOTOS = [
  PHOTOS.holiHandprints,
  PHOTOS.smartClassroom,
  PHOTOS.corridorPlayArea,
  PHOTOS.ramadanCelebration,
  PHOTOS.activityCorner,
  PHOTOS.classroomMural,
  PHOTOS.playCorridor,
  PHOTOS.curiosityRoom,
];

/** Three pastel highlight cards (homepage). */
export const HIGHLIGHTS = [
  { title: "Learning through play", icon: "toys", color: "pink", text: "Stories, games, art and music make every lesson fun." },
  { title: "Safe & caring space", icon: "health_and_safety", color: "green", text: "Bright, secure classrooms where children feel at home." },
  { title: "Curious young minds", icon: "lightbulb", color: "lilac", text: "We encourage questions, discovery and confidence." },
];

/** Stats strip — every number describes our own model (no invented figures). */
export const STATS = [
  { value: 4, label: "Early years classes" },
  { value: 6, label: "Areas of development" },
  { value: 8, label: "Franchise support pillars" },
  { value: 7, label: "Step partner journey" },
];

export const ENVIRONMENT = [
  "Safe and nurturing classrooms",
  "Play-based learning",
  "Art, music and celebrations",
  "Caring, attentive teachers",
];

export const PROGRAMMES = [
  { name: "Playgroup", icon: "toys", color: "pink", text: "A gentle first step into school through play and friendship." },
  { name: "Nursery", icon: "palette", color: "green", text: "Early language, motor skills and confidence." },
  { name: "LKG", full: "Lower Kindergarten", icon: "abc", color: "lilac", text: "Early reading, numbers and the world around us." },
  { name: "UKG", full: "Upper Kindergarten", icon: "school", color: "yellow", text: "Phonics, reasoning and readiness for primary school." },
];

export const CLASS_OPTIONS = PROGRAMMES.map((p) => p.name);

export const LEARNING_AREAS = [
  { title: "Language", icon: "record_voice_over", color: "pink", text: "Listening, speaking, stories and rhymes." },
  { title: "Thinking skills", icon: "psychology", color: "green", text: "Puzzles, sorting, counting and problem-solving." },
  { title: "Social & emotional", icon: "diversity_3", color: "lilac", text: "Sharing, feelings and working together." },
  { title: "Physical", icon: "directions_run", color: "yellow", text: "Active play, balance and fine motor skills." },
  { title: "Creativity", icon: "palette", color: "blue", text: "Art, music, movement and role play." },
  { title: "Our world", icon: "eco", color: "green", text: "Nature, festivals and everyday life." },
];

export const VALUES = [
  { title: "Safety & care", icon: "health_and_safety", color: "pink", text: "Every child feels secure and looked after." },
  { title: "Learning through play", icon: "toys", color: "green", text: "Play is at the heart of every day." },
  { title: "Curiosity", icon: "lightbulb", color: "lilac", text: "Children ask, explore and discover." },
  { title: "Kindness", icon: "favorite", color: "yellow", text: "Respect for others and their differences." },
];

export const ADMISSION_STEPS = [
  { title: "Get in touch", icon: "call", text: "Call us or send an enquiry." },
  { title: "Visit the school", icon: "location_on", text: "Meet the team and see our classrooms." },
  { title: "Share documents", icon: "description", text: "Provide the documents we request." },
  { title: "Welcome!", icon: "celebration", text: "Your child starts their journey." },
];
