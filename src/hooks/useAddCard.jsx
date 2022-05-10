import { useContext } from 'react';

import { useNavigateTo } from 'hooks';

import { CardContext } from 'contexts/CardContext';

import { ERROR_MESSAGE, PATH } from 'constants';
import { addCardFetcher } from 'utils/fetcher';

export default function useAddCard() {
  const navigateToHome = useNavigateTo(PATH.CARD_LIST);
  const { cardNumber, cardOwnerName, validDate, cardKind, resetCard } =
    useContext(CardContext);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const cardNickname = e.target.nickname.value;
    const cardFormData = {
      cardNumber,
      cardOwnerName,
      validDate,
      cardKind,
      cardNickname,
    };
    const requiredList = [cardNumber, validDate, cardKind];
    const isRequiredDataExist = requiredList.every((value) => value !== '');

    try {
      if (isRequiredDataExist) {
        await addCardFetcher(cardFormData);
      }

      navigateToHome();
      resetCard();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        alert(ERROR_MESSAGE.SERVICE_NOT_WORKING);

        return;
      }
      alert(err.message);

      navigateToHome();
      resetCard();
    }
  };

  return handleAddCard;
}
