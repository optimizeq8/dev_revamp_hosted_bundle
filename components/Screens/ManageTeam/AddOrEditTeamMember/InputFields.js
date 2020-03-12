import React from "react";
import PersonTransparentIcon from "../../../../assets/SVGs/MenuIcons/PersonTransparent";
import EmailTransparentIcon from "../../../../assets/SVGs/EmailTransparent";
import InputField from "../../../MiniComponents/InputField";

/**
 * A functional component to render the different InputFields
 *
 * @method
 * @param {Object} parentState an object of the parent's state + editTeamMember
 *                              that's passed through navigation
 * @param {Function} setValue the function that updates the parent's state
 * @param {Function} getValidInfo the function that updates the valueErrors for the parent component
 * @param {Function} translate the translation function
 * @returns {Array} the array of InputFields components
 */
export const InputFields = (parentState, setValue, getValidInfo, translate) => {
  let {
    firstName,
    lastName,
    email,
    emailError,
    firstNameError,
    lastNameError,
    incomplete,
    editTeamMember
  } = parentState;

  let inputFields = [
    {
      stateName1: "firstName",
      stateName2: "lastName",
      label: "Full name",
      placeholder1: "First Name",
      placeholder2: "Last Name",
      value: firstName,
      value2: lastName,
      valueError1: firstNameError,
      valueError2: lastNameError,
      icon: PersonTransparentIcon,
      disabled: editTeamMember
    },
    {
      stateName1: "email",
      label: "Email",
      placeholder1: "Enter their email",
      value: email,
      valueError1: emailError,
      icon: EmailTransparentIcon,
      disabled: editTeamMember
    }
  ].map(field => {
    return (
      <InputField
        key={field.label}
        getValidInfo={getValidInfo}
        setValue={setValue}
        incomplete={incomplete}
        {...field}
        maxLength={field.stateName1 === "firstName" ? 25 : false}
        translate={translate}
      />
    );
  });
  return inputFields;
};

export default InputFields;
