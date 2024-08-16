const z = require('zod');

// create the input specifications for specific purposes 

// 1. The input must be a string
// 2. The title must have 1st letter to be capital

const capitalFirstLetter = (str) =>{

    // here we extract the first letter seperately 
    // then concantate the rest of the sting with it
    return str.charAt(0).toUpperCase() + str.slice(1);

};


// Schema for taking the input and making first letter capital
// we will use our function to convert the first letter Capital

const capitalFirstLetterSchema = z.string()

// takes input and transforms first letter capital.
.transform( (val) => capitalFirstLetter(val) )

// The refine meathods are used to perform custom validations in the string 
// if the string wont pass the checks it will send the error message
.refine( (val) => /^[A-Z]/ .test(val), {
    
    //Define error message
    msg: "The first letter must be capital"
} );


// Schema for creating a new To-Do item
const createToDo = z.object({
    title: capitalFirstLetterSchema, // Apply the capitalized string schema to the title
    description: z.string() // No special requirements for the description
  });
  
  // Schema for updating an existing To-Do item
  const updateToDo = z.object({
    _id: z.string(), // Ensure the _id is a string
    completed : z.boolean()
  });

  
  // Export the functions in order to use them in other files in the project
  module.exports = {
    createToDo,
    updateToDo
  }


