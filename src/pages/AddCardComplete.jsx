import { useContext } from 'react';

import { Button, Card } from 'components';

import { useAddCard } from 'hooks';

import { CardContext } from 'contexts/CardContext';

import styled from 'styled-components';

import getMaskedNumbers from 'utils/maskNumbers';

function AddCardComplete() {
  const handleAddCard = useAddCard();
  const { cardNumber, cardKind, cardOwnerName, validDate } =
    useContext(CardContext);

  return (
    <Styled.Root>
      <Styled.Title>
        카드 등록이 거의 완료되었습니다.
        <br />
        별명을 설정해주세요!
      </Styled.Title>
      <Card
        size="large"
        bgColor={cardKind.color}
        name={cardOwnerName}
        number={getMaskedNumbers(cardNumber, '')}
        title={cardKind.title}
        validDate={validDate}
      />
      <form onSubmit={handleAddCard}>
        <Styled.CardNicknameInput
          data-testid="nickname"
          name="nickname"
          placeholder="별명(선택사항)"
        />
        <Styled.ConfirmButton color="#04C09E" fontWeight="bold" type="submit">
          확인
        </Styled.ConfirmButton>
      </form>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 697px;
    justify-content: center;
    position: relative;
    row-gap: 50px;
  `,

  Title: styled.h1`
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  `,

  CardNicknameInput: styled.input`
    border: none;
    border-bottom: 1px solid black;
    font-size: 18px;
    padding-bottom: 8px;
    text-align: center;
    width: 241px;

    :focus {
      outline: none;
    }
  `,

  ConfirmButton: styled(Button)`
    bottom: 0;
    position: absolute;
    right: 0;
  `,
};

export default AddCardComplete;
