export default function (token = '', action) {
  if (action.type === 'addToken') {
    let newToken = action.token;
    return newToken;
  } else {
    return token;
  }
}
