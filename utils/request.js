const ai21RequestBodyData = (prompt) => {
  return {
    prompt,
    "numResults": 1,
    "maxTokens": 290,
    "temperature": 0.7,
    "topKReturn": 0,
    "topP":1,
    "countPenalty": {
      "scale": 0,
      "applyToNumbers": false,
      "applyToPunctuations": false,
      "applyToStopwords": false,
      "applyToWhitespaces": false,
      "applyToEmojis": false
    },
    "frequencyPenalty": {
      "scale": 19,
      "applyToNumbers": false,
      "applyToPunctuations": false,
      "applyToStopwords": false,
      "applyToWhitespaces": false,
      "applyToEmojis": false
    },
    "presencePenalty": {
      "scale": 0.19,
      "applyToNumbers": false,
      "applyToPunctuations": false,
      "applyToStopwords": false,
      "applyToWhitespaces": false,
      "applyToEmojis": false
    },
    "stopSequences":["#"]
  }

}

module.exports = {ai21RequestBodyData}
