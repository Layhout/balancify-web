import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
export const djs = dayjs
