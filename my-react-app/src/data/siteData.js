export const branding = {
  primaryName: 'Rana Brothers',
  alternateName: 'Imran Flour Mill',
  useAlternate: false,
  tagline: 'Importer, exporter and comission agents, wholesale traders.',
  yearsOfExcellence: 20,
}

export const navigation = {
  main: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    {
      label: 'Products',
      path: '/products',
      children: [
        { label: 'Fruits', path: '/products/fruits' },
        { label: 'Vegetables', path: '/products/vegetables' },
      ],
    },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ],
}

export const contactInfo = {
  phone: '03018424686',
  ptcl: '04237701368',
  address: 'Shop no 23 sabzi mandi badami bagh ravi link road lahore',
  email: 'ranabrothers323@gmail.com',
  whatsappNumberInternational: '923018424686',
}

export const homeContent = {
  hero: {
    heading: 'Rana Brothers',
    subheading: '20 years of excellence',
    description:
      'Commission-based agri-supply business, importer/exporter, wholesale traders dedicated to reliable fruits and vegetables supply.',
  },
  credibility: [
    {
      title: 'Export Capability',
      description: 'Experienced in handling export-grade fruits and vegetables to key global markets.',
    },
    {
      title: 'Wholesale Supply',
      description: 'Consistent bulk supply for wholesalers, retailers, and institutional buyers.',
    },
    {
      title: 'Quality Standards',
      description: 'Strict quality checks at sourcing, grading, and packing stages.',
    },
    {
      title: 'Fast Logistics Support',
      description: 'Time-bound dispatches with cold-chain and market-aligned logistics partners.',
    },
  ],
  vision: {
    title: 'Our Vision',
    body:
      'To be a trusted bridge between growers, local markets, and international buyers by delivering fresh, safe, and fairly traded agricultural produce. Rana Brothers aims to expand Pakistan’s fruits and vegetables footprint worldwide through transparent commission-based trading, disciplined logistics, and long-term relationships with our partners.',
  },
  mottos: [
    'Integrity in every transaction',
    'Farmer and buyer centric approach',
    'On-time, market-aligned deliveries',
    'Consistent quality and grading',
    'Transparent commission structure',
    'Long-term relationships over short-term gains',
  ],
  testimonials: [
    {
      name: 'Wholesale Partner – Lahore',
      message:
        'Rana Brothers manage our daily vegetable supply with discipline and honesty. Their market insight helps us plan better.',
    },
    {
      name: 'Export Client – Middle East',
      message:
        'Professional packing, timely shipments, and clear documentation. A reliable source for fresh mangoes and kinnow.',
    },
    {
      name: 'Retail Chain Buyer',
      message:
        'Their team responds quickly and adjusts volumes as per store demand. Quality consistency has been excellent.',
    },
  ],
}

export const leadership = {
  ceo: {
    name: 'Rana Imran',
    title: 'Chief Executive Officer',
    message:
      'At Rana Brothers, we focus on dependable, commission-based trading of all kinds of fruits and vegetables for local and international buyers. From sourcing at Sabzi Mandi Badami Bagh to export-ready packing, our team is committed to maintaining freshness, fair pricing, and transparent dealings so that our partners can confidently grow their business worldwide.',
  },
  chachuProfile: {
    title: 'About Us',
    subtitle: 'Based on combined interviews and field experience',
    body:
      'Built on years of hands-on market experience and guidance from senior family members (Chachu), Rana Brothers has developed a deep understanding of pricing, demand cycles, and quality expectations. These insights have been collected through interviews, daily mandi exposure, and continuous interaction with growers, agents, and buyers.',
    interviewNote:
      'This profile reflects combined interviews and observations from Sabzi Mandi Badami Bagh and surrounding markets, capturing how the team approaches negotiations, dispute resolution, and long-term customer service.',
  },
}

export const proofSections = [
  {
    title: 'Member – Price Control Council',
    subtitle: 'Management Department, Govt. of Punjab',
    description:
      'Representation within the Price Control Council highlights our active role in supporting fair pricing and responsible market practices.',
    imageAlt: 'Highlight of first page membership proof placeholder',
  },
  {
    title: 'General Secretary – Anjaman Aahrtiaan (Regd)',
    subtitle: 'Sabzi Mandi Badami Bagh Link Ravi Road Lahore',
    description:
      'Leadership responsibilities within Anjaman Aahrtiaan (Regd) at Vegetable Market Badami Bagh underline our connection with local stakeholders.',
    imageAlt: 'General Secretary information placeholder',
  },
  {
    title: 'Co-Convener – Trade & Market Coordination',
    subtitle: 'Certificate proof placeholder',
    description:
      'Co-Convener certification demonstrates our involvement in coordinating traders, commission agents, and regulatory bodies.',
    imageAlt: 'Co-Convener certificate placeholder',
  },
]

