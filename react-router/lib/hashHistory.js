import createHashHistory from 'utils/history/lib/createHashHistory'
import createRouterHistory from './createRouterHistory'
export default createRouterHistory(createHashHistory)

