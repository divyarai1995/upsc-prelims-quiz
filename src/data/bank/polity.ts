import { bank } from './helpers';

const b = bank('polity', 'pol');

b.mcq('Preamble', "The words 'Socialist' and 'Secular' were added to the Preamble by which Constitutional Amendment?", ['24th Amendment', '42nd Amendment', '44th Amendment', '52nd Amendment'], 1,
  "The 42nd Amendment Act, 1976 added 'Socialist', 'Secular' and 'Integrity' to the Preamble.");

b.two('Preamble', '', [
  'The Preamble is a part of the Constitution of India.',
  'The Preamble can be enforced in a court of law.',
], [true, false],
  'In Kesavananda Bharati (1973) the Supreme Court held that the Preamble is part of the Constitution. It is not justiciable: courts cannot enforce it directly, though it helps interpret ambiguous provisions.');

b.mcq('Fundamental Rights', 'Which Article of the Constitution abolishes untouchability and forbids its practice in any form?', ['Article 14', 'Article 15', 'Article 17', 'Article 21'], 2,
  'Article 17 abolishes untouchability. Its enforcement is backed by the Protection of Civil Rights Act, 1955.');

b.two('Fundamental Rights', 'With reference to Article 32 of the Constitution, consider the following statements:', [
  "Dr. B. R. Ambedkar described Article 32 as the 'heart and soul' of the Constitution.",
  'Only the Supreme Court can issue writs for the enforcement of Fundamental Rights.',
], [true, false],
  'Ambedkar called Article 32 the heart and soul of the Constitution. High Courts can also issue writs under Article 226, and their writ jurisdiction is wider, covering legal rights too.');

b.many('Writs', 'Consider the following statements regarding writs:', [
  'Habeas corpus can be issued against public authorities as well as private individuals.',
  'Mandamus cannot be issued against the President or the Governor of a State.',
  'Certiorari can be issued against legislative bodies.',
], [true, true, false],
  'Habeas corpus lies against both public authorities and private persons. Mandamus does not lie against the President or Governors (Article 361 immunity). Certiorari does not lie against legislative bodies or private individuals.');

b.mcq('Fundamental Rights', 'The Right to Education (Article 21A) was inserted into the Constitution by which amendment?', ['73rd Amendment', '86th Amendment', '91st Amendment', '93rd Amendment'], 1,
  'The 86th Amendment Act, 2002 inserted Article 21A, changed Article 45 and added a Fundamental Duty under Article 51A(k).');

b.two('Directive Principles', 'Consider the following statements regarding the Directive Principles of State Policy:', [
  'The idea of Directive Principles was borrowed from the Irish Constitution.',
  'The directive to secure a Uniform Civil Code is contained in Article 48.',
], [true, false],
  'DPSPs (Part IV) were inspired by the Irish Constitution, which in turn drew on Spain. The Uniform Civil Code directive is in Article 44; Article 48 deals with agriculture and animal husbandry.');

b.many('Fundamental Duties', 'Consider the following statements about Fundamental Duties:', [
  'They were added on the recommendation of the Swaran Singh Committee.',
  'They were inserted by the 42nd Amendment Act, 1976.',
  'There are currently eleven Fundamental Duties.',
], [true, true, true],
  'The 42nd Amendment added ten duties in Article 51A following the Swaran Singh Committee. The 86th Amendment (2002) added the eleventh, on providing education to children aged 6 to 14.');

b.mcq('Fundamental Rights', 'Which of the following Fundamental Rights is available to foreigners as well as citizens?', ['Article 15', 'Article 16', 'Article 19', 'Article 21'], 3,
  'Articles 15, 16, 19, 29 and 30 are available only to citizens. Articles 14, 20, 21, 21A, 22 and 23 to 28 are available to all persons, including foreigners.');

b.two('President', 'With reference to the election of the President of India, consider the following statements:', [
  'Elected members of the Legislative Assemblies of the States are part of the electoral college.',
  'Nominated members of the Rajya Sabha are part of the electoral college.',
], [true, false],
  "The President is elected by the elected members of both Houses of Parliament and of the State Legislative Assemblies (and of Delhi and Puducherry). Nominated members do not vote in the President's election, although they do vote in the Vice-President's election.");

b.mcq('President', "The President's power to promulgate ordinances is contained in which Article?", ['Article 72', 'Article 123', 'Article 213', 'Article 356'], 1,
  'Article 123 gives the President ordinance-making power when Parliament is not in session. Article 213 is the corresponding power of the Governor.');

