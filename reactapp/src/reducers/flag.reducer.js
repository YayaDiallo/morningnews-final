export default function (flag = 'fr', action) {
  if (action.type === 'changeFlag') {
    let newFlag = action.payload;
    return newFlag;
  } else {
    return flag;
  }
}
