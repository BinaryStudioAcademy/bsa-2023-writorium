interface IFacebookAuth {
  verifyFacebookAccessToken(accessToken: string): Promise<boolean>;
}
export { type IFacebookAuth };
