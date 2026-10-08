import { bank } from './helpers';

const b = bank('reasoning', 'lr');

const SYL = ['Only conclusion I follows', 'Only conclusion II follows', 'Both I and II follow', 'Neither I nor II follows'];
const ASM = ['Only assumption I is implicit', 'Only assumption II is implicit', 'Both I and II are implicit', 'Neither I nor II is implicit'];
const COA = ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither I nor II follows'];
const fixed = { keepOrder: true } as const;

b.mcq('Syllogism', 'Statements: All pens are books. Some books are tables.\nConclusions: I. Some pens are tables. II. Some tables are books.', SYL, 1,
  "'Some books are tables' converts to 'Some tables are books', so II follows. The tables may or may not overlap with the pens, so I does not necessarily follow.", fixed);

b.mcq('Syllogism', 'Statements: All cats are dogs. All dogs are birds.\nConclusions: I. All cats are birds. II. Some birds are cats.', SYL, 2,
  "All cats fall within dogs, and all dogs within birds, so all cats are birds. Converting gives 'Some birds are cats'.", fixed);

b.mcq('Syllogism', 'Statements: No apple is a mango. Some mangoes are grapes.\nConclusions: I. Some grapes are not apples. II. No grape is an apple.', SYL, 0,
  'The grapes that are mangoes cannot be apples, so some grapes are not apples. Other grapes might be apples, so II does not follow.', fixed);

b.mcq('Syllogism', 'Statements: Some doctors are teachers. All teachers are writers.\nConclusions: I. Some doctors are writers. II. All writers are teachers.', SYL, 0,
  "Doctors who are teachers are also writers, so I follows. 'All teachers are writers' does not mean all writers are teachers.", fixed);

b.mcq('Syllogism', 'Statements: All roses are flowers. No flower is a tree.\nConclusions: I. No rose is a tree. II. Some flowers are roses.', SYL, 2,
  "Roses lie inside flowers, which do not overlap with trees, so no rose is a tree. 'All roses are flowers' converts to 'Some flowers are roses'.", fixed);

b.mcq('Statement & Assumption', "Statement: An advertisement says, 'Use our toothpaste for whiter teeth.'\nAssumptions: I. People want whiter teeth. II. People notice advertisements.", ASM, 2,
  'An advertiser making this claim assumes both that whiter teeth are desirable and that the advertisement will reach people.', fixed);

b.mcq('Analogy', 'Doctor : Hospital :: Teacher : ?', ['Student', 'School', 'Book', 'Chalk'], 1,
  'A doctor works in a hospital; a teacher works in a school.');

b.mcq('Analogy', 'Ornithology : Birds :: Entomology : ?', ['Insects', 'Fossils', 'Fungi', 'Words'], 0,
  'Ornithology is the study of birds; entomology is the study of insects. Etymology is the study of word origins.');

b.mcq('Analogy', '3 : 27 :: 5 : ?', ['25', '125', '150', '225'], 1,
  '27 is 3 cubed, so the answer is 5 cubed = 125.');

b.mcq('Statement & Conclusion', 'Statement: The government has made helmets compulsory for two-wheeler riders.\nConclusions: I. Helmets reduce the risk of head injury. II. All road accidents involve two-wheelers.', COA, 0,
  'The rule only makes sense if helmets reduce injury. Nothing suggests that all accidents involve two-wheelers.', fixed);

b.mcq('Course of Action', 'Statement: Several cases of food poisoning were reported after a wedding feast in a village.\nCourses of action: I. The local health authority should send a medical team to treat the affected people. II. All weddings in the village should be banned.', COA, 0,
  'Treating the affected is a practical and proportionate response. Banning weddings is extreme and does not address the cause.', fixed);

b.mcq('Logic', "Which of the following is logically equivalent to 'If it rains, the match is cancelled'?", [
  'If the match is cancelled, it rained.',
  'If it does not rain, the match is not cancelled.',
  'If the match is not cancelled, it did not rain.',
  'It rains only if the match is not cancelled.',
], 2, "The contrapositive ('if not Q, then not P') is always equivalent. Options A and B are the converse and inverse, which are not.");

b.mcq('Decision Making', 'You are a district officer. At night you receive a credible warning of flash floods in a low-lying village. What is the most appropriate first step?', [
  'Wait for confirmation from the State headquarters the next morning',
  'Issue an immediate alert and begin moving vulnerable residents to safe shelters',
  'Ask the villagers to decide for themselves whether to move',
  'Hold a press conference to explain the risk',
], 1, 'With lives at risk and a credible warning, timely alert and evacuation of the vulnerable come first. Delay or passing the decision on is inappropriate.');

b.mcq('Cubes', 'A cube painted on all faces is cut into 27 identical smaller cubes. How many of the small cubes have exactly two faces painted?', ['6', '8', '12', '24'], 2,
  'With n = 3 cuts per edge, cubes with two painted faces lie along the 12 edges: 12 × (n − 2) = 12.');

b.mcq('Cubes', 'A cube painted on all faces is cut into 64 identical smaller cubes. How many of the small cubes have exactly one face painted?', ['8', '16', '24', '32'], 2,
  'With n = 4, each face has (n − 2)² = 4 such cubes, so 6 × 4 = 24.');

export default b.list;
