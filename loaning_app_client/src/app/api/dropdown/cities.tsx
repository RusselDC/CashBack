import axios from "axios";

export const getCities = async (provinceCode: string) => {
  try {
    const response = await axios.get(
      `https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`,
    );

    const cities = response?.data.reduce(
      (accu: { [key: string]: string }, current: Record<string, string>) => {
        accu[current.name] = current.code;
        return accu;
      },
      {},
    );

    return cities;
  } catch (error) {
    console.error(error);
    return null;
  }
};
