
import { on , off } from './Screen.js'
import { done } from './Print.js'
import Steps from './Steps/Steps.js'

const { clear } = console;


clear();
on();

await Steps.template();
await Steps.selection();
await Steps.copy();

const paths = await Steps.search();

await Steps.colorize(paths);
await Steps.cache();

off();
done();
