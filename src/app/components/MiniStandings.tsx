import {Component} from "react";
import React from "react";
import {Gambler, GamblerInfo} from "../types";
import {getLeagueGamblers} from "../league/leagueSelector";
import {connect} from "react-redux";

export interface State {
}

export interface Props {
    gamblers: GamblerInfo[];
}

class MiniStandings extends Component<Props, State> {

    render() {
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
                    {this.props.gamblers.map((gambler, index) => {
                        return (<tr key={`mini-standings-${gambler.id}`}>
                            <td>{index + 1}</td>
                            <td>{gambler.user.firstName} {gambler.user.lastName}</td>
                            <td>
                                <a href={`transaction/show/${gambler.id}`}>
                                    ${gambler.money}
                                </a>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = (state: State) => {
    return {
        gamblers: getLeagueGamblers(state),
    };
};

export default connect(
    mapStateToProps,
    undefined,
)(MiniStandings);