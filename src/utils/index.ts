const calculateTotalPrice = (
  pricesWithIds: { id: number; price: number }[],
  ids: number[]
): number => {
  console.log(pricesWithIds, ids);
  return ids.reduce(
    (acc, i) => acc + (pricesWithIds.find((j) => Number(j.id) === Number(i))?.price || 0),
    0
  );
};

export { calculateTotalPrice };
