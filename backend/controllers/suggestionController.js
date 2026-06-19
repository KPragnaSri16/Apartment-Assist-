const Suggestion = require(
  "../models/Suggestion"
);

const addSuggestion = async (
  req,
  res
) => {
  try {

    const {
      title,
      description,
      userId,
      tenantName,
      flatNumber,
    } = req.body;

    const suggestion =
      await Suggestion.create({
        title,
        description,
        userId,
        tenantName,
        flatNumber,
      });

    res.status(201).json({
      message:
        "Suggestion Submitted",
      suggestion,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getSuggestions = async (
  req,
  res
) => {
  try {

    const suggestions =
      await Suggestion.find();

    res.status(200).json(
      suggestions
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getUserSuggestions = async (
  req,
  res
) => {
  try {

    const suggestions =
      await Suggestion.find({
        userId: req.params.userId,
      });

    res.status(200).json(
      suggestions
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addSuggestion,
  getSuggestions,
  getUserSuggestions,
};