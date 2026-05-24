const svgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const makeArtwork = ({ title, subtitle, primary, secondary, accent, motif = 'trophy' }) => svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.24)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <circle cx="200" cy="140" r="110" fill="rgba(255,255,255,0.10)"/>
  <circle cx="1000" cy="120" r="160" fill="rgba(255,255,255,0.08)"/>
  <circle cx="940" cy="600" r="220" fill="rgba(255,255,255,0.05)"/>
  <path d="M0 650 C160 590, 260 720, 420 660 S700 610, 820 670 S1040 720, 1200 640 L1200 800 L0 800 Z" fill="rgba(8,26,59,0.35)"/>
  <path d="M0 680 C170 620, 260 740, 420 690 S710 640, 840 700 S1040 760, 1200 670" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
  ${motif === 'trophy' ? `
    <g transform="translate(825 220)">
      <path d="M75 0h100c0 96-42 145-100 145S-25 96-25 0h100z" fill="${accent}" opacity="0.95"/>
      <path d="M28 18c-75 0-95 40-95 78 0 44 35 72 103 72" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" stroke-linecap="round"/>
      <path d="M172 18c75 0 95 40 95 78 0 44-35 72-103 72" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" stroke-linecap="round"/>
      <rect x="73" y="145" width="104" height="28" rx="10" fill="rgba(255,255,255,0.80)"/>
      <rect x="48" y="170" width="154" height="24" rx="12" fill="rgba(255,255,255,0.65)"/>
    </g>
  ` : `
    <g transform="translate(760 220)">
      <circle cx="135" cy="165" r="120" fill="rgba(255,255,255,0.08)"/>
      <circle cx="135" cy="165" r="96" fill="#f8fafc"/>
      <path d="M39 133c34 20 68 31 96 31s62-11 96-31" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M59 187c34-18 49-31 76-31s42 13 76 31" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="120" cy="150" r="13" fill="${accent}"/>
      <circle cx="164" cy="180" r="13" fill="${accent}"/>
      <circle cx="143" cy="118" r="13" fill="${accent}"/>
    </g>
  `}
  <text x="64" y="130" fill="rgba(255,255,255,0.95)" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" letter-spacing="6">${title}</text>
  <text x="64" y="190" fill="rgba(255,255,255,0.82)" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="500">${subtitle}</text>
  <text x="64" y="730" fill="rgba(255,255,255,0.80)" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4">OFFICIAL IPL ANALYSIS VISUAL</text>
</svg>`);

const makeBadge = ({ short, primary, secondary }) => svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="${short} badge">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
  </defs>
  <circle cx="128" cy="128" r="124" fill="url(#g)"/>
  <circle cx="128" cy="128" r="100" fill="rgba(255,255,255,0.10)"/>
  <circle cx="128" cy="128" r="84" fill="rgba(255,255,255,0.08)"/>
  <text x="128" y="146" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="900" letter-spacing="8">${short}</text>
</svg>`);

