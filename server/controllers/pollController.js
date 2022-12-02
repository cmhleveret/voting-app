const { User } = require("../models/user");
const { Poll } = require("../models/poll");
const  mongoose = require("mongoose");
const getReturnedVotes = (userId, polls) =>
  polls.map((poll) => {
    if (poll.usersVoted.includes(userId)) {
      return poll;
    }

    return {
      title: poll.title,
      _id: poll._id,
      endTime: poll.endTime,
      usersVoted: poll.usersVoted,
      options: poll.options.map((option) => ({
        name: option.name,
        url: option.url,
      })),
    };
  });

exports.getReturnedVotes = getReturnedVotes;

exports.index = (req, res) => {
  const providedToken = req.headers["authorization"];
  User.findOne({ token: providedToken }).then((user) => {
    Poll.find().then((polls) => {
      const processedPolls = getReturnedVotes(user._id, polls);
      res.send(processedPolls);
    });
  });
};

exports.vote = (req, res) => {
  const providedToken = req.headers["authorization"];
  const { optionIndex } = req.body;
  if (!(optionIndex>-1)) {
    res.statusMessage = "Missing optionIndex";
    return res.sendStatus(400);
  }
  User.findOne({ token: providedToken }).then((user) => {
    const { pollId } = req.params;
    Poll.findById(pollId)
      .then((poll) => {
        if (!poll) {
          throw new Error("Poll not found");
        }
        if (poll.endTime < Date.now()) {
          throw new Error('This poll has expired')
        }
        if (poll.usersVoted.includes(user._id)) {
          throw new Error("one vote per User");
        }
        poll.options[optionIndex].votes = poll.options[optionIndex].votes + 1;
        poll.usersVoted.push(user._id);
        return poll.save();
      })
      .then((poll) => res.send({ result: "voted", poll }))
      .catch((error) => {
        res.statusMessage = error.message;
        res.sendStatus(400);
      });
  });
};

exports.create = (req, res, next) => {
  User.findOne({ token: req.headers['authorization'] })
    .then((user) => {
      if (!user.admin) {
        return next(createError(403, "Not a valid admin"))
      }
      if (validPoll(req)) {
        const poll = new Poll(req.body)
        return poll.save()
          .then((poll) => res.send({ result: true, poll }))
      }
      return next(createError(400, "poll needs to be valid"))
    })
}

exports.delete = (req, res, next) => {
  User.findOne({ token: req.headers['authorization'] })
    .then((user) => {
      if (user.admin) {
        Poll.findByIdAndDelete(req.params.pollId)
          .then(() => { res.send({ message: "Poll removed" }) })
      } else {
        return next(createError(403, "Not a valid admin"))
      }
    })
}
