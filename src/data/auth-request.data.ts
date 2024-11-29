import process from 'process';
import { isString } from '../types/globals.type';

export const authRequestData = {
  returnSecureToken: true,
  email: getAuthEmail(),
  password: getAuthPwd(),
  clientType: 'CLIENT_TYPE_WEB',
};

function getAuthEmail(): string {
  const authEmail = process.env.AUTH_EMAIL;
  //'marina.kulenkova.cw@playonsports.com';

  if (isString(authEmail)) {
    return authEmail;
  }
  throw new Error(`No auth email found, value received: ${authEmail}`);
}

function getAuthPwd(): string {
  const authPwd = process.env.AUTH_PASSWORD;
  //'730Dbd20'
  if (isString(authPwd)) {
    return authPwd;
  }
  throw new Error(`No auth password found, value received: ${authPwd}`);
}