export const products = {
  fruits: [
    {
      id: 'apple',
      name: 'Apple',
      category: 'Fruits',
      variety: 'Selected table varieties',
      grade: 'Export / Local market grade',
      packaging: '10–20 kg cartons (as per buyer requirement)',
      availability: 'Seasonal, volume-based bookings available',
    },
    {
      id: 'mango',
      name: 'Mango',
      category: 'Fruits',
      variety: 'Sindhri, Chaunsa and other export varieties',
      grade: 'Export quality with grading options',
      packaging: 'Standard export cartons with protective packing',
      availability: 'Peak season exports and spot mandi supply',
    },
    {
      id: 'melon',
      name: 'Melon',
      category: 'Fruits',
      variety: 'Local and export-accepted types',
      grade: 'Market-selected for size and sweetness',
      packaging: 'Loose loading or carton packing',
      availability: 'Seasonal with flexible lot sizes',
    },
    {
      id: 'banana',
      name: 'Banana',
      category: 'Fruits',
      variety: 'Handled in ripening and green stages',
      grade: 'Wholesale grading for different markets',
      packaging: 'Cartons or bunch handling as required',
      availability: 'Round-the-year mandi-based availability',
    },
    {
      id: 'oranges',
      name: 'Oranges',
      category: 'Fruits',
      variety: 'Kinnow and table orange selections',
      grade: 'Export and local market grades',
      packaging: 'Net bags or cartons depending on market',
      availability: 'Strong seasonal export window',
    },
  ],
  vegetables: [
    {
      id: 'onion',
      name: 'Onion',
      category: 'Vegetables',
      variety: 'Red and white onion lots',
      grade: 'Wholesale graded for size and freshness',
      packaging: 'Mesh bags, jute bags, or loose loading',
      availability: 'Year-round with seasonal volume peaks',
    },
    {
      id: 'tomatoes',
      name: 'Tomatoes',
      category: 'Vegetables',
      variety: 'Market-fresh table tomatoes',
      grade: 'Graded as per buyer preference',
      packaging: 'Crates or cartons for safe handling',
      availability: 'Ongoing mandi-based availability',
    },
    {
      id: 'potato',
      name: 'Potato',
      category: 'Vegetables',
      variety: 'Processing and table varieties',
      grade: 'Selection by size and skin quality',
      packaging: 'Jute or mesh bags with bulk quantities',
      availability: 'Cold storage and fresh stock options',
    },
    {
      id: 'ginger',
      name: 'Ginger',
      category: 'Vegetables',
      variety: 'Local and imported lots (as per demand)',
      grade: 'Cleaned and sorted for trade',
      packaging: 'Bags or cartons for hygienic transport',
      availability: 'Market-dependent, with export possibilities',
    },
    {
      id: 'garlic',
      name: 'Garlic',
      category: 'Vegetables',
      variety: 'Local and Chinese garlic availability',
      grade: 'Sorted bulbs with size grading',
      packaging: 'Net bags or cartons',
      availability: 'Round-the-year with seasonal peaks',
    },
  ],
}

export const services = [
  {
    id: 'export-import',
    title: 'Export & Import',
    description:
      'End-to-end handling of export and import consignments for fruits and vegetables, including sourcing, documentation, and coordination with shipping partners.',
  },
  {
    id: 'logistics-support',
    title: 'Logistics Support',
    description:
      'Arrangement of transport, cold-chain coordination, and dispatch planning from Sabzi Mandi Badami Bagh to local and international gateways.',
  },
  {
    id: 'packaging-services',
    title: 'Packaging Services',
    description:
      'Market-compliant and export-ready packing solutions, aligned with buyer branding, grading, and shelf-life requirements.',
  },
]

export const seo = {
  home: {
    title: 'Rana Brothers – Importer, Exporter & Commission Agents',
    description:
      'Rana Brothers is a commission-based agri-supply business in Lahore, specializing in wholesale fruits and vegetables, export services, and trusted market linkages.',
  },
  about: {
    title: 'About Rana Brothers – 20 Years of Excellence',
    description:
      'Learn about Rana Brothers, CEO Rana Imran, and the leadership roles held across Price Control Council, Anjaman Aahrtiaan, and Sabzi Mandi Badami Bagh.',
  },
  products: {
    title: 'Products – Fruits & Vegetables Catalog | Rana Brothers',
    description:
      'Explore the Rana Brothers fruits and vegetables catalog including apples, mangoes, oranges, onions, potatoes, and more for wholesale and export buyers.',
  },
  services: {
    title: 'Services – Export, Import, Logistics & Packaging | Rana Brothers',
    description:
      'Discover Rana Brothers services including export & import coordination, logistics support, and packaging services for agri-supply operations.',
  },
  contact: {
    title: 'Contact Rana Brothers – Get Quote & Inquiries',
    description:
      'Get in touch with Rana Brothers for wholesale, export, and commission-based trading inquiries. Call, email, or send a quick WhatsApp message today.',
  },
}

