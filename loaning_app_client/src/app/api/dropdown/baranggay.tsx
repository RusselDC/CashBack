import axios from "axios"

export const getBaranggay = async (cityCode : string) => {
    try {
        const response = await axios.get(
            `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`
        )

        const baranggay = response?.data.reduce(
            (accu: { label : string, value : string }[], current: Record<string, string>) => {
              accu.push({label : current.name, value : current.code})
              return accu;
            },
            [],
        );
        console.log(baranggay)
        return baranggay
    }catch (error)
    {
        console.log(error)
    }
}