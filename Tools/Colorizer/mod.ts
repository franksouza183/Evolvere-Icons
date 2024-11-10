
import { on , off } from './Screen.ts'
import { done } from './Print.ts'

import * as Steps from './Steps/mod.ts'


const { clear } = console


clear()
on()

await Steps.template()
await Steps.select()
await Steps.copy()

const paths = await Steps.search()

await Steps.colorize(paths)
await Steps.cache()

off()
done()