export const dashboardData = {
  home: {
    title: 'IPL FRANCHISE MANAGEMENT',
    description: 'A premium website for IPL history, winners, strategies, franchise analysis, and team intelligence across 18 seasons.',
    heroImage: 'https://i.ytimg.com/vi/Pokb_49Iuuc/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLDSe610INkVXJkPNN5AQzixZsaU7A&usqp=CCk',
    stats: [
      { label: 'TEAMS', value: '10' },
      { label: 'SEASONS', value: '18' },
      { label: 'MATCHES', value: '890+' },
      { label: 'FANS REACHED', value: 'BILLIONS' }
    ],
    highlights: ['Current 10-team era', '18 years of champions', 'Auction strategy analysis', 'Responsive, image-rich website']
  },
  teams: [
{ 
  name: 'Chennai Super Kings',
  short: 'CSK',
  color: '#f59e0b',
  accent: '#1f4e79',
  titles: 5,
  tagline: 'Consistency, spin control, and elite leadership.',
  image: '/csk.jfif',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2xzF0Y8e6y_HZXjgdHDj1t7bUJtSJtgpTQ&s',
  summary: 'Built on retention, role clarity, and adapting to home conditions at Chepauk.',
  website: 'https://share.google/SetwBpA1UV28mrclG'
},
{ 
  name: 'Mumbai Indians',
  short: 'MI',
  color: '#1d4ed8',
  accent: '#0f172a',
  titles: 5,
  tagline: 'Power bowling, squad depth, and smart auction calls.',
  image: '/mi.jfif',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBbpIeQliJY-LAhgsW3TlQhipLF9TrCv0rw&s',
  summary: 'Won by building a balanced XI, elite death bowling, and a strong core across seasons.',
  website: 'https://share.google/SYr30DbZjMyx3BaZa'
},
{ 
  name: 'Kolkata Knight Riders',
  short: 'KKR',
  color: '#6d28d9',
  accent: '#111827',
  titles: 3,
  tagline: 'Aggression, spin choke, and fearless batting.',
  image: '/kkr.jfif',
  badge: 'https://static.india.com/wp-content/uploads/2017/02/kkr.jpg',
  summary: 'Used mystery spin, explosive openers, and aggressive intent to dominate key phases.',
  website: 'https://www.kkr.in/'
},
{ 
  name: 'Royal Challengers Bengaluru',
  short: 'RCB',
  color: '#dc2626',
  accent: '#111827',
  titles: 1,
  tagline: 'Brand power, top-order class, and 2025 title breakthrough.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4CY-GTXlBdRtPgOZDXZ_v9y9e-sF6-Fokw&s',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4CY-GTXlBdRtPgOZDXZ_v9y9e-sF6-Fokw&s',
  summary: 'In 2025, they won through auction discipline, improved balance, death bowling, and a clearer tactical spine.',
  website: 'https://share.google/5AqUjFpv8wWnEftBV'
},
{ 
  name: 'Sunrisers Hyderabad',
  short: 'SRH',
  color: '#ea580c',
  accent: '#111827',
  titles: 1,
  tagline: 'Pace attack and intent-based batting.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6b-11CQWe8dMKSGzx77QAGk6ZI3jJxC_-HQ&s',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6b-11CQWe8dMKSGzx77QAGk6ZI3jJxC_-HQ&s',
  summary: 'Built campaigns on a powerful pace attack and a top order that could dominate powerplays.',
  website: 'https://www.sunrisershyderabad.in/'
},
{ 
  name: 'Delhi Capitals',
  short: 'DC',
  color: '#2563eb',
  accent: '#0f172a',
  titles: 0,
  tagline: 'Youth-driven rebuild and tactical flexibility.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfeUxl2XKrw7Zdh3tHEG0y9p8dbfitr877IA&s',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfeUxl2XKrw7Zdh3tHEG0y9p8dbfitr877IA&s',
  summary: 'A franchise focused on developing young talent while sharpening strategic flexibility.',
  website: 'https://share.google/alAkG02TptacZ4cuI'
},
{ 
  name: 'Rajasthan Royals',
  short: 'RR',
  color: '#ec4899',
  accent: '#111827',
  titles: 1,
  tagline: 'Scouting, talent development, and bold retention.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfaohPVvWYJICOCCrjYG4-_Xg2GqFNYOvxnw&s',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfaohPVvWYJICOCCrjYG4-_Xg2GqFNYOvxnw&s',
  summary: 'The original moneyball team that still leans on scouting and player development.',
  website: 'https://www.rajasthanroyals.com/'
},
{ 
  name: 'Punjab Kings',
  short: 'PBKS',
  color: '#ef4444',
  accent: '#111827',
  titles: 0,
  tagline: 'High-upside batting and perpetual squad renewal.',
  image: 'https://i.cdn.newsbytesapp.com/images/l55120230324091158.jpeg',
  badge: 'https://i.cdn.newsbytesapp.com/images/l55120230324091158.jpeg',
  summary: 'Known for aggressive batting groups and constant pursuit of the right squad balance.',
  website: 'https://share.google/olAXGexCcEOfPAcUT'
},
{ 
  name: 'Gujarat Titans',
  short: 'GT',
  color: '#0f766e',
  accent: '#042f2e',
  titles: 1,
  tagline: 'Debut-era success built on balance and composure.',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Gujarat_Titans_Logo.svg/1280px-Gujarat_Titans_Logo.svg.png',
  badge: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Gujarat_Titans_Logo.svg/1280px-Gujarat_Titans_Logo.svg.png',
  summary: 'A debut-era champion defined by calm leadership, flexibility, and role discipline.',
  website: 'https://share.google/wXLivYwYlj7wL2mlk'
},
{ 
  name: 'Lucknow Super Giants',
  short: 'LSG',
  color: '#14b8a6',
  accent: '#0f172a',
  titles: 0,
  tagline: 'Structured squad balance and tactical bowling units.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYym3kc3QHWj5fzzhy2CQsDQ9kbyQAK-odA&s',
  badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYym3kc3QHWj5fzzhy2CQsDQ9kbyQAK-odA&s',
  summary: 'A modern franchise shaped around squad balance and tactical bowling deployments.',
  website: 'https://share.google/xLJj9urkEDzX9dTF3'
}
],
  winners: [
    { year: 2008, winner: 'Rajasthan Royals', strategy: 'Moneyball scouting, young domestic core, Shane Warne leadership.' },
    { year: 2009, winner: 'Deccan Chargers', strategy: 'Pace-heavy attack, disciplined batting, adapted to South African conditions.' },
    { year: 2010, winner: 'Chennai Super Kings', strategy: 'Core retention, spin control, and MS Dhoni’s tactical stability.' },
    { year: 2011, winner: 'Chennai Super Kings', strategy: 'Stable XI, deep batting, and match-up focused bowling rotations.' },
    { year: 2012, winner: 'Kolkata Knight Riders', strategy: 'Mystery spin, middle-order acceleration, and fearless leadership.' },
    { year: 2013, winner: 'Mumbai Indians', strategy: 'Balanced auction, strong pace unit, and a late-season leadership shift.' },
    { year: 2014, winner: 'Kolkata Knight Riders', strategy: 'Aggressive chase mindset and pressure-free batting in crunch games.' },
    { year: 2015, winner: 'Mumbai Indians', strategy: 'Seam attack, core continuity, and dependable finishing depth.' },
    { year: 2016, winner: 'Sunrisers Hyderabad', strategy: 'Elite pace attack, low-total defense, and Warner’s top-order dominance.' },
    { year: 2017, winner: 'Mumbai Indians', strategy: 'Close-game execution, death bowling, and clutch all-round performances.' },
    { year: 2018, winner: 'Chennai Super Kings', strategy: 'Experienced squad, return-from-ban motivation, and role clarity.' },
    { year: 2019, winner: 'Mumbai Indians', strategy: 'Data-led match-ups, elite death overs, and impactful finishing.' },
    { year: 2020, winner: 'Mumbai Indians', strategy: 'Powerplay bowling, batting depth, and a fearless big-game template.' },
    { year: 2021, winner: 'Chennai Super Kings', strategy: 'Experience plus youth blend, compact bowling plans, and venue adaptation.' },
    { year: 2022, winner: 'Gujarat Titans', strategy: 'Hardik Pandya’s leadership, flexible order, and composure under pressure.' },
    { year: 2023, winner: 'Chennai Super Kings', strategy: 'Auction efficiency, smart role usage, and late-overs control.' },
    { year: 2024, winner: 'Kolkata Knight Riders', strategy: 'Explosive openers, spin choke, and an aggressive playoff approach.' },
    { year: 2025, winner: 'Royal Challengers Bengaluru', strategy: 'Auction masterclass, balanced middle order, elite death bowling, and a stronger tactical identity.' }
  ],
  paradox: {
    title: 'THE VALUATION - PERFORMANCE PARADOX',
    success: ['Huge Revenue', 'Strong Brand Value', 'Global Sponsorships', 'Massive Fan Following'],
    inconsistent: ['Unpredictable Performance', 'Pressure to Win', 'High Player Turnover', 'No Guarantee of Trophy'],
    coreProblem: 'Franchises often convert commercial power into brand growth faster than they convert it into trophies.'
  },
  prosCons: {
    pros: [
      { title: 'Revenue Sharing Model', desc: 'Centralized pool distribution ensures financial stability.' },
      { title: 'Global Brand Exposure', desc: 'Access to a worldwide audience and premium sponsorship value.' },
      { title: 'Talent Development', desc: 'A platform for Indian and overseas talent to scale quickly.' },
      { title: 'High Entertainment Value', desc: 'The format creates constant engagement across fan segments.' }
    ],
    cons: [
      { title: 'Injuries & Player Burnout', desc: 'Compressed scheduling creates fatigue and injury risk.' },
      { title: 'High Pressure Environment', desc: 'Fans, media, and ownership expectations intensify every result.' },
      { title: 'Salary Cap Limitations', desc: 'A limited purse makes squad depth difficult to maintain.' },
      { title: 'Unpredictable Performance', desc: 'The shortest format amplifies volatility and variance.' }
    ]
  },
  challenges: ['Mega Auction & Player Retention', 'Team Balance', 'Managing Star Players', 'Pitch & Venue Variations', 'Injuries & Unavailability'],
  strategies: ['Data Analytics', 'Scouting & Talent Development', 'Sports Psychology', 'Fitness & Injury Management', 'Smart Team Building','Performace Strategy'],
  championPlaybooks: [
    {
      team: 'Chennai Super Kings',
      short: 'CSK',
      title: 'Retention, role clarity, and home-condition mastery',
      summary: 'CSK built a dynasty by keeping a stable core, using spin-friendly conditions intelligently, and giving every player a defined role. Their auction strategy was usually conservative, but it preserved team chemistry and decision-making consistency.',
      image: '/csk.jfif',
      accent: '#f59e0b'
    },
    {
      team: 'Mumbai Indians',
      short: 'MI',
      title: 'Power core, pace attack, and match-up driven squad building',
      summary: 'MI regularly focused on developing a stable championship core, then layering elite death bowling and flexible finishers around it. Their auction success came from identifying role players who fit exact match situations.',
      image: '/mi.jfif',
      accent: '#1d4ed8'
    },
    {
      team: 'Royal Challengers Bengaluru',
      short: 'RCB',
      title: '2025 title run through balance, discipline, and auction clarity',
      summary: 'RCB’s breakthrough title story centered on a cleaner auction strategy, a stronger bowling finish, and a middle order that protected the batting line-up. The biggest shift was moving from star dependence to balanced match-winning roles.',
      image: '/rcb.webp',
      accent: '#dc2626'
    }
  ],
  analytics: {
    scorecards: [
      { label: 'TOTAL MATCHES', value: '890+' },
      { label: 'AVERAGE RUNS', value: '165.4' },
      { label: 'WICKETS TAKEN', value: '1200+' }
    ],
    pieData: [
      { name: 'Won', value: 52, color: '#2563eb' },
      { name: 'Lost', value: 41, color: '#dc2626' },
      { name: 'No Result', value: 7, color: '#9ca3af' }
    ],
    barData: [
      { name: 'MI', wins: 145 },
      { name: 'CSK', wins: 140 },
      { name: 'KKR', wins: 132 },
      { name: 'RCB', wins: 128 },
      { name: 'SRH', wins: 118 }
    ],
    topPlayers: [
      { name: 'V. Kohli', matches: 237, runs: 7263, average: 38.66, strikeRate: 132.1 },
      { name: 'S. Dhawan', matches: 217, runs: 6617, average: 35.38, strikeRate: 127.1 },
      { name: 'D. Warner', matches: 213, runs: 6397, average: 31.55, strikeRate: 139.9 },
      { name: 'Suresh Raina', matches: 205, runs: 5528, average: 32.51, strikeRate: 136.7 },
      { name: 'AB de Villiers', matches: 184, runs: 5162, average: 39.70, strikeRate: 151.7 },
      { name: 'Sanju Samson', matches: 160, runs: 4419, average: 30.05, strikeRate: 138.9 },
      { name: 'KL Rahul', matches: 118, runs: 4163, average: 46.78, strikeRate: 134.6 },
      { name: 'Hardik Pandya', matches: 123, runs: 2309, average: 30.78, strikeRate: 145.8 },
      { name: 'Abhishek Sharma', matches: 63, runs: 1377, average: 25.03, strikeRate: 155.2 }
    ]
  },
  conclusion: {
    text: 'Success in the IPL requires a balance between commercial growth, player development, auction discipline, and match-day execution.',
    pillars: ['Strategic Planning', 'Effective Management', 'Data Driven Decisions', 'Sustainable Success']
  }
};
