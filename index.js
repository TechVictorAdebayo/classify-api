const axios = require('axios');
const express = require ('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});

app.get('/api/classify', async(req, res) => {

    const {name }= req.query
    
    if(!name){
        return res.status(400).json({status: "error", message: "name parameter is required"})
    }
    if (typeof(name) !== "string"){
        return res.status(422).json({status: 'error', message: "name must be a String"})
    }

    try{
        const response = await axios.get(`https://api.genderize.io?name=${name}`)

        const processed_at = new Date().toISOString();

        const {name: resolvedName, gender, probability, count: sample_size} = response.data

         if(gender === null || sample_size === 0){
            return res.status(200).json({status: 'error', message: 'No prediction available for the provided name'})
        }

        const is_confident = probability >= 0.7 && sample_size >= 100
       
        
        return res.json({
            status: "success",
            data: {
                "name": resolvedName,
                "gender": gender,
                "probability": probability,
                "sample_size": sample_size,
                "is_confident": is_confident, 
                "processed_at": processed_at
            }
        })
    
    }catch(error){
        console.log(error);
        
        return res.status(502).json({status: 'error', message: "Upstream or Server failure"})
    }

})



app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
    
});
