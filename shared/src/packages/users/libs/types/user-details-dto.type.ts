type UserDetailsDto = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: {
    url: string | null;
  };
};

export { type UserDetailsDto };
