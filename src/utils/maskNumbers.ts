const getMaskedNumbers = (numbers: string, initialValue: string = '') => {
  let maskedNumbers = numbers;

  if (numbers.length > 8) {
    maskedNumbers = numbers.slice(0, 8) + '•'.repeat(numbers.length - 8);
  }

  return maskedNumbers.match(/[\d•]{1,4}/g)?.join('-') ?? initialValue;
};

export default getMaskedNumbers;
