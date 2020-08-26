import React from 'react';

export default function  BackendErrorMessages({errors}) {
  const errorMessages = Object.keys(errors).map(name => {
    //"email or password": ["invalid", "min length"]
    const messages = errors[name].join(" ");
    return (
      <li key={name}>{name} {messages}</li>
    )
  });

  console.log("ERRRRRROR: ", errorMessages);
  return (
    <ol className="error-messages">
      {errorMessages}
    </ol>
  )
}
