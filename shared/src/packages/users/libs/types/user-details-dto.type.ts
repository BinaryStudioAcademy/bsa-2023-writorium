type UserDetailsDto = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  avatar?: {
    url: string | null;
  };
};

export { type UserDetailsDto };
