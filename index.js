const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Add the utterances and intents for the NLP
manager.addDocument('en','Hello how are you','greetings.hello');
manager.addDocument('en','','');
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en','World Highest Peak','mountain.highest');
manager.addDocument('en','About ChatGPT','about.chatgpt');
manager.addDocument('en','Answer Questions','question.answer');

// Train the NLG
manager.addAnswer('en','greetings.hello','Hey, How can I help you today ?');
manager.addAnswer('en', 'greetings.bye',"Hope to see you back soon");
manager.addAnswer('en','mountain.highest',"Mount Everest is the world highest peak/mountain situated in Nepal.");
manager.addAnswer('en','about.chatgpt','ChatGPT is NLP ( Natural Language Processing ) developed by OpenAI amd released publically in September 2022. It is capable of providing answers to your different questions.');
manager.addAnswer('en','question.answer','Hey I have not been trained as I am made for demonstration. But you can train me.');

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    const response = await manager.process('en', 'Your Questions Here');
    console.log(response.answers[0].answer);
})();
