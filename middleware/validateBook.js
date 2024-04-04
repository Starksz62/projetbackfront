const joi = require("joi")

const bookSchema = joi.object ({
title : joi.string().max(75).required(),
rating : joi.number().required(),
description: joi.string(),
picture: joi.string().max(255),
edition_house_id : joi.number().required(),
author_id : joi.number().required(),
genre_id : joi.number().required(),
ISBN : joi.string().max(255).required()
})

const validateBook = (req,res,next) => {
const  {
title,
rating,
description,
picture,
edition_house_id ,
author_id,
genre_id,
ISBN 
} = req.body;
const { error } = bookSchema.validate(
    {
        title,
        rating,
        description,
        picture,
        edition_house_id ,
        author_id,
        genre_id,
        ISBN 
    },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
    error.details.forEach((errorItem) => {
      console.info("Error list :", errorItem.message);
    });
  } else {
    console.info("Data validated successfully:", req.body);
    next();
  }
}
module.exports = validateBook;