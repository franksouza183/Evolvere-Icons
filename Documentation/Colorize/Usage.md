
# Colorize     [<kbd> <br> Ｉｍｐｌｅｍｅｎｔａｔｉｏｎ　Ｄｅｔａｉｌｓ <br> </kbd>][Implementation]

*How to customize the monochromatic icons.*

<div align = center>

<br>
   
<kbd> <br> ![Showcase] <br> </kbd>

<br>

</div>


<br>
<br>

## Command

The tool can be found in [`/Tools/`][Tools] .

<br>

- You don't have to be in a specific folder to run the tool.

   ```console
   user@computer:~/Projects/Evolvere-Icons$ Tools/Colorize-AMD64
   ```
   
   ```console
   user@computer:~$ Projects/Evolvere-Icons/Tools/Colorize-ARM64
   ```
   
   <br>

- You may need to make it executable.

    ```sh
    sudo chmod ug+x Tools/Colorize-AMD64
    ```

<br>
<br>

## Syntax

```sh
Tools/Colorize-AMD64 <Template>
```

<kbd> Template </kbd> The path to your template file.

<br>

#### Example

*You can try it with the example template.*

```sh
Tools/Colorize-ARM64 Resources/Examples/Template.yaml
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


