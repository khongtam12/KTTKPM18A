package iuh.fit.Factory;

public class GasCarFactory implements CarFactory {
    public Engine createEngine() {
        return new GasEngine();
    }

    public Wheel createWheel() {
        return new GasWheel();
    }
}