"""
Keyword-based sector classifier for Indian policy items.
Maps policy text (title + description) to one or more development sectors.
No ML dependencies — runs fast in GitHub Actions.
"""

SECTOR_KEYWORDS = {
    "Education": [
        "education", "school", "university", "college", "teacher", "student",
        "literacy", "curriculum", "NEP", "national education policy", "UGC",
        "AICTE", "IIT", "IIM", "NCERT", "midday meal", "scholarship",
        "skill development", "vocational training", "higher education",
        "primary education", "Samagra Shiksha", "learning", "edtech",
        "Atal Tinkering", "NASSCOM", "digital literacy", "anganwadi education"
    ],
    "Health": [
        "health", "hospital", "medical", "disease", "vaccine", "AIIMS",
        "ayushman bharat", "healthcare", "pharma", "drug", "ICMR", "WHO",
        "epidemic", "pandemic", "nutrition", "mental health", "FSSAI",
        "public health", "maternal", "child health", "tuberculosis", "malaria",
        "polio", "immunization", "PMJAY", "Jan Arogya", "NRHM", "wellness",
        "AYUSH", "ayurveda", "telemedicine", "eSanjeevani", "NHA"
    ],
    "Agriculture": [
        "agriculture", "farmer", "crop", "irrigation", "MSP",
        "minimum support price", "APMC", "mandi", "fertilizer", "pesticide",
        "PM-KISAN", "kisan", "horticulture", "fisheries", "dairy",
        "animal husbandry", "food grain", "agri", "seed", "soil",
        "organic farming", "eNAM", "cold storage", "food processing",
        "NABARD", "crop insurance", "PMFBY", "agricultural market"
    ],
    "Climate & Environment": [
        "climate", "environment", "pollution", "carbon", "emission",
        "forest", "wildlife", "biodiversity", "green", "renewable",
        "EIA", "environmental impact", "COP", "Paris Agreement",
        "sustainable development", "waste management", "recycling",
        "air quality", "water pollution", "plastic ban", "conservation",
        "wetland", "mangrove", "desertification", "ozone", "clean air",
        "NAPCC", "solar mission", "climate change", "net zero", "ESG"
    ],
    "Digital & Technology": [
        "digital", "technology", "IT", "software", "cyber", "internet",
        "broadband", "5G", "AI", "artificial intelligence", "blockchain",
        "startup", "data protection", "privacy", "MeitY", "DPDP",
        "Digital India", "UPI", "fintech", "e-governance", "Aadhaar",
        "DigiLocker", "UMANG", "ONDC", "semiconductor", "chip",
        "cloud computing", "data centre", "information technology",
        "IndiaAI", "digital public infrastructure", "DPI", "CERT-In"
    ],
    "Finance & Economy": [
        "finance", "economy", "budget", "tax", "GST", "fiscal",
        "monetary policy", "RBI", "SEBI", "stock", "investment",
        "FDI", "banking", "insurance", "pension", "inflation",
        "GDP", "economic growth", "disinvestment", "privatization",
        "NBFC", "mutual fund", "bond", "treasury", "revenue",
        "expenditure", "fiscal deficit", "PLI", "production linked",
        "Make in India", "Atmanirbhar", "credit", "NPA", "microfinance"
    ],
    "Social Protection": [
        "social protection", "welfare", "subsidy", "BPL", "poverty",
        "ration", "PDS", "public distribution", "food security",
        "MGNREGA", "NREGA", "employment guarantee", "pension scheme",
        "Ujjwala", "PM Garib Kalyan", "Jan Dhan", "DBT",
        "direct benefit transfer", "social security", "Antyodaya",
        "SC", "ST", "OBC", "scheduled caste", "scheduled tribe",
        "backward class", "reservation", "affirmative action",
        "Below Poverty Line", "safety net", "cash transfer"
    ],
    "Gender & Women": [
        "gender", "women", "girl", "female", "maternal", "Beti Bachao",
        "Beti Padhao", "She-Box", "dowry", "domestic violence",
        "sexual harassment", "POSH", "women empowerment", "SHG",
        "self help group", "Mahila", "Nari Shakti", "Sukanya Samriddhi",
        "maternity benefit", "one stop centre", "gender equality",
        "female labour", "CEDAW", "gender budget", "women reservation",
        "menstrual hygiene", "Ujjwala women", "gender mainstreaming"
    ],
    "Urban Development": [
        "urban", "city", "municipal", "smart city", "metro", "AMRUT",
        "PMAY urban", "housing urban", "town planning", "slum",
        "urbanization", "urban transport", "sewage", "municipal waste",
        "building code", "real estate", "RERA", "Swachh Bharat urban",
        "urban local body", "urban governance", "urban flood", "JNNURM",
        "SBM urban", "parking", "pedestrian", "urban renewal"
    ],
    "Rural Development": [
        "rural", "village", "panchayat", "gram", "Pradhan Mantri Gram",
        "PMGSY", "rural road", "PMAY rural", "housing rural",
        "Swachh Bharat gramin", "SBM gramin", "Sansad Adarsh Gram",
        "rural electrification", "Saubhagya", "Deendayal Upadhyaya",
        "DDUGJY", "rural livelihood", "NRLM", "rural employment",
        "tribal area", "block development", "district rural development"
    ],
    "Water & Sanitation": [
        "water", "sanitation", "toilet", "ODF", "open defecation",
        "Jal Jeevan", "drinking water", "water supply", "sewage",
        "Namami Gange", "Ganga", "river cleaning", "watershed",
        "Swachh Bharat", "SBM", "water conservation", "rainwater",
        "groundwater", "dam", "water resource", "irrigation",
        "water quality", "fluoride", "arsenic water", "WASH",
        "water treatment", "desalination", "piped water"
    ],
    "Energy": [
        "energy", "power", "electricity", "solar", "wind", "nuclear",
        "coal", "petroleum", "natural gas", "DISCOMS", "tariff",
        "energy efficiency", "BEE", "LED", "UJALA", "Saubhagya",
        "renewable energy", "green hydrogen", "battery storage",
        "electric vehicle", "EV", "charging infrastructure",
        "energy transition", "thermal power", "hydropower", "biomass",
        "KUSUM", "PM Surya Ghar", "rooftop solar", "grid"
    ],
    "Governance & Reform": [
        "governance", "reform", "transparency", "accountability",
        "RTI", "right to information", "e-governance", "judicial",
        "Supreme Court", "High Court", "administrative reform",
        "civil service", "UPSC", "IAS", "police reform", "federalism",
        "cooperative federalism", "delimitation", "election commission",
        "one nation one election", "lateral entry", "mission karmayogi",
        "anti-corruption", "Lokpal", "ombudsman", "decentralization"
    ],
    "Labour & Employment": [
        "labour", "labor", "employment", "wage", "minimum wage",
        "trade union", "industrial relations", "factory", "EPFO",
        "ESI", "provident fund", "gratuity", "labour code",
        "gig worker", "platform worker", "contract labour",
        "occupational safety", "child labour", "unemployment",
        "job creation", "skilling", "apprenticeship", "NSDC",
        "labour reform", "code on wages", "social security code",
        "industrial dispute", "layoff", "retrenchment"
    ],
    "Housing": [
        "housing", "PMAY", "Pradhan Mantri Awas", "affordable housing",
        "RERA", "real estate", "slum rehabilitation", "homeless",
        "shelter", "urban housing", "rural housing", "construction",
        "building material", "housing finance", "mortgage", "rent",
        "Model Tenancy Act", "housing for all", "EWS housing"
    ],
    "Transport & Infrastructure": [
        "transport", "highway", "railway", "airport", "port",
        "road", "bridge", "logistics", "Bharatmala", "Sagarmala",
        "NHAI", "Indian Railways", "metro rail", "Vande Bharat",
        "aviation", "shipping", "inland waterway", "freight corridor",
        "NIP", "national infrastructure pipeline", "Gati Shakti",
        "PM Gati Shakti", "expressway", "tunnel", "Atal Tunnel"
    ],
    "Defence & Security": [
        "defence", "defense", "military", "army", "navy", "air force",
        "border", "national security", "DRDO", "HAL", "ordnance",
        "Agnipath", "Agniveer", "strategic", "missile", "space",
        "ISRO", "counter terrorism", "internal security", "BSF", "CRPF",
        "coastal security", "Make in India defence", "defence procurement"
    ],
    "Trade & Commerce": [
        "trade", "commerce", "export", "import", "tariff", "customs",
        "WTO", "FTA", "free trade", "foreign trade policy", "DGFT",
        "special economic zone", "SEZ", "MSME", "small enterprise",
        "startup", "ease of doing business", "industrial policy",
        "competition commission", "CCI", "consumer protection",
        "e-commerce", "retail", "GeM", "government e-marketplace"
    ],
    "Science & Innovation": [
        "science", "innovation", "research", "CSIR", "DST", "ISRO",
        "space", "biotechnology", "DBT", "nanotechnology", "genomics",
        "patent", "intellectual property", "R&D", "Atal Innovation",
        "incubator", "accelerator", "deep tech", "quantum computing",
        "national research foundation", "Anusandhan", "scientific",
        "ICAR", "laboratory", "nuclear", "atomic energy"
    ],
    "Tribal & Indigenous": [
        "tribal", "adivasi", "indigenous", "scheduled tribe",
        "forest rights", "FRA", "PESA", "Van Dhan", "tribal area",
        "fifth schedule", "sixth schedule", "tribal welfare",
        "tribal sub plan", "Eklavya school", "minor forest produce",
        "tribal health", "tribal education", "TRIFED", "tribal affairs"
    ],
    "Disability & Inclusion": [
        "disability", "disabled", "PwD", "divyang", "accessibility",
        "inclusive", "RPwD Act", "barrier free", "assistive technology",
        "sign language", "braille", "mental disability", "autism",
        "cerebral palsy", "visual impairment", "hearing impairment",
        "wheelchair", "UDID", "disability certificate", "DEPwD",
        "Sugamya Bharat", "accessible India"
    ],
    "Child Rights & Youth": [
        "child", "children", "juvenile", "POCSO", "child labour",
        "child marriage", "adoption", "child welfare", "ICPS",
        "child protection", "youth", "Nehru Yuva Kendra", "NYKS",
        "adolescent", "Rashtriya Kishor Swasthya", "youth affairs",
        "National Youth Policy", "Khelo India", "sports", "young",
        "student", "higher education youth", "skill youth"
    ]
}


def classify_policy(title: str, description: str = "", source_sectors=None) -> list[str]:
    """
    Classify a policy item into one or more sectors based on keyword matching.
    Returns a list of matched sector names, sorted by relevance (match count).
    """
    text = f"{title} {description}".lower()
    scores: dict[str, int] = {}

    for sector, keywords in SECTOR_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw.lower() in text)
        if score > 0:
            scores[sector] = score

    if not scores:
        # If source has known sectors, use those as fallback
        if source_sectors and source_sectors != "all":
            if isinstance(source_sectors, list):
                return source_sectors[:3]
            return [source_sectors]
        return ["Governance & Reform"]  # default fallback

    # Return top sectors (up to 3), sorted by match count
    sorted_sectors = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [s[0] for s in sorted_sectors[:3]]


def get_sector_slug(sector: str) -> str:
    """Convert sector name to URL-friendly slug."""
    return sector.lower().replace(" & ", "-").replace(" ", "-")


def get_all_sectors() -> list[str]:
    """Return all sector names."""
    return list(SECTOR_KEYWORDS.keys())
