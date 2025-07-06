import { RiDashboardLine, RiDashboardFill } from 'react-icons/ri'
import { AiOutlinePieChart, AiFillPieChart } from 'react-icons/ai'
import { HiOutlineUser, HiUser, HiOutlineUsers, HiUsers } from 'react-icons/hi2'
import { IoSettingsOutline, IoSettings } from 'react-icons/io5'

export const ROUTES = {
  LANDING: {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    BLOGS: '/blogs',
  },
  APP: {
    HOME: '/app',
    AUTHORIZATION: '/app/authorization',
    DASHBOARD: '/app/dashboard',
    EXPENSES: '/app/expenses',
    EXPENSES_CREATE: '/app/expenses/create',
    GROUPS: '/app/groups',
    GROUPS_CREATE: '/app/groups/create',
    FRIENDS: '/app/friends',
    SETTINGS: '/app/settings',
    PROFILE: '/app/profile',
  },
  PORTAL: {
    HOME: '/portal',
  },
}

export const DESKTOP_NAV_LINKS = [
  {
    title: 'Dashboard',
    link: ROUTES.APP.DASHBOARD,
    Icon: RiDashboardLine,
    SelectedIcon: RiDashboardFill,
  },
  {
    title: 'Expenses',
    link: ROUTES.APP.EXPENSES,
    Icon: AiOutlinePieChart,
    SelectedIcon: AiFillPieChart,
  },
  {
    title: 'Groups',
    link: ROUTES.APP.GROUPS,
    Icon: HiOutlineUsers,
    SelectedIcon: HiUsers,
  },
  {
    title: 'Friends',
    link: ROUTES.APP.FRIENDS,
    Icon: HiOutlineUser,
    SelectedIcon: HiUser,
  },
  {
    title: 'Settings',
    link: ROUTES.APP.SETTINGS,
    Icon: IoSettingsOutline,
    SelectedIcon: IoSettings,
  },
]

export const MOBILE_NAV_LINKS = [
  {
    title: 'Dashboard',
    link: ROUTES.APP.DASHBOARD,
    Icon: RiDashboardLine,
    SelectedIcon: RiDashboardFill,
  },
  {
    title: 'Expenses',
    link: ROUTES.APP.EXPENSES,
    Icon: AiOutlinePieChart,
    SelectedIcon: AiFillPieChart,
  },
  {
    title: 'Groups',
    link: ROUTES.APP.GROUPS,
    Icon: HiOutlineUsers,
    SelectedIcon: HiUsers,
  },
  {
    title: 'Profile',
    link: ROUTES.APP.PROFILE,
    Icon: HiOutlineUser,
    SelectedIcon: HiUser,
  },
]

export const LOCALSTORAGE_KEYS = {
  DESKTOP_NAV_TOGGLE: 'desktop_nav_toggle',
  APP_THEME: 'app_theme',
  USER: 'user',
}

export const QUERY_KEYS = {
  DASHBOARD: 'dashboard',
  GROUPS: 'groups',
  EXPENSES: 'expenses',
  FRIENDS: 'friends',
  USER: 'user',
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
  '#ef4444cc',
  '#f97316cc',
  '#f59e0bcc',
  '#eab308cc',
  '#84cc16cc',
  '#22c55ecc',
  '#10b981cc',
  '#14b8a6cc',
  '#06b6d4cc',
  '#0ea5e9cc',
  '#3b82f6cc',
  '#6366f1cc',
  '#8b5cf6cc',
  '#a855f7cc',
  '#d946efcc',
  '#ec4899cc',
  '#f43f5ecc',
]

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type AppTheme = (typeof THEME)[keyof typeof THEME]

export const NOTIFICATION_BAR_HEIGHT = 'h-12'

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'

export const FIREBASE_COLLTION_NAME = {
  USERS: 'users',
  FRIENDS: 'friends',
  NOTIFICATION: 'notification',
}
