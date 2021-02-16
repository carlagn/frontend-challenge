import React, { useState } from 'react';
import '../style/components.scss';
import logo from '../assets/logos/logo.svg';

export default function Loading() {
  return (
    <div className="loading-wrapper">
        <div className="logo-animation">
            <img src={logo} />
        </div>
    </div>
  );
}