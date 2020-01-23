import React from "react";
import MemberType from "./MemberType";
/**
 * A Functional component that render the 3 different MemberType switches
 * for the user roles
 *
 * @param {Function} handleMemberType the function that handles changing the state of user role
 * @param {Int} userRole A number indicating which user role is selected
 * @param {Function} translate the translation function
 * @return {Array} an array of components of type MemberType to render
 */
export default (handleMemberType, userRole, translate) => {
  let member_roles = [
    {
      id: 1,
      type: "Admin",
      description:
        "Launch & manage campaigns, invite users, edit roles, remove users"
    },
    {
      id: 2,
      type: "Campaign manager",
      description: "Launch & manage campaigns"
    },
    {
      id: 3,
      type: "Client",
      description: "View reports & campaign details"
    }
  ].map(mem => (
    <MemberType
      key={mem.type}
      handleMemberType={handleMemberType}
      userRole={userRole}
      member={mem}
      translate={translate}
    />
  ));
  return member_roles;
};