b.many('Parliament', 'Consider the following statements regarding the Rajya Sabha:', [
  'It is a permanent body and is not subject to dissolution.',
  'One-third of its members retire every second year.',
  'The Vice-President of India is the ex officio Chairman of the Rajya Sabha.',
], [true, true, true],
  'The Rajya Sabha is a continuing chamber; one-third of its members retire every two years. Under Article 64 the Vice-President is its ex officio Chairman. (Note that a Money Bill can be introduced only in the Lok Sabha.)');

b.mcq('Parliament', 'Which Article of the Constitution defines a Money Bill?', ['Article 109', 'Article 110', 'Article 112', 'Article 117'], 1,
  'Article 110 defines a Money Bill. Article 109 lays down the special procedure for it, Article 112 deals with the Annual Financial Statement, and Article 117 with Financial Bills.');

b.two('Parliament', 'Consider the following statements regarding the Speaker of the Lok Sabha:', [
  'The Speaker is elected by the members of both Houses of Parliament.',
  'The Speaker presides over a joint sitting of the two Houses of Parliament.',
], [false, true],
  'The Speaker is elected by the members of the Lok Sabha alone (Article 93). Under Article 118(4), the Speaker presides over joint sittings convened under Article 108.');

b.mcq('Parliament', 'A joint sitting of both Houses of Parliament can be convened to resolve a deadlock over which of the following?', ['A Money Bill', 'A Constitution Amendment Bill', 'An ordinary Bill', 'None of the above'], 2,
  'Article 108 allows a joint sitting for ordinary Bills. There is no joint sitting for Money Bills (the Rajya Sabha has no veto) or for Constitution Amendment Bills (each House must pass them separately).');

b.pairs('Constitutional Provisions', 'Consider the following pairs:', ['Article', 'Subject'], [
  ['Article 280', 'Finance Commission'],
  ['Article 324', 'Union Public Service Commission'],
  ['Article 368', 'Amendment of the Constitution'],
], [true, false, true],
  'Article 324 relates to the Election Commission. The UPSC is dealt with in Articles 315 to 323.');

b.mcq('Judiciary', "The 'basic structure' doctrine was propounded by the Supreme Court in which case?", ['Golaknath case (1967)', 'Kesavananda Bharati case (1973)', 'Minerva Mills case (1980)', 'S. R. Bommai case (1994)'], 1,
  'In Kesavananda Bharati v. State of Kerala (1973), a 13-judge bench held that Parliament can amend any part of the Constitution but cannot alter its basic structure.');

b.two('Judiciary', 'Consider the following statements regarding judges of the Supreme Court:', [
  'A judge of the Supreme Court holds office until the age of 62 years.',
  'A judge of the Supreme Court can be removed by an order of the President passed after an address by each House of Parliament supported by a special majority.',
], [false, true],
  'Supreme Court judges retire at 65; High Court judges at 62. Removal is under Article 124(4) on grounds of proved misbehaviour or incapacity, with a special majority in each House.');

b.mcq('Governor', 'The Governor of a State is appointed by:', ['The Chief Minister of the State', 'The President of India', 'The Chief Justice of the High Court', 'The State Legislative Assembly'], 1,
  'Under Article 155, the Governor is appointed by the President by warrant under his hand and seal, and holds office during the pleasure of the President.');

b.many('Governor', 'Consider the following statements regarding the Governor of a State:', [
  'The Governor can reserve a Bill passed by the State Legislature for the consideration of the President.',
  'The Governor can grant pardons for offences against laws relating to matters to which the executive power of the State extends.',
  'The Governor can be removed through impeachment by the State Legislature.',
], [true, true, false],
  'Article 200 allows reservation of Bills for the President. Article 161 gives the pardoning power. There is no impeachment of a Governor; the Governor holds office during the pleasure of the President.');

b.mcq('Local Government', 'The Eleventh Schedule, which lists the subjects for Panchayats, was added by which Constitutional Amendment?', ['61st Amendment', '64th Amendment', '73rd Amendment', '74th Amendment'], 2,
  'The 73rd Amendment (1992) added Part IX and the Eleventh Schedule (29 subjects). The 74th Amendment added Part IX-A and the Twelfth Schedule for Municipalities.');

b.two('Local Government', 'Consider the following statements:', [
  'Elections to Panchayats and Municipalities are conducted by the State Election Commission.',
  'The Constitution requires that not less than one-third of the seats in Panchayats be reserved for women.',
], [true, true],
  'Articles 243K and 243ZA vest the conduct of local body elections in the State Election Commission. Article 243D reserves at least one-third of seats for women; several States have raised it to one-half.');

b.mcq('Constitutional Bodies', 'The Election Commission of India is established under which Article of the Constitution?', ['Article 315', 'Article 324', 'Article 326', 'Article 329'], 1,
  'Article 324 vests superintendence, direction and control of elections in the Election Commission. Article 326 provides for adult suffrage.');

