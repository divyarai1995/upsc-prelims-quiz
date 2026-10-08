import { bank } from './helpers';

const b = bank('comprehension', 'rc');

const P1 = `Groundwater supplies most of India's irrigation. Cheap or free electricity for farm pumps has made it sensible for each farmer to pump as much as possible, even as water tables fall year after year. Every farmer knows that water left in the ground today may be pumped out by a neighbour tomorrow. Regulating millions of scattered wells through permits has proved almost impossible. Some States have had better results by separating electricity lines for farms, which allows reliable but rationed power, and by paying farmers for the electricity they choose not to use. Such approaches change incentives rather than relying on enforcement alone.`;

b.mcq('Passage 1', 'Which of the following is the most logical inference from the passage?', [
  'Groundwater depletion can be eased by changing the incentives that drive over-extraction.',
  'Issuing permits for wells is the most effective way to regulate groundwater.',
  'Farmers over-pump because they are unaware that water tables are falling.',
  'Electricity supply to agriculture should be stopped completely.',
], 0, 'The passage contrasts failed permit-based regulation with incentive-based measures that worked better. It says farmers know the water may be taken by neighbours, so ignorance is not the reason.', { passage: P1 });

b.mcq('Passage 1', 'The situation in which each farmer pumps more because a neighbour might otherwise use the water is best described as:', [
  'A tragedy of the commons',
  'A market equilibrium',
  'The law of diminishing returns',
  'The result of excessive regulation',
], 0, 'A shared resource is over-used because each user gains individually while the cost of depletion is spread over everyone.', { passage: P1 });

const P2 = `Cities are often several degrees warmer than the surrounding countryside. Concrete and asphalt absorb heat during the day and release it at night, while vehicles and air conditioners add heat of their own. Trees cool cities in two ways: their shade keeps surfaces from heating up, and the water they release through their leaves cools the air around them. Yet in many growing cities, old trees are cut to widen roads, and new plantations consist of saplings that will take decades to provide similar shade. Planting drives that count the number of saplings planted say little about how many survive, or about how much tree cover a city will actually have in twenty years.`;

b.mcq('Passage 2', 'Which one of the following is the most rational inference from the passage?', [
  'Urban greening should be judged by survival and long-term tree cover rather than by the number of saplings planted.',
  'Air conditioners are the main reason cities are warmer than the countryside.',
  'Road widening should be banned in all cities.',
  'Planting saplings has no effect on urban temperatures.',
], 0, 'The last sentence criticises counting saplings instead of measuring survival and future canopy. The passage does not rank causes of heat or call for a ban.', { passage: P2 });

b.mcq('Passage 2', 'According to the passage, trees cool cities by:', [
  'Shading surfaces and releasing water through their leaves',
  'Absorbing heat during the day and releasing it at night',
  'Reducing the number of vehicles on roads',
  'Reflecting sunlight back into the sky through their bark',
], 0, 'The passage names exactly two mechanisms: shade and the water released through leaves. Option B describes concrete and asphalt.', { passage: P2 });

const P3 = `When an antibiotic is used, it kills the bacteria that are susceptible to it, but a few bacteria that happen to carry resistance survive and multiply. Every unnecessary course of antibiotics, whether taken for a viral infection it cannot cure or fed routinely to livestock to promote growth, gives resistant bacteria an advantage. Resistance that arises in one place can spread worldwide through travel and trade. New antibiotics are expensive to develop, and if they work well, doctors are advised to hold them in reserve, which limits the sales that would repay the investment. As a result, few new classes of antibiotics have reached the market in recent decades.`;

b.mcq('Passage 3', 'Which of the following can be inferred from the passage?', [
  'Market incentives alone are unlikely to produce enough new antibiotics.',
  'Antibiotics are effective against viral infections.',
  'Antibiotic resistance develops only in hospitals.',
  'People should stop eating meat.',
], 0, 'High costs combined with limited sales of reserved drugs weaken the business case, which explains the few new antibiotics. The passage says antibiotics cannot cure viral infections.', { passage: P3 });

b.mcq('Passage 3', 'The passage suggests that antibiotic resistance is best seen as:', [
  'A shared global problem that needs collective action',
  'A purely local issue for each hospital to manage',
  'A problem that new drugs will quickly solve',
  'A consequence of bacterial infections becoming rare',
], 0, 'Resistance spreads across borders through travel and trade, and new drugs are scarce, which points to a shared global problem.', { passage: P3 });

const P4 = `Children learn best when they first learn to read in a language they understand. A child taught in an unfamiliar language must struggle with two tasks at once: understanding the words and grasping the ideas they express. Many such children fall behind early and never catch up. Starting in the mother tongue and gradually adding a second language does not hold children back in the second language; studies in several countries suggest they often end up stronger in both. The practical challenge is that a single classroom may contain children who speak several home languages, and teachers and textbooks may not be available in all of them.`;

b.mcq('Passage 4', 'What is the central idea of the passage?', [
  'Early teaching in a familiar language helps learning, although putting it into practice faces real difficulties.',
  'Children should not learn a second language at school.',
  'Textbooks are the main cause of poor learning outcomes.',
  'Multilingual classrooms always perform better than others.',
], 0, 'The passage argues for mother-tongue instruction and then notes the practical challenge of many home languages in one classroom.', { passage: P4 });

b.mcq('Passage 4', 'Which of the following statements is NOT supported by the passage?', [
  'Learning in an unfamiliar language places a double burden on children.',
  'Starting with the mother tongue weakens learning of a second language.',
  'One classroom may have children with different home languages.',
  'Children who fall behind early may not catch up later.',
], 1, 'The passage says mother-tongue-first learning does not hold children back in the second language and may make them stronger in both.', { passage: P4 });

const P5 = `Direct benefit transfers put money straight into the bank accounts of beneficiaries instead of supplying goods through a chain of intermediaries. This reduces leakages, because there are fewer points at which benefits can be diverted, and it lets households spend according to their own needs. Critics point out that cash is useful only where markets work well. In remote areas with few shops, or during sudden price rises, a family may find that the same amount of money buys much less than the goods it replaced. The choice between cash and in-kind support therefore depends on local conditions rather than on a single best answer.`;

b.mcq('Passage 5', "Which one of the following best reflects the author's position?", [
  'Whether cash transfers are suitable depends on local conditions such as market access and prices.',
  'Cash transfers should replace all in-kind support everywhere.',
  'In-kind support is always better than cash.',
  'Leakages in welfare schemes cannot be reduced.',
], 0, 'The concluding sentence states that the choice depends on local conditions rather than a single best answer.', { passage: P5 });

b.mcq('Passage 5', 'According to the passage, one limitation of cash transfers is that:', [
  'Their real value can fall where markets are weak or prices rise suddenly.',
  'They increase the number of intermediaries.',
  'They reduce the freedom of households to choose.',
  'They cannot be paid into bank accounts.',
], 0, 'The critics quoted in the passage note that the same money may buy much less in remote areas or during price rises.', { passage: P5 });

export default b.list;
