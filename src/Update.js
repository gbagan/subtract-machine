const slValue = ev => () => ev.currentTarget.value;
exports.slIntValue = slValue;
exports.slStringValue = slValue;
exports.slChecked = ev => () => ev.currentTarget.checked;