b.many('Constitutional Bodies', 'Consider the following statements about the Comptroller and Auditor General of India (CAG):', [
  'The CAG is appointed by the President.',
  'The CAG can be removed only in the manner and on the grounds of a Supreme Court judge.',
  'After retirement, the CAG is eligible for further office under the Government of India.',
], [true, true, false],
  'Article 148 provides for appointment by the President and removal like a Supreme Court judge. To protect independence, the CAG is not eligible for further office under the Union or any State after ceasing to hold office.');

b.mcq('Constitutional Bodies', 'Which body recommends the distribution of the net proceeds of shareable taxes between the Union and the States?', ['NITI Aayog', 'Finance Commission', 'GST Council', 'Inter-State Council'], 1,
  'The Finance Commission under Article 280 recommends vertical (Union-States) and horizontal (among States) distribution of tax proceeds.');

b.two('Constitutional Bodies', 'Consider the following statements regarding the GST Council:', [
  'The GST Council is a constitutional body.',
  'The Union Government holds two-thirds of the total weightage of votes in the GST Council.',
], [true, false],
  'The GST Council was created under Article 279A by the 101st Amendment. The Union has one-third of the weightage and the States together have two-thirds; decisions need a three-fourths majority of weighted votes.');

b.mcq('Parliament', 'The anti-defection law (Tenth Schedule) was added to the Constitution by which amendment?', ['42nd Amendment', '44th Amendment', '52nd Amendment', '61st Amendment'], 2,
  'The 52nd Amendment Act, 1985 added the Tenth Schedule. The 91st Amendment (2003) removed the split exception and capped the size of ministries.');

b.pairs('Schedules', 'Consider the following pairs:', ['Schedule', 'Content'], [
  ['Seventh Schedule', 'Union, State and Concurrent Lists'],
  ['Fifth Schedule', 'Administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram'],
  ['Ninth Schedule', 'Provisions on disqualification on grounds of defection'],
], [true, false, false],
  'Tribal areas in Assam, Meghalaya, Tripura and Mizoram are covered by the Sixth Schedule; the Fifth Schedule covers Scheduled Areas in other States. Anti-defection is in the Tenth Schedule; the Ninth Schedule protects certain laws (originally land reforms) from challenge.');

b.mcq('Schedules', 'How many languages are currently listed in the Eighth Schedule of the Constitution?', ['18', '20', '22', '24'], 2,
  'There are 22 languages. Bodo, Dogri, Maithili and Santhali were the last to be added, by the 92nd Amendment (2003).');

b.two('Emergency Provisions', 'Consider the following statements regarding a National Emergency under Article 352:', [
  'The proclamation must be approved by both Houses of Parliament within one month.',
  'During a National Emergency, the enforcement of the right to life under Article 21 can be suspended.',
], [true, false],
  'After the 44th Amendment (1978), approval is required within one month by a special majority. The same amendment provides that Articles 20 and 21 cannot be suspended even during an emergency.');

b.mcq('Judiciary', 'Which Article empowers the President to seek the advisory opinion of the Supreme Court?', ['Article 131', 'Article 136', 'Article 143', 'Article 148'], 2,
  'Article 143 gives the advisory jurisdiction. Article 131 is original jurisdiction, Article 136 is special leave to appeal.');

b.ar('Parliament', 'The Rajya Sabha cannot reject a Money Bill.', 'The Rajya Sabha can only make recommendations on a Money Bill within 14 days, which the Lok Sabha may accept or reject.', 0,
  'Under Article 109, the Rajya Sabha must return a Money Bill within 14 days with or without recommendations, and the Lok Sabha is free to reject them. This is why the Rajya Sabha cannot block it.');

b.mcq('Executive', 'NITI Aayog was established in 2015 through:', ['A Constitutional amendment', 'An Act of Parliament', 'A resolution of the Union Cabinet', 'A Presidential ordinance'], 2,
  'NITI Aayog replaced the Planning Commission through a Union Cabinet resolution of 1 January 2015. It is neither a constitutional nor a statutory body.');

b.many('Parliament', 'Consider the following statements:', [
  'The term of the Lok Sabha can be extended by Parliament by law for one year at a time during a National Emergency.',
  'A Member of Parliament who is absent from all meetings of the House for sixty days without permission may have the seat declared vacant.',
  'The Speaker vacates office as soon as the Lok Sabha is dissolved.',
], [true, true, false],
  'Article 83(2) allows the one-year extension. Article 101(4) covers 60 days of absence. Under Article 94, the Speaker continues in office until immediately before the first meeting of the new Lok Sabha.');

