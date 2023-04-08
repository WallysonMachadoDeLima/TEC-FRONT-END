import { React, useState, useEffect } from "react";

import CheckIcon from "../../../assets/checkbox-checked.svg";
import UnCheckIcon from "../../../assets/checbox-unchecked.svg";
import style from "./style.module.scss";
export default function Checkbox({ label, checked, black, onClick }) {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [src, setSrc] = useState(UnCheckIcon);

  function handleCheckboxChange() {
    setCheckedStatus(!checkedStatus);
    checkedStatus ? setSrc(UnCheckIcon) : setSrc(CheckIcon);
    localStorage.setItem("termo", checkedStatus)
  }

  useEffect(() => {
    if (checked) handleCheckboxChange();
  }, [checkedStatus]);
  return (
    <div id={"divCheckBox"} value={checkedStatus} onClick={onClick}>
      <div
        className={style.checkboxContainer}
        checked={checkedStatus}
        onClick={
          handleCheckboxChange
        }

      >
        <input
          type="checkbox"
          className={style.hiddenCheckbox}
          checked={checkedStatus}
        />
        <label className={style.styledCheckbox} checked={checkedStatus}
        >
          <img src={src} alt="Checbox icon" />
        </label>
        <label className={style.text} checked={checkedStatus}>
          <label className={style.black}>{black}</label>
          {label}
        </label>
      </div></div>
  );
}
