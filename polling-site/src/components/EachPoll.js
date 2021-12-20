import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import swal from 'sweetalert';

const EachPoll = (props) => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [voteInfo, setVoteInfo] = useState({});
    const [isVisible, setIsVisible] = useState(true);
    const [isShown, setIsShown] = useState(false);
    // const [allVotes, setAllVotes] = useState([]);
    const [countedVote, setCountedVote] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // let v = [];
    // console.log("hi", props)

    useEffect(() => {

        fetch("http://localhost:8080/allVotes")
            .then(res => res.json())
            .then(votes => {
                console.log(votes);
                // setAllVotes(votes);
                const desiredPollVotes = votes.filter(vote => vote.pollId === props.id);
                const isUserVoted = desiredPollVotes.filter(dpv => dpv.voterEmail === loggedUser.useremail)

                if (isUserVoted.length > 0) {
                    desiredPollVotes.forEach(vote => {
                        console.log(vote.votedOpt)
                        countedVote[vote.votedOpt]++;
                    })
                    setIsVisible(false)
                    setIsShown(true)
                    console.log(countedVote)
                }

            })

    }, [])
    const handleMarkedOpt = (e, i) => {
        console.log(e.target.value, i + 1, props.id, loggedUser.useremail)

        setVoteInfo({
            pollId: props.id,
            voterEmail: loggedUser.useremail,
            votedOpt: i + 1,
            option: e.target.value,
        })
    }
    const handleSubmitBtn = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/vote", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    swal("Done!", "successfully created poll!", "success");
                    setIsVisible(false)



                    fetch("http://localhost:8080/allVotes")
                        .then(res => res.json())
                        .then(votes => {
                            console.log(votes);
                            // setAllVotes(votes);
                            const desiredPollVotes = votes.filter(vote => vote.pollId === voteInfo.pollId);
                            desiredPollVotes.forEach(vote => {
                                console.log(vote.votedOpt)
                                countedVote[vote.votedOpt]++;
                            })
                            setIsShown(true)
                            console.log(countedVote)
                        })
                }
            })
    }
    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <ul className="list-group list-group-flush">
                    <form onSubmit={handleSubmitBtn}>
                        <div className="form-check ms-3">
                            {
                                isVisible && <div className="card-header">
                                    {props.poll.description}
                                </div>
                            }
                            {
                                isVisible && props.poll.options.map((op, i) =>
                                    <>
                                        <input onChange={(e) => handleMarkedOpt(e, i)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            {op.option}
                                        </label>
                                        <hr />
                                    </>
                                )
                            }
                            {isVisible && <button type="submit" className="btn btn-primary mt-1">Submit</button>}
                            {isShown && <ul className="list-group">
                                <li className="list-group-item active" aria-current="true">description: {props.poll.description}</li>
                                {
                                    isShown && props.poll.options.map((op, i) =>
                                        <li className="list-group-item">{op.option}{" ---->"} vote: {countedVote[i + 1]}</li>

                                    )
                                }
                            </ul>}
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    )
}

export default EachPoll
