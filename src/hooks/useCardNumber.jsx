import { useCallback, useState } from 'react';

import { ERROR_MESSAGE } from 'constants';

export default function useCardNumber(initialValue) {
  const [cardNumber, setCardNumber] = useState(initialValue);

  const getComputedValue = (selectionStart, type = 'delete') => {
    const auxilaryNum = type === 'add' && 1;

    if (selectionStart >= 0 && selectionStart <= 4 + auxilaryNum) return 0;
    if (4 + auxilaryNum < selectionStart && selectionStart <= 9 + auxilaryNum) {
      return 1;
    }
    if (
      9 + auxilaryNum < selectionStart &&
      selectionStart <= 14 + auxilaryNum
    ) {
      return 2;
    }
    if (14 + auxilaryNum < selectionStart && selectionStart <= 19) return 3;
  };

  const getNumbers = (data, selectionStart) => {
    if (data === null) {
      const computedValue = getComputedValue(selectionStart);
      return (
        cardNumber.slice(0, selectionStart - computedValue) +
        cardNumber.slice(selectionStart - computedValue + 1)
      );
    }

    if (!data.match(/[\d]/g)) return cardNumber;

    const computedValue = getComputedValue(selectionStart, 'add');

    return (
      // -1을 해주는 이유는, onchage가 일어나면 이미 e.targe.value는 추가된 값이 들어오고, 당연히 selectionStart도 하나 늘어난 채로 들어오게 된다. 이로 인해, 추가할때는 -1을 해줘야함
      cardNumber.slice(0, selectionStart - computedValue - 1) +
      data +
      cardNumber.slice(selectionStart - computedValue - 1)
    );
  };

  const handleCardNumber = useCallback(
    (e) => {
      const { selectionStart } = e.target;
      const { data } = e.nativeEvent;

      const numbers = getNumbers(data, selectionStart);
      setCardNumber(numbers);

      e.target.setCustomValidity('');
    },
    [cardNumber]
  );

  const showCardNumberValidation = ({ target }) => {
    if (target.validity.patternMismatch) {
      target.setCustomValidity(ERROR_MESSAGE.INVALID_CARD_NUMBER_LENGTH);
      target.reportValidity();
    }
  };

  return {
    cardNumber,
    handleCardNumber,
    showCardNumberValidation,
  };
}