b.mcq('Constitution Making', "Judicial review in the Indian Constitution is commonly described as borrowed from the Constitution of:", ['United Kingdom', 'United States', 'Ireland', 'Canada'], 1,
  'Judicial review, the independence of the judiciary, Fundamental Rights and the office of the Vice-President are usually traced to the US Constitution.');

b.pairs('Constitution Making', 'Consider the following pairs:', ['Feature', 'Source'], [
  ['Concurrent List', 'Australia'],
  ['Suspension of Fundamental Rights during an emergency', 'United States'],
  ['Fundamental Duties', 'erstwhile USSR'],
  ['Directive Principles of State Policy', 'Ireland'],
], [true, false, true, true],
  'The suspension of Fundamental Rights during an emergency was drawn from the Weimar Constitution of Germany. The other three pairs are correct.');

b.mcq('Constitution Making', 'Who was the Chairman of the Drafting Committee of the Constituent Assembly?', ['Rajendra Prasad', 'B. R. Ambedkar', 'Jawaharlal Nehru', 'B. N. Rau'], 1,
  'Dr. B. R. Ambedkar chaired the Drafting Committee. Rajendra Prasad was President of the Constituent Assembly and B. N. Rau was its Constitutional Adviser.');

b.two('Constitution Making', 'Consider the following statements regarding the Constituent Assembly:', [
  'Its members were directly elected by the people on the basis of universal adult franchise.',
  'Dr. Rajendra Prasad was elected as its President.',
], [false, true],
  'Under the Cabinet Mission Plan (1946), members were elected indirectly by the members of the provincial legislative assemblies. Rajendra Prasad was its permanent President.');

b.mcq('Fundamental Rights', 'After the 44th Amendment, the right to property is:', ['A Fundamental Right under Article 19', 'A constitutional right under Article 300A', 'A Directive Principle', 'A Fundamental Duty'], 1,
  'The 44th Amendment (1978) removed property from Part III. Article 300A now says no person shall be deprived of property save by authority of law.');

b.many('Citizenship', 'Consider the following statements:', [
  'Citizenship is dealt with in Part III of the Constitution.',
  'State Legislatures can make laws on the acquisition and termination of citizenship.',
  'Overseas Citizen of India cardholders have the right to vote in Indian elections.',
], [false, false, false],
  'Citizenship is in Part II (Articles 5 to 11), and Article 11 gives Parliament alone the power to regulate it (Citizenship Act, 1955). OCI cardholders do not get voting rights.');

b.mcq('Federalism', 'The Inter-State Council is provided for under which Article?', ['Article 262', 'Article 263', 'Article 280', 'Article 312'], 1,
  'Article 263 allows the President to establish an Inter-State Council. Article 262 deals with inter-state river water disputes.');

b.two('Executive', 'Consider the following statements regarding the Attorney General of India:', [
  'The Attorney General has the right to speak in and take part in the proceedings of both Houses of Parliament, but not to vote.',
  'The Attorney General is a member of the Union Cabinet.',
], [true, false],
  'Article 88 gives the Attorney General the right to speak in Parliament without a vote. The Attorney General is not a member of the Cabinet.');

b.mcq('Writs', "Which writ literally means 'we command'?", ['Habeas corpus', 'Mandamus', 'Prohibition', 'Quo warranto'], 1,
  "Mandamus means 'we command'. Habeas corpus means 'to have the body', and quo warranto means 'by what authority'.");

b.ar('Judiciary', 'The Supreme Court of India can review its own judgments.', 'Article 137 empowers the Supreme Court to review any judgment pronounced or order made by it.', 0,
  'Review power flows from Article 137, subject to law made by Parliament and rules framed under Article 145.');

b.two('Union Territories', 'Consider the following statements:', [
  'The National Capital Territory of Delhi has a Legislative Assembly.',
  'Chandigarh has its own Legislative Assembly.',
], [true, false],
  'Delhi has a Legislative Assembly under Article 239AA. Chandigarh has no legislature and is administered by an Administrator.');

b.mcq('Parliament', 'What is the minimum age prescribed by the Constitution for becoming a member of the Rajya Sabha?', ['21 years', '25 years', '30 years', '35 years'], 2,
  'Article 84 prescribes 30 years for the Rajya Sabha and 25 years for the Lok Sabha.');

b.many('Parliament', 'Consider the following statements regarding parliamentary procedure:', [
  "'Zero Hour' is not mentioned in the Rules of Procedure.",
  'A starred question requires an oral answer, and supplementary questions can follow.',
  'An adjournment motion can be moved in the Rajya Sabha.',
], [true, true, false],
  'Zero Hour is an Indian parliamentary innovation without a basis in the rules. Starred questions get oral answers. The adjournment motion is a device of the Lok Sabha; the Rajya Sabha does not use it.');

export default b.list;
