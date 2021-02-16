import React, { useState } from 'react';
import '../style/components.scss';

type Props = {
  icon: string,
  text: string,
  active: boolean,
  onEnter: (value: boolean) => void,
  onClick: () => void
}

export default function Button(props: Props) {

  return (
    <button
      className={`button-wrapper ${props.active && "active"}`}
      onMouseEnter={() => props.onEnter(true)}
      onMouseLeave={() => props.onEnter(false)}
      onClick={() => props.onClick()}
    >
        <img src={props.icon} />
        {props.text}
    </button>
  );
}