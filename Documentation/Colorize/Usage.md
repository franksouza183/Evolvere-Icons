
# Colorize

*How to customize the monochromatic icons.*


<br>

---

<div align = center>

[<kbd> <br> For Implementation Details Click Here <br> </kbd>][Implementation]

</div>

---

<br>

## Command

The tool can be found in **[`/Tools/`][Tools]**.

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

You **can** specify the `Color` & `Alpha` for:

- `Foreground`
- `Background`
- `Warning`
- `Success`
- `Accent`
- `Error`

*Everything is optional.*

<br>

### Example

```yaml
Foreground:
    Color : '090d11'    # Hex
    Alpha : .75         # Float
```

<br>

Check out the **[`Examples/Template.yaml`][Example]** for a full example.

<br>

    
<!----------------------------------------------------------------------------->

[Implementation]: Implementation.md
[Example]: ../../Resources/Examples/Template.yaml
[Tools]: ../../Tools


