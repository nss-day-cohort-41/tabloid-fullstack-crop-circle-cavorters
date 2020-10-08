import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export default function User({ user }) {
  return (
    <Card className="m-4">
      <CardBody>
          <Link to={`/users/${user.firebaseUserId}`}>
            {user.fullName}
          </Link>
          <p>{user.displayName}</p>
          <p>{user.userType.name}</p>
      </CardBody>
    </Card>
  );
}
