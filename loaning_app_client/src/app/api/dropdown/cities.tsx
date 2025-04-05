import axios from "axios";

export const getCities = async (provinceCode: string) => {
  try {
    console.log(provinceCode)
    const response = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`
    );

    const cities = response?.data.reduce(
      (accu: { label : string, value : string }[], current: Record<string, string>) => {
        accu.push({label : current.name, value : current.code})
        return accu;
      },
      [],
    );

    return cities;
  } catch (error) {
    console.error(error);
    return null;
  }
};
