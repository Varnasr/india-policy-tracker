/**
 * Policy Knowledge Enrichment
 * Maps sectors and types to structured knowledge: ministries, stakeholders,
 * affected populations, and political spectrum positioning.
 */

export interface PolicyEnrichment {
  ministries: string[];
  stakeholders: string[];
  affectedPopulation: string;
  politicalLean: number; // -3 (far left) to +3 (far right), 0 = centre
  politicalLabel: string;
  keyNumbers: string[];
}

const SECTOR_MINISTRIES: Record<string, string[]> = {
  'Education': ['Ministry of Education', 'UGC', 'AICTE'],
  'Health': ['Ministry of Health & Family Welfare', 'ICMR', 'AYUSH'],
  'Finance & Economy': ['Ministry of Finance', 'RBI', 'SEBI', 'DEA'],
  'Agriculture': ['Ministry of Agriculture & Farmers Welfare', 'ICAR', 'FCI'],
  'Digital & Technology': ['Ministry of Electronics & IT', 'TRAI', 'CERT-In'],
  'Defence & Security': ['Ministry of Defence', 'Ministry of Home Affairs', 'NSA'],
  'Climate & Environment': ['Ministry of Environment, Forest & Climate Change', 'CPCB'],
  'Energy': ['Ministry of Power', 'Ministry of New & Renewable Energy', 'CEA'],
  'Labour & Employment': ['Ministry of Labour & Employment', 'EPFO', 'ESIC'],
  'Social Protection': ['Ministry of Social Justice & Empowerment', 'NITI Aayog'],
  'Governance & Reform': ['PMO', 'Cabinet Secretariat', 'DARPG', 'NITI Aayog'],
  'Transport & Infrastructure': ['Ministry of Road Transport', 'Ministry of Railways', 'NHAI'],
  'Rural Development': ['Ministry of Rural Development', 'Ministry of Panchayati Raj'],
  'Urban Development': ['Ministry of Housing & Urban Affairs', 'Smart Cities Mission'],
  'Trade & Commerce': ['Ministry of Commerce & Industry', 'DPIIT', 'DGFT'],
  'Water & Sanitation': ['Ministry of Jal Shakti', 'CPCB', 'CGWB'],
  'Housing': ['Ministry of Housing & Urban Affairs', 'NHB'],
  'Child Rights & Youth': ['Ministry of Women & Child Development', 'NCPCR', 'Ministry of Youth Affairs'],
  'Gender & Women': ['Ministry of Women & Child Development', 'NCW'],
  'Tribal & Indigenous': ['Ministry of Tribal Affairs', 'NCST'],
  'Science & Innovation': ['Ministry of Science & Technology', 'DST', 'CSIR', 'ISRO'],
};

const SECTOR_STAKEHOLDERS: Record<string, string[]> = {
  'Education': ['Students', 'Teachers & Faculty', 'Universities', 'State Education Boards', 'EdTech Industry', 'Parents'],
  'Health': ['Patients', 'Healthcare Workers', 'Hospitals & Clinics', 'Pharma Industry', 'Insurance Providers', 'ASHA Workers'],
  'Finance & Economy': ['Taxpayers', 'Banks & NBFCs', 'Investors', 'MSMEs', 'Stock Markets'],
  'Agriculture': ['Farmers', 'FPOs', 'Agri-Input Industry', 'APMC Markets', 'Food Processing Units'],
  'Digital & Technology': ['Internet Users', 'Tech Companies', 'Startups', 'Telecom Providers', 'Data Processors'],
  'Defence & Security': ['Armed Forces', 'Defence PSUs', 'Border Communities', 'Veterans', 'Defence Industry'],
  'Climate & Environment': ['Forest Communities', 'Polluting Industries', 'Renewable Energy Firms', 'Wildlife', 'Coastal Populations'],
  'Energy': ['Power Consumers', 'DISCOMs', 'Coal Industry', 'Solar/Wind Developers', 'State Electricity Boards'],
  'Labour & Employment': ['Workers', 'Trade Unions', 'Employers', 'Gig Workers', 'Migrant Labour'],
  'Social Protection': ['BPL Families', 'Senior Citizens', 'Persons with Disabilities', 'Unorganised Workers'],
  'Governance & Reform': ['Civil Servants', 'State Governments', 'Judiciary', 'Citizens', 'RTI Activists'],
  'Transport & Infrastructure': ['Commuters', 'Trucking Industry', 'Railways Employees', 'Construction Sector', 'Toll Operators'],
  'Rural Development': ['Rural Households', 'Gram Panchayats', 'SHGs', 'MGNREGA Workers'],
  'Urban Development': ['Urban Residents', 'Municipal Corporations', 'Real Estate Developers', 'Slum Dwellers'],
  'Trade & Commerce': ['Exporters', 'Importers', 'MSMEs', 'FDI Investors', 'Customs & GST Payers'],
  'Water & Sanitation': ['Rural Households', 'Urban Water Utilities', 'Farmers (Irrigation)', 'Sanitation Workers'],
  'Housing': ['Homebuyers', 'Real Estate Developers', 'Slum Dwellers', 'Housing Finance Companies'],
  'Child Rights & Youth': ['Children', 'Adolescents', 'Anganwadi Workers', 'Juvenile Justice System', 'Youth Organisations'],
  'Gender & Women': ['Women', 'SHGs', 'Women Entrepreneurs', 'Domestic Workers', 'Gender Minorities'],
  'Tribal & Indigenous': ['Scheduled Tribes', 'Forest Dwellers', 'Tribal Cooperatives', 'Fifth Schedule Areas'],
  'Science & Innovation': ['Researchers', 'R&D Institutions', 'Startups', 'Patent Holders', 'Universities'],
};

