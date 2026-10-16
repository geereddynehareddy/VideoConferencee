
import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        const code = meetingCode.trim();

        if (!code) {
            alert("Please enter a meeting code");
            return;
        }

        try {
            await addToUserHistory(code);
            navigate(`/${code}`);
        } catch (error) {
            console.error("Could not save meeting history:", error);
            navigate(`/${code}`);
        }
    };

    const handleCreateMeeting = async () => {
        const newMeetingCode = crypto.randomUUID();

        try {
            await addToUserHistory(newMeetingCode);
        } catch (error) {
            console.error("Could not save meeting history:", error);
        }

        navigate(`/${newMeetingCode}`);
    };

    return (
        <>
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2> Video Call</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        onClick={() => navigate("/history")}
                        aria-label="Meeting history"
                    >
                        <RestoreIcon />
                    </IconButton>

                    <p>History</p>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>
                            Providing Quality Video Call Just Like Quality Education
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                alignItems: "center"
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleJoinVideoCall();
                                    }
                                }}
                            />

                            <Button
                                onClick={handleJoinVideoCall}
                                variant="contained"
                            >
                                Join
                            </Button>

                            <Button
                                onClick={handleCreateMeeting}
                                variant="contained"
                                color="success"
                            >
                                New Meeting
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rightPanel">
                    <img src="/logo3.png" alt="Video calling illustration" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
