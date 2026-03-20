package iuh.fit.Factory;

public class ElectricCarFactory implements CarFactory {
    public Engine createEngine() {
        return new ElectricEngine();
    }

    public Wheel createWheel() {
        return new ElectricWheel();
    }
}