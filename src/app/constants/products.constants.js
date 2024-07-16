export const productStatus = [
  {
    id: 1,
    name: 'Published',
    color: 'bg-success',
  },
  {
    id: 2,
    name: 'Draft',
    color: 'bg-primary',
  },
  {
    id: 3,
    name: 'Scheduled',
    color: 'bg-warning',
  },
  {
    id: 0,
    name: 'Inactive',
    color: 'bg-danger',
  },
]

export const productTypes = [
  {
    id: 1,
    title: 'Physical',
    slug: 'physical',
    description: 'A tangible product that you ship or customers can pick up',
    icon: '',
  },
  {
    id: 3,
    title: 'Service',
    slug: 'service',
    description: 'Collect payment for a consultation, or experience that doesn’t require booking',
    icon: '',
  },
  {
    id: 4,
    title: 'Digital',
    slug: 'digital',
    description:
      'A digital file customers can download, like an ebook, PDF template, or audio file',
    icon: '',
  },
  // {
  //   id: 2,
  //   title: 'Gift Item',
  //   slug: 'gift-item',
  //   description: 'A gift item customers can use to purchase any product or service',
  //   icon: '',
  // },
]

export const options = [
  {
    id: 1,
    value: 'Color',
    label: 'Color',
    list: ['Black', 'White', 'Blue', 'Matte Blue', 'Green', 'Red', 'Yellow'],
  },
  {
    id: 2,
    value: 'Size',
    label: 'Size',
    list: ['Large', 'Medium', 'Small', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
  },
  {id: 3, value: 'Material', label: 'Material', list: ['Metal', 'Plastic', 'Cast Iron', 'Steel']},
  {id: 4, value: 'Weight', label: 'Weight', list: ['500 g', '1 KG', '2 KG', '2.5 KG', '5 KG']},
  {id: 5, value: 'Length', label: 'Length', list: []},
  {
    id: 6,
    value: 'Ram',
    label: 'Ram',
    list: ['1 GB', '2 GB', '3 GB', '4 GB', '5 GB', '6 GB', '8 GB', '12 GB'],
  },
  {
    id: 7,
    value: 'Rom',
    label: 'Rom',
    list: ['8 GB', '16 GB', '32 GB', '64 GB', '128 GB', '256 GB'],
  },
  {id: 8, value: 'Utility', label: 'Utility', list: []},
  // {id: 9, value: 'Custom', label: 'Custom', list: []},
]

export const productWeightUnitSelectOptions = [
  {
    id: 1,
    label: 'kg',
    description: 'Kilogram',
  },
  {
    id: 2,
    label: 'gm',
    description: 'gram',
  },
  {
    id: 3,
    label: 'lb',
    description: 'pound',
  },
];

export const productLengthUnitSelectOptions = [
  {
    id: 1,
    label: 'mm',
    description: 'Millimeter',
  },
  {
    id: 2,
    label: 'cm',
    description: 'Centimeter',
  },
  {
    id: 3,
    label: 'm',
    description: 'Meter',
  },
  {
    id: 4,
    label: 'in',
    description: 'Inch',
  },
  {
    id: 5,
    label: 'ft',
    description: 'Feet',
  },
];
