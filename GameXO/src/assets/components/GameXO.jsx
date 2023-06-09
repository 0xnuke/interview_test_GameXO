import './style/GameXO.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GameXO = () => {
    const [map, setMap] = useState(['','','','','','','','','']);
    const [isX, setIsX] = useState(true);
    const [winner, setWinner] = useState();

    useEffect(() => {
        const whoIsWinner = findWinner(map);

        if (whoIsWinner) {
            setWinner(`The winner is ${whoIsWinner}!`);
        } else if (!map.includes('')) {
            setWinner("It's a draw!");
        } else {
            setWinner('Next player: ' + (isX ? 'You' : 'Bot'));
        }

        if (!isX && !whoIsWinner && map.includes('')) {
            axios.get('http://localhost:3001/api/botMove', { params: { map: JSON.stringify(map) } })
                .then((response) => {
                    const botMoveIndex = response.data.botMoveIndex;

                    if (!map[botMoveIndex]) {
                        setTimeout(() => {
                            handleClick(botMoveIndex);
                        }, 300);
                    }
                })
                .catch((error) => {
                    console.error('Error durring bot move:', error);
                });
        }
    }, [isX, map]);

    const handleClick = (i) => {
        //ใส่ไว่ป้องกันการกดทับช่อง
        if (findWinner(map) || map[i] || !map.includes('')) {
            return;
        }
        const newMap = [...map];
        newMap[i] = isX ? 'X' : 'O';
        setMap(newMap);
        setIsX(!isX);
    };

    const findWinner= (map) => {
        const winningCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCondition.length; i++) {
            const [a, b, c] = winningCondition[i];
            if (map[a] === 'O' && map[b] === 'O' && map[c] === 'O') {
                return "Bot";
            }
            if (map[a] === 'X' && map[b] === 'X' && map[c] === 'X') {
                return "Player";
            }
        }
    }

    const botMove = () => {
        const randomIndex = Math.floor(Math.random() * 9);

        if (map[randomIndex] === '') {
            return randomIndex;
        } else {
            return botMove();
        }
    };

    const handleRestart = () => {
        setMap(['','','','','','','','','']);
        setIsX(true);
        setWinner();
    };

    const renderMap = (i) => {
        return (
            <td className="map" onClick={() => handleClick(i)}>
                {map[i]}
            </td>
        );
    };

    return (
        <div className="map-container">
            <div className='text-container'>
                {winner}
            </div>
            <table>
                <tbody>
                    <tr>
                        {renderMap(0)}
                        {renderMap(1)}
                        {renderMap(2)}
                    </tr>
                    <tr>
                        {renderMap(3)}
                        {renderMap(4)}
                        {renderMap(5)}
                    </tr>
                    <tr>
                        {renderMap(6)}
                        {renderMap(7)}
                        {renderMap(8)}
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={handleRestart}>Restart</button>

            </div>
        </div>
    );
};

export default GameXO;

