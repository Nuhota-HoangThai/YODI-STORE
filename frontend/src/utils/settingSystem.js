export const ACCESS_TOKEN_WEB_YODI_SHOP = "ACCESS_TOKEN_WEB_YODI_SHOP";
export const configHeader = () => {
  return {
    headers: {
      Authorization: localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP)
        ? "Bearer " + localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP)
        : null,
    },
  };
};
