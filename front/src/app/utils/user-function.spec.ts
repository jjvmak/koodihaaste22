import { User } from '../models/user';
import { stringifyUser } from './user-functions';

describe('User functions', () => {
  beforeEach(async () => {});
  it('should stringify user', () => {
    const string = stringifyUser(user);
    expect(string).toContain('id');
    expect(string).toContain('vote');
    expect(string).toContain('date');
    expect(string).toContain('restaurantId');
    expect(string).toContain('restaurantName');
  });
});

const user: User = {
  id: '1234',
  vote: {
    date: new Date('2022-01-01'),
    restaurantId: '55555',
    restaurantName: 'testi',
  },
};
