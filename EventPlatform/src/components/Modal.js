import React from 'react';
import cars from '../data/cars'

export default function Modal(props) {

    let list = cars.map(c => {
        return <li key={c.id}>id: {c.id} | make: {c.make} | year: {c.year} | amount of seats: {c.amount_of_seats} <button>book</button></li>
    })

  return (

      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      {console.log(props.currentEvent)}
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{props.event.name + " | " + props.event.date + " | " + props.event.amountOfPeople + " people"}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            {JSON.stringify(props.event.description)}
            <hr></hr>
            Book yourself on one of the following cars
            <hr></hr>
            <ul>
                {list}
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
  );
}