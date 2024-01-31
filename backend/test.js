const axios = require('axios');
async function test(){
    const options = {
        method: 'GET',
        url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
        params: {
          ingr: '<REQUIRED>',
          'nutrition-type': 'cooking'
        },
        headers: {
          'X-RapidAPI-Key': '9179c7d8b0msh4604124ca1e7a84p194a87jsn04316b0c1c56',
          'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
}
test()
