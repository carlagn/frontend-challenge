import React, { useState } from 'react';
import '../style/components.scss';

type Props = {
  icon: string,
  text: string,
  color: string
}

export default function LogoLabel(props: Props) {

  return (
    <div className="label-wrapper">
      <div className={`logo-container ${props.color}`}>
          <img src={props.icon} />
      </div>
      <div className="content">{props.text}</div>
    </div>
  );
}