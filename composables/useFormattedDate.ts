import { useDayjs } from '#dayjs'
const dayjs = useDayjs()

export default function useFormattedDate(dateString: string) {
  return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss')
}
