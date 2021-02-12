export default function (flag = { cnty: 'fr' }, action) {
  if (action.type === 'changeFlag') {
    let newFlag = action.payload;
    return newFlag;
  } else {
    return flag;
  }
}
