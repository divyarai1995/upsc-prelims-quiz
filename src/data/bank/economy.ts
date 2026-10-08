import { bank } from './helpers';

const b = bank('economy', 'eco');

b.mcq('Monetary Policy', 'The repo rate is the rate at which:', [
  'Commercial banks lend to each other overnight',
  'The RBI lends short-term funds to banks against government securities',
  'Banks lend to their best corporate borrowers',
  'The RBI borrows from commercial banks',
], 1, 'Under a repo, the RBI lends to banks against eligible securities with an agreement to repurchase. Absorbing liquidity from banks is done through the reverse repo or the Standing Deposit Facility.');

b.two('Monetary Policy', 'Consider the following statements about the Monetary Policy Committee (MPC):', [
  'The MPC has six members.',
  'The RBI Governor has a casting vote in case of a tie.',
], [true, true],
  'The MPC under the amended RBI Act has three RBI members (including the Governor) and three external members. The Governor has a casting vote.');

b.mcq('Monetary Policy', "Which measure of inflation is used for India's flexible inflation targeting framework?", ['Wholesale Price Index', 'Consumer Price Index (Combined)', 'GDP deflator', 'CPI for Industrial Workers'], 1,
  'The target is 4% CPI (Combined) inflation with a tolerance band of 2% on either side.');

b.many('Monetary Policy', 'Consider the following statements:', [
  "An increase in the Cash Reserve Ratio reduces banks' lendable resources.",
  'The Statutory Liquidity Ratio can be maintained in cash, gold and approved securities.',
  'Open Market Operations involve the RBI buying or selling government securities.',
], [true, true, true],
  'CRR is held with the RBI and earns no interest, so raising it reduces lendable funds. SLR assets include cash, gold and approved securities. OMOs adjust liquidity through government securities.');

b.mcq('Fiscal Policy', 'The fiscal deficit of the government indicates:', [
  'The excess of revenue expenditure over revenue receipts',
  'The total borrowing requirement of the government',
  'The difference between exports and imports',
  'The interest payments on past borrowings',
], 1, 'Fiscal deficit = total expenditure − (revenue receipts + non-debt capital receipts), i.e. the amount the government must borrow.');

b.two('Fiscal Policy', 'Consider the following statements:', [
  'Primary deficit equals fiscal deficit minus interest payments.',
  'Effective revenue deficit equals revenue deficit plus grants for the creation of capital assets.',
], [true, false],
  'Primary deficit shows the borrowing needed for current spending excluding interest on past debt. Effective revenue deficit is revenue deficit MINUS grants for the creation of capital assets.');

b.mcq('Taxation', 'Which of the following is a direct tax?', ['Goods and Services Tax', 'Customs duty', 'Corporation tax', 'Excise duty'], 2,
  'In a direct tax the burden falls on the person taxed. Corporation tax and income tax are direct taxes; GST, customs and excise are indirect.');

b.ar('Taxation', 'GST is described as a destination-based tax.', 'Under GST, tax revenue accrues to the State where goods or services are consumed.', 0,
  'Because revenue follows consumption rather than production, GST is destination-based.');

b.mcq('National Income', 'GVA at basic prices plus product taxes minus product subsidies equals:', ['GDP', 'GNP', 'NNP at factor cost', 'Personal income'], 0,
  'This is how GDP is derived from GVA in the current national accounts series.');

b.two('National Income', 'Consider the following statements:', [
  'Net National Product equals Gross National Product minus depreciation.',
  'Gross National Product equals Gross Domestic Product plus net factor income from abroad.',
], [true, true],
  'Depreciation (consumption of fixed capital) separates gross and net measures. Net factor income from abroad separates domestic and national measures.');

b.mcq('Poverty', 'The Tendulkar Committee (2009) was associated with:', ['Banking sector reforms', 'Methodology for estimating poverty', 'Tax administration reform', 'Fiscal responsibility legislation'], 1,
  'The Tendulkar Committee revised the poverty line methodology. The Rangarajan Committee (2014) later suggested another revision.');

b.many('Banking', 'Consider the following statements:', [
  'NABARD is the apex development finance institution for agriculture and rural development.',
  'SIDBI is the principal financial institution for micro, small and medium enterprises.',
  'Regional Rural Banks are jointly owned by the Central Government, the sponsor bank and the State Government.',
], [true, true, true],
  'RRB shareholding is divided among the Centre (50%), the sponsor bank (35%) and the State Government (15%).');

b.mcq('External Sector', 'Which of the following is recorded in the capital (financial) account of the Balance of Payments?', ['Remittances from Indians abroad', 'Foreign Direct Investment', 'Exports of software services', 'Interest paid on foreign loans'], 1,
  'FDI is a capital account flow. Remittances (transfers), services exports and interest payments (primary income) are current account items.');

