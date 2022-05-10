import { useContext } from 'react';

import { Button } from 'components';

import { CardContext } from 'contexts/CardContext';

import styled from 'styled-components';

function CardKindButton({ buttonBgColor, cardTitle }) {
  const { setCardKind } = useContext(CardContext);

  const handleCardKind = () => {
    setCardKind({ type: 'SET_CARD_COLOR', color: buttonBgColor });
    setCardKind({ type: 'SET_CARD_TITLE', title: cardTitle });
  };

  return (
    <Styled.Root>
      <Button bgColor={buttonBgColor} shape="circle" onClick={handleCardKind} />
      <Styled.CardTitle>{cardTitle}</Styled.CardTitle>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  `,

  CardTitle: styled.p`
    font-size: 13px;
  `,
};

export default CardKindButton;
