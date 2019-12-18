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
     * Test of testGetAllCars method, of class ApiResource. Test that an not
     * null & greater than 0 list of cars is returned
     */
    @Test
    public void testGetAllCars() throws Exception {
        System.out.println("testGetAllCars");
        String seat = null;
        String type = null;
        ApiResource instance = new ApiResource();
        String cars = instance.getAllCars(seat, type);
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);
        assertNotNull(listOfCars);
        assertNotEquals(listOfCars.size(), 0);
    }

    /**
     * Test of testGetAllCars method, of class ApiResource. Test that all found
     * cars have 2 or more seats when searching for 2 seat and no type
     */
    @Test
    public void testGetCarsBySeat2() throws Exception {
        System.out.println("testGetCarsBySeat2");
        String seat = "2";
        String type = "null";
        ApiResource instance = new ApiResource();
        String cars = instance.getAllCars(seat, type);
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertNotEquals(Integer.parseInt(seat) - 1, car.getCarType().getNumberOfSeats());
        }
    }

    /**
     * Test of testGetAllCars method, of class ApiResource. Test that all found
     * cars have the name/make of A and no seat no given
     */
    @Test
    public void testGetCarsByTypeA() throws Exception {
        System.out.println("testGetCarsByTypeA");
        String seat = null;
        String type = "A";
        ApiResource instance = new ApiResource();
        String cars = instance.getAllCars(seat, type);
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertEquals(type, car.getCarType().getName());
        }
    }

    /**
     * Test of testGetAllCars method, of class ApiResource. Test that all found
     * cars have the name/make of A and 2 seats
     */
    @Test
    public void testGetCarsBySeat2AndTypeA() throws Exception {
        System.out.println("testGetCarsBySeat2AndTypeA");
        String seat = "2";
        String type = "A";
        ApiResource instance = new ApiResource();
        String cars = instance.getAllCars("2", "a");
        CarDetails[] json = gson.fromJson(cars, CarDetails[].class);
        List<CarDetails> listOfCars = Arrays.asList(json);

        for (CarDetails car : listOfCars) {
            assertEquals(type, car.getCarType().getName());
            assertNotSame(Integer.parseInt(seat) - 1, car.getCarType().getNumberOfSeats());
        }
    }

}
