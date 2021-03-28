export default function (lang = 'fr', action) {
  if (action.type === 'changeLang') {
    let newLang = action.payload;
    return newLang;
  } else {
    return lang;
  }
}
