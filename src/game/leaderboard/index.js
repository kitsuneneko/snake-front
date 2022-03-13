import LeaderboardItem from "./leaderboarditem";

const LeaderBoard = ({ leaderboardData }) => {

    const list = leaderboardData.map( item => {
        const { id, ...rest } = item;
        
        return(
            <LeaderboardItem key={id} { ... rest }/>
        );
    });


    return(
        <ul>
            { list }
        </ul>
    );
};

export default LeaderBoard;