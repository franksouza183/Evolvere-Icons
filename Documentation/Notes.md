# Notes & Usage

<br>

## Variants

The variants have been removed and will be replaced <br>
with a script that will generate a custom theme with <br>
the desired colors.

> I promise xD


You can still play with the **[Old Variants]**.

*Compatible with some windows ( wine ) applications.*

<br>
<br>

## Small Icons

All icons smaller or equal to `24px` are monochromatic, <br>with very few exceptions, preventing consistency break.

So, if you see small colorful icons, it is because they <br>
haven't been covered yet or maybe it's hard-coded.

<br>
<br>

## Transitioning

The package is in the process of migrating to <br>
the new style, so expect icons with the old one.

*I am currently focusing on the most popular.*

<br>
<br>

## Dark Themes

When using dark themes, the small <br>
icons will be visible by bright outlines.

If you don't want this, you can use the **[Colorizer]** tool <br>
created by **[@ElectronicsArchiver]** and colorize all<br>
monochromatic icons to your taste. Here's<br>
an example using the included EvolvereDark template:

```sh
./path_to_evolvere/Tools/Colorize-AMD64    \
    ./path_to_evolvere/Resources/Examples/EvolvereDark.yaml
```

( or `Colorize-ARM64` )

<br>

A new directory `Build` will be created on root level<br>
of the Evolvere Icons cloned repository, just rename<br>
it and move to `~/.local/share/icons` or to<br>
`/usr/share/icons` for multi user compatibility.

<br>
<br>

## Live Preview

Open `Resources/preview.svg` <br>
in **[Inkscape]** for a *'live'* preview.

<br>


<!----------------------------------------------------------------------------->

[@ElectronicsArchiver]: https://github.com/ElectronicsArchiver
[Inkscape]: https://inkscape.org/

[Colorizer]: Documentation/Colorize/Usage.md
