package iuh.fit.Factory;

public class Main {
    public static void main(String[] args) {

        CarFactory factory1 = new ElectricCarFactory();
        Engine e1 = factory1.createEngine();
        Wheel w1 = factory1.createWheel();

        e1.run();
        w1.rotate();

        System.out.println("-----");

        CarFactory factory2 = new GasCarFactory();
        Engine e2 = factory2.createEngine();
        Wheel w2 = factory2.createWheel();

        e2.run();
        w2.rotate();
    }
}