export default function (wishList = [], action) {
  switch (action.type) {
    case 'addToWishList':
      const isExist = wishList.filter(
        (article) => article.title === action.payload.title
      );

      if (isExist.length > 0) return wishList;

      const tempWishList = [
        ...wishList,
        {
          title: action.payload.title,
          description: action.payload.description,
          content: action.payload.content,
          url: action.payload.url,
        },
      ];
      return tempWishList;

    case 'deleteWishList':
      const deleteWishList = wishList.filter(
        (article) => article.title !== action.payload
      );
      return deleteWishList;
    default:
      return wishList;
  }
}
