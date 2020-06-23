import dayjs from 'dayjs'
import rT from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'

dayjs.extend(rT)
dayjs.locale(zh)

export default dayjs
