import React, { useState } from 'react';
import '../style/components.scss';

type Props = {
  icon: string,
  text: string,
  active: boolean,
  onEnter: (value: boolean) => void,
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function Button(props: Props) {

  return (
    <button
      className={`button-wrapper ${props.active && "active"}`}
      onMouseEnter={() => props.onEnter(true)}
      onMouseLeave={() => props.onEnter(false)}
      onClick={(e) => props.onClick(e)}
    >
        <img src={props.icon} />
        <span>{props.text}</span>
    </button>
  );
}