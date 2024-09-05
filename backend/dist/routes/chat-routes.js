import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { ChatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
// protected api
const chatRoutes = Router();
chatRoutes.post("/new", validate(ChatCompletionValidator), verifyToken, generateChatCompletion);
;
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map