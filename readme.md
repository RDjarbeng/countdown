# RCountdown Widget

Application that displays a countdown to a given date.

File size is only `Xkb` and has `zero` dependencies!
<br><br>

## Usage

Simply include the script in your page:

```html
<script src="path/to/rcountdown.js"></script>
```

Place the component anywhere in your document, setting the date it should count down to.

```html
<app-rcountdown cd-to="2023-05-17"></app-rcountdown>
```

That's it!<br>
The widget auto sizes to fit it's container and blend with the page styles :wink: <br>

If smart-sizing isn't enough for you, you can customize the component size and styles via the available `attributes` or `CSS`
<br>

### Attributes

| Attribute | Value                        | Description                                                                   |
| --------- | :--------------------------- | :---------------------------------------------------------------------------- |
| cd-to     | `yyyy-mm-dd` date            | date to countdown to                                                          |
| orient    | `horizontal` \| `vertical`   | orientation for the clock                                                     |
| size      | `CSS<length>unit` except `%` | set the size of the timer tiles. Recommend responsive units like `vmin` `rem` |

<br>

### Extending RCountdown

`Classes` have the prefix `rc_`

Each widget in the page is given an incremental id, ie `rcX`, where `X` is 1,2,3... <br>
You can therefore style each one individually via `CSS`

Example

```css
#rc1 {
    /* your styles */
}
#rc1 .rc_timer {
}
```

However, it is recommended that you manipulate the styling via the the following css variables, as the properties make heavy use of `CSS` functions

```css
#rc1 {
    --timer-width: myvalue;
    --timer-spacing: myvalue;
    --bg-color: myvalue;
    --timer-text-bg: myvalue;
}
```
