export const formatNumberWithCommas = (value) => {
  if (value === "") return "";
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
