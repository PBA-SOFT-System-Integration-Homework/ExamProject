import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from '../styles/Events'

export default function AddEvent(props) {
    const classes = useStyles();

    return (
        <div>
            <form className={classes.form} >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="addEventName"
                    label="Name of event"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={props.handleInputChange}
                    value={props.state.addEventName}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="addEventDescription"
                    autoComplete="description"
                    onChange={props.handleInputChange}
                    value={props.state.addEventDescription}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="date"
                    label="Date for event"
                    type="description"
                    id="addEventDate"
                    autoComplete="date"
                    onChange={props.handleInputChange}
                    value={props.state.addEventDate}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="amountOfPeople"
                    label="Amount of people"
                    type="description"
                    id="addEventAmoutOfPeople"
                    autoComplete="Amount of people"
                    onChange={props.handleInputChange}
                    value={props.state.addEventAmoutOfPeople}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    label="Location"
                    type="description"
                    id="addEventLocation"
                    autoComplete="Location"
                    onChange={props.handleInputChange}
                    value={props.state.addEventLocation}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="carType"
                    label="Type of car [A, B, C, D, E]"
                    type="description"
                    id="addEventCarType"
                    autoComplete="Type of car"
                    onChange={props.handleInputChange}
                    value={props.state.addEventCarType}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="numberOfSeats"
                    label="Minimum number of seats for cars"
                    type="description"
                    id="addEventCarNumberOfSeats"
                    autoComplete="Minimum number of seats for cars (0-9)"
                    onChange={props.handleInputChange}
                    value={props.state.addEventCarNumberOfSeats}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={props.addEvent}
                >
                    Add Event
                    </Button>
            </form>
        </div>
    );
}