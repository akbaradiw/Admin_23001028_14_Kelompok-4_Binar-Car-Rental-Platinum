import axios from "axios";

const getCars = async (category, carName) => {
    
   if (category === undefined){
       category = ""
   }
   if (carName === undefined){
       carName = ""
   }

    try {
        const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?category=${category}&name=${carName}`, {
            headers: {
                access_token: localStorage.getItem("accessToken"),
            },
        });

        return response.data.cars;

    } catch (error) {
        console.error(error);
    }
};

export default getCars