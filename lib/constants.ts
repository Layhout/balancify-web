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
  '#fca5a5',
  '#fdba74',
  '#fcd34d',
  '#fde047',
  '#bef264',
  '#86efac',
  '#6ee7b7',
  '#5eead4',
  '#67e8f9',
  '#7dd3fc',
  '#93c5fd',
  '#a5b4fc',
  '#c4b5fd',
  '#d8b4fe',
  '#f0abfc',
  '#f9a8d4',
  '#fda4af',
]

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type AppTheme = (typeof THEME)[keyof typeof THEME]
