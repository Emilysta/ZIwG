import * as React from "react";
import './MenuButton.scss'

type MenuButtonProps = { type?: string, value: string, onClick: React.MouseEventHandler<HTMLInputElement> }

export function MenuButton(props: MenuButtonProps) {
  return (
    <input type={props.type ?? "button"} value={props.value} className='menuButton' onClick={props.onClick}/>
  );
}
