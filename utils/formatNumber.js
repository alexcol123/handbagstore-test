export const formatNumber = (digit) => {
  return new Intl.NumberFormat('eng-Us').format(digit)
}
