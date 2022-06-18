import { Button, CardKindButton } from 'components';
import React from 'react';

import styled from 'styled-components';

const cardPresets = [
  {
    color: '#ADD8E6',
    title: '공원 카드',
  },
  {
    color: '#b91b1b71',
    title: '포코 카드',
  },
  {
    color: '#aac150c5',
    title: '포비 카드',
  },
  {
    color: '#1139c8c5',
    title: '앨버 카드',
  },
  {
    color: '#9833a7c5',
    title: '하리 카드',
  },
  {
    color: '#d9931bc5',
    title: '왓섭 카드',
  },
  {
    color: '#634848c5',
    title: '법인 카드',
  },
  {
    color: '#db3686c5',
    title: '포터 카드',
  },
];

interface Props {
  onClickKindButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickClose: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
}

function CardPickModal({ onClickKindButton, onClickClose }: Props) {
  return (
    <>
      <Styled.Modal>
        <Styled.CloseButton onClick={onClickClose}>X</Styled.CloseButton>
        {cardPresets.map(({ color, title }) => (
          <CardKindButton
            key={`${color}-${title}`}
            buttonBgColor={color}
            cardTitle={title}
            onClickFunc={onClickKindButton}
          />
        ))}
      </Styled.Modal>
      <Styled.Dimmed onClick={onClickClose} />
    </>
  );
}

const Styled = {
  CloseButton: styled(Button)`
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 10px;
  `,

  Dimmed: styled.div`
    background: #2725253d;
    height: 757px;
    width: 400px;
  `,

  Modal: styled.div`
    align-items: center;
    background: #fff;
    border-radius: 5% 5% 0 0;
    box-sizing: border-box;
    column-gap: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: calc(757px / 3);
    justify-content: center;
    padding: 30px;
    position: absolute;
    top: calc(757px / 3 * 2);
    width: 400px;
  `,
};

export default CardPickModal;