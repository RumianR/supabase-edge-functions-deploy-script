// edge-functions/helloWorld.js
export default async (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
};
