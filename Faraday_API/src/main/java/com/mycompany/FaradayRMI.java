package com.mycompany;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import interfaces.IBooking;
import interfaces.ICars;

public class FaradayRMI {

    public static IBooking getIBooking() throws RemoteException, NotBoundException, MalformedURLException {
        try {
            return (IBooking) Naming.lookup("rmi://46.101.241.48/Booking");
        } catch (RemoteException | NotBoundException | MalformedURLException e) {
            System.out.println("getIBooking error");
            //todo logging, handle exceptions gracefully
        }
        return null;
    }

    public static ICars getICars() throws RemoteException, NotBoundException, MalformedURLException {
        try {
            return (ICars) Naming.lookup("//46.101.241.48:1099/Cars");
        } catch (RemoteException | NotBoundException | MalformedURLException e) {
            System.out.println("getICars error");
            //todo logging, handle exceptions gracefully
        }
        return null;
    }
}
