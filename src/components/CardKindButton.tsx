import { Button } from 'components';
import React from 'react';

import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonBgColor: string;
  cardTitle: string;
  onClickFunc: (option: {
    type: string;
    color?: string;
    title?: string;
  }) => void;
}

function CardKindButton({ buttonBgColor, cardTitle, onClickFunc }: Props) {
  const setCardKind = () => {
    onClickFunc({ type: 'SET_CARD_COLOR', color: buttonBgColor });
    onClickFunc({ type: 'SET_CARD_TITLE', title: cardTitle });
  };

  return (
    <Styled.Root>
      <Button bgColor={buttonBgColor} shape="circle" onClick={setCardKind} />
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
