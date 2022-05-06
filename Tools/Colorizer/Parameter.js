
import { parse } from 'https://deno.land/std/flags/mod.ts'


const { args } = Deno;


const parameter = parse(args);


export const templatePath = parameter._[0];
