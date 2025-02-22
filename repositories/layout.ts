import { AppTheme, LOCALSTORAGE_KEYS, THEME } from '@/lib/constants'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const desktopNavToggleAtom = atomWithStorage<boolean>(LOCALSTORAGE_KEYS.DESKTOP_NAV_TOGGLE, false)
export const appThemeAtom = atomWithStorage<AppTheme>(LOCALSTORAGE_KEYS.APP_THEME, THEME.LIGHT)
export const isDarkModeAtom = atom<boolean>(false)
export const isDesktopAtom = atom<boolean>(false)
