const mongoose = require("mongoose");
const Answer = mongoose.model('Answer');
const Question = mongoose.model('Question');

module.exports = {
    add: function (req, res) {
        console.log(req.body)
        Question.findOne({id: req.body.user._id}, (err, question) => {
            if(err){
                return res.status(500).json(err);
            }
            var newAnswer = new Answer(req.body)
            Question.update({id: req.body.user_id}, {$push: {_answers: newAnswer}}, (err) => {
                if(err){
                    return res.status(401).json(err)
                }
                newAnswer.save((err) => {
                    if(err){
                        return res.status(401).json(err);
                    }
                    return res.json(newAnswer)
                })
            });
        });
    },

    fetch: function (req, res) {
        Answer.find({_question: req.body}, (err, allanswers) => {
            if(err) {
                return res.status(500).json(err);
            }
            return res.json(all_answers)
        })
    }
}
