import React from "react";
import {getLeagueGamblers} from "../league/leagueSelector";
import {GamblerInfo} from "../types";
import {LeagueConsumer} from "../league/leagueContext";

export const MiniStandings = () => {
    return (
        <LeagueConsumer select={[state => getLeagueGamblers(state).slice(0, 7)]}>
            {gamblers =>
                <table className='table standings'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Money</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gamblers.map((gambler: GamblerInfo, index: number) => {
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
            }
        </LeagueConsumer>
    );
};
