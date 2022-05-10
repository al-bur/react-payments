import { createContext, useReducer } from 'react';

import { useCardNumber, useCardOwnerName, useValidDate } from 'hooks';

const CardContext = createContext();

const initialCardKind = {
  color: '#ADD8E6',
  title: '공원 카드',
};

function cardKindReducer(state, action) {
  switch (action.type) {
    case 'SET_CARD_COLOR':
      return {
        ...state,
        color: action.color,
      };
    case 'SET_CARD_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'RESET':
      return initialCardKind;
  }
}

function CardContextProvider({ children }) {
  const {
    cardNumber,
    setCardNumber,
    handleCardNumber,
    showCardNumberValidation,
  } = useCardNumber('');
  const {
    cardOwnerName,
    setCardOwnerName,
    handleCardOwnerName,
    showCardOwnerNameValidation,
  } = useCardOwnerName('');
  const { validDate, setValidDate, handleValidDate, showValidDateValidation } =
    useValidDate('');
  const [cardKind, setCardKind] = useReducer(cardKindReducer, initialCardKind);

  const resetCard = () => {
    setCardNumber('');
    setCardOwnerName('');
    setValidDate('');
    setCardKind({ type: 'RESET' });
  };

  return (
    <CardContext.Provider
      value={{
        cardNumber,
        handleCardNumber,
        showCardNumberValidation,
        cardOwnerName,
        handleCardOwnerName,
        showCardOwnerNameValidation,
        validDate,
        handleValidDate,
        showValidDateValidation,
        cardKind,
        setCardKind,
        resetCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export { CardContext, CardContextProvider };
