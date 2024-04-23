export const getCityByCode = (
  code: number | null,
  listCity: { code: number; name: string }[]
): { name: string } | null => {
  const city = listCity.find((city) => city.code === code);

  return city ? { name: city.name } : null;
};
export const convertImageToBase64 = (file: any) => {
  return new Promise((resolve) => {
    let baseURL: any = "";
    // Make new FileReader
    let reader: any = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
