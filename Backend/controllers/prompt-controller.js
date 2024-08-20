// const Together = require("together-ai");
// const ChatModel = require("../models/chathistoryModel");

// const together = new Together({
// 	apiKey: "f6fcefa655814856f97aa650da0f8582c471d1156624fd24c4105e2e08fb179d",
// });

// const sendText = async (req, res) => {
// 	var response_gpt = "gpt_data"
// 	saveMessage(req.body?.user_id, req.body?.prompt, "USER")
// 	try {
// 		const response = await together.chat.completions.create({
// 			messages: [{ role: "user", content: req.body.prompt }],
// 			model: "meta-llama/Llama-3-8b-chat-hf",
// 		});
// 		response_gpt = response.choices[0].message.content;

// 		res.status(200).json({
// 			success: true,
// 			data: response.choices[0].message.content,
// 		});
// 		// var res = response.choices[0].message.content.data.split('\n').map((line, index) => { line });

// 	} catch (error) {
// 		console.error("Error during OpenAI API call:", error);
// 		res.status(500).json({
// 			success: false,
// 			error: 'An error occurred while processing your request.',
// 		});
// 	}
// 	saveMessage(req.body?.user_id, response_gpt, "GPT")
// };

// const saveMessage = async (user_id, message, type) => {
// 	try {
// 		console.log(message);
// 		const newMessage = new ChatModel({
// 			userid: user_id,
// 			type: type,
// 			timestamp: new Date(),
// 			userMsc: message
// 		});
// 		console.log(newMessage);
// 		await newMessage.save();

// 		console.log("data saved")

// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Server Error",
// 			error: error.message
// 		});
// 	}
// };


// module.exports = { sendText };

const Together = require("together-ai");
const ChatModel = require("../models/chathistoryModel");



const together = new Together({
	apiKey: "f6fcefa655814856f97aa650da0f8582c471d1156624fd24c4105e2e08fb179d",
});

const sendText = async (req, res) => {
	try {
		const prompt = req.body.prompt;
		const user_id = req.body.user_id;

		// Save user prompt before processing
		await saveMessage(user_id, prompt, "USER");

		const response = await together.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "meta-llama/Llama-3-8b-chat-hf",
		});

		const response_gpt = response.choices[0].message.content;

		// Save GPT response after processing
		await saveMessage(user_id, response_gpt, "GPT");

		res.status(200).json({
			success: true,
			data: response_gpt,
		});
	} catch (error) {
		console.error("Error during OpenAI API call:", error);
		res.status(500).json({
			success: false,
			error: 'An error occurred while processing your request.',
		});
	}
};

const saveMessage = async (user_id, message, type) => {
	try {
		console.log(message);
		const newMessage = new ChatModel({
			userid: user_id,
			type: type,
			timestamp: new Date(),
			userMsc: message
		});
		console.log(newMessage);
		await newMessage.save();

		console.log("data saved");
	} catch (error) {
		console.error("Error saving message:", error);
	}
};
const getMessagesForUser = async (userid) => {
    try {
        // Log the userid being used in the query
        console.log('Fetching messages for userid:', userid);

        // Fetch the chat history
        const chatHistory = await ChatModel.find({ userid: userid });

        // Check if the chatHistory is null or empty
        if (!chatHistory || chatHistory.length === 0) {
            console.error('No chat history found for userid:', userid);
            throw new Error('No messages found for the provided userid');
        }

        return chatHistory;
    } catch (error) {
        console.error('Error fetching messages:', error);

        // Re-throw the error to be caught by the calling function
        throw new Error("Could not retrieve messages");
    }
};

// Example usage in a route/controller
const getChatHistory = async (req, res) => {
    try {
        const userid = req.params.userid; // or wherever you're getting the userid from
        const chatHistory = await getMessagesForUser(userid);
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { sendText , getChatHistory };
