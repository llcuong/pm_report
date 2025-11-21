export const FACTORY_DATA = [
  { value: "gd", label: "Giang Dien", description: "PVC - NBR" },
  { value: "lk", label: "Long Khanh", description: "NBR" },
  { value: "lt", label: "Long Thanh", description: "PVC" },
];

export const BRANCH_BY_FACTORY_DATA = [
  {
    id: 'gd',
    branch: [
      { value: "PVC", label: "PVC" },
      { value: "NBR1", label: "NBR1" },
      { value: "NBR2", label: "NBR2" },
      { value: "NBR3", label: "NBR3" },
    ],
  },
  {
    id: 'lk',
    branch: [
      { value: "NBR1", label: "NBR1" },
      { value: "NBR2", label: "NBR2" },
    ],
  },
  {
    id: 'lt',
    branch: [
      { value: "PVC1", label: "PVC1" },
      { value: "PVC2", label: "PVC2" },
    ],
  },
];

export const HOUR_LIST = [
  ...Array.from({ length: 18 }, (_, i) => String(i + 6).padStart(2, '0')),
  ...Array.from({ length: 6 }, (_, i) => String(i).padStart(2, '0')),
];

export const HOUR_CLASS_CONFIG = [
    {
        id: "class_1",
        hours: HOUR_LIST.slice(0, 8),   // 06–13
    },
    {
        id: "class_2",
        hours: HOUR_LIST.slice(8, 16),  // 14–21
    },
    {
        id: "class_3",
        hours: HOUR_LIST.slice(16, 24), // 22–05
    },
];

export const REFRESH_INTERVAL = 300000;