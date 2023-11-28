export const validateFullName = (fullName) => {
  if (fullName.length < 8) return "Họ tên phải có tối thiểu 8 kí tự";
  else if (fullName.length > 30) return "Họ tên có tối đa 30 kí tự";
  return "";
};
export const validatePhone = (phone) => {
  if (phone.charAt(0) === "0")
    if (phone.length !== 10 && phone.length !== 11)
      return "Số điện thoại phải có từ 10 đến 11 kí tự";
  return "";
};

export const validateAddress = (address) => {
  if (address.length < 8) return "Địa chỉ phải có tối thiểu 8 kí tự";
  return "";
};

export const validatePassword = (passowrd) => {
  if (passowrd.length < 8) return "Mật khẩu phải có tối thiểu 8 kí tự";
  return "";
};
