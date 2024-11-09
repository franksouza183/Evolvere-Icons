
import { fromFileUrl , dirname , join , resolve } from 'https://deno.land/std/path/mod.ts';

const { url } = import.meta;


export const root = resolve(join(dirname(fromFileUrl(url)),'..','..'));


export const monochrome = join(root,'Resources','Data','Monochrome.yaml');

export const icons = join(root,'Icons');

export const build = join(root,'Build');