const SECTOR_AFFECTED: Record<string, string> = {
  'Education': '~350 million students, 10 million teachers',
  'Health': '1.4 billion citizens, 5 million healthcare workers',
  'Finance & Economy': '1.4 billion citizens, 63 million MSMEs',
  'Agriculture': '~150 million farming households, 42% of workforce',
  'Digital & Technology': '~850 million internet users, 75,000+ startups',
  'Defence & Security': '1.4 million active military, border populations',
  'Climate & Environment': 'All citizens, 275 million forest-dependent people',
  'Energy': '1.4 billion consumers, 300 million without reliable power',
  'Labour & Employment': '~500 million workers, 90% in informal sector',
  'Social Protection': '~350 million BPL population, 140 million elderly',
  'Governance & Reform': '1.4 billion citizens, 20 million government employees',
  'Transport & Infrastructure': 'All citizens, 8 million truck operators',
  'Rural Development': '~900 million rural population, 250,000 gram panchayats',
  'Urban Development': '~500 million urban residents, 8,000+ cities/towns',
  'Trade & Commerce': '63 million MSMEs, export-import community',
  'Water & Sanitation': '~900 million rural households, 190 million lacking safe water',
  'Housing': '~100 million urban housing shortage, 30 million rural',
  'Child Rights & Youth': '~470 million children under 18, 365 million youth',
  'Gender & Women': '~700 million women, 432 million in workforce gap',
  'Tribal & Indigenous': '~104 million tribal population, 8.6% of India',
  'Science & Innovation': '~1 million researchers, R&D ecosystem',
};

const SECTOR_KEY_NUMBERS: Record<string, string[]> = {
  'Education': ['Education budget: Rs 1.25 lakh crore (2025-26)', '1.5 million schools, 1,100+ universities', '70% gross enrollment ratio target by 2030'],
  'Health': ['Health budget: Rs 90,958 crore (2025-26)', 'Target: 2.5% of GDP public health spending', '1.5 lakh Health & Wellness Centres planned'],
  'Finance & Economy': ['GDP: $3.9 trillion (2025 est.)', 'Fiscal deficit target: 4.4% of GDP', 'GST collection: Rs 1.87 lakh crore/month avg'],
  'Agriculture': ['Agri budget: Rs 1.52 lakh crore (2025-26)', 'MSP for 23 crops', 'PM-KISAN: Rs 6,000/year to 9 crore farmers'],
  'Digital & Technology': ['Rs 15,000 crore for Digital India initiatives', 'UPI: 14 billion monthly transactions', '850 million+ Aadhaar-linked mobiles'],
  'Defence & Security': ['Defence budget: Rs 6.21 lakh crore (2025-26)', '68% indigenous procurement target', '1.4 million active military personnel'],
  'Climate & Environment': ['Net-zero target: 2070', '50% non-fossil fuel energy capacity by 2030', 'Green Climate Fund: $3 billion committed'],
  'Energy': ['500 GW non-fossil fuel capacity target by 2030', 'Saubhagya: 100% household electrification', '175 GW renewable energy installed (2025)'],
  'Labour & Employment': ['4 Labour Codes consolidating 29 laws', 'EPFO: 28 crore subscribers', 'E-Shram: 30 crore unorganised workers registered'],
  'Social Protection': ['PM-JAY: 55 crore beneficiaries', 'MGNREGA: Rs 86,000 crore annual outlay', 'NSAP pensions: 3 crore beneficiaries'],
  'Governance & Reform': ['20 million central + state government employees', 'Rs 3.3 lakh crore transferred via DBT', '1,500+ services on UMANG app'],
  'Transport & Infrastructure': ['Rs 11.11 lakh crore capital expenditure (2025-26)', 'Bharatmala: 83,677 km national highways', 'Vande Bharat: 75 train sets operational'],
  'Rural Development': ['PMAY-G: 2.95 crore houses sanctioned', 'PMGSY: 7.25 lakh km rural roads', 'SHG network: 9 crore women members'],
  'Urban Development': ['PMAY-U: 1.18 crore houses sanctioned', 'Smart Cities Mission: 100 cities', 'Metro rail: 900+ km operational'],
  'Trade & Commerce': ['Merchandise exports: $437 billion (2024-25)', 'FDI inflow: $71 billion (2024-25)', 'PLI scheme: Rs 1.97 lakh crore across 14 sectors'],
  'Water & Sanitation': ['Jal Jeevan Mission: Rs 60,000 crore/year', '14.5 crore rural tap connections delivered', 'SBM 2.0: Rs 1.4 lakh crore outlay'],
  'Housing': ['PMAY: 4.13 crore houses total sanctioned', 'Urban housing shortage: 10 million units', 'Affordable Housing Fund: Rs 25,000 crore'],
  'Child Rights & Youth': ['ICDS: 8 crore beneficiaries under 6', '14 lakh Anganwadi centres', 'POSHAN Abhiyaan: Rs 3,000 crore annually'],
  'Gender & Women': ['Beti Bachao Beti Padhao: 405 districts', 'Maternity benefit: Rs 5,000 under PMMVY', 'One Stop Centres: 733 across 35 states/UTs'],
  'Tribal & Indigenous': ['Tribal budget: Rs 13,000 crore (2025-26)', 'EMRS: 740 Eklavya Model Residential Schools', 'FRA: 2.2 million titles distributed'],
  'Science & Innovation': ['R&D spending: 0.7% of GDP', 'Gaganyaan: Rs 12,000 crore investment', 'India Innovation Index: 40th globally (2024)'],
};

