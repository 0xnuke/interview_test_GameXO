const botMove = (map) => {
    const randomIndex = Math.floor(Math.random() * 9);
    console.log(map)
    if (map[randomIndex] === '') {
        return randomIndex;
    } else {
        return botMove(map);
    }
};

exports.botMoves = async (req, res) => {
    const { map } = req.query;

    try {
        const mapArray = JSON.parse(map);

        const botMoveIndex = botMove(mapArray);

        res.json({ botMoveIndex });
    } catch (error) {
        res.status(400).json({ error: 'Invalid map parameter map should be like this ["", "", "", "", "", "", "", "", ""]' });
    }
};

