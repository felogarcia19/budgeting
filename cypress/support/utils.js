const splitStringInToChars = data => {
  const charArray = data.split('');
  const numbers = new Array(charArray.length);
  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i].match(/\d+/g)) {
      numbers[i] = charArray[i];
    }
  }
  const numbersOfProducts = numbers.join('').trim();
  // cy.log('this is the number of products' + " " +numbersOfProducts);
  return numbersOfProducts;
};

export { splitStringInToChars };
