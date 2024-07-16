export const reportMenus = [
  {
    label: 'Finance Report',
    slug: 'finance',
    children: [
      {
        label: 'Profit & Loss',
        route: 'finance/profit-loss',
      },
      {
        label: 'Sales by Item',
        route: 'finance/sales/item',
      },
      {
        label: 'Sales by Customer',
        route: 'finance/sales/customer',
      },
      {
        label: 'Sales by Sales Person',
        route: 'finance/sales/person',
      },
      {
        label: 'Sales Return',
        route: 'finance/sales/return',
      },
      {
        label: 'Sales by Channel',
        route: 'finance/sales/channel',
      },
    ],
  },
  {
    label: 'Stock Report',
    slug: 'inventory',
    children: [
      {
        label: 'Inventory summary',
        route: 'inventory/summary',
      },
      {
        label: 'Top Selling Products',
        route: 'inventory/top/sale',
      },
      {
        label: 'Not Selling Products',
        route: 'inventory/not/sale',
      },
      {
        label: 'Low inventory',
        route: 'inventory/low',
      },
      {
        label: 'Wishlist report',
        route: 'inventory/wishlist',
      },
    ],
  },
  {
    label: 'Customer',
    slug: 'statistics',
    children: [
      {
        label: 'Customer List',
        route: 'statistics/customer',
      },
      {
        label: 'Customer Reviews',
        route: 'statistics/reviews',
      },
    ],
  },
  {
    label: 'Analytics',
    slug: 'analytics',
    children: [
      {
        label: 'Dashboard',
        route: 'analytics/visitors',
      },
      {
        label: 'By Location',
        route: 'analytics/location',
      },
      {
        label: 'By Device',
        route: 'analytics/device',
      },
      {
        label: 'By Page',
        route: 'analytics/page',
      },
    ],
  },
]
