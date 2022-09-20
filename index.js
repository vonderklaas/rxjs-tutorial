const { Observable } = require('rxjs');
const { map, pluck, filter } = require('rxjs/operators');

// Data
const users = {
  data: [
    {
      status: 'inactive',
      age: 15,
    },
    {
      status: 'active',
      age: 9,
    },
    {
      status: 'active',
      age: 11,
    },
    {
      status: 'inactive',
      age: 34,
    },
    {
      status: 'active',
      age: 41,
    },
    {
      status: 'inactive',
      age: 17,
    },
  ],
};

const users2 = {
  data: [
    {
      status: 'inactive',
      age: 14,
    },
    {
      status: 'active',
      age: 19,
    },
    // {
    //   status: 'active',
    //   age: 11,
    // },
    // {
    //   status: 'inactive',
    //   age: 39,
    // },
    // {
    //   status: 'active',
    //   age: 59,
    // },
    // {
    //   status: 'inactive',
    //   age: 17,
    // },
  ],
};

// Emitting data
const observable = new Observable((subscriber) => {
  subscriber.next(users2);
  subscriber.complete(); // Stop the execution

  // Piece of data is out of reach
  subscriber.next(users2);
}).pipe(
  pluck('data'),
  filter((value) => value.length >= 5),
  map((value) => {
    // Operator 2 - Filter active users from inactive
    return value.filter((user) => user.status === 'active');
  }),
  map((value) => {
    // Operator 3 - Get average age of active users
    return value.reduce((sum, user) => sum + user.age, 0) / value.length;
  }),
  map((value) => {
    // Operator 4 - Check for value and return it or error
    if (value < 24) {
      throw new Error('Average age is too young!');
    } else {
      return value;
    }
  })
);

// Catches data
const observer = {
  next: (value) => {
    console.log('Observer got a value of: ' + value);
  },
  error: (error) => {
    console.log('Observer caught an error: ' + error);
  },
  complete: () => {
    console.log('Observer got a complete notification!');
  },
};

// Create connection
observable.subscribe(observer);
