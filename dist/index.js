"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.status(200).send("All is good");
});
app.post('/shorten', (req, res) => {
    let reqUrl = req.body.url;
    if (reqUrl === undefined) {
        res.status(400).send("Url undefined");
    }
    else {
        try {
            res.status(200).send({ url: reqUrl + '/1' });
        }
        catch (error) {
            res.status(500).send("Internal server error");
        }
    }
});
//# sourceMappingURL=index.js.map