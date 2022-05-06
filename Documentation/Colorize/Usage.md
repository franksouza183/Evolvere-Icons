
# Colorize

*How to customize the monochromatic icons.*

<div align = center>

<br>

![Showcase]

<br>

---

[<kbd> <br> Ｉｍｐｌｅｍｅｎｔａｔｉｏｎ　Ｄｅｔａｉｌｓ <br> </kbd>][Implementation]

---

<br>

</div>


## Requirements

*What you need to run this tool.*

<br>

<kbd> <br> You only need [Ｄｅｎｏ][Deno] <br> </kbd>

<br>
<br>

## Command

The tool can be found in [`/Tools/`][Tools] .

<br>

- You can call it from anywhere.

    *You don't have to be in a specific folder to start it.*
    
- You may require to make it executable.

    *Linux:*
    
    ```sh
    sudo chmod ug+x Tools/Colorize.js
    ```

<br>
<br>

## Syntax

```sh
Tools/Colorize.js <Template>
```

<kbd> Template </kbd> The path to your template file.

<br>

#### Example

*You can try it with the example template.*

```sh
Tools/Colorize.js Resources/Examples/Template.yaml
```

<br>
<br>

## Template

*The configuration for how to colorize the icons.*

<br>

You **can** specify the `Color` & `Alpha` for:

- `Foreground`
- `Background`
- `Warning`
- `Success`
- `Accent`
- `Error`

➜ *Everything is optional.* <br>
➜ *If not specified, default values are used.*

<br>

### Example

*Setting the **RGBA** of a component.*

```yaml
Foreground:
    Color : '090d11'    # Hex
    Alpha : .75         # Float
```

<br>

*Deactivating a component.*

```yaml
Foreground:
    Color : None
```

<br>

**Check out the [`Examples/Template.yaml`][Example] for a full example.**

<br>

    
<!----------------------------------------------------------------------------->


[Implementation]: Implementation.md
[Showcase]: ../../Resources/Tools/Colorizer.png
[Example]: ../../Resources/Examples/Template.yaml
[Tools]: ../../Tools

[Deno]: https://deno.land/


