import React from "react";

export const MailTo = ({ to }: { to: string }) => <a href={`mailto:${to}`}>{to}</a>
