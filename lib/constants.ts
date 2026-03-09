import { RiDashboardLine, RiDashboardFill } from 'react-icons/ri'
import { AiOutlinePieChart, AiFillPieChart } from 'react-icons/ai'
import { HiOutlineUser, HiUser, HiOutlineUsers, HiUsers } from 'react-icons/hi2'
import { IoSettingsOutline, IoSettings } from 'react-icons/io5'
import { MemberOption, SplitOption } from '@/types/common'

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
    EXPENSES_FORM: '/app/expenses/form',
    GROUPS: '/app/groups',
    GROUPS_FORM: '/app/groups/form',
    FRIENDS: '/app/friends',
    SETTINGS: '/app/settings',
    PROFILE: '/app/profile',
    INVITE: '/app/invite',
    NOTIFICATIONS: '/app/notifications',
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
  SHOWN_PWA: 'shown_pwa',
}

export const QUERY_KEYS = {
  DASHBOARD: 'dashboard',
  GROUPS: 'groups',
  EXPENSES: 'expenses',
  FRIENDS: 'friends',
  USER: 'user',
  NOTI: 'noti',
  GROUPS_FRIENDS: 'groups_friends',
}

export enum QueryType {
  List = 'list',
  Details = 'details',
  Search = 'search',
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

export const NOTIFICATION_BAR_HEIGHT = 'h-12'

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'

export const FIREBASE_COLLTION_NAME = {
  USERS: 'users',
  FRIENDS: 'friends',
  NOTIS: 'notis',
  GROUPS: 'groups',
  GROUP_METADATA: 'group_metadata',
  EXPENSES: 'expenses',
  EXPENSE_METADATA: 'expense_metadata',
}

export const USER_404_MSG = [
  'Uh-oh! We couldn’t find that user. Are they hiding? 🕵️‍♂️',
  'Nope, no such user in this universe. 🌌',
  'That user must’ve vanished into the digital void. 💨',
  'We looked everywhere… but no user was found. 🧐',
  '404: Friend not found. Maybe check the spelling? 🔍',
]

export const YOURSELF_AS_FRIEND_MSG = [
  'Nice try! You can’t be your own friend. 😉',
  "You're already your biggest fan! No need to add yourself. 😄",
  "Self-love is great, but you can't friend yourself here. 💖",
  'Whoa there! You’re already on your own friend list. 😎',
  'Trying to friend yourself? Bold move! But nope. 🚫',
]

export const FRIEND_REQUEST_MSG = [
  'Your friendship rocket is on its way! 🚀',
  'Friend request launched—fingers crossed! 🤞',
  'You’ve made the first move. Let’s see what happens! 😏',
  'Your friend request is out there, spreading good vibes. ✨',
  'Boom! Friend request sent. Now we wait... ⏳',
  'Your friendship invitation is flying through cyberspace! 📬',
]

export const FRIEND_ALREADY_EXISTS_MSG = [
  'Whoa there! 🚦 You two are already in the friendship club 🎉',
  'Plot twist 📜: You’re already friends 🤝 No sequel needed 🎬',
  'Already friends 📋 No extra paperwork required 🖊️',
  'You’re already connected 📡—Friendship Wi-Fi is strong 📶',
  'You two are already peas in a pod 🫛',
]

export const countPerPage = 10

export const memberOptions = [
  {
    label: 'Friend',
    value: MemberOption.FRIEND,
  },
  {
    label: 'Group',
    value: MemberOption.GROUP,
  },
]

export const splitOptions = [
  {
    label: 'Equally',
    value: SplitOption.SPLIT_EQUALLY,
  },
  {
    label: 'Custom',
    value: SplitOption.CUSTOM,
  },
]
