export const ROUTES = {
  LANDING: {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    BLOGS: '/blogs',
  },
  APP: {
    HOME: '/app',
    DASHBOARD: '/app/dashboard',
    EXPENSES: '/app/expenses',
    EXPENSES_CREATE: '/app/expenses/create',
    GROUPS: '/app/groups',
    FRIENDS: '/app/friends',
    SETTINGS: '/app/settings',
  },
  PORTAL: {
    HOME: '/portal',
  },
}

export const LOCALSTORAGE_KEYS = {
  DESKTOP_NAV_TOGGLE: 'desktop_nav_toggle',
  APP_THEME: 'app_theme',
}

export const QUERY_KEYS = {
  DASHBOARD: 'dashboard',
  GROUPS: 'groups',
  EXPENSES: 'expenses',
  FRIENDS: 'friends',
}

export const EXPENSE_ICONS = {
  SUIT_CASE: 'suit-case',
  COFFEE: 'coffee',
  FOOD: 'food',
  STAR: 'star',
  GIFT: 'gift',
  HEART: 'heart',
  BOOKMARK: 'bookmark',
}

export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATE_FORMAT = 'DD MMM YYYY'
export const DEFAULT_DATETIME_FORMAT = 'DD MMM YYYY, hh:mm A'

export const BG_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
]

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type AppTheme = (typeof THEME)[keyof typeof THEME]
