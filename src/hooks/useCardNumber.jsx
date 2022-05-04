import { useState, useCallback } from 'react';

import { RULE } from '../constants';

// TODO: refactor
export default function useCardNumber(initialValue) {
  const [cardNumber, setCardNumber] = useState(initialValue);
  const [encryptedCardNumber, setEncryptedCardNumber] = useState(initialValue);

  const getCursorPosition = selectionStart => {
    if (0 <= selectionStart && selectionStart <= 4) {
      return 0;
    } else if (4 < selectionStart && selectionStart <= 9) {
      return 1;
    } else if (9 < selectionStart && selectionStart <= 14) {
      return 2;
    } else if (14 < selectionStart && selectionStart <= 19) {
      return 3;
    }
  };

  const getAdditionCursorInfo2 = selectionStart => {
    if (0 <= selectionStart && selectionStart <= 5) {
      return 0;
    } else if (5 < selectionStart && selectionStart <= 10) {
      return 1;
    } else if (10 < selectionStart && selectionStart <= 15) {
      return 2;
    } else if (15 < selectionStart && selectionStart <= 19) {
      return 3;
    }
  };

  const getNumbers = (data, selectionStart) => {
    const temp = getCursorPosition(selectionStart);
    const plus = getAdditionCursorInfo2(selectionStart);

    console.log(selectionStart, 'selectionStart');
    console.log(cardNumber, 'cardNumber');
    // TODO: 값 삭제시 커서 맨 끝으로 가는 거 수정하기
    if (data === null)
      return (
        cardNumber.slice(0, selectionStart - temp) +
        cardNumber.slice(selectionStart - temp + 1)
      );

    if (!data.match(/[\d]/g)) return cardNumber;

    console.log(cardNumber.slice(0, selectionStart - temp - 1), 'cardNumber앞');
    console.log(cardNumber.slice(selectionStart - temp - 1), 'cardNumber뒤');
    return (
      // -1을 해주는 이유는, onchage가 일어나면 이미 e.targe.value는 추가된 값이 들어오고, 당연히 selectionStart도 하나 늘어난 채로 들어오게 된다. 이로 인해, 추가할때는 -1을 해줘야함
      cardNumber.slice(0, selectionStart - plus - 1) +
      data +
      cardNumber.slice(selectionStart - plus - 1)
    );
  };

  const getEncrytedNumbers = numbers => {
    let encryptedNumbers = numbers;

    if (numbers.length > 8) {
      encryptedNumbers = numbers.slice(0, 8) + '•'.repeat(numbers.length - 8);
    }

    return encryptedNumbers.match(/[\d•]{1,4}/g)?.join('-') ?? initialValue;
  };

  const handler = useCallback(
    e => {
      const { value, selectionStart } = e.target;
      const trimmedValue = value.replaceAll('-', '');
      // console.log(value);

      if (trimmedValue.length > RULE.CARD_NUMBER_MAX_LENGTH) return;

      const { data } = e.nativeEvent;

      const numbers = getNumbers(data, selectionStart);
      setCardNumber(numbers);

      const encryptedNumbers = getEncrytedNumbers(numbers);
      setEncryptedCardNumber(encryptedNumbers);
    },
    [cardNumber]
  );

  return [cardNumber, handler, encryptedCardNumber];
}