// Political spectrum: sector+type → lean
// -2 = Left, -1 = Centre-Left, 0 = Centre, 1 = Centre-Right, 2 = Right
const SECTOR_LEAN: Record<string, number> = {
  'Social Protection': -1,
  'Labour & Employment': -1,
  'Gender & Women': -1,
  'Tribal & Indigenous': -1,
  'Child Rights & Youth': -1,
  'Rural Development': -1,
  'Climate & Environment': -1,
  'Water & Sanitation': 0,
  'Education': 0,
  'Health': 0,
  'Housing': 0,
  'Urban Development': 0,
  'Governance & Reform': 0,
  'Science & Innovation': 0,
  'Energy': 0,
  'Agriculture': 0,
  'Finance & Economy': 1,
  'Trade & Commerce': 1,
  'Digital & Technology': 1,
  'Transport & Infrastructure': 0,
  'Defence & Security': 1,
};

const TYPE_LEAN_MOD: Record<string, number> = {
  'scheme': -1,      // welfare programmes lean left
  'legislation': 0,  // neutral — depends on content
  'notification': 0,
  'budget': 0,
  'research': 0,
  'announcement': 0,
  'policy': 0,
};

const LEAN_LABELS: Record<number, string> = {
  '-3': 'Left',
  '-2': 'Left',
  '-1': 'Centre-Left',
  '0': 'Centre',
  '1': 'Centre-Right',
  '2': 'Right',
  '3': 'Right',
};

export function enrichPolicy(sectors: string[], type: string): PolicyEnrichment {
  // Aggregate ministries and stakeholders from all sectors
  const ministrySet = new Set<string>();
  const stakeholderSet = new Set<string>();
  const keyNumbers: string[] = [];
  let affectedPopulation = '—';
  let leanSum = 0;

  for (const s of sectors) {
    const ministries = SECTOR_MINISTRIES[s] || [];
    ministries.forEach(m => ministrySet.add(m));

    const stakeholders = SECTOR_STAKEHOLDERS[s] || [];
    stakeholders.slice(0, 3).forEach(st => stakeholderSet.add(st));

    if (affectedPopulation === '—' && SECTOR_AFFECTED[s]) {
      affectedPopulation = SECTOR_AFFECTED[s];
    }

    // Collect distinct key numbers from all sectors
    const nums = SECTOR_KEY_NUMBERS[s] || [];
    for (const n of nums) {
      if (!keyNumbers.includes(n)) keyNumbers.push(n);
    }

    leanSum += SECTOR_LEAN[s] ?? 0;
  }

  // Average lean across sectors + type modifier
  let lean = Math.round(leanSum / Math.max(sectors.length, 1)) + (TYPE_LEAN_MOD[type] ?? 0);
  lean = Math.max(-2, Math.min(2, lean));

  return {
    ministries: Array.from(ministrySet).slice(0, 5),
    stakeholders: Array.from(stakeholderSet).slice(0, 6),
    affectedPopulation,
    politicalLean: lean,
    politicalLabel: LEAN_LABELS[String(lean) as any] || 'Centre',
    keyNumbers: keyNumbers.slice(0, 4),
  };
}
