#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable


import { on , off } from './Colorizer/Screen.js'
import { done } from './Colorizer/Print.js'
import Steps from './Colorizer/Steps/Steps.js'

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







