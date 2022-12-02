const { getReturnedVotes } = require("./pollController");

describe("getReturnedVotes", () => {
  const polls = [
    {
      _id: "poll1",
      title: "poll1",
      options: [
        {
          name: "option1",
          url: "http://something.org",
          votes: 4,
        },
        {
          name: "option2",
          url: "http://something.org",
          votes: 1,
        },
      ],
      usersVoted: ["user1", "user2"],
    },
  ];
  it("shows vote count if user has voted", () => {
    const userId = "user1";
    const result = getReturnedVotes(userId, polls);
    expect(result).toEqual(polls);
  });
  it("does not show the vote count if user has not voted", () => {
    const userId = "user3";
    const result = getReturnedVotes(userId, polls);
    const expected = [
      {
        _id: "poll1",
        title: "poll1",
        options: [
          {
            name: "option1",
            url: "http://something.org",
          },
          {
            name: "option2",
            url: "http://something.org",
          },
        ],
        usersVoted: ["user1", "user2"],
      },
    ];
    expect(result).toEqual(expected);
  });
  it("it returns an empty array when polls is empty", () => {
    const userId = "user1";
    const result = getReturnedVotes(userId, []);
    expect(result).toEqual([]);
  });
});
