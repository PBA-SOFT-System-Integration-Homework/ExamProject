package com.mycompany;

import DTOs.CarDetails;
import com.google.gson.Gson;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Alexander W. Hørsted-Andersen <awha86@gmail.com>
 */
public class ApiResourceTest {

    Gson gson = new Gson();

    /**
     * Test of getAllCars method, of class ApiResource. Test that an not null &
     * greater than 0 list of cars is returned
     */
    @Test
    public void testGetAllCars() throws Exception {
        System.out.println("getAllCars");
        ApiResource instance = new ApiResource();
        String cars = instance.getAllCars();
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);
        assertNotNull(listOfCars);
        assertNotEquals(listOfCars.size(), 0);
    }

    /**
     * Test of getCarsBySeat method, of class ApiResource. Test that all found
     * cars have 2 or more seats when searching for 2 seat
     */
    @Test
    public void testGetCarsBySeat2() throws Exception {
        System.out.println("getCarsBySeat");
        int minNumberOfSeat = 2;
        ApiResource instance = new ApiResource();
        String cars = instance.getCarsBySeat(minNumberOfSeat + "");

        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertNotEquals(minNumberOfSeat - 1, car.getCarType().getNumberOfSeats());
        }
    }

    /**
     * Test of getCarsByType method, of class ApiResource. Test that all found
     * cars have the name/make of A
     */
    @Test
    public void testGetCarsByTypeA() throws Exception {
        System.out.println("getCarsByType");
        String type = "A";
        ApiResource instance = new ApiResource();
        String cars = instance.getCarsByType(type);
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertNotEquals(type, car.getCarType().getName());
        }
    }

    /**
     * Test of getCarsByPrice method, of class ApiResource.
     */
    @Test
    public void testGetCarsByPrice450() throws Exception {
        System.out.println("getCarsByPrice");
        String price = "450";
        ApiResource instance = new ApiResource();
        String cars = instance.getCarsByPrice(price);
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertTrue(Double.parseDouble(price) > car.getCarType().getPricePerDay());
        }
    }

}
