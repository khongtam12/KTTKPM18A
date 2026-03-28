package iuh.fit.bai1;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Stock stock = new Stock();


        Investor inv1 = new Investor("Alice");
        Investor inv2 = new Investor("Bob");
        Investor inv3 = new Investor("Charlie");


        stock.register(inv1);
        stock.register(inv2);
        stock.register(inv3);


        System.out.println("=== Cập nhật giá lần 1 ===");
        stock.setPrice(100.0);

        System.out.println("=== Cập nhật giá lần 2 ===");
        stock.setPrice(120.5);


        stock.unregister(inv2);

        System.out.println("=== Cập nhật giá lần 3 ===");
        stock.setPrice(90.0);
    }
}