b.two('External Sector', 'Suppose the Indian rupee depreciates against the US dollar. Consider the following statements:', [
  'Indian exports become cheaper for foreign buyers.',
  'Imports into India become cheaper.',
], [true, false],
  'Depreciation means more rupees per dollar, so exports become more competitive and imports costlier.');

b.mcq('External Sector', 'Special Drawing Rights (SDRs) are issued by:', ['World Bank', 'International Monetary Fund', 'Bank for International Settlements', 'Asian Development Bank'], 1,
  "SDRs are an international reserve asset created by the IMF and valued on a basket of major currencies, including the Chinese renminbi.");

b.pairs('International Institutions', 'Consider the following pairs:', ['Institution', 'Headquarters'], [
  ['World Trade Organization', 'Geneva'],
  ['Asian Infrastructure Investment Bank', 'Manila'],
  ['International Monetary Fund', 'Washington, D.C.'],
], [true, false, true],
  'The AIIB is headquartered in Beijing. The Asian Development Bank is in Manila.');

b.mcq('Agriculture', 'Minimum Support Prices are announced by the Government on the recommendations of:', ['NABARD', 'Commission for Agricultural Costs and Prices', 'Food Corporation of India', 'NITI Aayog'], 1,
  'CACP recommends MSPs; the Cabinet Committee on Economic Affairs takes the final decision.');

b.two('Agriculture', 'Consider the following statements:', [
  'Mustard is a kharif crop.',
  'Wheat is a kharif crop.',
], [false, false],
  'Wheat and mustard are rabi crops, sown in winter and harvested in spring. Rice, maize and cotton are kharif crops, sown with the onset of the south-west monsoon.');

b.mcq('Banking', "What is the priority sector lending target for domestic scheduled commercial banks, as a share of Adjusted Net Bank Credit?", ['18%', '25%', '40%', '60%'], 2,
  'Domestic commercial banks must lend 40% of ANBC (or credit equivalent of off-balance-sheet exposure, whichever is higher) to the priority sector, with sub-targets such as 18% for agriculture.');

b.many('Budget', 'Consider the following statements:', [
  'The Annual Financial Statement is presented under Article 112.',
  'Expenditure charged on the Consolidated Fund of India is not subject to the vote of Parliament.',
  'The Contingency Fund of India is placed at the disposal of the Finance Minister.',
], [true, true, false],
  'Under Article 267, the Contingency Fund is placed at the disposal of the President. Charged expenditure can be discussed but not voted.');

b.mcq('Inflation', "Which of the following best describes 'stagflation'?", [
  'Falling prices with rapid growth',
  'High inflation together with stagnant growth and high unemployment',
  'Low inflation with full employment',
  'A sudden fall in the stock market',
], 1, 'Stagflation combines inflation with economic stagnation, as seen in many economies after the 1970s oil shocks.');

b.two('Inflation', 'Consider the following statements:', [
  'Demand-pull inflation arises when aggregate demand exceeds aggregate supply.',
  'Cost-push inflation can be caused by a rise in input costs such as wages and fuel prices.',
], [true, true],
  'Both are standard explanations of inflation and call for different policy responses.');

b.mcq('Taxation', 'The Laffer curve shows the relationship between:', ['Inflation and unemployment', 'Tax rates and tax revenue', 'Income and consumption', 'Interest rates and investment'], 1,
  'The Laffer curve suggests revenue rises with tax rates up to a point and falls beyond it. The Phillips curve relates inflation and unemployment.');

b.mcq('Money', 'Which of the following is NOT a component of narrow money (M1)?', ['Currency with the public', 'Demand deposits with banks', 'Time deposits with banks', "'Other' deposits with the RBI"], 2,
  'M1 = currency with the public + demand deposits + other deposits with the RBI. Adding time deposits gives M3.');

b.two('Money', 'Consider the following statements:', [
  'M3 is known as narrow money.',
  'M1 is the most liquid measure of money supply.',
], [false, true],
  'M3 is broad money; M1 is narrow money. Liquidity falls from M1 to M4 as less liquid deposits are added.');

b.mcq('Financial Markets', 'Which regulator oversees commodity derivatives markets in India today?', ['Forward Markets Commission', 'Securities and Exchange Board of India', 'Reserve Bank of India', 'PFRDA'], 1,
  'The Forward Markets Commission was merged with SEBI in 2015.');

b.pairs('Financial Markets', 'Consider the following pairs:', ['Regulator', 'Sector'], [
  ['IRDAI', 'Insurance'],
  ['PFRDA', 'Pensions'],
  ['NABARD', 'Housing finance companies'],
], [true, true, false],
  'Housing finance companies were regulated by the National Housing Bank and are now regulated by the RBI. NABARD supervises RRBs and cooperative banks.');

