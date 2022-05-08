export interface User {
  id: string; // refers to cookie id
  vote: Vote;
}

export interface Vote {
  date: Date;
  restaurantId: string;
  restaurantName: string;
}

export const emptyVote: Vote = {
  date: new Date(),
  restaurantId: '',
  restaurantName: '',
};

export const emptyUser: User = {
  id: '',
  vote: emptyVote,
};
