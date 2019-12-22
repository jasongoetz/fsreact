import React from "react";
import {getLeagueGamblers} from "../league/leagueSelector";
import {useSelector} from "react-redux";
import {GamblerInfo} from "../types";

export const MiniStandings = () => {
    const gamblers = useSelector(state => getLeagueGamblers(state).slice(0, 7));

    return (
        <table className='table standings'>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Money</th>
            </tr>
            </thead>
            <tbody>
            {gamblers.map((gambler: GamblerInfo , index: number) => {
                return (<tr key={`mini-standings-${gambler.id}`}>
                    <td>{index + 1}</td>
                    <td>{gambler.user.firstName} {gambler.user.lastName}</td>
                    <td>
                        <a href={`transaction/show/${gambler.id}`}>
                            ${gambler.money.toFixed(2)}
                        </a>
                    </td>
                </tr>)
            })}
            </tbody>
        </table>
    );
};
