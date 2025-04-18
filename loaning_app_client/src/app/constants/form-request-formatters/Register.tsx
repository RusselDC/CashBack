import dayjs from "dayjs"

const RegisterFormatter = (data : Record<string, string | Date>) => {
    const formattedData = Object.keys(data).reduce((accu : {[key:string] : string}, current : string) => {
        if(current.includes("date"))
        {
            accu[current] = dayjs(data[current]).format("YYYY-MM-DD")
        }else{
            accu[current] = String(data[current])
        }

        return accu
    },{})


    return {
        "email" : formattedData.email,
        "password" : formattedData.password,
        "first_name" : formattedData.first_name,
        "middle_name" : formattedData.middle_name,
        "last_name" : formattedData.last_name,
        "birth_date" : formattedData.birth_date,
        "state" : formattedData.province,
        "city" : formattedData.cities,
        "street" : formattedData.baranggay,
        "home_number" : formattedData.home_number,
        "land_mark" : formattedData?.land_mark?.length > 0 ? formattedData?.land_mark : ""
    }
}

export default RegisterFormatter