import { useState, useCallback } from 'react';

import { ERROR_MESSAGE } from 'constants';

export default function useCardOwnerName(initialValue) {
  const [cardOwnerName, setCardOwnerName] = useState(initialValue);

  const handleCardOwnerName = useCallback(({ target }) => {
    target.setCustomValidity('');

    setCardOwnerName(target.value);
  }, []);

  // TODO: useCallback의 효율성 생각해보자
  const showCardOwnerNameValidation = ({ target }) => {
    if (target.validity.patternMismatch) {
      target.setCustomValidity(ERROR_MESSAGE.INVALID_CARD_OWNER_NAME);
      target.reportValidity();
    }
  };

  return { cardOwnerName, handleCardOwnerName, showCardOwnerNameValidation };
}