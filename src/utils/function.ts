export const getCityByCode = (
  code: number | null,
  listCity: { code: number; name: string }[]
): { name: string } | null => {
  const city = listCity.find((city) => city.code === code);

  return city ? { name: city.name } : null;
};
