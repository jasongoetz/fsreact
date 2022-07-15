import React from "react";
import {GamblerInfo} from "../types";
import {useGlobalStores} from "../context/global_context";

export const MiniStandings = () => {
    const { leagueStore } = useGlobalStores();

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
            {leagueStore.gamblers.slice(0,7).map((gambler: GamblerInfo, index: number) => {
                return (<tr key={`mini-standings-${gambler.id}`}>
                    <td>{index + 1}</td>
                    <td>{gambler.user.firstName} {gambler.user.lastName}{gambler.defunct ? ' (Defunct)' : ''}</td>
                    <td>
                        <a href={`transaction/show/${gambler.id}`}>
                            ${gambler.tallies.money.toFixed(2)}
                        </a>
                    </td>
                </tr>)
            })}
            </tbody>
        </table>
    );
};
