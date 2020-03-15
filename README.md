# react-native-select-picker-modal
Simple select picker modal for React Native apps.

## Installation

```
npm install react-native-select-picker-modal
```

## Documentation

| Prop  | Description  | Type  | Default  | Required  |
|---|---|---|---|---|
| isOpen | Open state of select picker modal. | boolean | - | **YES** |
| toggleFunc | Set open state function. | function | - | **YES** |
| title | Title of select picker modal. | string | null | **NO** |
| titleStyle | Custom style for title. | object | - | **NO** |
| titleComponent | Custom component for title. If you're using titleComponent, titleStyle and title props is useless. | any | null | **NO** |
| selections | Items for select picker. | array | - | **YES** |
| value | Value state for selections | any | - | **YES** |
| setValue | Set value function for selections | function | - | **YES** |
| easing | Animation easing. [Please read](https://reactnative.dev/docs/easing) | string | 'linear' | **NO** |
| animationTime | Animation time. | number | 500 | **NO** |
| modalColor | Modal's background color. | string | 'white' | **NO** |
| backdropColor | Backdrop's background color. | string | 'rgba(0, 0, 0, 0.6)' | **NO** |
| modalRadius | Border radius value of modal. | number | 15 | **NO**  |
| modalStyle | Custom style of modal. | object | null | **NO** |
| isFullScreen | Full screen state of modal. | boolean | false | **NO** |
| onShow | Function to be run when modal is turned on. | function | null | **NO** |
| onClose | Function to be run when modal is turned off. | function | null | **NO** |
| isShowCloseButton | Show close button state. | boolean | false | **NO** |
| closeButtonText | If you want to show close button, give that as parameter. | string | null | **NO** |
| closeButtonStyle | Custom style of close button. | object | null | **NO** |
| closeButtonTextStyle | Custom style of close button text. | object | null | **NO** |
| closeButtonComponent | Custom component for close button. If you're using closeButtonText, closeButtonStyle, closeButtonTextStyle is useless. | any | null | **NO** |
| unselectedItemStyle | Custom style of unselected item. | object | null | **NO** |
| selectedItemStyle | Custom style of selected item. | object | null | **NO** |

Props table for selections array:

| Prop | Description | Type | Default | Required |
|---|---|---|---|---|
| id | Item id. | number | -  | **YES** |
| value | Item value.| any | - | **YES** |
| text | Item text. | string | -  | **YES** |
