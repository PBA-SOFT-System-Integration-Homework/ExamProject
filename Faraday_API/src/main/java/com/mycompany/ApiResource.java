/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany;

import DTOs.AirportDetails;
import DTOs.AvailabilityDetails;
import DTOs.CarDetails;
import DTOs.Identifiers.StationIdentifier;
import com.google.gson.Gson;
import java.net.MalformedURLException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


/**
 * REST Web Service
 *
 * @author Alexander W. Hørsted-Andersen <awha86@gmail.com>
 */
@Path("cars")
public class ApiResource {

    Gson gson = new Gson();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ApiResource
     */
    public ApiResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public String getAllCars(
            @QueryParam("seat") String seat,
            @QueryParam("type") String type
    ) throws RemoteException, NotBoundException, MalformedURLException {

        List<CarDetails> listOfCars = getListOfCars();

        List<CarDetails> listOfCarsFiltered = new ArrayList<>();

        //seat=null & type=null
        if (seat == null && type == null) {
            return gson.toJson(listOfCars);
        }
        //seat = null & type != null
        if (seat == null) {
            for (CarDetails car : listOfCars) {

                if (car.getCarType().getName().equals(type.toUpperCase())) {
                    listOfCarsFiltered.add(car);
                }
            }
            return gson.toJson(listOfCarsFiltered);
        }

        //seat != null & type = null
        if (type == null) {
            for (CarDetails car : listOfCars) {

                //seat != null & type != null
                if (car.getCarType().getNumberOfSeats() >= Integer.parseInt(seat)) {
                    listOfCarsFiltered.add(car);
                }
            }
            return gson.toJson(listOfCarsFiltered);
        }

        //seat != null & type != null
        for (CarDetails car : listOfCars) {
            if (car.getCarType().getNumberOfSeats() >= Integer.parseInt(seat) && car.getCarType().getName().equals(type.toUpperCase())) {
                listOfCarsFiltered.add(car);
            }
        }
        return gson.toJson(listOfCarsFiltered);
    }

    private List<CarDetails> getListOfCars() throws RemoteException, NotBoundException, MalformedURLException {

        StationIdentifier pickUpPlace = new AirportDetails("93", null, null, null, null);
        Date pickupTime = new Date(01, 01, 1970);
        Date deliveryTime = new Date(01, 01, 2021);

        AvailabilityDetails availabilityDetails = new AvailabilityDetails(pickupTime, deliveryTime, pickUpPlace);

        List<CarDetails> listOfCars = FaradayRMI.getICars().getAvailableCars(availabilityDetails);

        return listOfCars;
    }

}
