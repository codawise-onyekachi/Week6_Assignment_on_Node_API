
const express = require("express")

const app = express()

//Middleware:- body parser
app.use(express.json())

const PORT = process.env.PORT || 6000

app.listen(6000, function() {
    console.log(`Server is running on port ${PORT}`)
})

//The Drugs Array

const drugs = [

 { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },

 { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },

 { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },

 { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },

 { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },

 { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },

 { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },

 { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },

 { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },

 { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },

 { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },

 { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },

 { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },

 { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },

 { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },

 { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },

 { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },

 { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },

 { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },

 { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }

]

//APIs
//GET /drugs/antibiotics: Return all drugs where category is "Antibiotic"
app.get("/drugs/antibiotics", (request, response) => {
    const antibiotics = drugs.filter(each => each.category === "Antibiotic")
    response.json(antibiotics)
})

//GET /drugs/names: Return an array of all drug names converted to lowercase.
app.get("/drugs/names", (requst, response) => {
    const names = drugs.map(each => each.name.toLowerCase())
    response.json(names)
})

//POST /drugs/by-category:Accept a category in the body and return all drugs under that category.Example body: { "category": "Antibiotic" }
app.post('/drugs/by-category', (request, response) => {
    const acceptCategory = request.body.category;

    const check = drugs.find(each => each.category.toLowerCase() === acceptCategory.toLowerCase())
  
    if (!check) {
      response.json({ error: "Category is required in request body." });
    }else{
  
    const result = drugs.filter(each => each.category === category);
  
    response.json(result);
    }
  });

  //GET /drugs/names-manufacturers: Return an array of objects showing each drug’s name and manufacturer.

  app.get("/drugs/names-manufacturers", (req, res) => {
    const drugNameAndManufacturer = drugs.map(each => each.name + " - "+ each.manufacturer)
    res.json(drugNameAndManufacturer)
  })

  //GET /drugs/prescription: Return all drugs where isPrescriptionOnly is true.
  app.get("/drugs/prescription", (req, res) => {
    const prescriptionDrugs = drugs.filter(each => each.isPrescriptionOnly == true)
    res.json(prescriptionDrugs)
  })


  //GET /drugs/formatted: Return a new array where each item is a string like:"Drug: [name] - [dosageMg]mg
  app.get("/drugs/formatted", (req, res) => {

    const formatted = drugs.map(each => `Drugs:[${each.name}] - [${each.dosageMg}]mg`)

    res.json(formatted)
  })


  //GET /drugs/low-stock: Return all drugs where stock is less than 50.

  app.get("/drugs/low-stock", (req, res) => {

    const withStockLessThan50 = drugs.filter(each => each.stock < 50)

    res.json(withStockLessThan50)
  })

  
  //GET /drugs/non-prescription:Return all drugs where isPrescriptionOnly is false.

  app.get("/drugs/non-prescription", (req, res) => {

    const notPrescriptionDrugs = drugs.filter(each => each.isPrescriptionOnly == false)

    res.json(notPrescriptionDrugs)
  })


  // POST /drugs/manufacturer-count:Accept a manufacturer in the body and return how many drugs are produced by that manufacturer.Example body: { "manufacturer": "Pfizer" }

  app.post("/drugs/manufacturer-count", (req, res) => {
    const acceptManufacturer = req.body.manufacturer
    const manufacturerDrugs = drugs.filter(each => each.manufacturer === manufacturer).length
    res.json({
        message: `${acceptManufacturer} manufactured ${manufacturerDrugs} drugs`
  })

})


//GET /drugs/count-analgesics:Count and return how many drugs have the category "Analgesic"

app.get("/drugs/count-analgesics", (req, res) => {

    let analgesicsCount = 0
    drugs.forEach( function( each) {
        if(each.category === "Analgesic") {
            analgesicsCount++
        }
    })
    res.json(analgesicsCount)
})


