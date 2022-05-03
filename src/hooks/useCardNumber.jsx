import { useState, useCallback } from 'react';

import { RULE } from '../constants';

export default function useCardNumber(initialValue) {
  const [cardNumber, setCardNumber] = useState(initialValue);
  const [encryptedCardNumber, setEncryptedCardNumber] = useState(initialValue);

  const processCardNumbers = data => {
    if (data === null) {
      return setCardNumber(prevNumbers => prevNumbers.slice(0, -1));
    }

    if (data?.match(/[\d]/g)) {
      return setCardNumber(prevNumbers => {
        if (prevNumbers === undefined) return data;
        return prevNumbers + data;
      });
    }
  };

  const processEncryptedNumbers = numbers => {
    let encryptedNumbers = numbers;
    if (numbers.length > 8) {
      encryptedNumbers = numbers.slice(0, 8) + '•'.repeat(numbers.length - 8);
    }

    // 정규식: 숫자와 • 4개 단위마다 '-'를 넣어준다.
    setEncryptedCardNumber(
      encryptedNumbers.match(/[\d•]{1,4}/g)?.join('-') ?? initialValue
    );
  };

  const handler = useCallback(e => {
    const { value } = e.target;
    const { data } = e.nativeEvent;
    const numbers = value.replaceAll('-', '');

    if (numbers.length > RULE.CARD_NUMBER_MAX_LENGTH) return;

    processCardNumbers(data);
    processEncryptedNumbers(numbers);
  }, []);

  return [cardNumber, handler, encryptedCardNumber];
}
