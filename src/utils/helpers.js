export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  }).format(number / 10);
  return newNumber;
};

export const getUniqueValues = () => {};