b.mcq('Banking', "The 'twin balance sheet problem' refers to:", [
  'Deficits in both the current account and the fiscal account',
  'Stressed balance sheets of both banks and corporates',
  "Mismatch between RBI's and government's accounts",
  'Losses of both public and private sector banks',
], 1, "The Economic Survey 2016-17 used the term for over-leveraged companies and banks burdened with bad loans.");

b.two('Banking', 'Consider the following statements:', [
  'A loan is generally classified as a non-performing asset when interest or principal remains overdue for more than 90 days.',
  'The Insolvency and Bankruptcy Code was enacted in 2016.',
], [true, true],
  'The 90-day norm is the standard NPA definition. The IBC created a time-bound resolution process.');

b.mcq('Fiscal Policy', 'The Fiscal Responsibility and Budget Management (FRBM) Act was enacted in:', ['1991', '1997', '2003', '2012'], 2,
  'The FRBM Act, 2003 set targets for reducing fiscal and revenue deficits.');

b.mcq('Inequality', 'The Gini coefficient is a measure of:', ['Inflation', 'Income inequality', 'Unemployment', 'Economic growth'], 1,
  'It ranges from 0 (perfect equality) to 1 (perfect inequality) and is derived from the Lorenz curve.');

b.many('International Trade', 'Consider the following statements:', [
  'India is a founding member of the World Trade Organization.',
  "The 'Most Favoured Nation' principle requires non-discrimination among trading partners.",
  "'Amber Box' subsidies are considered trade-distorting and are subject to reduction commitments.",
], [true, true, true],
  'India joined the WTO at its creation on 1 January 1995. MFN is a core WTO principle. Amber Box support is capped; Green Box support is not.');

b.mcq('International Trade', "Under the WTO Agreement on Agriculture, 'Green Box' subsidies are those that:", [
  'Are prohibited outright',
  'Cause no or minimal trade distortion',
  'Are linked to production limits',
  'Are given only by developing countries',
], 1, 'Green Box measures, such as research and environmental programmes, are allowed without limits. Blue Box payments are tied to production-limiting programmes.');

b.ar('Monetary Policy', 'An increase in the policy repo rate tends to reduce inflation.', 'A higher repo rate raises borrowing costs and dampens demand in the economy.', 0,
  'Monetary transmission works through lending rates: costlier credit reduces spending, easing demand-side price pressures.');

b.mcq('Employment', "'Disguised unemployment' is most common in:", ['Information technology', 'Agriculture', 'Banking', 'Manufacturing exports'], 1,
  'Many family members work on small farms where their marginal productivity is near zero; removing them would not lower output.');

b.two('Human Development', 'Consider the following statements about the Human Development Index:', [
  'It is published by the United Nations Development Programme.',
  'Its three dimensions are health, education and gender equality.',
], [true, false],
  'The HDI combines health (life expectancy), education (schooling) and standard of living (gross national income per capita). Gender gaps are measured separately, for example by the Gender Inequality Index.');

b.mcq('National Income', "Which of the following is counted in India's GDP?", [
  'Pension received by a retired government employee',
  'Purchase of a second-hand car',
  'Unpaid household work done by a family member',
  'Salary of a software engineer working in Bengaluru',
], 3, 'Pensions are transfer payments, second-hand sales are not current production, and unpaid household work is outside the production boundary.');

b.mcq('Industry', 'Which of the following is NOT one of the eight core industries in India’s Index of Eight Core Industries?', ['Cement', 'Fertilizers', 'Textiles', 'Steel'], 2,
  'The eight core industries are coal, crude oil, natural gas, refinery products, fertilizers, steel, cement and electricity.');

b.two('Payments', 'Consider the following statements:', [
  'The Unified Payments Interface (UPI) is operated by the National Payments Corporation of India.',
  'NPCI was set up as an initiative of the RBI and the Indian Banks’ Association.',
], [true, true],
  'NPCI is a not-for-profit company promoted under the guidance of the RBI and the IBA. It runs UPI, RuPay, IMPS and other systems.');

b.mcq('Inflation', "A low current inflation figure caused by a high price level in the same month of the previous year is an example of:", ['Base effect', 'Core inflation', 'Deflation', 'Headline inflation'], 0,
  'Year-on-year inflation depends on the base. A high base makes current inflation look lower, and a low base makes it look higher.');

b.mcq('Budget', 'Which of the following is a non-tax revenue receipt of the Government?', ['Dividends from public sector enterprises', 'Income tax', 'Market borrowings', 'Disinvestment proceeds'], 0,
  'Dividends, fees and interest receipts are non-tax revenue. Borrowings and disinvestment proceeds are capital receipts.');

b.two('Budget', 'Consider the following statements:', [
  'Disinvestment proceeds are capital receipts.',
  'Recovery of loans given by the Government is a revenue receipt.',
], [true, false],
  'Recovery of loans reduces the government’s assets, so it is a non-debt capital receipt.');

export default b.list;
