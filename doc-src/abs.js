module.exports = {
  categorie : 'Math',
  type : 'function',
  name : 'abs',
  description : 'Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.',
  syntax : [{
    signature : 'abs(number)',
    parameters : [{
      name : 'number',
      type : 'number',
      description : 'The number to calculate the absolute value for'
    }],
    returnValue : 'The absolute value of the number passed in parameter'
  }],

  examples : [
    {
      type : 'code',
      in : 'abs(-1)',
      out : '1'
    },
    {
      type : 'code',
      in : 'abs(2)',
      out : 2
    },
    {
      type : 'code',
      in : 'abs(-1.5)',
      out : '1.5'
    }
  ]
}