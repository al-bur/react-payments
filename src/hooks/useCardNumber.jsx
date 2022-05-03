import { useState, useCallback } from 'react';

import { RULE } from '../constants';

export default function useCardNumber(initialValue) {
  const [cardNumber, setCardNumber] = useState(initialValue);
  const [encryptedCardNumber, setEncryptedCardNumber] = useState(initialValue);

  const getNumbers = data => {
    if (data === null) return cardNumber.slice(0, -1);
    if (!data.match(/[\d]/g)) return cardNumber;
    if (cardNumber === '') return data;

    return cardNumber + data;
  };

  const getEncrytedNumbers = numbers => {
    let encryptedNumbers = numbers;

    if (numbers.length > 8) {
      encryptedNumbers = numbers.slice(0, 8) + '•'.repeat(numbers.length - 8);
    }

    return encryptedNumbers.match(/[\d•]{1,4}/g)?.join('-') ?? initialValue;
  };
  // TODO: refactor
  const handler = useCallback(
    e => {
      const { value } = e.target;
      const trimmedValue = value.replaceAll('-', '');
      const { data } = e.nativeEvent;

      if (trimmedValue.length > RULE.CARD_NUMBER_MAX_LENGTH) return;

      const numbers = getNumbers(data);
      const encryptedNumbers = getEncrytedNumbers(numbers);

      setCardNumber(numbers);
      setEncryptedCardNumber(encryptedNumbers);
    },
    [cardNumber]
  );

  return [cardNumber, handler, encryptedCardNumber];
}
