import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputref = useRef();
  const streetInputref = useRef();
  const postalInputref = useRef();
  const cityInputref = useRef();

  const isEmpty = value => value.trim() === "";
  const isFiveChars = value => value.trim().length >= 6;

  const confirmHandler = event => {
    event.preventDefault();
    const enteredName = nameInputref.current.value;
    const enteredStreet = streetInputref.current.value;
    const enteredPostalCode = postalInputref.current.value;
    const enteredCity = cityInputref.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });
  };

  const nameInputClasses = `${classes.control} ${!formInputsValidity.name && classes.invalid}`;
  const streetInputClasses = `${classes.control} ${!formInputsValidity.street && classes.invalid}`;
  const postalCodeInputClasses = `${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`;
  const cityInputClasses = `${classes.control} ${!formInputsValidity.city && classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputref} />
        {!formInputsValidity.name && <p>Please enter your name</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputref} />
        {!formInputsValidity.street && <p>Please enter your street name</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputref} />
        {!formInputsValidity.postalCode && <p>Potal code must be 6 digit long</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputref} />
        {!formInputsValidity.city && <p>Please enter your city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
