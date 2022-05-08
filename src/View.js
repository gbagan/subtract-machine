export const slIntValue = ev => () => ev.currentTarget.value
export const slStringValue = ev => () => (console.log(ev.currentTarget.value), ev.currentTarget.value)
export const slChecked = ev => () => ev.currentTarget.checked