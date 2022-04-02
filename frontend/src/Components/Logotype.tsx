import * as React from "react";
import './Logotype.scss';
import { Link } from "react-router-dom";
import { Calendar3 } from 'react-bootstrap-icons';

export default function Logotype() {
  return <div className='Logotype'>
    <Calendar3 className='iconStyle' />
    <Link to="/" className="logoTypeText">Event Colab</Link>
  </div>;
}
