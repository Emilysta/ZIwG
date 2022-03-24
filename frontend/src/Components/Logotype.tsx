import * as React from "react";
import './Logotype.css';
import { Link } from "react-router-dom";
import { Calendar3 } from 'react-bootstrap-icons';

export class Logotype extends React.Component {
  render(): React.ReactNode {
    return <div className='Logotype'>
      <Calendar3 className='iconStyle' />
      <Link to="/" className="logoTypeText">EventColab</Link>
    </div>;
  }
}
